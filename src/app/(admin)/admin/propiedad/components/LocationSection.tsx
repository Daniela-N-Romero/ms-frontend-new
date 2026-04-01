import dynamic from 'next/dynamic';
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

// Cargamos el mapa de forma dinámica para evitar errores de SSR (Server Side Rendering)
const LocationPicker = dynamic(
  () => import('./LocationPicker'),
  { 
    ssr: false, 
    loading: () => <div className="h-[400px] bg-slate-100 animate-pulse rounded-[30px] flex items-center justify-center text-slate-400 font-medium">Cargando Mapa...</div> 
  }
);

interface Props {
  register: any;
  setValue: any;
  watch: any;
}

export default function LocationSection({ register, setValue, watch }: Props) {
  return (
    <section className="bg-white p-8 rounded-[35px] shadow-sm border border-slate-100">
      <h2 className="text-xl font-bold text-[#003153] mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-emerald-500 rounded-full inline-block"></span>
        Ubicación Exacta
      </h2>
      <p className="text-slate-500 mb-6">Seleccione un lugar en el mapa para obtener la dirección y coordenadas automáticamente.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <label className="admin-label">Dirección (Automático)</label>
          <input 
            {...register('address')} 
            readOnly 
            className="admin-input border-dashed border-slate-400 text-gray-400 bg-slate-50/50" 
            placeholder="La dirección aparecerá al marcar el mapa"
          />
        </div>
        <div>
          <label className="admin-label">Localidad</label>
          <input 
            {...register('locality')} 
            readOnly 
            className="admin-input border-dashed border-slate-400 text-gray-400 bg-slate-50/50" 
            placeholder="Ej: Berazategui"
          />
        </div>
      </div>
      
      <LocationPicker setValue={setValue} watch={watch} />
    </section>
  );
}