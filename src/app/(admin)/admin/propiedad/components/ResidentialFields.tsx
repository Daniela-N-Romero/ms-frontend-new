import { AgeFields } from './AgeFields';

export default function ResidentialFields({ register, watch, control }: any) {

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase">Ambientes</label>
          <input type="number" {...register('residential.rooms')} className="admin-input" />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase">Baños</label>
          <input type="number" {...register('residential.bathrooms')} className="admin-input" />
        </div>

        <AgeFields register={register} watch={watch} control={control} propertyType="residential"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {/* Checkboxes estilizados como botones (mucho más cómodos de clickear) */}
        {[
          { id: 'hasPool', label: 'Piscina' },
          { id: 'hasGrill', label: 'Parrilla' },
          { id: 'hasGarden', label: 'Jardín' },
          { id: 'hasAC', label: 'Aire Acond.' },
          { id: 'hasGarage', label: 'Cochera' },
          { id: 'hasLaundry', label: 'Lavadero' },
          { id: 'hasDressingRoom', label: 'Vestidor' },
          { id: 'hasGym', label: 'Gimnasio' },
          { id: 'isFurnished', label: 'Amoblado' },
          { id: 'hasNaturalGas', label: 'Gas Natural' }
        ].map((item) => (
          <label key={item.id} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-blue-50 transition-colors border border-transparent has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
            <input type="checkbox" {...register(`residential.${item.id}`)} className="w-5 h-5 rounded text-blue-600" />
            <span className="text-sm font-medium text-slate-700">{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}