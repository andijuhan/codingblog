/* eslint-disable @next/next/no-img-element */

import useDrawerStore from '@/hooks/useDrawerStore';
import useSearchStore from '@/hooks/useSearchStore';
import Link from 'next/link';
import { BsSearch } from 'react-icons/bs';
import { FaChevronLeft } from 'react-icons/fa';
import Search from './Search';
import { motion } from 'framer-motion';

const Navbar = () => {
   const search = useSearchStore();
   const drawer = useDrawerStore();

   return (
      <header className='w-full'>
         <nav className='fixed min-h-[80px] py-2 px-4 w-full text-lg font-medium bg-violet-700 text-gray-100 shadow-md z-30 flex justify-center items-center'>
            <div className='flex justify-between gap-5 items-center w-full lg:w-[1024px]'>
               <div className='flex gap-4 justify-start items-center'>
                  <FaChevronLeft
                     size={20}
                     className={`mr-4 cursor-pointer ${
                        drawer.show ? 'rotate-180' : ''
                     } transition duration-300`}
                     onClick={drawer.toggle}
                  />
                  {search.show ? null : (
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: 'spring', duration: 1 }}
                        className='flex gap-3'
                     >
                        <Link href='/'>
                           <h1 className='text-2xl'>DizzyCoding</h1>
                        </Link>
                     </motion.div>
                  )}
               </div>
               <div className='flex gap-4 items-center justify-end w-full'>
                  <Search />
                  <BsSearch
                     className='cursor-pointer hover:scale-105 mr-4 lg:mr-0'
                     size={25}
                     onClick={search.toggle}
                  />
               </div>
            </div>
         </nav>
      </header>
   );
};

export default Navbar;
