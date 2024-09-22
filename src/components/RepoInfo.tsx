import { Repository } from '../types';
import { IoMdStar } from 'react-icons/io';
import { RiGitForkFill } from 'react-icons/ri';
import { PiWarningCircleLight } from 'react-icons/pi';

export default function RepoInfo({
  repo,
  refreshRepo,
}: {
  repo: Repository;
  refreshRepo: () => void;
}) {
  const { description, language, watchers_count, forks_count, open_issues_count, name, html_url } =
    repo;
  const iconStyles = 'text-violet-500 size-5';
  const detailsStyles = 'flex gap-1 justify-center text-center  items-center';

  return (
    <>
      <article className='w-full bg-slate-100 shadow-md min-h-[350px] justify-between dark:bg-slate-800 rounded-xl  text-slate-800 dark:text-slate-200 p-8 flex flex-col gap-8 text-left text-lg'>
        <a href={html_url} target='_blank'>
          <h3 className='text-3xl text-left from-slate-800 to-slate-800 dark:from-slate-200 dark:to-slate-200 hover:cursor-pointer bg-gradient-to-br hover:from-violet-300 hover:to-violet-400 inline-block text-transparent bg-clip-text transition ease-in duration-200'>
            {name}
          </h3>
        </a>
        <p className='dark:text-slate-400 text-slate-500 text-2xl mb-auto'>
          {description ?? 'No description provided '}
        </p>
        <div className='text-left grid grid-cols-4 gap-2 content-center w-full text-md justify-between text-slate-500 dark:text-slate-300 items-center'>
          <span className={detailsStyles}>
            <div className={`size-3 rounded-full bg-violet-500 language-${language}`}></div>{' '}
            {language}
          </span>
          <span className={detailsStyles}>
            <IoMdStar className={iconStyles} /> {watchers_count}
          </span>
          <span className={detailsStyles}>
            <RiGitForkFill className={iconStyles} /> {forks_count}
          </span>
          <span className={detailsStyles}>
            <PiWarningCircleLight className={iconStyles} /> {open_issues_count}
          </span>
        </div>
      </article>

      <button
        onClick={refreshRepo}
        className='w-full focus:outline-none dark:bg-slate-800 bg-slate-100 px-2 py-4 border-2 border-transparent focus:border-violet-500 hover:border-violet-500 rounded-xl text-xl drop-shadow-md hover:drop-shadow-none transition ease-in duration-300 dark:text-slate-200 text-slate-700'
      >
        Refresh
      </button>
    </>
  );
}
