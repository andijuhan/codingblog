import client from '@/graphqL/apollo';
import { GET_POST_SLUGS, GET_SITE_SETTING } from '@/graphqL/query';
import { GetServerSideProps } from 'next';

const generateSiteMap = (posts: any, frontEndUrl: string) => {
   console.log(posts[0].attributes.slug);
   return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${posts
        .map((post: any) => {
           return `
       <url>
           <loc>${`${frontEndUrl}/${post.attributes.slug}`}</loc>
           <lastmod>${post.attributes.updatedAt.slice(0, 10)}</lastmod>
           <changefreq>monthly</changefreq>
            <priority>1.0</priority>
       </url>
     `;
        })
        .join('')}
   </urlset>
 `;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
   res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
   );

   const { data: setting } = await client.query({
      query: GET_SITE_SETTING,
   });

   const frontEndUrl = setting.setting.data.attributes.FrontEndUrl;

   const { data } = await client.query({
      query: GET_POST_SLUGS,
   });

   const posts = data.posts.data;

   const sitemap = generateSiteMap(posts, frontEndUrl);

   res.setHeader('Content-Type', 'text/xml');
   // we send the XML to the browser
   res.write(sitemap);
   res.end();

   return {
      props: {},
   };
};

const SiteMap = () => {
   // getServerSideProps will do the heavy lifting
};

export default SiteMap;
