// src/app/(admin)/admin/propiedad/components/AdminPrivateFields.tsx
export default function AdminPrivateFields({ register, watch }: any) {
  const isPublished = watch('isPublished');

  return (
    <section className="bg-slate-50 p-8 rounded-[35px] border-2 border-dashed border-slate-200">
      <h2 className="text-xl font-bold text-slate-500 mb-6 flex items-center gap-2">
        🔒 Datos Privados (Solo Administración)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="admin-label">Nombre del Propietario</label>
            <input {...register('ownerName')} className="admin-input" />
          </div>
          <div>
            <label className="admin-label">Teléfono/Email Propietario</label>
            <input {...register('ownerContact')} className="admin-input" />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="admin-label">Notas Internas</label>
            <textarea {...register('privateNotes')} className="admin-input h-32 resize-none" placeholder="Comentarios que no verá el público..."></textarea>
          </div>

          {/* Toggle de Publicación */}
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200">
            <div>
              <p className="font-bold text-[#003153]">Estado de publicación</p>
              <p className="text-xs text-slate-400">
                {isPublished ? "Visible en la web" : "Solo visible en el Panel Admin"}
              </p>
            </div>
            <input 
              type="checkbox" 
              {...register('isPublished')} 
              className="w-12 h-6 rounded-full appearance-none bg-slate-200 checked:bg-green-500 cursor-pointer transition-all relative before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-1 before:left-1 checked:before:left-7 before:transition-all"
            />
          </div>
        </div>
      </div>
    </section>
  );
}