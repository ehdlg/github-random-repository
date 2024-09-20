import { useEffect, useState } from 'react';
import { Repository } from '../types';

function useLocalStorage(url: string | null) {
  const [cachedRepos, setCachedRepos] = useState<Repository[] | null>(null);
  const [isCacheLoading, setIsCacheLoading] = useState<boolean>(true);

  const updateCache = (url: string, repositories: Repository[] | null) => {
    setCachedRepos(repositories);

    if (null == repositories) return;

    localStorage.setItem(url, JSON.stringify(repositories));
  };

  useEffect(() => {
    if (null == url) return;

    const initialRawValue: string | null = localStorage.getItem(url);
    const initialValue: Repository[] | null =
      null != initialRawValue ? JSON.parse(initialRawValue) : null;

    updateCache(url, initialValue);

    setIsCacheLoading(false);
  }, [url]);

  return { cachedRepos, updateCache, isCacheLoading };
}

export default useLocalStorage;
