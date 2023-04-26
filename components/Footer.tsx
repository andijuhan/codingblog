import React from 'react';

const Footer = () => {
   return (
      <div className='w-full bg-slate-800 text-center py-4 text-gray-200 font-medium'>
         &copy; dizzycoding.io {new Date().getFullYear()} | Builds with Nextjs &
         Strapi
      </div>
   );
};

export default Footer;
