import Link from 'next/link';


const HomePage = () => {
    return ( 
        <div>
            <p className=''>Home Page</p>
            <Link href={{
                pathname: '/properties',
                query: { id: 1 }
            }}>Go To Properties</Link>
        </div>
     );
}
 
export default HomePage;