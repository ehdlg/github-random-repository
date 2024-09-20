import useSWR, { Fetcher } from 'swr';
import { API_URL, TOKEN, REPOSITORIES_PER_PAGE } from '../constants';
import { ErrorResponse, LanguageValue, RepositorySearchResponse } from '../types';

const fetcher: Fetcher<RepositorySearchResponse, string> = (URL: string) =>
  fetch(URL, {
    headers: { 'Content-Type': 'application/vnd.github+json', Authorization: `Bearer ${TOKEN}` },
  }).then((res) => res.json());

export function useRepository(language: LanguageValue) {
  const URL = `${API_URL}/repositories?q=${
    language ? `language:${language}&` : ''
  }per_page=${REPOSITORIES_PER_PAGE}`;
  const { data, error, isLoading } = useSWR<RepositorySearchResponse, ErrorResponse>(URL, fetcher);

  return { data, error, isLoading };
}

export default useRepository;
