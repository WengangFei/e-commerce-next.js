'use client';
import { Location } from '@/utiles/type';
import dynamic from 'next/dynamic';

const MapWrapper = ({ location }: { location: Location }) => {
    const LeafletMap = dynamic(() => import('./LeafletMap'), {
        ssr: false
    });

    return ( 
          <LeafletMap location={location}/>
     );
}
 
export default MapWrapper;