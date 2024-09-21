import { Repository } from './types';

export const getRandomRepo = (repositories: Repository[]) => {
  const repositoriesLength = repositories.length;
  const randomIndex = Math.floor(Math.random() * repositoriesLength);

  return repositories[randomIndex];
};
