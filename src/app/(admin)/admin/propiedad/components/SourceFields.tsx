import { useWatch } from "react-hook-form"; // Importar useWatch
import { useState, useEffect } from "react";
import { Plus, User, Building2, UserCheck, Pencil } from "lucide-react";
import QuickCreateModal from "./QuickCreateModal";

interface ContactoBase {
  id: string;
  fullName: string;
  phoneNumber?: string;
  agencyName?: string;
}

interface SourceFieldsProps {
  register: any;
  watch: any;
  setValue: any;
  control: any;
  propietarios: ContactoBase[]; // Datos que vendrán de la BBDD
  colegas: ContactoBase[];      // Datos que vendrán de la BBDD
  agentes: ContactoBase[];      // Datos que vendrán de la BBDD
}

export default function SourceFields({
  register,
  watch,
  setValue,
  control,
  propietarios = [],
  colegas = [],
  agentes = []
}: SourceFieldsProps) {
  const initialSource = watch("propertySource", "ms_propia");
  const [localSource, setLocalSource] = useState(initialSource);
  const [modalOpen, setModalOpen] = useState<"propietario" | "colega" | "agente" | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // 1. Reintegramos formData para controlar los inputs del modal
  const [formData, setFormData] = useState({ fullName: "", phoneNumber: "", agencyName: "" });

  const selectedOwner = useWatch({ name: "ownerId", control });
  const selectedAgent = useWatch({ name: "agentId", control });
  const selectedColleague = useWatch({ name: "colleagueId", control });

  // 2. Reintegramos openModal para gestionar el estado de edición
  const openModal = (type: "propietario" | "colega" | "agente", edit: boolean = false) => {
    setIsEditing(edit);
    setModalOpen(type);
  };

  // 3. Efecto para cargar datos en formData al presionar el lápiz (Editar)
  useEffect(() => {
    if (isEditing && modalOpen) {
      let data;
      if (modalOpen === 'propietario') data = propietarios.find(p => p.id === selectedOwner);
      if (modalOpen === 'colega') data = colegas.find(c => c.id === selectedColleague);
      if (modalOpen === 'agente') data = agentes.find(a => a.id === selectedAgent);

      if (data) {
        setFormData({
          fullName: data.fullName || "",
          phoneNumber: data.phoneNumber || "",
          agencyName: data.agencyName || ""
        });
      }
    } else {
      setFormData({ fullName: "", phoneNumber: "", agencyName: "" });
    }
  }, [isEditing, modalOpen, selectedOwner, selectedColleague, selectedAgent, propietarios, colegas, agentes]);

  const handleToggle = (value: string) => {
    setLocalSource(value);
    setValue("propertySource", value, { shouldDirty: true });
  };

  return (
    <section className="bg-white p-8 rounded-[35px] shadow-sm border border-slate-100 space-y-8">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
        <h2 className="text-xl font-bold text-[#003153] tracking-tight">
          📍 Origen y Contactos
        </h2>
      </div>

      {/* 1. SELECTOR DE ORIGEN (MS vs COLEGA) */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4">
        <p className="text-sm font-bold text-slate-500 uppercase tracking-wider ml-2">
          ¿De dónde viene la propiedad?
        </p>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => handleToggle("ms_propia")}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${localSource === "ms_propia" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-50"}`}
          >
            MS Propia
          </button>
          <button
            type="button"
            onClick={() => handleToggle("colega")}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${localSource === "colega" ? "bg-orange-500 text-white shadow-md" : "text-slate-400 hover:bg-slate-50"}`}
          >
            Colega / Externa
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 animate-in fade-in duration-500">
        {localSource === "ms_propia" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="admin-label flex items-center gap-2">
                <User size={12} /> Propietario (Dueño)
              </label>
              <div className="flex gap-2">
                <select {...register("ownerId")} className="admin-input">
                  <option value="">Seleccionar propietario existente...</option>
                  {propietarios.map(p => <option key={p.id} value={p.id}>{p.fullName}</option>)}
                </select>
                <button onClick={() => openModal('propietario', false)} type="button" className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><Plus size={20} /></button>
                <button onClick={() => openModal('propietario', true)} disabled={!selectedOwner} type="button" className="p-4 bg-slate-100 text-slate-500 rounded-2xl disabled:opacity-30"><Pencil size={20} /></button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="admin-label flex items-center gap-2">
                <UserCheck size={12} /> Agente Responsable
              </label>
              <div className="flex gap-2">
                <select {...register("agentId")} className="admin-input">
                  <option value="">Seleccionar agente...</option>
                    {agentes.map(a => <option key={a.id} value={a.id}>{a.fullName}</option>)}
                </select>
                <button onClick={() => openModal('agente', false)} type="button" className="p-4 bg-orange-50 text-orange-600 rounded-2xl"><Plus size={20} /></button>
              <button onClick={() => openModal('agente', true)} disabled={!selectedAgent} type="button" className="p-4 bg-slate-100 text-slate-500 rounded-2xl disabled:opacity-30"><Pencil size={20} /></button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="admin-label flex items-center gap-2">
              <Building2 size={12} /> Inmobiliaria o Colega
            </label>
            <div className="flex gap-2">
              <select {...register("colleagueId")} className="admin-input">
                <option value="">Buscar por inmobiliaria o nombre...</option>
                {colegas.map(c => <option key={c.id} value={c.id}>{c.fullName}</option>)}
              </select>
              <button onClick={() => openModal('colega', false)} type="button" className="p-4 bg-orange-50 text-orange-600 rounded-2xl"><Plus size={20} /></button>
              <button onClick={() => openModal('colega', true)} disabled={!selectedColleague} type="button" className="p-4 bg-slate-100 text-slate-500 rounded-2xl disabled:opacity-30"><Pencil size={20} /></button>
            </div>
          </div>
        )}
        {/* NOTAS PRIVADAS (Unificado para ambos casos) */}
        <div className="space-y-2 pt-4 border-t border-slate-100">
          <label className="admin-label">
            Notas sobre el acuerdo / contacto
          </label>
          <textarea
            {...register("privateNotes")}
            className="admin-input h-28 resize-none"
            placeholder={
              localSource === "ms_propia"
                ? 'Ej: "La dueña solo acepta efectivo", "Llamar después de las 18hs"'
                : 'Ej: "Comisión compartida 50/50", "Llaves en su oficina"'
            }
          />
        </div>
      </div>

      {/* MODALES DINÁMICOS (Reutilizando el título según isEditing) */}
      <QuickCreateModal
        isOpen={modalOpen === "propietario"}
        onClose={() => setModalOpen(null)}
        title={isEditing ? "Editar Propietario" : "Nuevo Propietario"}
      >
        <div className="space-y-4">
          <div>
            <label className="admin-label text-xs">Nombre Completo</label>
            <input
              type="text"
              className="admin-input"
              value={formData.fullName} 
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              placeholder="Juan Perez"
            />
          </div>
          <div>
            <label className="admin-label text-xs">Teléfono</label>
            <input type="text" className="admin-input" placeholder="11..." value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}/>
          </div>
          <button className="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold hover:bg-blue-700">
            {isEditing ? "Guardar Cambios" : "Crear Propietario"}
          </button>
        </div>
      </QuickCreateModal>

      <QuickCreateModal
        isOpen={modalOpen === "agente"}
        onClose={() => setModalOpen(null)}
        title={isEditing ? "Editar Agente" : "Nuevo Agente Inmobiliario"}
      >
        <div className="space-y-4">
          <div>
            <label className="admin-label text-xs">Nombre Completo</label>
            <input
              type="text"
              className="admin-input"
              value={formData.fullName} 
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              placeholder="Juan Perez"
            />
          </div>
          <div>
            <label className="admin-label text-xs">Teléfono</label>
            <input type="text" className="admin-input" placeholder="11..." value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}/>
          </div>
          <button className="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold hover:bg-blue-700">
            {isEditing ? "Guardar Cambios" : "Crear Agente"}
          </button>
        </div>
      </QuickCreateModal>

      <QuickCreateModal
        isOpen={modalOpen === "colega"}
        onClose={() => setModalOpen(null)}
        title={
          isEditing
            ? "Editar Colega / Inmobiliaria"
            : "Nuevo Colega / Inmobiliaria"
        }
      >
        <div className="space-y-4">
          <div>
            <label className="admin-label text-xs">
              Inmobiliaria (Opcional)
            </label>
            <input
              type="text"
              className="admin-input"
              placeholder="REMAX, Bridge, etc."
              value={formData.agencyName}
              onChange={(e) => setFormData({...formData, agencyName: e.target.value})}
            />
          </div>
          <div>
            <label className="admin-label text-xs">Nombre del Contacto</label>
            <input type="text" className="admin-input" placeholder="Gastón" value={formData.fullName} 
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}/>
          </div>
          <div>
            <label className="admin-label text-xs">Teléfono</label>
            <input type="text" className="admin-input" placeholder="11..." value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}/>
          </div>
          <button className="w-full bg-orange-500 text-white p-4 rounded-2xl font-bold hover:bg-orange-600">
            {isEditing ? "Guardar Cambios" : "Crear Colega"}
          </button>
        </div>
      </QuickCreateModal>
    </section>
  );
}
