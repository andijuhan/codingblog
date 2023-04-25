import client from '@/graphqL/apollo';
import { GetServerSideProps } from 'next';
import { IPosts } from '@/types/contents';
import { GET_POST_QUERY } from '@/graphqL/query';
import Card from '@/components/Card';
import { useState } from 'react';
import Search from '@/components/Search';
import useSearchStore from '@/hooks/useSearchStore';

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
   console.log(search.value);

   return (
      <div className='max-w-4xl mx-auto grid grid-rows gap-4 text-gray-800'>
         {search.show ? <Search /> : null}
         <h2 className='text-2xl font-medium'>
            {search.value.length === 0 ? 'Latest Post' : 'Search result'}
         </h2>
         {posts.map((post: any, index: number) => (
            <Card key={index} posts={post} />
         ))}
      </div>
   );
}

export const config = {
   runtime: 'nodejs',
};
