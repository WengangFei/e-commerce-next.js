import Link from "next/link";


type Props = {
    title: string,
    description: string,
    buttonContent: string,
    bgColor: string,
    buttonColor: string,
    link: string,
}



const SingleInforBox = ({ property }: { property: Props }) => {
    return ( 
        <div className={`${property.bgColor} p-8 rounded-lg mt-8`}>
            <p className='text-xl font-bold sm:text-2xl'>{ property.title }</p> 
            <p className="my-2 text-xs sm:text-xl">{ property.description }</p> 
            <Link 
            href={ property.link }
            className={`${property.buttonColor} p-2 rounded-lg text-white mt-4 text-xs sm:text-sm hover:cursor-pointer hover:bg-gray-700`}>
                { property.buttonContent }
            </Link>
        </div>
     );
}
 
export default SingleInforBox;