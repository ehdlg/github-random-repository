import useSWR, { Fetcher } from 'swr';
import { API_URL, TOKEN, REPOSITORIES_PER_PAGE } from '../constants';
import { ErrorResponse, LanguageValue, Repository, RepositorySearchResponse } from '../types';
import useCache from './useCache';
import { extractRequiredFields } from '../utils';

const fetcher: Fetcher<RepositorySearchResponse, string> = (URL: string) =>
  fetch(URL, {
    headers: { 'Content-Type': 'application/vnd.github+json', Authorization: `Bearer ${TOKEN}` },
  }).then((res) => res.json());

export function useRepository(language: LanguageValue) {
  let filteredRepos: Repository[] | null = null;
  const URL = `${API_URL}/repositories?q=${
    language ? `language:${language}&` : ''
  }per_page=${REPOSITORIES_PER_PAGE}`;
  const { cachedRepos, updateCache, isCacheLoading } = useCache(language);
  const fetcherURL = null != language && null == cachedRepos && !isCacheLoading ? URL : null;
  const { data, error, isLoading } = useSWR<RepositorySearchResponse, ErrorResponse>(
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
