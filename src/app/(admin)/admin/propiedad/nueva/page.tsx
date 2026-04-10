'use client';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

// Importaciones de tus nuevos archivos de organización
import { PropertyFormValues, PROPERTY_SUBTYPES } from '@/types/property';
import { INITIAL_PROPERTY_VALUES } from '../constants/formDefaults';
import { MOCK_PROPERTY_FOR_EDIT, MOCK_ADMIN_DATA } from './mockdata'; 
import { createProperty } from '@/services/propertyService';

// Componentes Presentacionales
import BasicInfoFields from '../components/BasicInfoFields';
import SurfaceFields from '../components/SurfaceFields';
import LocationSection from '../components/LocationSection';
import MediaSection from '../components/MediaSection';
import ResidentialFields from '../components/ResidentialFields';
import CommercialFields from '../components/CommercialFields';
import IndustrialFields from '../components/IndustrialFields';
import LandFields from '../components/LandFields';
import AdminPrivateFields from '../components/AdminPrivateFields';
import SourceFields from '../components/SourceFields';

// Mapa con carga dinámica para no pesar en el servidor
const LocationPicker = dynamic(
  () => import('../components/LocationPicker'),
  { ssr: false, loading: () => <div className="h-[400px] bg-slate-100 animate-pulse rounded-[30px] flex items-center justify-center">Cargando Mapa...</div> }
);


export default function PropertyFormPage() {

  const { register, watch, handleSubmit, setValue, control, reset,  formState: { errors }} = useForm<PropertyFormValues>({
   defaultValues: INITIAL_PROPERTY_VALUES
  });

  // Observamos cambios en el tipo para la lógica dinámica
  const propertyType = watch('type');

  // Simulación de carga de datos para edición
  useEffect(() => {
    const modoEdicion = true;
    if (!modoEdicion) return;
    if (modoEdicion) {reset(MOCK_PROPERTY_FOR_EDIT)};
    }, [reset]);

  // Función para manejar el envío del formulario
  const onSubmit = async (data: PropertyFormValues) => {
  try {
    const formData = new FormData();

    // 1. Agregamos campos simples (nombre, dirección, etc.)
    Object.keys(data).forEach(key => {
      const value = data[key as keyof PropertyFormValues];
      if (key !== 'images' && key !== 'pdfUrl' && typeof value !== 'object') {
        formData.append(key, String(value));
      }
    });

    // 2. Empaquetamos las características específicas (JSON)
    const specs = data[data.type as keyof PropertyFormValues] || {};
    formData.append('specificCharacteristics', JSON.stringify(specs));

    // 3. Agregamos las imágenes (Archivos reales)
    if (data.images && data.images.length > 0) {
      data.images.forEach((file: any) => {
        // file debe ser un objeto File de la subida
        formData.append('images', file); 
      });
    }

    // 4. Llamamos al servicio (aquí necesitarás el token de tu Auth)
    const result = await createProperty(formData);
    alert("Propiedad creada con éxito: " + result.name);
  } catch (error) {
    console.error(error);
    alert("Error al guardar la propiedad");
  }
  };


  return (
    <div className="max-w-5xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* CABECERA Y TIPO */}
        <BasicInfoFields register={register} setValue={setValue} watch={watch} subtypes={PROPERTY_SUBTYPES} />

        {/* SECCIÓN DINÁMICA (Campos Específicos según el tipo) */}

        <section className="bg-white p-8 rounded-[35px] shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-[#003153] mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-emerald-500 rounded-full inline-block"></span>
            Detalles de la propiedad</h2>
          {!propertyType && (
            <p className="text-slate-500">Por favor, seleccione un tipo de propiedad para poder completar los detalles.</p>
          )}
          {propertyType && (
            <div>
              {propertyType === 'residential' && <ResidentialFields register={register} watch={watch} control={control} />}
              {propertyType === 'commercial' && <CommercialFields register={register} watch={watch} control={control} />}
              {propertyType === 'industrial' && <IndustrialFields register={register} watch={watch} control={control} />}
              {propertyType === 'land' && <LandFields register={register} />}
            </div>
          )}
        </section>


        <SurfaceFields register={register} watch={watch} propertyType={propertyType} />

        <LocationSection register={register} setValue={setValue} watch={watch} control={control} errors={errors}/>  

        <section className="bg-white p-8 rounded-[35px] shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-[#003153] mb-6">Descripción y Documentos</h2>
          <div className="space-y-6">
            <div>
              <label className="admin-label">Descripción Pública</label>
              <textarea 
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
        </section>

        <MediaSection register={register} setValue={setValue} watch={watch} />

        <SourceFields register={register} watch={watch} setValue={setValue} control={control}
          propietarios={MOCK_ADMIN_DATA.propietarios} colegas={MOCK_ADMIN_DATA.colegas}agentes={MOCK_ADMIN_DATA.agentes}
        />        
        
        <AdminPrivateFields register={register} watch={watch} />

        {/* BOTON DE ENVIO DE FROMULARIO */}
        <div className="flex justify-end pt-6">
          <button type="submit" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                    Guardar Propiedad
          </button>
        </div>
      </form>
    </div>
  );
}
