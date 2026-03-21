'use client';
import { useForm } from 'react-hook-form';
import ResidentialFields from '../components/ResidentialFields';
import CommercialFields from '../components/CommercialFields';
import IndustrialFields from '../components/IndustrialFields';
import LandFields from '../components/LandFields';

const SUBTYPES = {
  residencial: ['Casa', 'Departamento', 'PH', 'Duplex', 'Quinta'],
  industrial: ['Nave', 'Galpón', 'Lote Industrial'],
  comercial: ['Oficina', 'Local', 'Salón'],
  lote: ['Terreno', 'Campo', 'Lote en Barrio Cerrado']
};

export default function PropertyFormPage() {
  const { register, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: '',
      type: '' as keyof typeof SUBTYPES | '',
      subtype: '',
      price: '',
    }
  });

  const propertyType = watch('type');
  const priceValue = watch('price');

  // Función para formatear el precio con separador de miles mientras escriben
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Solo números
    const formatted = new Intl.NumberFormat('de-DE').format(Number(rawValue));
    setValue('price', rawValue === "" ? "" : formatted);
  };

  const onSubmit = (data: any) => {
// Aquí podrías limpiar el precio (quitarle los puntos) antes de enviar
    const cleanData = {
      ...data,
      price: data.price.replace(/\./g, '')
    };
    console.log("Datos listos para el backend:", cleanData);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* CABECERA Y TIPO */}
        <section className="bg-white p-8 rounded-[35px] shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-[#003153] mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-500 rounded-full inline-block"></span>
            Información Básica
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="admin-label">Título de la Propiedad</label>
              <input {...register('name')} className="admin-input" placeholder="Ej: Galpón Impecable..." />
            </div>

            <div>
              <label className="admin-label">Tipo de Propiedad</label>
              <select {...register('type')} className="admin-input">
                <option value="">Seleccionar tipo</option>
                <option value="residencial">Residencial</option>
                <option value="industrial">Industrial</option>
                <option value="comercial">Comercial</option>
                <option value="lote">Lote / Terreno</option>
              </select>
            </div>

            <div>
              <label className="admin-label">Subtipo</label>
              <select 
                {...register('subtype')} 
                className="admin-input"
                disabled={!propertyType}
              >
                <option value="">{propertyType ? "Seleccionar" : "Primero elija tipo"}</option>
                {propertyType && SUBTYPES[propertyType as keyof typeof SUBTYPES].map(sub => (
                  <option key={sub} value={sub.toLowerCase()}>{sub}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="admin-label">Precio</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input 
                  type="text"
                  value={priceValue}
                  onChange={handlePriceChange}
                  className="admin-input pl-10" 
                  placeholder="0.000"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN DINÁMICA (Tus componentes Fields) */}
        {propertyType && (
          <section className="bg-white p-8 rounded-[35px] shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-xl font-bold text-[#003153] mb-6">Detalles de {propertyType}</h2>
            
            {propertyType === 'residencial' && <ResidentialFields register={register} watch={watch} />}
            {propertyType === 'comercial' && <CommercialFields register={register} watch={watch} />}
            {propertyType === 'industrial' && <IndustrialFields register={register} watch={watch} />}
            {propertyType === 'lote' && <LandFields register={register} />}
          </section>
        )}

        <div className="flex justify-end pt-6">
          <button type="submit" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            Guardar Propiedad
          </button>
        </div>
      </form>
    </div>
  );
}