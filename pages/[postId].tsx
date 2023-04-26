/* eslint-disable @next/next/no-img-element */
import client from '@/graphqL/apollo';
import { GET_POST_SINGLE_QUERY } from '@/graphqL/query';
import { IPostSingleAttributes, IPosts } from '@/types/contents';
import { GetServerSideProps } from 'next';
import Markdown from 'markdown-to-jsx';
import useSearchStore from '@/hooks/useSearchStore';
import Search from '@/components/Search';
import Link from 'next/link';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-tomorrow.css';
import Head from 'next/head';
import { useEffect } from 'react';

export const getServerSideProps: GetServerSideProps = async ({
   req,
   res,
   params,
}) => {
   res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
   );

   const { data } = await client.query<IPosts>({
      query: GET_POST_SINGLE_QUERY,
      variables: {
         slug: params?.postId,
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
      },
   };
};

const SingePost = ({ post }: any) => {
   const attributes: IPostSingleAttributes[] = post;
   const content = attributes[0].attributes;
   const search = useSearchStore();

   const backendUrl = process.env.NEXT_BACKEND_URL || 'http://127.0.0.1:1337';

   useEffect(() => {
      const highlight = async () => {
         await Prism.highlightAll(); // <--- prepare Prism
      };
      highlight(); // <--- call the async function
   }, [post]);

   return (
      <>
         <Head>
            <title>{content.Title}</title>
         </Head>
         {search.show ? (
            <div className='max-w-4xl mx-auto'>
               <Search />
            </div>
         ) : null}
         <div className='text-gray-600 max-w-4xl mx-auto bg-slate-100 overflow-hidden rounded-md mb-8'>
            <div className='relative w-full group'>
               <img
                  src={
                     backendUrl +
                     content.CoverImage.data.attributes.formats.medium.url
                  }
                  alt=''
                  className='w-full h-[300px] object-cover brightness-50 contrast-75'
               />
               <div className='absolute w-full text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  <h1 className='text-3xl drop-shadow-lg font-semibold capitalize group-hover:scale-105 transition duration-500 text-yellow-200'>
                     {content.Title}
                  </h1>
               </div>
            </div>

            <div className='p-6'>
               <div className='mb-4 text-gray-700 flex gap-2'>
                  {content.Categories.data.map((category, index) => (
                     <Link
                        className='lowercase'
                        key={index}
                        href={'/category/' + category.attributes.Slug}
                     >
                        {'#' + category.attributes.Name}
                     </Link>
                  ))}
               </div>

               <article className='prose-p:text-lg prose-p:mb-3 prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-3 prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-3 prose-pre:mb-3 prose-table:border-collapse prose-table:border prose-table:mb-3 prose-tr:border-collapse prose-th:p-3 prose-th:border-collapse prose-th:border prose-tr:border prose-td:border-collapse prose-td:border prose-td:p-3 prose-a:text-teal-500 prose-ul:mb-3 prose-ul:list-disc prose-li:list-inside prose-ol:list-decimal'>
                  <Markdown>{content.Content}</Markdown>
               </article>
            </div>
         </div>
      </>
   );
};

export default SingePost;

export const config = {
   runtime: 'nodejs',
};
