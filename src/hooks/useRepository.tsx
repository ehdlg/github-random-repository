import useSWR from 'swr';
import { API_URL } from '../constants';

const fetcher = (URL: string) => fetch(URL).then((res) => res.json());

export function useRepository(language: string) {
  const URL = `${API_URL}/repositories?q=language:${language}&per_page=1`;
  const { data: repository, error, isLoading } = useSWR(URL, fetcher);

  return { repository, error, isLoading };
}

export default useRepository;
