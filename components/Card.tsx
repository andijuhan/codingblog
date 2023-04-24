/* eslint-disable @next/next/no-img-element */
import { IPostAttributes } from '@/types/contents';
import Link from 'next/link';

interface ICard {
   posts: IPostAttributes;
}

const Card = ({ posts }: ICard) => {
   const backendUrl = process.env.NEXT_BACKEND_URL || 'http://127.0.0.1:1337';
   return (
      <Link href={posts.attributes.slug}>
         <div className='min-h-[200px] shadow-lg rounded-md'>
            <img
               className='w-full h-[150px] object-cover rounded-tl-md rounded-tr-md'
               src={
                  backendUrl +
                  posts.attributes.CoverImage.data.attributes.formats.thumbnail
                     .url
               }
               alt=''
            />

            <div className='p-4'>
               <h2 className='font-semibold text-lg line-clamp-2'>
                  {posts.attributes.Title}
               </h2>
               <p className='line-clamp-2 mt-2'>{posts.attributes.Excerp}</p>
            </div>
         </div>
      </Link>
   );
};

export default Card;
