import client from '@/graphqL/apollo';
import { GET_POST_SINGLE_QUERY } from '@/graphqL/query';
import { IPostAttributes, IPosts } from '@/types/contents';
import { GetServerSideProps } from 'next';

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
         slug: params.postId,
      },
   });

   const post = data?.posts?.data;

   return {
      props: {
         post,
      },
   };
};

const SingePost = ({ post }: any) => {
   const attributes: IPostAttributes[] = post;
   const content = attributes[0].attributes;
   console.log(content);
   return <div>{content.Title}</div>;
};

export default SingePost;

export const config = {
   runtime: 'nodejs',
};
