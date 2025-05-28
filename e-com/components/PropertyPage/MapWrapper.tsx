'use client';
import dynamic from 'next/dynamic';

const MapWrapper = ({ location }) => {
    const LeafletMap = dynamic(() => import('./LeafletMap'), {
        ssr: false
    });

    return ( 
          <LeafletMap location={location}/>
     );
}
 
export default MapWrapper;