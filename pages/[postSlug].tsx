/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-img-element */
import client from '@/graphqL/apollo';
import { GET_POST_SINGLE_QUERY, GET_SITE_SETTING_QUERY } from '@/graphqL/query';
import { GetServerSideProps } from 'next';
import Markdown from 'markdown-to-jsx';
import useSearchStore from '@/hooks/useSearchStore';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Card from '@/components/Card';
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

   const { data: settingData } = await client.query({
      query: GET_SITE_SETTING_QUERY,
   });

   const setting = settingData.setting.data.attributes;

   const { data } = await client.query({
      query: GET_POST_SINGLE_QUERY,
      variables: {
         slug: params?.postSlug,
      },
   });

   const post = data?.posts?.data;

   if (!post.length) {
      return {
         notFound: true,
      };
   }

   return {
      props: {
         post,
         setting,
      },
   };
};

const SingePost = ({ post, setting }: any) => {
   const [posts, setPost] = useState([]);
   const content = post[0].attributes;
   const search = useSearchStore();
   const router = useRouter();

   useEffect(() => {
      search.setValue({});
   }, [post]);

   useEffect(() => {
      const script = document.createElement('script');
      script.src = '/prism/prism.js';
      script.async = true;
      document.body.appendChild(script);

      if (Object.keys(search.value).length > 0) {
         setPost(search.value?.posts?.data);
      }
      if (Object.keys(search.value).length === 0) {
         setPost([]);
      }

      return () => {
         document.body.removeChild(script);
      };
   }, [search.value, router.asPath]);

   return (
      <>
         <Head>
            <title>{content.Title + ' - ' + setting.SiteTitle}</title>
         </Head>

         {posts.length === 0 ? (
            <div className='max-w-4xl px-5 mx-auto mb-4 text-gray-300 lg:px-0'>
               <div className='py-6'>
                  <h1 className='mb-8 text-3xl font-semibold capitalize'>
                     {content.Title}
                  </h1>
                  <div className='flex gap-2 mb-2 text-gray-300'>
                     {content.Categories.data.map(
                        (category: any, index: number) => (
                           <Link
                              className='text-gray-200 lowercase'
                              key={index}
                              href={'/category/' + category.attributes.Slug}
                           >
                              {'#' + category.attributes.Name}
                           </Link>
                        )
                     )}
                  </div>

                  <article className='prose-p:leading-loose prose-p:tracking-wide prose-p:text-lg prose-p:mb-3 prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-3 prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-3 prose-pre:mb-3 prose-table:border-collapse prose-table:border prose-table:mb-3 prose-tr:border-collapse prose-th:p-3 prose-th:border-collapse prose-th:border prose-tr:border prose-td:border-collapse prose-td:border prose-td:p-3 prose-a:text-violet-400 prose-ul:mb-3 prose-ul:list-disc prose-li:list-inside prose-ol:list-decimal'>
                     <Markdown>{content.Content}</Markdown>
                  </article>
               </div>
            </div>
         ) : null}

         {posts.length > 0 ? (
            <div className='grid max-w-4xl grid-cols-1 gap-6 px-5 mx-auto mt-2 sm:grid-cols-2 lg:grid-cols-3 lg:px-0'>
               {posts.length > 0 &&
                  posts.map((post: any, index: number) => (
                     <Card key={index} post={post} />
                  ))}
            </div>
         ) : null}
      </>
   );
};

export default SingePost;

export const config = {
   runtime: 'nodejs',
};
