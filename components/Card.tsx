/* eslint-disable @next/next/no-img-element */
import { IPostAttributes } from '@/types/contents';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface ICard {
   posts: IPostAttributes;
}

const Card = ({ posts }: ICard) => {
   const [blur, setBlur] = useState(true);
   const router = useRouter();
   const backendUrl = process.env.NEXT_BACKEND_URL || 'http://127.0.0.1:1337';

   useEffect(() => {
      setTimeout(() => {
         setBlur(false);
      }, 300);
   }, []);

   return (
      <div className='flex flex-col w-full items-center group'>
         <div
            className='w-full overflow-hidden cursor-pointer rounded-lg'
            onClick={() => router.push(posts.attributes.slug)}
         >
            <img
               className={`w-full h-[200px] object-center object-cover scale-125 group-hover:scale-150 transition duration-300 ${
                  blur ? 'blur-lg' : ''
               }`}
               src={
                  backendUrl +
                  posts.attributes.CoverImage.data.attributes.formats.small.url
               }
               alt=''
               placeholder='/images/img-placeholder.png'
            />
         </div>
         <div className='w-full mt-6'>
            <Link href={posts.attributes.slug}>
               <h2 className='font-medium text-xl text-gray-300 capitalize line-clamp-2'>
                  {posts.attributes.Title}
               </h2>
            </Link>
            <p className='line-clamp-2 text-lg mt-4 mb-6 opacity-70'>
               {posts.attributes.Excerp}
            </p>
         </div>
      </div>
   );
};

export default Card;
