
import SingleInforBox from "./SingleInforBox";

const InforBox = () => {
    const renter = {
        title: "For Renters",
        description: "Find your dream rental property. Bookmark properties and contact owners.",
        buttonContent: "Browse Properties",
        bgColor: 'bg-gray-100',
        buttonColor: 'bg-black',
        link: '/properties'
    }
    const property = {
        title: "For Property Owners",
        description: "List your properties and reach potential tenants. Rent as an airbnb or long term.",
        buttonContent: "Add A Property",
        bgColor: 'bg-blue-100',
        buttonColor: 'bg-blue-500',
        link: '/properties/add'
    }

    return ( 
        <div className='flex items-center justify-center gap-8 px-8 sm:px-32 sm:gap-12'>
            <SingleInforBox property={renter}/>
            <SingleInforBox property={property}/>
        </div>
     );
}
 
export default InforBox;