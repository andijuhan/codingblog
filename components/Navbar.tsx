/* eslint-disable @next/next/no-img-element */

import useDrawerStore from '@/hooks/useDrawerStore';
import useSearchStore from '@/hooks/useSearchStore';
import Link from 'next/link';
import { BsSearch } from 'react-icons/bs';
import { FaChevronLeft } from 'react-icons/fa';
import { VscSourceControl } from 'react-icons/vsc';

const Navbar = () => {
   const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js
   const search = useSearchStore();
   const drawer = useDrawerStore();

   const scrollToTop = () => {
      if (!isBrowser()) return;
      window.scrollTo({ top: 0, behavior: 'smooth' });
   };

   return (
      <header className='bg-neutral-50 w-full'>
         <nav className='fixed py-4 w-full text-lg bg-teal-500 text-white shadow-md z-30'>
            <div className='flex justify-between items-center max-w-5xl mx-auto'>
               <div className='flex gap-4 justify-center items-center'>
                  <FaChevronLeft
                     size={20}
                     className={`mr-4 cursor-pointer ${
                        drawer.show ? 'rotate-180' : ''
                     } transition duration-300`}
                     onClick={drawer.toggle}
                  />
                  <Link href='/' className='flex gap-3'>
                     <VscSourceControl size={30} />
                     <h1 className='text-2xl'>Dizzycoding</h1>
                  </Link>
               </div>
               <div className='flex gap-4 items-center'>
                  <BsSearch
                     className='cursor-pointer hover:scale-105 mr-4 lg:mr-0'
                     size={25}
                     onClick={() => {
                        search.toggle();
                        scrollToTop();
                     }}
                  />
               </div>
            </div>
         </nav>
      </header>
   );
};

export default Navbar;
