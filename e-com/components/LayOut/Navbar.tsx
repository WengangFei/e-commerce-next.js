'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import logo from '@/assets/images/logo-white.png';
import Image from 'next/image';
import profileDefault from '@/assets/images/profile.png';
import Link from 'next/link';
import googleIcon from '@/assets/images/google_icon.png';
import { signOut, signIn, useSession, getProviders } from 'next-auth/react';
import { FaGithub } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import { fetchUnreadMessages } from '@/lib/queries/messages';





const Navbar = () => {

    const { data: session, status } = useSession();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const pathname = usePathname();
    const [providers, setProviders] = useState([]);
    // const [message, setMessage] = useState(0);
    const { data: unread_messages } = useQuery({
        queryKey: ['unreadMessages'],
        queryFn: fetchUnreadMessages,
        enabled: !!session,//only fetch if user is logged in
    })

    //get google provider
    useEffect(() => {
        (async () => {
            const res = (await getProviders());
            setProviders(res as any );
        })()
    },[]);


    return ( 
            <nav className="bg-blue-700 border-b border-blue-500">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-20 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                            {/* <!-- Mobile menu button--> */}
                            <button
                                type="button"
                                id="mobile-dropdown-button"
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                                onClick={()=>setMobileMenuOpen(prev => !prev)}
                            >
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="block h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div
                            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
                        >
                            {/* <!-- Logo --> */}
                            <Link className="flex flex-shrink-0 items-center" href={{
                                pathname:'/'
                            }}>
                                <Image
                                    className="h-10 w-auto"
                                    src={logo}
                                    alt="PropertyPulse"
                                />

                                <span className="hidden md:block text-white text-2xl font-bold ml-2">
                                    PropertyPulse
                                </span>
                            </Link>
                            {/* <!-- Desktop Menu Hidden below md screens --> */}
                            <div className="hidden md:ml-6 md:block">
                            <div className="flex space-x-2">
                                <Link
                                href="/"
                                className={`${ pathname === '/' ? 'bg-black' : ''} h-fit text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                                >
                                    Home
                                </Link>
                                <Link
                                href="/properties"
                                className={`${ pathname === '/properties' ? 'bg-black' : ''} h-fit text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                                >
                                    Properties
                                </Link>
                                {
                                    session && (
                                        <Link
                                            href="/properties/add"
                                            className={`${ pathname === '/properties/add' ? 'bg-black' : ''} h-fit text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                                            >
                                                Add Property
                                        </Link>
                                    )
                                }
                                
                            </div>
                            </div>
                        </div>

                        {/* <!-- Right Side Menu (Logged Out) --> */}
                        {
                            !session && (
                                <div className="hidden md:block md:ml-6 p-2">
                                    <Link href='/login'>
                                        <p 
                                        className='text-white bg-gray-700 mb-2 text-sm hover:bg-gray-900 hover:text-white hover:cursor-pointer rounded-md px-2 py-2 text-center'>
                                            Login or Register
                                        </p>
                                    </Link>
                                    <div className="flex items-center">
                                        {
                                            providers && (Object.values(providers).filter((provider) => (provider as any)?.name !== 'credentials')).map((provider) => (
                                                <div key={(provider as any)?.name}>
                                                    <button
                                                        className="flex items-center text-white bg-gray-700 text-[12px] hover:bg-gray-900 hover:text-white 
                                                        hover:cursor-pointer
                                                        rounded-md px-1 py-1 mx-1"
                                                        onClick={() => signIn((provider as any)?.id)}
                                                    >
                                                        {
                                                            (provider as any)?.name === 'Google' ? (
                                                                <Image 
                                                                    src={googleIcon }
                                                                    alt='google icon'
                                                                    className='w-4 h-4 mr-2 rounded-full'
                                                                />
                                                            ) : (
                                                                <FaGithub size={15} className='mr-1'/>
                                                            )
                                                        }
                                                        
                                                        <span>{(provider as any)?.name}</span>
                                                    </button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        }

                        {/* <!-- Right Side Menu (Logged In) --> */}
                        {
                            session && (
                                <div
                                className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0"
                                >
                            
                                    <Link href="/messages" className="relative group">
                                        <button
                                            type="button"
                                            className="relative mt-1 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="absolute -inset-1.5"></span>
                                            <span className="sr-only">View notifications</span>
                                            <svg
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                            >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                            />
                                            </svg>
                                            
                                        </button>
                                        <span
                                            className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
                                        >
                                            { unread_messages?.length > 0 && unread_messages.length || 0 }
                                        </span>
                                    </Link>
                                    {/* <!-- Profile dropdown button --> */}
                                    <div className="relative ml-3">
                                        <div>
                                            <button
                                                type="button"
                                                className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:cursor-pointer"
                                                id="user-menu-button"
                                                aria-expanded="false"
                                                aria-haspopup="true"
                                                onClick={()=>setProfileMenuOpen(prev => !prev)}
                                            >
                                                <span className="absolute -inset-1.5"></span>
                                                <span className="sr-only">Open user menu</span>
                                                <Image
                                                    className="h-8 w-8 rounded-full"
                                                    src={session?.user?.image || profileDefault}
                                                    alt="profile default image"
                                                    width={50}
                                                    height={50}
                                                    
                                                />
                                            </button>
                                        </div>
        
                                        {/* <!-- Profile dropdown --> */}
                                        { 
                                            isProfileMenuOpen && (
                                                <div
                                                id="user-menu"
                                                className="absolute right-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                role="menu"
                                                aria-orientation="vertical"
                                                aria-labelledby="user-menu-button"
                                            >
                                                <Link
                                                href="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-700 hover:text-white hover:rounded-md"
                                                role="menuitem"
                                                id="user-menu-item-0"
                                                onClick={()=>setProfileMenuOpen(prev => !prev)}
                                                >Your Profile</Link>
                                                <Link
                                                href="/properties/saved"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-700 hover:text-white hover:rounded-md"
                                                role="menuitem"
                                                id="user-menu-item-2"
                                                onClick={()=>setProfileMenuOpen(prev => !prev)}
                                                >Saved Properties</Link>
                                                <button
                                                className="block px-4 py-2 text-sm text-gray-700 
                                                hover:bg-red-700 hover:text-white hover:rounded-md"
                                                role="menuitem"
                                                
                                                id="user-menu-item-2"
                                                onClick={() => signOut()}
                                                >
                                                Sign Out
                                                </button>
                                            </div>
                                            )
                                        }
                                    
                                    </div>
                                       <button
                                        className="hidden md:block font-bold text-white bg-gray-700 text-[12px] hover:bg-gray-900 hover:text-white hover:cursor-pointer rounded-md px-1 py-1 ml-10"
                                        onClick={() => signOut()}

                                        >
                                            Sign Out
                                        </button>
                                </div>
                            )
                        }
                    
                        </div>
                    </div>

                {/* <!-- Mobile menu, show/hide based on menu state. --> */}
                { isMobileMenuOpen && (
                    <div id="mobile-menu" className='md:hidden'>
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            <Link
                                href="/"
                                className={`${ pathname === '/' ? 'bg-black' : ''} w-fit text-white block rounded-md px-3 py-2 text-base font-small`}
                                >
                                    Home
                            </Link>
                            <Link
                                href="/properties"
                                className={`${ pathname === '/properties' ? 'bg-black' : ''} w-fit text-white block rounded-md px-3 py-2 text-base font-medium`}
                                >
                                    Properties
                            </Link>
                            {
                                session && (
                                    <>
                                        <Link
                                            href="/properties/add"
                                            className={`${ pathname === '/properties/add' ? 'bg-black' : ''} w-fit text-white block rounded-md px-3 py-2 text-base font-medium`}
                                            >
                                                Add Property
                                        </Link>
                                        
                                        <button
                                        className="font-bold text-white bg-gray-700 text-[12px] hover:bg-gray-900 hover:text-white hover:cursor-pointer rounded-md px-1 py-1 ml-3"
                                        onClick={() => signOut()}

                                        >
                                            Sign Out
                                        </button>
                                        
                                        
                                    </>
                                )

                            }
                            
                            {
                                !session && (
                                    <div className="md:block md:ml-6 flex flex-col items-center">
                                        <div className="mr-auto">
                                            <Link href='/login'>
                                                <p 
                                                className='text-white bg-gray-700 mb-2 text-sm hover:bg-gray-900 hover:text-white hover:cursor-pointer rounded-md px-2 py-2 text-center'>
                                                    Login or Register
                                                </p>
                                            </Link>
                                            {
                                                providers && Object.values(providers).filter((provider) => (provider as any)?.name !== 'credentials').map((provider) => (
                                                    <div key={(provider as any).provider?.name}>
                                                        <button
                                                            className="flex items-center text-white bg-gray-700 text-[12px] hover:bg-gray-900 hover:text-white 
                                                            hover:cursor-pointer
                                                            rounded-md px-1 py-1 mx-1 my-1"
                                                            onClick={() => signIn((provider as any).id)}
                                                        >
                                                            Sign in with
                                                           
                                                            {
                                                                (provider as any)?.name === 'Google' ? (
                                                                    <Image 
                                                                        src={googleIcon}
                                                                        alt='google icon'
                                                                        className='w-4 h-4 mx-1 rounded-full'
                                                                    />
                                                                ) : (
                                                                    <FaGithub size={15} className='mx-1'/>
                                                                )
                                                            }
                                                            
                                                        </button>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            
                        </div>
                    </div>
                )}
                
            </nav>
     );
}
 
export default Navbar;