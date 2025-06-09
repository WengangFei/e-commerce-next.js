'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '@/utiles/type';


delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/marker-icon-2x.png',
    iconUrl: '/leaflet/marker-icon.png',
    shadowUrl: '/leaflet/marker-shadow.png',
});

const LeafletMap = ({ location }: { location: Location }) => {
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [mapAvailable, setMapAvailable] = useState(false);

  useEffect(() => {
    const { street, city, state, zipcode }: Location = location;
    const address = `${street}, ${city}, ${state}, ${zipcode}`;
    const encodedAddress = encodeURIComponent(address);

    // Use Nominatim (OpenStreetMap)
    fetch(`https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setCoords([parseFloat(lat), parseFloat(lon)]);
        } else {
          console.warn('No results found for address.');
          setMapAvailable(true);
        }
      })
      .catch(err => console.error('Geocoding error:', err));
  }, [location]);

  return mapAvailable ? (
    <p>No Map available for address.</p>    
  ):(
        coords ? (
        <MapContainer center={coords} zoom={13} style={{ height: '300px', width: '100%' }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={coords}>
            <Popup>{`${location.street}, ${location.city}`}</Popup>
        </Marker>
        </MapContainer>
    ) : (
        <div className='flex flex-col justify-center items-center gap-2'>
            <img src="/leaflet/earth.avif" alt="Loading" width={50} height={50} className='animate-spin'/>
            <p>Loading map...</p>
        </div>
        
    )
  )
  
};

export default LeafletMap;
