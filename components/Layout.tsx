import Footer from './Footer';
import Navbar from './Navbar';

interface IProps {
   children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
   return (
      <>
         <Navbar />
         <div className='flex flex-col lg:flex-row min-h-screen max-w-5xl mx-auto pt-[120px]'>
            <main className='w-full'>{children}</main>
         </div>
         <Footer />
      </>
   );
};

export default Layout;
