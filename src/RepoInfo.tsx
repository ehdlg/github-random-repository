import { Repository } from './types';
import { IoMdStar } from 'react-icons/io';
import { RiGitForkFill } from 'react-icons/ri';
import { PiWarningCircleLight } from 'react-icons/pi';

export default function RepoInfo({ repo }: { repo: Repository }) {
  const { description, language, watchers_count, forks_count, open_issues_count, name, html_url } =
    repo;
  const iconStyles = 'text-violet-500 size-5';
  const spanStyles = 'flex gap-2 items-center';

  return (
    <article className='w-full bg-slate-200 dark:bg-slate-800 rounded-xl  text-slate-800 dark:text-slate-200 p-8 flex flex-col gap-8 text-left text-lg'>
      <a href={html_url} target='_blank'>
        <h3 className='text-3xl text-left from-slate-200 to-slate-200 hover:cursor-pointer bg-gradient-to-br hover:from-violet-300 hover:to-violet-400 inline-block text-transparent bg-clip-text transition ease-in duration-200'>
          {name}
        </h3>
      </a>
      <p className='dark:text-slate-400 text-slate-700 text-2xl'>
        {description ?? 'No description provided '}
      </p>
      <div className='text-left flex w-full text-lg justify-between text-slate-300 items-center'>
        <span className={spanStyles}>
          <div className={`size-3 rounded-full bg-violet-500 language-${language}`}></div>{' '}
          {language}
        </span>
        <span className={spanStyles}>
          <IoMdStar className={iconStyles} /> {watchers_count}
        </span>
        <span className={spanStyles}>
          <RiGitForkFill className={iconStyles} /> {forks_count}
        </span>
        <span className={spanStyles}>
          <PiWarningCircleLight className={iconStyles} /> {open_issues_count}
        </span>
      </div>
    </article>
  );
}
