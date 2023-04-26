/* eslint-disable @next/next/no-img-element */
import { IPostAttributes } from '@/types/contents';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface ICard {
   posts: IPostAttributes;
}

const Card = ({ posts }: ICard) => {
   const router = useRouter();
   const backendUrl = process.env.NEXT_BACKEND_URL || 'http://127.0.0.1:1337';

   return (
      <div className='flex flex-row w-full items-center shadow-lg bg-slate-100 group rounded-lg overflow-hidden'>
         <div
            className='w-[400px] overflow-hidden cursor-pointer'
            onClick={() => router.push(posts.attributes.slug)}
         >
            <img
               className='w-[400px] object-cover scale-100 group-hover:scale-125 transition duration-500'
               src={
                  backendUrl +
                  posts.attributes.CoverImage.data.attributes.formats.thumbnail
                     .url
               }
               alt=''
            />
         </div>

         <div className='px-6 w-full'>
            <Link href={posts.attributes.slug}>
               <h2 className='font-medium text-xl text-gray-600 capitalize line-clamp-2'>
                  {posts.attributes.Title}
               </h2>
            </Link>
            <p className='line-clamp-2 text-lg mt-4 opacity-80'>
               {posts.attributes.Excerp}
            </p>
         </div>
      </div>
   );
};

export default Card;
