'use client'
import ClipLoader from 'react-spinners/ClipLoader';


const LoadingPage = () => {
    return ( 
        <div className='my-10'>
            <ClipLoader color="#36d7b7" 
                        cssOverride={
                            {
                                display: "block",
                                margin: "0 auto",
                                borderColor: "#60a5fa"
                            }
                        }
                        size={120}
                        aria-label='Loading Spinner'
            />
            <p className='text-2xl text-center text-blue-500 font-bod my-4'>Loading all data......</p>
        </div>
     );
}
 
export default LoadingPage;