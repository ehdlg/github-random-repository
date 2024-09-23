import { useCallback, useEffect, useState } from 'react';
import { LOCAL_STORAGE_SIZE_LIMIT } from '../constants';
import { LanguageValue, FullRepository } from '../types';

function useLocalStorage(language: LanguageValue) {
  const [cachedRepos, setCachedRepos] = useState<FullRepository[] | null>(null);
  const [isCacheLoading, setIsCacheLoading] = useState<boolean>(true);

  const updateCache = useCallback((language: string, repositories: FullRepository[] | null) => {
    setCachedRepos(repositories);

    if (null == repositories) return;

    const localStorageSize = getLocalStorageSize();

    if (localStorageSize >= LOCAL_STORAGE_SIZE_LIMIT) localStorage.clear();

    localStorage.setItem(language, JSON.stringify(repositories));
  }, []);

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
    if (null == language) return setIsCacheLoading(false);

    const initialRawValue: string | null = localStorage.getItem(language);
    const initialValue: FullRepository[] | null =
      null != initialRawValue ? JSON.parse(initialRawValue) : null;

    updateCache(language, initialValue);

    setIsCacheLoading(false);
  }, [language, updateCache]);

  return { cachedRepos, updateCache, isCacheLoading };
}

export default useLocalStorage;
