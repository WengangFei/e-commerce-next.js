import '@/assets/styles/globals.css';
import AuthProvider from '@/components/AuthProvider';
import Footer from '@/components/LayOut/Footer';
import Navbar from '@/components/LayOut/Navbar';




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
        <AuthProvider>
          <Navbar />
          <main className='pb-24'>
            { children }
          </main>
          <Footer />
        </AuthProvider>  
      </body>
    </html> 
    
  );
}
 
export default RootLayout;