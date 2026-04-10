import { ChevronDown } from "lucide-react";

// src/app/(admin)/admin/propiedad/components/AdminPrivateFields.tsx
interface Props {
  register: any;
  watch: any;
  isOpen: boolean;
  onToggle: () => void;
}

export default function AdminPrivateFields({ register, isOpen, onToggle }: Props) {

  return (
    <section className="p-8 rounded-[35px] border-2 border-dashed border-slate-00">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between group focus:outline-none"
      >
        <h2 className={`text-xl font-bold text-[#003153] mb-1 flex items-center gap-2 ${isOpen ? 'mb-6' : ''}`}>
          🔒 Datos Privados (Solo Administración)
        </h2>
        <span className={`text-[#003153] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={20} />
        </span>
      </button>
      {isOpen && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="admin-label">Nombre del Propietario</label>
            <input {...register('ownerName')} className="admin-input admin-input--private" />
          </div>
          <div>
            <label className="admin-label">Teléfono/Email Propietario</label>
            <input {...register('ownerContact')} className="admin-input admin-input--private" />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="admin-label">Notas Internas</label>
            <textarea {...register('privateNotes')} className="admin-input admin-input--private h-40 resize-none" placeholder="Comentarios que no verá el público..."></textarea>
          </div>
        </div>
      </div>
      )}
    </section>
  );
}