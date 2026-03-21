import { AgeFields } from "./AgeFields";

interface Props {
    register: any;
    watch: any;    
    control: any;
}

export default function IndustrialFields({ register, watch, control }: Props) {
    const isNewValue = watch('industrial.isNew');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase">Altura (m)</label>
          <input type="number" {...register('industrial.height')} className="admin-input" />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase">Oficinas</label>
          <input type="number" {...register('industrial.offices')} className="admin-input" />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase">Baños</label>
          <input type="number" {...register('industrial.bathrooms')} className="admin-input" />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase">Zonificación</label>
          <select {...register('industrial.zonification')} className="admin-input">
            <option value="">Seleccionar</option>
            <option value="Cat. I">Cat. I</option>
            <option value="Cat. II">Cat. II</option>
            <option value="Cat. III">Cat. III</option>
          </select>
        </div>
        <AgeFields register={register} watch={watch} control={control} propertyType="industrial" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {/* Checkboxes estilizados como botones (mucho más cómodos de clickear) */}
        {[
          { id: 'hasfullSoul', label: 'Alma Llena' },
          { id: 'hasParking', label: 'Estacionamiento' },
          { id: 'hasThreePhasePower', label: 'Trifásica' },
          { id: 'hasIndustrialGas', label: 'Gas Ind.' },
          { id: 'hasFireNetwork', label: 'Red Hidrante' },
          { id: 'isInsidePark', label: 'En Parque Ind.' }
        ].map((item) => (
          <label key={item.id} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-blue-50 transition-colors border border-transparent has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
            <input type="checkbox" {...register(`industrial.${item.id}`)} className="w-5 h-5 rounded text-blue-600" />
            <span className="text-sm font-medium text-slate-700">{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}