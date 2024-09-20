import { useEffect, useState } from 'react';
import { Repository } from '../types';

function useLocalStorage(url: string) {
  const [cachedRepos, setCachedRepos] = useState<Repository[] | null>(null);

  const updateCache = (url: string, repositories: Repository[] | null) => {
    setCachedRepos(repositories);

    if (null == repositories) return;

    localStorage.setItem(url, JSON.stringify(repositories));
  };

  useEffect(() => {
    const initialRawValue: string | null = localStorage.getItem(url);
    const initialValue: Repository[] | null =
      null != initialRawValue ? JSON.parse(initialRawValue) : null;

    updateCache(url, initialValue);
  }, [url]);

  return { cachedRepos, updateCache };
}

export default useLocalStorage;
