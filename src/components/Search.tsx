import { PROGRAMMING_LANGUAGE_DATA } from '../constants';
import Select, { SingleValue } from 'react-select';
import { LanguageValue, ProgrammingLanguageData } from '../types';

export default function Search({
  onChange,
}: {
  onChange: (e: SingleValue<ProgrammingLanguageData>) => void;
}) {
  return (
    <form className='p-4 w-full mx-center  rounded-xl dark:bg-slate-800 dark:text-slate-200 '>
      <Select
        classNames={{
          container: () => 'text-slate-700 text-left  ',
          control: () => 'border border-red-500 outline-none text-red-500',
        }}
        options={PROGRAMMING_LANGUAGE_DATA}
        placeholder='Select a language'
        onChange={onChange}
      />
    </form>
  );
}
