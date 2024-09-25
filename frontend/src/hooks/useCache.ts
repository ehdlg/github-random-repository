import useRedis from './useRedis';
import { USE_REDIS } from '../constants';
import { LanguageValue } from '../types';
import useLocalStorage from './useLocalStorage';

function useCache(language: LanguageValue) {
  const isUsingRedis = USE_REDIS === 'true';

  const redisData = useRedis(isUsingRedis ? language : null);
  const localStorageData = useLocalStorage(isUsingRedis ? null : language);

  const cachedRepos = isUsingRedis ? redisData.cachedRepos : localStorageData.cachedRepos;
  const updateCache = isUsingRedis ? redisData.updateCache : localStorageData.updateCache;
  const isCacheLoading = isUsingRedis ? redisData.isCacheLoading : localStorageData.isCacheLoading;

  return { cachedRepos, updateCache, isCacheLoading };
}

export default useCache;
