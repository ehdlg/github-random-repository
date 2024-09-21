import { useEffect, useState } from 'react';
import { LOCAL_STORAGE_SIZE_LIMIT } from '../constants';
import { Repository } from '../types';

function useLocalStorage(url: string | null) {
  const [cachedRepos, setCachedRepos] = useState<Repository[] | null>(null);
  const [isCacheLoading, setIsCacheLoading] = useState<boolean>(true);

  const updateCache = (url: string, repositories: Repository[] | null) => {
    setCachedRepos(repositories);

    if (null == repositories) return;

    const localStorageSize = getLocalStorageSize();

    if (localStorageSize >= LOCAL_STORAGE_SIZE_LIMIT) localStorage.clear();

    localStorage.setItem(url, JSON.stringify(repositories));
  };

  const getLocalStorageSize = () => {
    let totalSize = 0;

    const localStorageKeys = Object.keys(localStorage);

    if (localStorageKeys.length == 0) return totalSize;

    for (const key of localStorageKeys) {
      const value = localStorage.getItem(key);

      if (null == value) continue;

      const keySize = key.length + value.length;

      totalSize += keySize;
    }

    const sizeInMb = totalSize / 1024 / 1023;

    return Number(sizeInMb.toFixed(2));
  };

  useEffect(() => {
    if (null == url) return;

    const initialRawValue: string | null = localStorage.getItem(url);
    const initialValue: Repository[] | null =
      null != initialRawValue ? JSON.parse(initialRawValue) : null;

    updateCache(url, initialValue);

    setIsCacheLoading(false);
  }, [url, updateCache]);

  return { cachedRepos, updateCache, isCacheLoading };
}

export default useLocalStorage;
