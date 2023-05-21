import client from '@/graphqL/apollo';
import { SEARCH_POST_QUERY } from '@/graphqL/query';
import useSearchStore from '@/hooks/useSearchStore';
import { ChangeEvent, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useDebounce from '@/hooks/useDebounce';

const Search = () => {
   const [searchTerm, setSearchTerm] = useState('');
   const debounceSearchTerm = useDebounce(searchTerm, 1000);

   const search = useSearchStore();
   const [show, setShow] = useState<boolean>(false);

   const searchandler = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
   };

   useEffect(() => {
      setShow(search.show);
   }, [search.show]);

   useEffect(() => {
      const fetchData = async () => {
         const { data } = await client.query({
            query: SEARCH_POST_QUERY,
            variables: {
               contains: debounceSearchTerm,
            },
         });

         if (debounceSearchTerm.length > 2) {
            search.setValue(data);
         }
         if (debounceSearchTerm.length === 0) {
            search.setValue({});
         }
      };

      fetchData();
   }, [debounceSearchTerm]);

   return (
      <AnimatePresence mode='wait'>
         {show ? (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ type: 'spring', duration: 0.7 }}
               className='flex flex-col w-full gap-2'
            >
               <div>
                  <input
                     className='w-full px-6 py-3 text-lg text-gray-200 placeholder-gray-200 rounded-lg bg-violet-500 focus:outline-none'
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
