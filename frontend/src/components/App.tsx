import useRepository from '../hooks/useRepository';
import Search from './Search';
import Loading from './Loading';
import { useCallback, useEffect, useState } from 'react';
import { LanguageValue, ProgrammingLanguageData, Repository } from '../types';
import { toast } from 'sonner';
import { SingleValue } from 'react-select';
import { getRandomRepo } from '../utils';
import RepoInfo from './RepoInfo';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageValue | null>(null);
  const [randomRepo, setRandomRepo] = useState<Repository | null>(null);
  const { data, error, isLoading } = useRepository(selectedLanguage);

  const updateRandomRepo = useCallback(() => {
    if (null == data) return;

    let newRandomRepo: Repository;

    do {
      newRandomRepo = getRandomRepo(data);
    } while (null != randomRepo && newRandomRepo.id === randomRepo.id);

    setRandomRepo(newRandomRepo);
  }, [data]);

  const updateLanguage = (newLanguage: SingleValue<ProgrammingLanguageData>) => {
    if (null == newLanguage) return;

    setSelectedLanguage(newLanguage.value);
  };

  useEffect(() => {
    if (null == selectedLanguage || null == data) return;

    updateRandomRepo();
  }, [selectedLanguage, data, updateRandomRepo]);

  if (null != error) {
    toast.error(error.message);

    setSelectedLanguage(null);
  }

  return (
    <main className='max-w-2xl mx-auto mt-14 text-center'>
      <h2 className='text-7xl  p-4 font-bold text-center bg-gradient-to-br from-violet-300 to-violet-500 inline-block text-transparent bg-clip-text'>
        Random Repo
      </h2>
      <h3 className='dark:text-slate-300 text-2xl text-center leading-normal mt-8'>
        Explore a variety of{' '}
        <span className='font-bold dark:text-slate-300 text-slate-600'>GitHub repositories</span> in
        your favorite programming language. Discover new projects and inspiration with each click!
      </h3>

      {isLoading && <Loading />}
      <section className='mt-10 w-3/4 mx-auto flex flex-col gap-10'>
        <Search onChange={updateLanguage} />
        {randomRepo && <RepoInfo repo={randomRepo} refreshRepo={updateRandomRepo} />}
      </section>
    </main>
  );
}

export default App;
