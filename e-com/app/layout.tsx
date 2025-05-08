import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';



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
      </body>
    </html> );
}
 
export default RootLayout;