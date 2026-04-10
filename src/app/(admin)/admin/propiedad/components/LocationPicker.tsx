'use client';
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Geocoder, geocoders } from 'leaflet-control-geocoder';
import { useWatch } from 'react-hook-form'


const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


export default function LocationPicker({ setValue, control}: any) {
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Observamos lat/lng directamente del "control" del formulario
  const watchedLat = useWatch({ control, name: 'latitude' });
  const watchedLng = useWatch({ control, name: 'longitude' });

  // Convertimos a número con seguridad
  const lat = parseFloat(watchedLat) || -34.6037;
  const lng = parseFloat(watchedLng) || -58.3816;

  // A. FUNCIÓN: Actualiza las coordenadas en el formulario (Instantáneo)
  const setCoords = (newLat: number, newLng: number) => {
    setValue('latitude', newLat.toString(), { shouldDirty: true, shouldValidate: true });
    setValue('longitude', newLng.toString(), { shouldDirty: true, shouldValidate: true });
  };

  // B. FUNCIÓN: Busca la dirección usando Nominatim (con espera)
  const fetchAddress = async (newLat: number, newLng: number) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLat}&lon=${newLng}&zoom=18`);
      const data = await res.json();
      const { road, house_number, city, town, village } = data.address;
      
      // Priorizamos Calle + Altura
      let displayAddr = road || "";
      if (house_number) {
        displayAddr += ` ${house_number}`;
      }
      
      // Si no hay calle (a veces pasa en zonas rurales), usamos el nombre del lugar
      if (!displayAddr) {
        displayAddr = city || town || village || "Dirección no encontrada";
      }

      setValue('address', displayAddr);
    } catch (e) { console.error(e); }
  };

  // C. FUNCIONES: Manejadores del arrastre y de click en el mapa
  const handleDragEnd = (e: any) => {
    const { lat, lng } = e.target.getLatLng();
    setCoords(lat, lng);

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(() => {
      fetchAddress(lat, lng);
    }, 500);

  };

  const handleMapClick = (lat: number, lng: number) => {
    setCoords(lat, lng);
    fetchAddress(lat, lng);
  };

  return (
    <div className="h-[400px] w-full rounded-[30px] overflow-hidden border-4 border-white shadow-xl relative z-0 mb-6">
      <MapContainer center={[lat, lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FixMapResize />
        <RecenterMap lat={lat} lng={lng} />
        <Marker
          key={`${lat}-${lng}`}
          position={[lat, lng]}
          icon={icon}
          draggable={true}
          eventHandlers={{ dragend: handleDragEnd }}
        />
        <MapEvents updatePosition={handleMapClick} />
        <SearchField onLocationFound={handleMapClick} />
      </MapContainer>
    </div>
  );
}

// Sub-Componente para mover la vista del mapa cuando cambian lat/lng
function RecenterMap({ lat, lng }: { lat: number, lng: number }) {
  const map = useMap();
  console.log("RecenterMap recibiendo:", lat, lng)
  useEffect(() => {
    map.setView([lat, lng], map.getZoom()); 
  }, [lat, lng, map]);
  return null;
}

// Sub-componente interno para manejar eventos de click en el mapa
function MapEvents({ updatePosition }: any) {
  useMapEvents({ click(e) { updatePosition(e.latlng.lat, e.latlng.lng); } });
  return null;
}


function SearchField({ onLocationFound }: { onLocationFound: (lat: number, lng: number) => void }) {
  const map = useMap();
  useEffect(() => {
    const geocoder = new geocoders.Nominatim({ geocodingQueryParams: { countrycodes: 'ar', addressdetails: 1 ,limit: 5} });
    const control = new Geocoder({ geocoder, defaultMarkGeocode: false, placeholder: "Buscar dirección..." })
      .on('markgeocode', (e: any) => {
        const { center } = e.geocode;
        onLocationFound(center.lat, center.lng);
        map.setView(center, 18);
      }).addTo(map);
    return () => { map.removeControl(control); };
  }, [map, onLocationFound]);
  return null;
}

function FixMapResize() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 250);
  }, [map]);
  return null;
}