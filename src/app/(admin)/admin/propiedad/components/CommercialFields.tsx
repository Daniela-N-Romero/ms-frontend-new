import { AgeFields } from "./AgeFields";


interface Props {
  register: any;
  watch: any; 
  control: any;
}

export default function CommercialFields({ register, watch, control }: Props) {
  const isNewValue = watch('commercial.isNew');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase">Ambientes</label>
          <input type="number" {...register('commercial.rooms')} className="admin-input" />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase">Baños</label>
          <input type="number" {...register('commercial.bathrooms')} className="admin-input" />
        </div>
        <AgeFields register={register} watch={watch} control={control} propertyType="commercial" />

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {/* Checkboxes estilizados como botones (mucho más cómodos de clickear) */}
        {[
          { id: 'hasAC', label: 'Aire Acondicionado' },
          { id: 'hasParking', label: 'Estacionamiento' },
          { id: 'hasRollingShutter', label: 'Cortina Metálica' },
          { id: 'hasFireProtection', label: 'Sist. contra Incendios' },
          { id: 'hasKitchen', label: 'Cocina' },
        ].map((item) => (
          <label key={item.id} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-blue-50 transition-colors border border-transparent has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
            <input type="checkbox" {...register(`commercial.${item.id}`)} className="w-5 h-5 rounded text-blue-600" />
            <span className="text-sm font-medium text-slate-700">{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}