
const Hero = () => {
    return ( 
        <section className='text-center bg-blue-700 h-fit py-8'>
            <p className='text-4xl font-extrabold text-white sm:text-5xl md:text-6xl'>
                Find The Perfect Rental
            </p>
            <p className="my-4 text-sm text-white sm:text-xl md:text-2xl">
                Discover the perfect property that suits your needs
            </p>
            <form>
                <input type='text' placeholder='Enter location(City,State,Zip,etc)' className='bg-white p-2 rounded-lg text-xs md:text-sm md:w-1/5'/>
                <select className='bg-white p-2 rounded-lg text-xs mx-4  w-fit md:text-sm'>
                    <option value="All">All</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Studio">Studio</option>
                    <option value="Condo">Condo</option>
                    <option value="House">House</option>
                    <option value="Cabin Or Cottage">Cabin or Cottage</option>
                    <option value="Loft">Loft</option>
                    <option value="Room">Room</option>
                    <option value="Other">Other</option>
                </select>
                <button className='bg-blue-400 p-2 rounded-lg text-xs text-white md:text-sm hover:cursor-pointer hover:bg-blue-600'

                >
                    Search
                </button>
            </form>
        </section>
     );
}
 
export default Hero;