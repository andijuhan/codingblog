/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsLinkedin, BsGithub, BsTiktok } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import useDrawerStore from '@/hooks/useDrawerStore';

const Drawer = () => {
   const drawer = useDrawerStore();
   const [show, setShow] = useState<boolean>(false);

   useEffect(() => {
      setShow(drawer.show);
   }, [drawer.show]);

   return (
      <AnimatePresence>
         {show ? (
            <motion.div
               initial={{ x: '-100vw' }}
               animate={{ x: '-2vw' }}
               exit={{ x: '-100vw' }}
               transition={{ type: 'spring', duration: 0.7, bounce: 0.2 }}
               className='w-[310px] bg-slate-800 h-screen fixed inset-0 z-40 shadow-xl text-gray-200 pl-10'
            >
               <div className='flex gap-4 items-center py-4 px-8'>
                  <Link href='/'>
                     <img
                        className='w-12 h-12 object-cover rounded-full cursor-pointer ring-4 ring-violet-500'
                        src='/images/profile.jpg'
                        alt=''
                     />
                  </Link>
                  <div>
                     <h1 className='text-xl font-medium'>Juhandi</h1>
                  </div>
               </div>
               <hr className='h-px bg-slate-700 border-0 w-full mb-8' />
               <div className='px-8'>
                  <div className='text-xl font-medium'>Pages</div>
                  <div className='flex flex-col gap-6 mb-10 mt-6 ml-4 text-lg text-gray-300'>
                     <Link href='/'>Home</Link>
                     <Link href='/'>Projects</Link>
                     <Link href='/'>About</Link>
                     <Link href='/'>Contact</Link>
                  </div>
                  <div className='text-xl font-medium'>Categories</div>
                  <div className='flex flex-wrap gap-3 mt-6 ml-4 mb-10'>
                     <Link
                        className='bg-slate-700 rounded-lg py-1 px-2'
                        href='/'
                     >
                        Nextjs
                     </Link>
                     <Link
                        className='bg-slate-700 rounded-lg py-1 px-2'
                        href='/'
                     >
                        Strapi
                     </Link>
                     <Link
                        className='bg-slate-700 rounded-lg py-1 px-2'
                        href='/'
                     >
                        Graphql
                     </Link>
                     <Link
                        className='bg-slate-700 rounded-lg py-1 px-2'
                        href='/'
                     >
                        Prisma
                     </Link>
                  </div>
                  <div className='text-xl font-medium'>Social</div>
                  <div className='flex items-center gap-4 mt-6 ml-4'>
                     <BsLinkedin size={25} />
                     <BsGithub size={25} />
                     <BsTiktok size={25} />
                  </div>
               </div>
            </motion.div>
         ) : null}
      </AnimatePresence>
   );
};

export default Drawer;
