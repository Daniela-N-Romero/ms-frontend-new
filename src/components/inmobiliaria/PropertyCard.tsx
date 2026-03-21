'use client';
import Image from 'next/image';
import { MapPin, Maximize, BedDouble, Bath } from 'lucide-react';
import { ShareButton } from '../ui/ShareButton';
import Link from 'next/link';

interface PropertyCardProps {
  property: any; 
}

export default function PropertyCard({ property }: PropertyCardProps) {
  // 1. Lógica de nombres de columna reales
  const isLote = ['Lote', 'Terreno', 'Fracción', 'Quinta'].includes(property.subtype);
  const areaAMostrar = isLote ? property.totalSurface : property.coveredSurface;
  const etiquetaArea = isLote ? 'Total' : 'Cubierta';

  // 2. Manejo de URL (Evitamos window en el render inicial para Next.js)
  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/inmobiliaria/propiedad/${property.slug}` 
    : '';

  const formattedPrice = `${property.currency} ${Number(property.price).toLocaleString('de-DE')}`;

  // 3. Lógica de Agente para WhatsApp
  // Si contactAgent existe (por el include del back), usamos su número. 
  // Si no, un número de la empresa por defecto.
  const agentPhone = property.contactAgent?.phoneNumber || "5491136358302"; 
  const whatsappUrl = `https://wa.me/${agentPhone}?text=Hola! Quiero más información sobre la propiedad: ${property.name} (${shareUrl})`;

  return (
    <div className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-[520px]">
      
      {/* SECCIÓN SUPERIOR: IMAGEN */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image 
          src={property.images?.[0] || '/placeholder-propiedad.jpg'} 
          alt={property.name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* BADGES */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
            {property.category} {/* Venta / Alquiler */}
          </span>
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#003153] shadow-sm">
            {property.subtype}
          </span>
        </div>

        <ShareButton url={shareUrl} title={property.name} top="1rem" right="1rem" />
      </div>

      {/* SECCIÓN INFERIOR: CONTENIDO */}
      <div className="p-6 flex flex-col flex-grow">
        <Link href={`/inmobiliaria/propiedad/${property.slug}`} className="block">
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className="text-lg font-bold text-[#003153] leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 h-11">
              {property.name}
            </h3>
          </div>
          <span className="text-2xl font-black text-[#003153] block mb-3">
            {formattedPrice}
          </span>
        </Link>

        {/* DIRECCIÓN CON TRUNCATE (...) */}
        <div className="flex items-center gap-1 text-slate-400 text-sm mb-4">
          <MapPin size={14} className="shrink-0 text-blue-400" />
          <span className="truncate italic w-full">
            {property.address}, {property.locality}
          </span>
        </div>

        {/* CARACTERÍSTICAS DINÁMICAS */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 text-slate-500">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-black text-slate-300 tracking-wider leading-none mb-1">{etiquetaArea}</span>
            <div className="flex items-center gap-1">
              <Maximize size={16} className="text-blue-500/70" />
              <span className="text-sm font-bold text-slate-700">{areaAMostrar} m²</span>
            </div>
          </div>
          
          {/* Mostramos ambientes/baños si están en specificCharacteristics */}
          {!isLote && property.specificCharacteristics && (
            <>
              {property.specificCharacteristics.bedrooms && (
                <div className="flex flex-col border-l border-slate-100 pl-4">
                  <span className="text-[9px] uppercase font-black text-slate-300 tracking-wider leading-none mb-1">Dorm.</span>
                  <div className="flex items-center gap-1">
                    <BedDouble size={16} className="text-blue-500/70" />
                    <span className="text-sm font-bold text-slate-700">{property.specificCharacteristics.bedrooms}</span>
                  </div>
                </div>
              )}

              {property.specificCharacteristics.bathrooms && (
                <div className="flex flex-col border-l border-slate-100 pl-4">
                  <span className="text-[9px] uppercase font-black text-slate-300 tracking-wider leading-none mb-1">Baños</span>
                  <div className="flex items-center gap-1">
                    <Bath size={16} className="text-blue-500/70" />
                    <span className="text-sm font-bold text-slate-700">{property.specificCharacteristics.bathrooms}</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* BOTÓN WHATSAPP DEL AGENTE */}
        <a 
          href={whatsappUrl}
          target="_blank"
          className="mt-4 w-full bg-green-500 text-white text-center py-2 rounded-xl font-bold text-xs hover:bg-green-600 transition-colors"
        >
          Consultar Agente
        </a>
      </div>
    </div>
  );
}