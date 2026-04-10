import { ChevronDown } from "lucide-react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

export default function SurfaceFields({ register, watch, propertyType, isOpen, onToggle }: any) {
  const propertySubtype = watch('subtype');

  return (
    <section className="bg-white p-8 rounded-[35px] shadow-sm border border-slate-100">

      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between group focus:outline-none"
      >
        <h2 className={`text-xl font-bold text-[#003153] mb-1 flex items-center gap-2 ${isOpen ? 'mb-6' : ''}`}>
          <span className="w-2 h-6 bg-amber-500 rounded-full inline-block"></span>
          Superficie
        </h2>
        <span className={`text-[#003153] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={25} />
        </span>
      </button>




      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="admin-label">Superficie Total (m²)</label>
            <input type="number" {...register('totalSurface')} className="admin-input" placeholder="Ej: 500" />
          </div>

          {/* Lógica: Si no es tierra, mostramos cubierta */}
          {propertyType !== 'land' && propertySubtype !== 'lote industrial' && (
            <div className="animate-in zoom-in">
              <label className="admin-label">Superficie Cubierta (m²)</label>
              <input type="number" {...register('coveredSurface')} className="admin-input" placeholder="Ej: 120" />
            </div>
          )}

          {/* Lógica: Frente y fondo solo para tierra o industria */}
          {(propertyType === 'land' || propertyType === 'industrial') && (
            <div className="grid grid-cols-2 gap-2 animate-in zoom-in">
              <div>
                <label className="admin-label">Frente (m)</label>
                <input type="number" {...register('land.frontMeters')} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">Fondo (m)</label>
                <input type="number" {...register('land.backMeters')} className="admin-input" />
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}