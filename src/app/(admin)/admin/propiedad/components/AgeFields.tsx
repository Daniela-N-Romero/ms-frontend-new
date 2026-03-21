import { useWatch } from 'react-hook-form';

export function AgeFields({ register, control, propertyType }: any) {
  const isNewValue = useWatch({
    control,
    name: `${propertyType}.isNew`,
  });
  
  const isOld = isNewValue === "false";

  return (
    <>
      <div>
        <label className="text-xs font-bold text-slate-400 uppercase">¿A estrenar?</label>
        <select {...register(`${propertyType}.isNew`)} className="admin-input">
          <option value="">Seleccionar</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </div>

      <div className={`transition-opacity ${isOld ? 'opacity-100' : 'opacity-40'}`}>
        <label className="text-xs font-bold text-slate-400 uppercase">Antigüedad (años)</label>
        <input
          type="number"
          {...register(`${propertyType}.age`)}
          className="admin-input"
          disabled={!isOld}
        />
      </div>
    </>
  );
}