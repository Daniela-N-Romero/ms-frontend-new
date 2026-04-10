import { ChevronDown } from 'lucide-react';

interface Props {
    register: any;
    isOpen: boolean;
    onToggle: () => void;
}

export default function TextFields({ register, isOpen, onToggle }: Props) {

    return (
    <section className="bg-white p-8 rounded-[35px] shadow-sm border border-slate-100">
       <button
        type="button"
        onClick={onToggle}
        className={`w-full flex items-center justify-between group focus:outline-none ${isOpen ? 'mb-8' : ''}`}
      >
        <h2 className="text-xl font-bold text-[#003153] flex items-center gap-2">
            <span className="w-2 h-6 bg-amber-500 rounded-full inline-block"></span>
           Descripción y Documentos
          </h2>

          <span className={`text-[#003153] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown size={25} />
          </span>
      </button>

      {isOpen && (

            <div className="space-y-6">
                <div>
                    <label className="admin-label">Descripción Pública</label>
                    <textarea
                        required 
                        {...register('description')}
                        className="admin-input h-48 resize-none"
                        placeholder="Escribe aquí todo lo que el cliente debe saber..."
                    ></textarea>
                </div>

                <div>
                    <label className="admin-label">Subir PDF de la propiedad (Opcional)</label>
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:bg-slate-50 transition-all">
                        <input type="file" {...register('pdfUrl')} accept=".pdf" className="hidden" id="pdf-upload" />
                        <label htmlFor="pdf-upload" className="cursor-pointer text-blue-600 font-bold">
                            Click aquí para subir el PDF
                        </label>
                        <p className="text-xs text-slate-400 mt-2">PDF publicitario de la propiedad.</p>
                    </div>
                </div>
            </div>

            )}    
        </section>
    );
}