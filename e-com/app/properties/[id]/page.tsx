

const PropertyPage = async ({ params }) => {

    return ( 
        <div>
            <p>Property Page { (await params).id }</p>
        </div>
     );
}
 
export default PropertyPage;