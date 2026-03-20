import Image from 'next/image';
import PropertySearch from '@/components/inmobiliaria/PropertySearch';
import { Factory, Home, LandPlot } from 'lucide-react';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { ShortcutsInmo } from '@/components/inmobiliaria/ShortcutsInmo';
import { PropertyCard } from '@/components/inmobiliaria/PropertyCard';

export default function InmobiliariaPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* --- SECCIÓN HERO --- */}
      <section className="relative h-[70vh] md:h-[80vh] w-full flex items-center justify-center">
        {/* Imagen de Fondo con Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bg-inmobiliaria.webp" // Asegurate de que esta ruta exista
            alt="MS Propiedades Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#003153]/80 via-[#003153]/40 to-transparent" />
        </div>

        {/* Contenido del Hero */}
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4 animate-fade-in">
            Tu próximo destino, <br className="hidden md:block" />
            <span className="text-blue-300">en manos expertas.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto mb-8">
            Especialistas en naves industriales, terrenos logísticos y residencias exclusivas en Berazategui y Zona Sur.
          </p>
        </div>
      </section>

      {/* --- EL BUSCADOR (Posicionado con margen negativo) --- */}
      <section className="relative z-30 -mt-16 md:-mt-12">
        <PropertySearch />
      </section>

      {/* --- SECCIÓN DE ACCESOS RÁPIDOS / CATEGORÍAS --- */}
      <ShortcutsInmo />

      {/* --- PROPIEDADES DESTACADAS (Placeholder) --- */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#003153]">Propiedades Destacadas</h2>
              <p className="text-slate-500 mt-2">Nuestra selección exclusiva de la semana.</p>
            </div>
            <button className="text-[#003153] font-bold border-b-2 border-[#003153] hover:text-blue-600 hover:border-blue-600 transition-all">
              Ver todas
            </button>
          </div>

          {/* Aquí iría tu componente de PropertyCard mapeando los datos de tu Backend */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
          </div>

        </div>
      </section>
    </main>
  );
}
