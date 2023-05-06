import client from '@/graphqL/apollo';
import {
   GET_CATEGORY_SLUG,
   GET_POST_SLUGS,
   GET_SITE_SETTING,
} from '@/graphqL/query';
import { GetServerSideProps } from 'next';

const generateSiteMap = (categories: any, frontEndUrl: string) => {
   console.log(categories[0].attributes.Slug);
   return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${categories
        .map((category: any) => {
           return `
       <url>
           <loc>${`${frontEndUrl}/category/${category.attributes.Slug}`}</loc>
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
      query: GET_CATEGORY_SLUG,
   });

   const categories = data.categories.data;

   const sitemap = generateSiteMap(categories, frontEndUrl);

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
