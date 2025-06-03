import '@/assets/styles/globals.css';
import AuthProvider from '@/components/AuthProvider';
import Footer from '@/components/LayOut/Footer';
import Navbar from '@/components/LayOut/Navbar';
import QueryProviders from '@/components/QueryProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const metadata = {
  title: 'E-Commerce',
  description: 'E-Commerce',
  keywords: 'E-Commerce',
  icons: {
    icon: '/favicon.ico',
  }
}



const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return ( 
    
    <html>
      <body>
        <QueryProviders>
          <AuthProvider>
            <ToastContainer />
            <Navbar />
            <main className='pb-24'>
              { children }
            </main>
            <Footer />
          </AuthProvider>  
        </QueryProviders>
      </body>
    </html> 
    
  );
}
 
export default RootLayout;