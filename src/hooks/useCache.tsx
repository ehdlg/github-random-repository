import { LanguageValue } from '../types';
import useLocalStorage from './useLocalStorage';

function useCache(language: LanguageValue) {
  const { cachedRepos, updateCache, isCacheLoading } = useLocalStorage(language);

  return { cachedRepos, updateCache, isCacheLoading };
}

export default useCache;
