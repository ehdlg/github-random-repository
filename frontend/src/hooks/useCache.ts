import { LanguageValue } from '../types';
import useRedis from './useRedis';

function useCache(language: LanguageValue) {
  const { cachedRepos, updateCache, isCacheLoading } = useRedis(language);

  return { cachedRepos, updateCache, isCacheLoading };
}

export default useCache;
