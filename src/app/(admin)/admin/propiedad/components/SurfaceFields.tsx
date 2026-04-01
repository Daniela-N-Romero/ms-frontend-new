import { UseFormRegister, UseFormWatch } from "react-hook-form";

export default function SurfaceFields({ register, watch, propertyType }: any) {
  const propertySubtype = watch('subtype');

  return (
    <section className="bg-white p-8 rounded-[35px] shadow-sm border border-slate-100">
      <h2 className="text-xl font-bold text-[#003153] mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-amber-500 rounded-full inline-block"></span>
        Superficie
      </h2>

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
    </section>
  );
}