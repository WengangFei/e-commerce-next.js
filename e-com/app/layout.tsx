import '@/assets/styles/globals.css';
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
        <Navbar />
        <main>
          { children }
        </main>
        <Footer />
      </body>
    </html> );
}
 
export default RootLayout;