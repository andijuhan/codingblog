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
   });

   const posts = data.posts.data;

   return {
      props: {
         posts,
      },
   };
};

export default function Home({ posts: initialPost }: any) {
   const [posts, setPost] = useState(initialPost);
   const search = useSearchStore();

   return (
      <>
         <Head>
            <title>Dizzycoding</title>
         </Head>

         <div className='max-w-4xl mx-auto text-gray-800 mb-8'>
            {search.show ? <Search /> : null}
            <div className='grid grid-cols-3 gap-4'>
               {posts.map((post: any, index: number) => (
                  <Card key={index} posts={post} />
               ))}
            </div>
         </div>
      </>
   );
}

export const config = {
   runtime: 'nodejs',
};
