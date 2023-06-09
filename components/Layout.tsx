import useDrawerStore from '@/hooks/useDrawerStore';
import Drawer from './Drawer';
import Footer from './Footer';
import Navbar from './Navbar';

interface IProps {
   children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
   const drawer = useDrawerStore();

   return (
      <>
         <Navbar />
         <div className='flex flex-col lg:flex-row min-h-screen max-w-5xl mx-auto pt-[90px]'>
            <main className='w-full'>{children}</main>
         </div>
         <Drawer />
         <Footer />
      </>
   );
};

export default Layout;
