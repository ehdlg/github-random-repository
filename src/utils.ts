import { FullRepository, Repository } from './types';

export const getRandomRepo = (repositories: FullRepository[]) => {
  const repositoriesLength = repositories.length;
  const randomIndex = Math.floor(Math.random() * repositoriesLength);

  return repositories[randomIndex];
};

export const extractRequiredFields = (fullRepositories: FullRepository[]): Repository[] => {
  const repositories: Repository[] = fullRepositories.map((fullRepo) => {
    const {
      description,
      forks_count,
      html_url,
      id,
      language,
      name,
      open_issues_count,
      stargazers_count,
    }: Repository = fullRepo;

    return {
      description,
      forks_count,
      html_url,
      id,
      language,
      name,
      open_issues_count,
      stargazers_count,
    };
  });

  return repositories;
};
