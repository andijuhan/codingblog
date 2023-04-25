/* eslint-disable @next/next/no-img-element */

import useSearchStore from '@/hooks/useSearchStore';
import Link from 'next/link';
import { BsSearch } from 'react-icons/bs';
import { FaChevronLeft } from 'react-icons/fa';

const Navbar = () => {
   const search = useSearchStore();

   return (
      <header className='bg-neutral-50 w-full'>
         <nav className='fixed py-3 w-full text-lg bg-teal-500 text-white shadow-md'>
            <div className='flex justify-between items-center max-w-5xl mx-auto'>
               <div className='flex gap-4 justify-center items-center'>
                  <FaChevronLeft size={20} className='mr-4' />
                  <Link href='/'>
                     <img
                        className='w-14 h-14 object-cover rounded-full cursor-pointer'
                        src='/images/profile.jpg'
                        alt=''
                     />
                  </Link>

                  <div>
                     <h1 className='text-2xl font-medium'>Andi Juhandi</h1>
                  </div>
               </div>
               <div className='flex gap-4 items-center'>
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
