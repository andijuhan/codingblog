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
            className='w-full rounded-lg px-6 py-4 bg-slate-50 focus:outline-2 focus:outline-teal-200'
            type='search'
            placeholder='Search post...'
            onChange={(e) => searchandler(e)}
         />
      </div>
   );
};

export default Search;
