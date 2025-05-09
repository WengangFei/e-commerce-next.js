import logo from '@/assets/images/logo.png';
import Image from 'next/image';

const Footer = () => {
    const year = new Date().getFullYear();
    return ( 
        <div className="bg-gray-200 fixed bottom-0 w-full text-center text-xs font-bold p-2 flex gap-8 items-center justify-center sm:text-sm sm:p-4">
            <Image src={logo} alt="logo" className="h-4 w-auto sm:h-6"/>
            <p>
                 Rental Properties. 
            </p>
            <p className='text-gray-400 text-[10px]'>
            © { year } Fei's Rental Properties. All rights reserved
            </p>
        </div> 
    );
}
 
export default Footer;