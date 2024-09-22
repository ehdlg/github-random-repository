import { PROGRAMMING_LANGUAGE_DATA } from '../constants';
import Select, { SingleValue } from 'react-select';
import { ProgrammingLanguageData } from '../types';

export default function Search({
  onChange,
}: {
  onChange: (e: SingleValue<ProgrammingLanguageData>) => void;
}) {
  return (
    <form className='p-1 w-full mx-center  rounded-xl dark:bg-slate-800 dark:text-slate-200 '>
      <Select
        unstyled={true}
        classNames={{
          container: () => 'text-left border-none rounded-xl w-full shadow-sm',
          control: () =>
            `flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all duration-150 dark:bg-slate-800 bg-slate-100 hover:cursor-pointer`,
          valueContainer: () => 'flex-1 bg-transparent p-2 dark:bg-slate-800 dark:text-slate-200',
          singleValue: () => 'text-lg text-slate-700 dark:text-slate-200',
          placeholder: () => 'text-xl text-center text-slate-700 dark:text-slate-400',
          menuList: () => 'bg-slate-100 dark:bg-slate-800  p-4 rounded-lg shadow-lg ',
          option: (state) =>
            `p-2 rounded-md transition-all duration-150 text-lg hover:cursor-pointer ${
              state.isSelected ? 'bg-violet-500 text-white' : 'hover:bg-violet-300 hover:text-white'
            }`,
          input: () => 'text-lg text-slate-700 dark:text-slate-200',
          indicatorsContainer: () => 'flex bg-slate-100 dark:bg-slate-800',
          indicatorSeparator: () => 'hidden',
          dropdownIndicator: () =>
            'text-violet-300 hover:text-violet-500 hover:cursor-pointer transition ease-in duration-150',
          clearIndicator: () => 'text-red-500 hover:text-red-700 transition-colors',
        }}
        classNamePrefix='react-select'
        className='react-select-container'
        options={PROGRAMMING_LANGUAGE_DATA}
        placeholder='Select a language'
        onChange={onChange}
      />
    </form>
  );
}
