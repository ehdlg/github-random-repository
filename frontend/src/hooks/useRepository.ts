import useSWR from 'swr';
import { API_URL, TOKEN, REPOSITORIES_PER_PAGE } from '../constants';
import { ErrorResponse, LanguageValue, RepositorySearchResponse } from '../types';
import useCache from './useCache';
import { extractRequiredFields } from '../utils';
import { FetchError } from '../errors';
import { useEffect } from 'react';

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/vnd.github+json', Authorization: `Bearer ${TOKEN}` },
  });

  if (!res.ok) {
    const error: ErrorResponse = await res.json();

    throw new FetchError(error.message, error.documentation_url, error.status);
  }

  return res.json();
};

export function useRepository(language: LanguageValue) {
  const URL = `${API_URL}/repositories?q=${
    language ? `language:${language}&` : ''
  }per_page=${REPOSITORIES_PER_PAGE}`;
  const { cachedRepos, updateCache, isCacheLoading } = useCache(language);
  const fetcherURL = null != language && null == cachedRepos && !isCacheLoading ? URL : null;
  const { data, error, isLoading } = useSWR<RepositorySearchResponse, FetchError>(
    fetcherURL,
    fetcher
  );

  useEffect(() => {
    if (null != language && null != data) {
      const filteredRepos = extractRequiredFields(data.items);

      updateCache(language, filteredRepos);
    }
  }, [language, data]);

  return { data: cachedRepos || data?.items, error, isLoading: isCacheLoading || isLoading };
}

export default useRepository;
