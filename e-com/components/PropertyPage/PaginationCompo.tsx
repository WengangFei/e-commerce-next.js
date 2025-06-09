import Link from "next/link";
import { GiPreviousButton } from "react-icons/gi";
import { GiNextButton } from "react-icons/gi";


const PaginationCompo = ({ page, total, pageSize }: { page: number, total: number, pageSize: number }) => {
    
    return ( 
        <section className='flex'>
            {
                page > 1 &&
                <Link href={`/properties?page=${page - 1}`} className="text-blue-400 hover:text-blue-600 flex items-center justify-center text-[10px] border border-gray-300 rounded-lg font-bold p-1 gap-1">
                    <GiPreviousButton /> 
                    Previous Page
                </Link>
            }
            
            <span className='text-[12px] font-bold mx-3 p-1'>Page {page} of {Math.ceil(total / pageSize)}</span>
            {
                page < Math.ceil(total / pageSize) &&
                <Link href={`/properties?page=${page + 1}`} className="text-blue-400 hover:text-blue-600 flex items-center justify-center text-[10px] border border-gray-300 rounded-lg font-bold p-1 gap-1">
                    Next page
                    <GiNextButton />
                </Link>
            }
            
        </section>
     );
}
 
export default PaginationCompo;