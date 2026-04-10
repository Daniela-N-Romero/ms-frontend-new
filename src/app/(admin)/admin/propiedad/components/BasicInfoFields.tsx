import { formatPriceInput } from "@/utils/formHelpers";
import { ChevronDown } from "lucide-react";

interface Props {
  register: any;
  setValue: any;
  watch: any;
  subtypes: Record<string, string[]>;
  isOpen: boolean; 
  onToggle: () => void;
}

export default function BasicInfoFields({ register, setValue, watch, subtypes, isOpen, onToggle }: Props) {
  const propertyType = watch('type');
  const priceValue = watch('price');

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('price', formatPriceInput(e.target.value));
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
            Información Básica
          </h2>

          <span className={`text-[#003153] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown size={25} />
          </span>
      </button>

      {isOpen && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <label className="admin-label">Título de la Propiedad</label>
          <input required {...register('name')} className="admin-input" placeholder="Ej: Galpón Impecable..." />
        </div>

        <div>
          <label className="admin-label">Precio</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
            <input
              required 
              type="text"
              onChange={handlePriceChange}
              className="admin-input pl-10"
              placeholder="0.000"
            />
          </div>
        </div>

        <div>
          <label className="admin-label">Tipo de Propiedad</label>
          <select {...register('propertyType')} className="admin-input" required >
            <option value="">Seleccionar tipo</option>
            <option value="residential">Residencial</option>
            <option value="industrial">Industrial</option>
            <option value="commercial">Comercial</option>
            <option value="land">Lote / Terreno</option>
          </select>
        </div>

        <div>
          <label className="admin-label">Subtipo</label>
          <select {...register('subtype')} className="admin-input" disabled={!propertyType} required>
            <option value="">{propertyType ? "Seleccionar" : "Primero elija tipo"}</option>
            {propertyType && subtypes[propertyType]?.map(sub => (
              <option key={sub} value={sub.toLowerCase()}>{sub}</option>
            ))}
          </select>
        </div>
      </div>
      )}

    </section>
    
  );

}