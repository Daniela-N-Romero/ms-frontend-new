export default function LandFields({ register }: { register: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {/* Checkboxes estilizados como botones (mucho más cómodos de clickear) */}
        {[
          { id: 'hasWaterLine', label: 'Agua Corriente' },
          { id: 'hasGasLine', label: 'Gas Natural' },
          { id: 'hasSewerLine', label: 'Cloacas' },
          { id: 'hasElectricity', label: 'Electricidad' },
          { id: 'isFenced', label: 'Cercado' },
          { id: 'isGatedNeighborhood', label: 'Barrio Cerrado' },
        ].map((item) => (
          <label key={item.id} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-blue-50 transition-colors border border-transparent has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
            <input type="checkbox" {...register(`land.${item.id}`)} className="w-5 h-5 rounded text-blue-600" />
            <span className="text-sm font-medium text-slate-700">{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
