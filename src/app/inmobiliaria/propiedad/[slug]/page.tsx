// src/app/inmobiliaria/propiedad/[slug]/page.tsx
import { getPropertyBySlug } from "@/services/propertyService";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Maximize, BedDouble, Bath, Zap, Warehouse, Building2, Share2 } from "lucide-react";
import { ShareButton } from "@/components/ui/ShareButton";
import { ResidentialSpecs, IndustrialSpecs, CommercialSpecs, LandSpecs } from "./components/PropertySpecifics";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const property = await getPropertyBySlug(params.slug);
  if (!property) return { title: "Propiedad no encontrada" };

  return {
    title: `${property.name} | MS Propiedades`,
    description: property.description,
    openGraph: {
      images: [property.images[0]],
      title: property.name,
      description: property.description,
    },
  };
}

export default async function PropertyPage({ params }: { params: { slug: string } }) {
  const property = await getPropertyBySlug(params.slug);

  if (!property) notFound();

  const formattedPrice = `${property.currency} ${Number(property.price).toLocaleString('de-DE')}`;

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://msgrupoinmobiliario.com'}/inmobiliaria/propiedad/${property.slug}`;

  const agentPhone = property.contactAgent?.phoneNumber || "5491136358302";
  const whatsappUrl = `https://wa.me/${agentPhone}?text=Hola! Quiero más información sobre la propiedad: ${property.name} (${shareUrl})`;

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ENCABEZADO */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-bold text-[#003153] mb-3 leading-tight">
              {property.name}
            </h1>
            <div className="flex items-center gap-2 text-slate-500">
              <MapPin size={22} className="text-blue-600 flex-shrink-0" />
              <span className="text-lg font-medium">
                {property.address}, {property.locality}
              </span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[30px] shadow-sm border border-slate-100 min-w-[240px] flex flex-col items-center justify-center">
            <span className="text-xs uppercase font-black text-blue-500 tracking-widest mb-1">
              {property.category}
            </span>
            <span className="text-4xl font-black text-[#003153]">{formattedPrice}</span>
          </div>
        </div>

        {/* GALERÍA CON SHARE BUTTON */}
        <div className="relative mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[600px]">
            <div className="md:col-span-3 relative rounded-[40px] overflow-hidden shadow-2xl">
              <Image
                src={property.images[0]}
                alt={property.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
            <div className="hidden md:flex flex-col gap-4">
              {property.images.slice(1, 3).map((img: string, i: number) => (
                <div key={i} className="relative flex-1 rounded-[25px] overflow-hidden shadow-lg">
                  <Image src={img} alt={`${property.name} ${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* SHARE BUTTON */}
          <div className="absolute top-6 right-6 z-20">
            <ShareButton url={shareUrl} title={property.name} top="0" right="0" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* COLUMNA IZQUIERDA: CONTENIDO */}
          <div className="lg:col-span-2 space-y-10">

            {/* DESCRIPCIÓN */}
            <section className="bg-white p-10 rounded-[45px] shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-[#003153] mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
                Descripción
              </h2>
              <div className="text-slate-600 text-lg leading-relaxed whitespace-pre-line">
                {property.description}
              </div>
            </section>

            {/* ESPECIFICACIONES (JSONB por ahora) */}
            <section className="bg-white p-10 rounded-[45px] shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-[#003153] mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
                Detalles Técnicos
              </h2>

              {/* OJO AQUÍ: Como ahora usamos tablas de especialización, 
         los datos vienen en property.industrial, property.residential, etc.
         (siempre que en el backend uses el 'include')
      */}
              {property.type === 'industrial' && property.industrial && (<IndustrialSpecs specs={property.industrial} />)}
              {property.type === 'residencial' && property.residential && (<ResidentialSpecs specs={property.residential} />)}
              {property.type === 'comercial' && property.commercial && (<CommercialSpecs specs={property.commercial} />)}
              {property.type === 'lote' && property.land && (<LandSpecs specs={property.land} />)}
            </section>
          </div>

          {/* COLUMNA DERECHA: FICHA Y CONTACTO */}
          <aside>
            <div className="bg-[#003153] text-white p-10 rounded-[50px] shadow-2xl sticky top-28 border border-white/5">
              <h3 className="text-xl font-bold mb-8 border-b border-white/10 pb-4 tracking-tight">Ficha de Propiedad</h3>

              <div className="space-y-5">
                <TechItem icon={<Maximize size={20} />} label="Superficie Total" value={`${property.totalSurface} m²`} />
                <TechItem icon={<Maximize size={20} />} label="Sup. Cubierta" value={`${property.coveredSurface} m²`} />
                <TechItem icon={<Building2 size={20} />} label="Tipo" value={property.subtype} />
                <TechItem icon={<MapPin size={20} />} label="Zona" value={property.locality} />
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                className="w-full mt-10 bg-green-500 hover:bg-green-600 text-white font-bold py-5 rounded-3xl transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-green-500/20"
              >
                Contactar por WhatsApp
              </a>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}

// --- SUB-COMPONENTES AUXILIARES ---



function TechItem({ icon, label, value }: any) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-3 opacity-60 font-light">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <span className="font-semibold text-white tracking-wide">{value}</span>
    </div>
  );
}
