import { Plus, ChevronDown } from 'lucide-react';
import { getLocationHierarchy } from '@/services/locationService';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Cargamos el mapa de forma dinámica para evitar errores de SSR (Server Side Rendering)
const LocationPicker = dynamic(
  () => import('./LocationPicker'),
  {
    ssr: false,
    loading: () => <div className="h-[400px] bg-slate-100 animate-pulse rounded-[30px] flex items-center justify-center text-slate-400 font-medium">Cargando Mapa...</div>
  }
);

interface Location {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
}

interface District {
  id: string;
  name: string;
  locations: Location[];
}

interface Province {
  id: string;
  name: string;
  districts: District[];
}

interface Props {
  register: any;
  setValue: any;
  watch: any;
  control: any;
  isOpen: boolean;
  onToggle: () => void;
  errors: any;
}

export default function LocationSection({ register, setValue, watch, control, errors, isOpen, onToggle }: Props) {

  const [hierarchy, setHierarchy] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [mapKey, setMapKey] = useState("");

  // 1. Cargar la jerarquía al iniciar
  useEffect(() => {
    getLocationHierarchy()
      .then(setHierarchy)
      .catch(console.error);
  }, []);

  // Filtrado de datos para los selects
  const provinces = hierarchy;
  const districts = provinces.find(p => p.name === selectedProvince)?.districts || [];
  const locations = districts.find(d => d.name === selectedDistrict)?.locations || [];

  const getLocationData = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locId = e.target.value;

    if (!locId) {
      setValue('locationId', "");
      setValue('latitude', "");  // 📍 Limpiamos latitud
      setValue('longitude', "");
      setMapKey("");
      setShowMap(false);
      return;
    }

    const localidadData = locations.find(l => String(l.id) === String(locId));

    if (localidadData) {
      setValue('locationId', locId, { shouldValidate: true });
      setValue('latitude', localidadData.latitude.toString());
      setValue('longitude', localidadData.longitude.toString());

      setMapKey(localidadData.id);
      setShowMap(true);
    } else {
      setShowMap(false);
    }

  }

  const handleMapLocationChange = (mapData: { state?: string, county?: string, suburb?: string }) => {
  // 1. Normalizamos los nombres para comparar (sacar acentos, pasar a mayúsculas)
  const normalize = (str: string) => 
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();

  const mapState = mapData.state ? normalize(mapData.state) : "";
  const mapCounty = mapData.county ? normalize(mapData.county) : "";
  const mapSuburb = mapData.suburb ? normalize(mapData.suburb) : "";

  // 2. Buscamos la Provincia en tu jerarquía
  const provinceMatch = hierarchy.find(p => normalize(p.name).includes(mapState) || mapState.includes(normalize(p.name)));
  
  if (provinceMatch) {
    setSelectedProvince(provinceMatch.name);
    
    // 3. Buscamos el Partido/Distrito dentro de esa provincia
    const districtMatch = provinceMatch.districts.find(d => 
      normalize(d.name).includes(mapCounty) || mapCounty.includes(normalize(d.name))
    );

    if (districtMatch) {
      setSelectedDistrict(districtMatch.name);
      
      // 4. Buscamos la Localidad específica
      const locationMatch = districtMatch.locations.find(l => 
        normalize(l.name).includes(mapSuburb) || mapSuburb.includes(normalize(l.name))
      );

      if (locationMatch) {
        setValue('locationId', locationMatch.id, { shouldValidate: true });
      }
    }
  }
};

  return (
    <section className="bg-white p-8 rounded-[35px] shadow-sm border border-slate-100">

      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex items-center justify-between group focus:outline-none ${isOpen ? 'mb-8' : ''}`}
      >
        <h2 className="text-xl font-bold text-[#003153] flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-500 rounded-full inline-block"></span>
          Ubicación y Zona
        </h2>

        <span className={`text-[#003153] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={25} />
        </span>
      </button>

      {isOpen && (

        <>

          {/* Selectores Jerárquicos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="admin-label">Provincia / Zona</label>
              <select
                className="admin-input"
                value={selectedProvince}
                onChange={(e) => {
                  setSelectedProvince(e.target.value);
                  setSelectedDistrict("");
                  setValue('locationId', null);
                  setShowMap(false);
                }}
                required 
              >
                <option value="">Seleccione...</option>
                {provinces.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </div>

            <div>
              <label className="admin-label">Partido / Barrio</label>
              <select
                className="admin-input"
                disabled={!selectedProvince}
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setValue('locationId', null);
                  setShowMap(false);
                }}
                required 
              >
                <option value="">Seleccione...</option>
                {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>

            <div>
              <label className="admin-label">Localidad Específica</label>
              <div className="flex gap-2">
                <select
                  {...register('locationId', { required: true })}
                  className="admin-input"
                  disabled={!selectedDistrict}
                  onChange={getLocationData}
                  required 
                >
                  <option value="">Seleccione...</option>
                  {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
                {/* Aquí podrías poner el botón "+" para crear una nueva */}
                <button type="button" className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><Plus size={20} /></button>
              </div>
            </div>
          </div>
          {showMap && mapKey && (
            <>
              <div className="mb-6">
                <label className="admin-label">Dirección (Calle y Altura)</label>
                <input {...register('address')} className="admin-input" readOnly placeholder="La dirección aparecerá al marcar el mapa" />
              </div>

              <div
                key={mapKey} className={`rounded-[30px] transition-all duration-300 ${errors?.latitude || errors?.longitude ? 'ring-4 ring-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'border-4 border-white'}`}
              >
                <LocationPicker setValue={setValue} control={control} />

                {(errors?.latitude || errors?.longitude) && (
                  <p className="text-red-500 text-sm mt-2 ml-4 font-medium animate-pulse">
                    📍 Por favor, selecciona una ubicación exacta en el mapa.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="admin-label">Latitud</label>
                  <input className="admin-input bg-slate-50" readOnly {...register('latitude', { required: "Debes marcar la ubicación en el mapa", validate: (value: string) => value !== "0" || "La ubicación no puede estar vacia" })} />
                </div>

                <div className="space-y-1">
                  <label className="admin-label">Longitud</label>
                  <input className="admin-input bg-slate-50" readOnly {...register('longitude', { required: "Debes marcar la ubicación en el mapa", validate: (value: string) => value !== "0" || "La ubicación no puede estar vacia" })} />
                </div>
              </div>

            </>
          )}
        </>
      )}

    </section>
  );
}

