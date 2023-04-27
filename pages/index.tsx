import client from '@/graphqL/apollo';
import { GetServerSideProps } from 'next';
import { IPosts } from '@/types/contents';
import { GET_POST_QUERY } from '@/graphqL/query';
import Card from '@/components/Card';
import { useState } from 'react';
import Search from '@/components/Search';
import useSearchStore from '@/hooks/useSearchStore';
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
   res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
   );

   const { data } = await client.query<IPosts>({
      query: GET_POST_QUERY,
      variables: {
         page: 1,
         pageSize: 6,
      },
   });

   const posts = data.posts;

   return {
      props: {
         posts,
      },
   };
};

export default function Home({ posts: initialPost }: any) {
   const [posts, setPost] = useState(initialPost.data);
   const [page, setPage] = useState(1);
   const search = useSearchStore();
   const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js
   const totalPage = initialPost.meta.pagination.pageCount;
   const pageSize = 6;

   const scrollToTop = () => {
      if (!isBrowser()) return;
      window.scrollTo({ top: 0, behavior: 'smooth' });
   };

   const nextPosts = async () => {
      scrollToTop();
      if (page < totalPage) {
         setPage(page + 1);
         const { data } = await client.query({
            query: GET_POST_QUERY,
            variables: {
               page: page + 1,
               pageSize,
            },
         });
         const res = data.posts.data;
         console.log(page);
         setPost(res);
      }
   };
   const prevPosts = async () => {
      scrollToTop();
      if (page > 1) {
         setPage(page - 1);
         const { data } = await client.query({
            query: GET_POST_QUERY,
            variables: {
               page: page - 1,
               pageSize,
            },
         });
         const res = data.posts.data;
         console.log(page);
         setPost(res);
      }
   };
   const jumpPage = (page: number) => {
      if (page > 1 && page > 1) {
         setPage(page);
      }
   };

   return (
      <>
         <Head>
            <title>Dizzycoding</title>
         </Head>

         <div className='max-w-4xl flex flex-col mx-auto text-gray-200 mb-8'>
            {search.show ? <Search /> : null}
            <div className='grid grid-cols-3 gap-4'>
               {posts.map((post: any, index: number) => (
                  <Card key={index} posts={post} />
               ))}
            </div>
            <div className='mx-auto flex gap-2 mt-8'>
               <button
                  onClick={prevPosts}
                  type='button'
                  className='bg-slate-800 py-2 px-3 font-medium'
               >
                  PREV POSTS
               </button>
               <form className='flex gap-2 items-center' action=''>
                  <input
                     className='w-10 text-gray-300 p-2 text-center font-semibold text-lg bg-gray-600 focus:outline-none'
                     value={page}
                     type='text'
                     onChange={(e) => jumpPage(Number(e.target.value))}
                  />
                  of
                  <input
                     className='w-10 text-gray-400 p-2 text-center font-semibold text-lg bg-gray-700 focus:outline-none'
                     defaultValue={totalPage}
                     type='text'
                     readOnly
                  />
               </form>
               <button
                  type='button'
                  onClick={nextPosts}
                  className='bg-slate-800 py-2 px-3 font-medium'
               >
                  NEXT POSTS
               </button>
            </div>
         </div>
      </>
   );
}

export const config = {
   runtime: 'nodejs',
};
