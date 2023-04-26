/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { BsLinkedin, BsGithub, BsTiktok } from 'react-icons/bs';

const Drawer = () => {
   return (
      <div className='w-[300px] bg-slate-900 h-screen fixed inset-0 z-40 shadow-xl shadow-slate-800 text-gray-200'>
         <div className='flex gap-4 items-center mb-8 py-3 bg-slate-950 px-8'>
            <Link href='/'>
               <img
                  className='w-12 h-12 object-cover rounded-full cursor-pointer'
                  src='/images/profile.jpg'
                  alt=''
               />
            </Link>
            <div>
               <h1 className='text-xl font-medium'>Andi Juhandi</h1>
            </div>
         </div>
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
               <Link className='bg-slate-700 rounded-lg py-1 px-2' href='/'>
                  Nextjs
               </Link>
               <Link className='bg-slate-700 rounded-lg py-1 px-2' href='/'>
                  Strapi
               </Link>
               <Link className='bg-slate-700 rounded-lg py-1 px-2' href='/'>
                  Graphql
               </Link>
               <Link className='bg-slate-700 rounded-lg py-1 px-2' href='/'>
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
      </div>
   );
};

export default Drawer;
