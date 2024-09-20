import useLocalStorage from './useLocalStorage';

function useCache(url: string) {
  const { cachedRepos, updateCache, isCacheLoading } = useLocalStorage(url);

  return { cachedRepos, updateCache, isCacheLoading };
}

export default useCache;
