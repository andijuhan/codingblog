import client from '@/graphqL/apollo';
import { SEARCH_POST_QUERY } from '@/graphqL/query';
import useSearchStore from '@/hooks/useSearchStore';
import { IPosts } from '@/types/contents';
import { ChangeEvent, useEffect, useState } from 'react';

const Search = () => {
   const [searchInput, setSearchInput] = useState<string>('');
   const search = useSearchStore();

   const searchandler = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
   };

   useEffect(() => {
      const fetchData = async () => {
         const { data } = await client.query<IPosts>({
            query: SEARCH_POST_QUERY,
            variables: {
               contains: searchInput,
            },
         });

         if (searchInput.length > 2) {
            search.setValue(data);
         }
         if (searchInput.length < 3) {
            search.setValue({});
         }
      };

      if (searchInput.length > 0) {
         fetchData();
      }
   }, [searchInput]);

   return (
      <div className='flex flex-col gap-2'>
         <div>
            <input
               className='w-full px-6 py-3 mb-4 text-lg bg-slate-500 focus:outline-none rounded-lg'
               type='search'
               placeholder='Search post...'
               onChange={(e) => searchandler(e)}
            />
         </div>
      </div>
   );
};

export default Search;
