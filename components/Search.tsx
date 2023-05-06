import client from '@/graphqL/apollo';
import { SEARCH_POST_QUERY } from '@/graphqL/query';
import useSearchStore from '@/hooks/useSearchStore';
import { IPosts } from '@/types/contents';
import { ChangeEvent, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Search = () => {
   const [searchInput, setSearchInput] = useState<string>('');
   const search = useSearchStore();
   const [show, setShow] = useState<boolean>(false);

   const searchandler = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
   };

   useEffect(() => {
      setShow(search.show);
   }, [search.show]);

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
      <AnimatePresence mode='wait'>
         {show ? (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ type: 'spring', duration: 0.7 }}
               className='flex flex-col gap-2 w-full'
            >
               <div>
                  <input
                     className='w-full px-6 py-3 text-lg bg-violet-500 text-gray-200 placeholder-gray-200 focus:outline-none rounded-lg'
                     type='search'
                     placeholder='Search post...'
                     onChange={(e) => searchandler(e)}
                  />
               </div>
            </motion.div>
         ) : null}
      </AnimatePresence>
   );
};

export default Search;
