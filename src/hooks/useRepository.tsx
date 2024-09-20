import useSWR, { Fetcher } from 'swr';
import { API_URL, TOKEN } from '../constants';
import { ErrorResponse, RepositorySearchResponse } from '../types';

const fetcher: Fetcher<RepositorySearchResponse, string> = (URL: string) =>
  fetch(URL, {
    headers: { 'Content-Type': 'application/vnd.github+json', Authorization: `Bearer ${TOKEN}` },
  }).then((res) => res.json());

export function useRepository(language: string) {
  const URL = `${API_URL}/repositories?q=language:${language}&per_page=1`;
  const { data, error, isLoading } = useSWR<RepositorySearchResponse, ErrorResponse>(URL, fetcher);

  return { data, error, isLoading };
}

export default useRepository;
