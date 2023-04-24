import client from '@/graphqL/apollo';
import { GetServerSideProps } from 'next';
import { IPosts } from '@/types/contents';
import { GET_POST_QUERY } from '@/graphqL/query';
import Card from '@/components/Card';

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

export default function Home({ posts }: any) {
   console.log(posts);

   return (
      <div className='grid grid-cols-3 gap-4 text-gray-800'>
         {posts.map((post: any, index: number) => (
            <Card key={index} posts={post} />
         ))}
      </div>
   );
}

export const config = {
   runtime: 'nodejs',
};
