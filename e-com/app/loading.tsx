'use client'
import ClipLoader from 'react-spinners/ClipLoader';


const LoadingPage = () => {
    return ( 
        <div>
            <ClipLoader color="#36d7b7" 
                        cssOverride={
                            {
                                display: "block",
                                margin: "0 auto",
                                borderColor: "blue"
                            }
                        }
                        size={150}
                        aria-label='Loading Spinner'
            />
        </div>
     );
}
 
export default LoadingPage;