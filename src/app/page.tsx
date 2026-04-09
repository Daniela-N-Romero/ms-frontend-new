import Image from 'next/image';
import { ServiceCard} from '@/components/ui/ServiceCards';

export default function LandingPage() {
  return (
    <main className="relative flex flex-col md:flex-row min-h-screen w-full bg-slate-50 overflow-hidden">

      {/* LOGO SUPERIOR (Identidad de Marca) */}
      <div className="left-[90] opacity-80 absolute md:left-1/2 -translate-x-1/2 z-40 w-full flex justify-center p-4 md:top-12">
        <div>
          <Image
            src="/logos/logo-grupo-bg.webp"
            alt="MS Grupo Inmobiliario"
            width={180}
            height={80}
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* SECCIÓN INMOBILIARIA */}

      <ServiceCard href="/inmobiliaria" bgImage="/images/bg-inmobiliaria.webp" logo="/logos/logo-propiedades-shadow.webp" title="Inmobiliaria" description="Especialistas en mercado industrial y residencial." isInmo={true} />
  
      <ServiceCard href="/constructora" bgImage="/images/bg-constructora.webp" logo="/logos/logo-constructora-white.webp" title="Construcción" description="Diseño, proyectos y ejecución de obras personalizadas." isInmo={false} />

    </main>
  );
}