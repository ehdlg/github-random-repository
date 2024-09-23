import { FullRepository } from './types';

export const getRandomRepo = (repositories: FullRepository[]) => {
  const repositoriesLength = repositories.length;
  const randomIndex = Math.floor(Math.random() * repositoriesLength);

  return repositories[randomIndex];
};
