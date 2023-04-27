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
         <div className='text-gray-300 max-w-4xl mx-auto bg-slate-800 mb-4'>
            <div className='p-6'>
               <h1 className='text-3xl font-semibold capitalize mb-8'>
                  {content.Title}
               </h1>
               <div className='mb-2 text-gray-300 flex gap-2'>
                  {content.Categories.data.map((category, index) => (
                     <Link
                        className='lowercase underline'
                        key={index}
                        href={'/category/' + category.attributes.Slug}
                     >
                        {'#' + category.attributes.Name}
                     </Link>
                  ))}
               </div>

               <article className='prose-p:text-lg prose-p:mb-3 prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-3 prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-3 prose-pre:mb-3 prose-table:border-collapse prose-table:border prose-table:mb-3 prose-tr:border-collapse prose-th:p-3 prose-th:border-collapse prose-th:border prose-tr:border prose-td:border-collapse prose-td:border prose-td:p-3 prose-a:text-violet-400 prose-ul:mb-3 prose-ul:list-disc prose-li:list-inside prose-ol:list-decimal'>
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
