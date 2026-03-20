import Image from 'next/image';
import Link from 'next/link';
import { IndicadorAvanceMobile } from './IndicadorAvanceMobile';

interface ServiceCardProps {
  href: string;
  bgImage: string;
  logo: string;
  title: string;
  description: string;
  isInmo?: boolean; // Para lógica de colores específicos
}

export function ServiceCard({ href, bgImage, logo, title, description, isInmo }: ServiceCardProps) {
  return (
    
 <section className="h-1/2 flex-1 md:h-dvh relative group overflow-hidden border-b md:border-b-0 md:border-r border-gray-200">
        <div className="absolute inset-0 z-0 shadow-xl/100 transition-transform duration-[3000ms] group-hover:scale-110">
          <Image
            src= {bgImage}
            alt= {`MS Grupo - Sección ${title}`}
            fill
            className="object-cover grayscale md:grayscale-0"
          />
          {/* Base más sólida para que no sea pálido, en hover pasa a Azul Completo */}
          <div className="absolute inset-0 bg-[#003153]/60 md:bg-[#737373]/40 group-hover:bg-[#003153]/75 transition-all duration-700" />
        </div>

        <Link href={href} className="relative z-10 flex flex-col items-center justify-center h-full w-full p-8 pt-32 md:pt-8 text-center">
          {/* Logo con efecto de escala en hover */}
          <div className="mb-6 transition-all group-hover:bg-[#003153] group-hover:p-1/8 group-hover:shadow-lg  rounded-full duration-500 scale-110" >
            <Image src={logo} alt={title} width={160} height={80} />
          </div>

          <h2 className="text-4xl md:text-4xl text-white text-shadow-lg/50 text-shadow-lg/50 font-medium tracking-tighter group-hover:text-white transition-colors duration-500">
            {title}
          </h2>
          <p className="pt-4 max-w-xs text-sm md:text-base text-white font-medium leading-relaxed transition-colors duration-500">
            {description}
          </p>
          {/*  Indicador de botón en Mobile */}
          <IndicadorAvanceMobile message="Toca para ingresar" bgColor="#ffffff" textColor="#003153" />
          <div className="mt-8 h-[1px] w-16 bg-white md:bg-[#003153] group-hover:bg-white transition-all duration-500 group-hover:w-40" />
        </Link>
      </section>
  );
}