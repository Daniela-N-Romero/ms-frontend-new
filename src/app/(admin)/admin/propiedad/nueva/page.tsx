'use client';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import ResidentialFields from '../components/ResidentialFields';
import CommercialFields from '../components/CommercialFields';
import IndustrialFields from '../components/IndustrialFields';
import LandFields from '../components/LandFields';

const LocationPicker = dynamic(
  () => import('../components/LocationPicker'),
  { ssr: false, loading: () => <div className="h-[400px] bg-slate-100 animate-pulse rounded-[30px] flex items-center justify-center">Cargando Mapa...</div> }
);

const SUBTYPES = {
  residential: ['Casa', 'Departamento', 'PH', 'Duplex', 'Quinta'],
  industrial: ['Nave', 'Galpón', 'Lote Industrial'],
  commercial: ['Oficina', 'Local', 'Salón'],
  land: ['Terreno', 'Campo', 'Lote en Barrio Cerrado']
};

export default function PropertyFormPage() {
  const { register, watch, handleSubmit, setValue, control} = useForm({
    defaultValues: {
      name: '',
      type: '' as keyof typeof SUBTYPES | '',
      subtype: '',
      price: '',
      address: '',
      locality: '',
      latitude: '',
      longitude: '',
      totalSurface: '',
      coveredSurface: '',
      residential: { isNew: '', age: '', rooms: '', bathrooms: '' },
      commercial: { isNew: '', age: '' },
      industrial: { isNew: '', age: '' },
    }
  });


  const propertyType = watch('type');
  const propertySubtype = watch('subtype');
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
            <div className="grid md:col-span-2">
              <label className="admin-label">Título de la Propiedad</label>
              <input {...register('name')} className="admin-input" placeholder="Ej: Galpón Impecable..." />
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

            <div>
              <label className="admin-label">Tipo de Propiedad</label>
              <select {...register('type')} className="admin-input">
                <option value="">Seleccionar tipo</option>
                <option value="residential">Residencial</option>
                <option value="industrial">Industrial</option>
                <option value="commercial">Comercial</option>
                <option value="land">Lote / Terreno</option>
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

          </div>
        </section>


        {/* SECCIÓN DINÁMICA (Campos Específicos según el tipo) */}

        <section className="bg-white p-8 rounded-[35px] shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-xl font-bold text-[#003153] mb-6">Detalles de la propiedad</h2>
          {!propertyType && (
            <p className="text-slate-500">Por favor, seleccione un tipo de propiedad para poder completar los detalles.</p>
          )}
          {propertyType && (
            <div>
              {propertyType === 'residential' && <ResidentialFields register={register} watch={watch} control={control} />}
              {propertyType === 'commercial' && <CommercialFields register={register} watch={watch} control={control} />}
              {propertyType === 'industrial' && <IndustrialFields register={register} watch={watch} control={control} />}
              {propertyType === 'land' && <LandFields register={register}/>}
            </div>
          )}
        </section>

        <section className="bg-white p-8 rounded-[35px] shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-[#003153] mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-amber-500 rounded-full inline-block"></span>
            Superficie
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="admin-label">Superficie Total (m²)</label>
              <input type="number" {...register('totalSurface')} className="admin-input" placeholder="Ej: 500" />
            </div>

            {/* La superficie cubierta no aplica a "Lotes" puros, pero sí a los demás */}
            {propertyType !== 'land' && propertySubtype !== 'lote industrial' && (
              <div className="animate-in zoom-in">
                <label className="admin-label">Superficie Cubierta (m²)</label>
                <input type="number" {...register('coveredSurface')} className="admin-input" placeholder="Ej: 120" />
              </div>
            )}

            {/* Si es un Lote o Industrial, quizás quieras superficie de frente/fondo */}
            {/* {(propertyType === 'land' || propertyType === 'industrial') && (
              <div className="grid grid-cols-2 gap-2 animate-in zoom-in">
                <div>
                  <label className="admin-label">Frente (m)</label>
                  <input type="number" {...register('frontMeters')} className="admin-input" />
                </div>
                <div>
                  <label className="admin-label">Fondo (m)</label>
                  <input type="number" {...register('backMeters')} className="admin-input" />
                </div>
              </div>
            )} */}
          </div>
        </section>

        {/* UBICACIÓN EXACTA */}
        <section className="bg-white p-8 rounded-[35px] shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-[#003153] mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-emerald-500 rounded-full inline-block"></span>
            Ubicación Exacta
          </h2>
          <p className="text-slate-500 mb-4">Seleccione un lugar en el mapa para obtener la dirección y coordenadas.</p>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2">
              <label className="admin-label">Dirección (Automático desde mapa)</label>
              <input {...register('address')} readOnly className="admin-input border-dashed border-slate-400 text-gray-400" placeholder="Ej: Calle Falsa 123" />
            </div>
            <div>
              <label className="admin-label">Localidad</label>
              <input {...register('locality')} readOnly className="admin-input border-dashed border-slate-400 text-gray-400" placeholder="Ej: Berazategui" />
            </div>
          </div>
          <LocationPicker setValue={setValue} watch={watch} />

        </section>


        <div className="flex justify-end pt-6">
          <button type="submit" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            Guardar Propiedad
          </button>
        </div>
      </form>
    </div>
  );
}