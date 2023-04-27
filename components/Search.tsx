import useSearchStore from '@/hooks/useSearchStore';
import { ChangeEvent, useState } from 'react';

const Search = () => {
   const search = useSearchStore();

   const searchandler = (e: ChangeEvent<HTMLInputElement>) => {
      search.setValue(e.target.value);
   };

   return (
      <div>
         <input
            className='w-full px-6 py-4 mb-4 text-lg bg-slate-500 focus:outline-none'
            type='search'
            placeholder='Search post...'
            onChange={(e) => searchandler(e)}
         />
      </div>
   );
};

export default Search;
