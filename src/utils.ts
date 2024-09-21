import { Repository } from './types';

export const getRandomRepo = (repositories: Repository[] | undefined) => {
  if (null == repositories || repositories.length === 0) return null;

  const repositoriesLength = repositories.length;
  const randomIndex = Math.floor(Math.random() * repositoriesLength);

  return repositories[randomIndex];
};
