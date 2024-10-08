import { useState, useEffect } from 'react';
import { LanguageValue, Repository } from '../types';
import { REDIS_API } from '../constants';

function useRedis(language: LanguageValue) {
  const [cachedRepos, setCachedRepos] = useState<Repository[] | null>(null);
  const [isCacheLoading, setIsCacheLoading] = useState<boolean>(true);

  const get = async (language: LanguageValue) => {
    if (null == language) return setIsCacheLoading(false);

    const URL = `${REDIS_API}/${language}`;
    if (language == null) return;

    const response = await fetch(URL);

    if (!response.ok) return;

    const rawData = await response.json();
    const data: Repository[] | null = null != rawData ? JSON.parse(rawData) : null;

    setCachedRepos(data);
  };

  const set = async (language: LanguageValue, repositories: Repository[]) => {
    const URL = REDIS_API;
    const body = { language, repositories };

    await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  useEffect(() => {
    get(language);

    setIsCacheLoading(false);
  }, [language]);

  return { cachedRepos, updateCache: set, isCacheLoading };
}

export default useRedis;
