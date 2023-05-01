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
         const { data, loading } = await client.query<IPosts>({
            query: SEARCH_POST_QUERY,
            variables: {
               contains: searchInput,
            },
         });

         if (searchInput.length > 2) {
            search.setValue(data);
            search.setLoading(loading);
         }
         if (searchInput.length < 3) {
            search.setValue({});
         }
      };

      fetchData();
   }, [searchInput, setSearchInput]);

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
