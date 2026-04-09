'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Geocoder, geocoders } from 'leaflet-control-geocoder';

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Componente para mover la vista del mapa cuando cambian lat/lng
function RecenterMap({ lat, lng }: { lat: number, lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
}

export default function LocationPicker({ setValue, watch }: any) {
  const watchLat = watch('latitude');
  const watchLng = watch('longitude');
  const lat = parseFloat(watchLat) || -34.6037;
  const lng = parseFloat(watchLng) || -58.3816;

  const updatePosition = async (newLat: number, newLng: number) => {
    setValue('latitude', newLat.toString(), { shouldDirty: true });
    setValue('longitude', newLng.toString(), { shouldDirty: true });
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLat}&lon=${newLng}&zoom=18&addressdetails=1`);
      const data = await res.json();
      if (data.address) {
        const fullAddr = data.address.house_number ? `${data.address.road} ${data.address.house_number}` : (data.address.road || "");
        setValue('address', fullAddr, { shouldDirty: true });
      }
    } catch (e) { console.error(e); }
  };

  return (
    <div className="h-[400px] w-full rounded-[30px] overflow-hidden border-4 border-white shadow-xl relative z-0 mb-6">
      <MapContainer center={[lat, lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker 
          position={[lat, lng]} 
          icon={icon} 
          draggable={true} 
          eventHandlers={{ dragend: (e) => updatePosition(e.target.getLatLng().lat, e.target.getLatLng().lng) }} 
        />
        <MapEvents updatePosition={updatePosition} />
        <SearchField updatePosition={updatePosition} />
      </MapContainer>
    </div>
  );
}

// Sub-componentes internos (MapEvents y SearchField) aquí mismo...
function MapEvents({ updatePosition }: any) {
  useMapEvents({ click(e) { updatePosition(e.latlng.lat, e.latlng.lng); } });
  return null;
}

function SearchField({ updatePosition }: any) {
  const map = useMap();
  useEffect(() => {
    const geocoder = new geocoders.Nominatim({ geocodingQueryParams: { countrycodes: 'ar', addressdetails: 1} });
    const control = new Geocoder({ geocoder, defaultMarkGeocode: false, placeholder: "Buscar dirección..." })
      .on('markgeocode', (e: any) => {
        const { center } = e.geocode;
        updatePosition(center.lat, center.lng);
        map.setView(center, 18);
      }).addTo(map);
    return () => { map.removeControl(control); };
  }, [map, updatePosition]);
  return null;
}