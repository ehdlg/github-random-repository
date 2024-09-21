import { Repository } from './types';

export default function RepoInfo({ repo }: { repo: Repository }) {
  const { description, language, watchers_count, forks_count, open_issues_count, name } = repo;

  return (
    <article className='w-full bg-slate-200 dark:bg-slate-800 rounded-xl  text-slate-800 dark:text-slate-200 p-8 flex flex-col gap-8 text-left text-lg'>
      <h3 className='text-3xl text-left'>{name}</h3>
      <p className='dark:text-slate-400 text-slate-700 text-2xl'>
        {description ?? 'No description provided '}
      </p>
      <div className='text-left flex w-full text-lg justify-between text-slate-300 '>
        <span>* {language}</span>
        <span>{watchers_count}</span>
        <span>{forks_count}</span>
        <span>{open_issues_count}</span>
      </div>
    </article>
  );
}
