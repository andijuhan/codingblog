import client from '@/graphqL/apollo';
import { GET_SITE_SETTING_QUERY } from '@/graphqL/query';
import { GetServerSideProps } from 'next';

const generateSiteMap = (frontEndUrl: string) => {
   return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
        <loc>${`${frontEndUrl}/`}</loc>
        <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${`${frontEndUrl}/post-sitemap.xml`}</loc>
        <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${`${frontEndUrl}/category-sitemap.xml`}</loc>
        <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
    </url>
   </urlset>
 `;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
   res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
   );

   const { data } = await client.query({
      query: GET_SITE_SETTING_QUERY,
   });

   const frontEndUrl = data.setting.data.attributes.FrontEndUrl;

   const sitemap = generateSiteMap(frontEndUrl);

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
