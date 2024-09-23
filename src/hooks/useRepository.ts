import useSWR from 'swr';
import { API_URL, TOKEN, REPOSITORIES_PER_PAGE } from '../constants';
import { ErrorResponse, LanguageValue, Repository, RepositorySearchResponse } from '../types';
import useCache from './useCache';
import { extractRequiredFields } from '../utils';
import { FetchError } from '../errors';

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
  let filteredRepos: Repository[] | null = null;
  const URL = `${API_URL}/repositories?q=${
    language ? `language:${language}&` : ''
  }per_page=${REPOSITORIES_PER_PAGE}`;
  const { cachedRepos, updateCache, isCacheLoading } = useCache(language);
  const fetcherURL = null != language && null == cachedRepos && !isCacheLoading ? URL : null;
  const { data, error, isLoading } = useSWR<RepositorySearchResponse, FetchError>(
    fetcherURL,
    fetcher
  );

  if (null != language && null != data) {
    filteredRepos = extractRequiredFields(data.items);

    updateCache(language, filteredRepos);
  }

  return { data: cachedRepos || filteredRepos, error, isLoading: isCacheLoading || isLoading };
}

export default useRepository;
