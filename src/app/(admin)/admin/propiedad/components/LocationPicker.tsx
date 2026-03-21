'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import { Geocoder, geocoders } from 'leaflet-control-geocoder';

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface LocationPickerProps {
  setValue: any;
  watch: any;
}

// NUEVO: Componente para que el mapa "siga" al marcador
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default function LocationPicker({ setValue, watch }: LocationPickerProps) {
  // Ajustamos los nombres a 'latitude' y 'longitude' para que coincidan con tu page.tsx
  const latValue = watch('latitude');
  const lngValue = watch('longitude');

  // Coordenadas numéricas para Leaflet (con fallback)
  const lat = parseFloat(latValue) || -34.6037;
  const lng = parseFloat(lngValue) || -58.3816;

  function MapEvents() {
    useMapEvents({
      click(e) {
        updatePosition(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  }

  const updatePosition = async (newLat: number, newLng: number) => {
    setValue('latitude', newLat.toString());
    setValue('longitude', newLng.toString());

    const info = await reverseGeocode(newLat, newLng);
    if (info) {
      setValue('address', info.fullAddress, { shouldValidate: true });
      setValue('locality', info.locality, { shouldValidate: true });
    }
  };

 function SearchField() {
  const map = useMap();

  useEffect(() => {
    // Configuramos el geocoder con esteroides para Argentina
    const geocoder = new geocoders.Nominatim({
      geocodingQueryParams: {
        countrycodes: 'ar', // <--- Clave para no salir del país
        addressdetails: 1,
        limit: 5
      }
    });

    const control = new Geocoder({
      geocoder,
      defaultMarkGeocode: false,
      placeholder: "Buscar calle y altura en Argentina...",
    })
      .on('markgeocode', (e: any) => {
        const { center, properties } = e.geocode;
        
        // Extraemos la dirección desglosada que nos da el buscador
        const addr = properties.address;
        const street = addr.road || addr.pedestrian || addr.house_name || "";
        const houseNum = addr.house_number || "";
        const city = addr.city || addr.town || addr.village || addr.suburb || "";

        // Formateamos: "Calle 123"
        const fullAddress = houseNum ? `${street} ${houseNum}` : street;

        // Actualizamos el formulario
        setValue('latitude', center.lat.toString());
        setValue('longitude', center.lng.toString());
        setValue('address', fullAddress);
        setValue('locality', city);
        
        map.setView(center, 18); // Zoom bien cerca para ver la casa
      })
      .addTo(map);

    return () => { map.removeControl(control); };
  }, [map]);

  return null;
}

  return (
    <div className="space-y-4">
      <div className="h-[400px] w-full rounded-[30px] overflow-hidden border-4 border-white shadow-xl relative z-0">
        <MapContainer center={[lat, lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ChangeView center={[lat, lng]} />
          <Marker 
            position={[lat, lng]} 
            icon={icon} 
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                const pos = e.target.getLatLng();
                updatePosition(pos.lat, pos.lng);
              },
            }}
          />
          <MapEvents />
          <SearchField />
        </MapContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="admin-label">Latitud</label>
          <input className="admin-input bg-slate-50 text-slate-500 cursor-not-allowed" readOnly value={lat.toFixed(6)} />
        </div>
        <div>
          <label className="admin-label">Longitud</label>
          <input className="admin-input bg-slate-50 text-slate-500 cursor-not-allowed" readOnly value={lng.toFixed(6)} />
        </div>
      </div>
    </div>
  );
}

// Función auxiliar para Geocoding inverso
const reverseGeocode = async (lat: number, lng: number) => {
  try {
    // zoom=18 le dice a Nominatim: "Dame el nivel de edificio/casa"
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    );
    const data = await res.json();
    
    if (data.address) {
      const a = data.address;
      const street = a.road || a.pedestrian || "";
      const houseNumber = a.house_number || ""; // La altura
      const city = a.city || a.town || a.village || a.suburb || "";

      return {
        // Si no hay altura, solo mandamos la calle
        fullAddress: houseNumber ? `${street} ${houseNumber}` : street,
        locality: city
      };
    }
  } catch (error) {
    console.error("Error en mapa:", error);
  }
  return null;
};