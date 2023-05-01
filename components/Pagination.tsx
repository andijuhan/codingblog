import { ChangeEvent } from 'react';

interface IPaginationProps {
   prevPosts: () => Promise<void>;
   nextPosts: () => Promise<void>;
   page: number;
   jumpPage: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
   totalPage: number;
}

const Pagination = ({
   prevPosts,
   jumpPage,
   page,
   totalPage,
   nextPosts,
}: IPaginationProps) => {
   return (
      <div className='mx-auto flex gap-2 mt-8'>
         <button
            onClick={prevPosts}
            type='button'
            className='bg-slate-800 py-2 px-3 font-medium rounded-lg'
         >
            PREV POSTS
         </button>
         <form className='flex gap-2 items-center' action=''>
            <input
               className='w-10 text-gray-300 p-2 text-center font-semibold text-lg bg-gray-600 focus:outline-none rounded-lg'
               value={page}
               type='text'
               onChange={(e) => jumpPage(e)}
            />
            of
            <input
               className='w-10 text-gray-400 p-2 text-center font-semibold text-lg bg-gray-700 focus:outline-none rounded-lg'
               defaultValue={totalPage}
               type='text'
               readOnly
            />
         </form>
         <button
            type='button'
            onClick={nextPosts}
            className='bg-slate-800 py-2 px-3 font-medium rounded-lg'
         >
            NEXT POSTS
         </button>
      </div>
   );
};

export default Pagination;
