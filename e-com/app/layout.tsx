import '@/assets/styles/globals.css';



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
        <main>
          { children }
        </main>
      </body>
    </html> );
}
 
export default RootLayout;