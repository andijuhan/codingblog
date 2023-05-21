import Card from '@/components/Card';
import Pagination from '@/components/Pagination';
import client from '@/graphqL/apollo';
import { GET_POSTS_BY_CATEGORY_QUERY } from '@/graphqL/query';
import useSearchStore from '@/hooks/useSearchStore';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ChangeEvent, useEffect, useState } from 'react';

export const getServerSideProps: GetServerSideProps = async ({
   req,
   res,
   params,
}) => {
   res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
   );

   const slug = params?.categorySlug;

   const { data } = await client.query({
      query: GET_POSTS_BY_CATEGORY_QUERY,
      variables: {
         slug,
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
         slug,
      },
   };
};

const Category = ({ posts: initialPost, slug }: any) => {
   const search = useSearchStore();
   const [posts, setPost] = useState(initialPost.data);
   const [page, setPage] = useState(1);
   const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js
   const totalPage = initialPost.meta.pagination.pageCount;
   const pageSize = 6;

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
               slug: slug,
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
               slug: slug,
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
               slug: slug,
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
   }, [slug]);

   return (
      <>
         <Head>
            <title>{`Category - ${slug}`}</title>
         </Head>

         <div className='flex flex-col max-w-4xl px-5 mx-auto mb-8 text-gray-200 lg:px-0'>
            <div className='grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3'>
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
