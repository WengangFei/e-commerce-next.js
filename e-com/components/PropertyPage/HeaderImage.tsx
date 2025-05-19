import Image from "next/image";

const HeaderImage = ({ images }: { images: string[] }) => {
    return ( 
        <div className="relative w-full h-[400px] ">
            <Image
                src={`/properties/${images[0]}`}
                alt="property"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            />
        </div>
    );
}
 
export default HeaderImage;