import { Plus } from 'lucide-react';
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
}

export default function LocationSection({ register, setValue, watch }: Props) {

  const [hierarchy, setHierarchy] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

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

  return (
 <section className="bg-white p-8 rounded-[35px] shadow-sm border border-slate-100">
      <h2 className="text-xl font-bold text-[#003153] mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-emerald-500 rounded-full inline-block"></span>
        Ubicación y Zona
      </h2>

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
            }}
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
            }}
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
            >
              <option value="">Seleccione...</option>
              {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
            {/* Aquí podrías poner el botón "+" para crear una nueva */}
            <button type="button" className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><Plus size={20} /></button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="admin-label">Dirección (Calle y Altura)</label>
        <input {...register('address')} className="admin-input" readOnly placeholder="La dirección aparecerá al marcar el mapa" />
      </div>

      <LocationPicker setValue={setValue} watch={watch} />
      <div className="grid grid-cols-2 gap-4">
        <input className="admin-input bg-slate-50" readOnly value={watch('latitude') || "0"} />
        <input className="admin-input bg-slate-50" readOnly value={watch('longitude') || "0"} />
      </div>
    </section>
  );
}
