import Card from '@/components/Card';
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
import client from '@/graphqL/apollo';
import { GET_POSTS_BY_CATEGORY_QUERY } from '@/graphqL/query';
import useSearchStore from '@/hooks/useSearchStore';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async ({
   req,
   res,
   params,
}) => {
   res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
   );

   const { data } = await client.query({
      query: GET_POSTS_BY_CATEGORY_QUERY,
      variables: {
         slug: params?.categorySlug,
         page: 1,
         pageSize: 6,
      },
   });

   const posts = data.posts;

   if (!data.posts.data.length) {
      return {
         notFound: true,
      };
   }

   return {
      props: {
         posts,
      },
   };
};

const Category = ({ posts: initialPost }: any) => {
   const search = useSearchStore();
   const [posts, setPost] = useState(initialPost.data);
   const [page, setPage] = useState(1);
   const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js
   const totalPage = initialPost.meta.pagination.pageCount;
   const pageSize = 6;
   const router = useRouter();

   const scrollToTop = () => {
      if (!isBrowser()) return;
      window.scrollTo({ top: 0, behavior: 'smooth' });
   };

   const nextPosts = async () => {
      scrollToTop();
      if (page > 0 && page < totalPage) {
         setPage(page + 1);
         const { data } = await client.query({
            query: GET_POSTS_BY_CATEGORY_QUERY,
            variables: {
               slug: router.query.categorySlug,
               page: page + 1,
               pageSize,
            },
         });
         const res = data.posts.data;

         setPost(res);
      }
   };
   const prevPosts = async () => {
      scrollToTop();
      if (page > 1 && page <= totalPage) {
         setPage(page - 1);
         const { data } = await client.query({
            query: GET_POSTS_BY_CATEGORY_QUERY,
            variables: {
               slug: router.query.categorySlug,
               page: page - 1,
               pageSize,
            },
         });
         const res = data.posts.data;
         setPost(res);
      }
   };
   const jumpPage = async (e: ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      if (val >= 0 && val <= totalPage) {
         setPage(val);
         const { data } = await client.query({
            query: GET_POSTS_BY_CATEGORY_QUERY,
            variables: {
               slug: router.query.categorySlug,
               page: val,
               pageSize,
            },
         });
         const res = data.posts.data;

         setPost(res);
         scrollToTop();
      }
   };

   useEffect(() => {
      if (Object.keys(search.value).length > 0) {
         if (search.value?.posts?.data?.length > 0) {
            setPost(search.value?.posts?.data);
         }
      }

      if (Object.keys(search.value).length === 0) {
         setPost(initialPost.data);
      }
   }, [search.value]);

   useEffect(() => {
      setPost(initialPost.data);
   }, []);

   return (
      <>
         <Head>
            <title>Category - {router.query.categorySlug}</title>
         </Head>

         <div className='max-w-4xl flex flex-col mx-auto text-gray-200 mb-8'>
            {search.show ? <Search /> : null}
            <div className='grid grid-cols-3 gap-6 mt-6'>
               {posts?.map((post: any, index: number) => (
                  <Card key={index} post={post} />
               ))}
            </div>
            {Object.keys(search.value).length === 0 ? (
               <Pagination
                  prevPosts={prevPosts}
                  jumpPage={jumpPage}
                  page={page}
                  totalPage={totalPage}
                  nextPosts={nextPosts}
               />
            ) : null}
         </div>
      </>
   );
};

export default Category;
