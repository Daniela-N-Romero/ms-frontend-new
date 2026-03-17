import Link from 'next/link';
import Image from 'next/image';

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
      <section className="h-1/2 md:flex-1 md:h-dvh relative group overflow-hidden border-b md:border-b-0 md:border-r border-gray-200">
        <div className="absolute inset-0 z-0 shadow-xl/100 transition-transform duration-[3000ms] group-hover:scale-110">
          <Image
            src="/images/bg-inmobiliaria.webp"
            alt="Background Inmobiliaria"
            fill
            className="object-cover grayscale md:grayscale-0"
          />
          {/* Base más sólida para que no sea pálido, en hover pasa a Azul Completo */}
          <div className="absolute inset-0 bg-[#003153]/60 md:bg-[#737373]/40 group-hover:bg-[#003153]/75 transition-all duration-700" />
        </div>

        <Link href="/inmobiliaria" className="relative z-10 flex flex-col items-center justify-center h-full w-full p-8 pt-32 md:pt-8 text-center">
          {/* Logo con efecto de escala en hover */}
          <div className="mb-6 transition-all group-hover:bg-[#003153] group-hover:p-1/8 group-hover:shadow-lg  rounded-full duration-500 scale-110" >
            <Image src="/logos/logo-propiedades-shadow.webp" alt="MS Propiedades" width={160} height={80} />
          </div>

          <h2 className="text-4xl md:text-4xl text-white text-shadow-lg/50 text-shadow-lg/50 font-medium tracking-tighter group-hover:text-white transition-colors duration-500">
            Inmobiliaria
          </h2>
          <p className="pt-4 max-w-xs text-sm md:text-base text-white font-medium leading-relaxed transition-colors duration-500">
            Especialistas en mercado industrial y residencial.
          </p>
          {/*  Indicador de botón en Mobile */}
          <div className="md:hidden mt-4 flex items-center  bg-white p-1  rounded-sm text-[#003153]/80 text-xs uppercase tracking-widest animate-bounce-x">
            Toca para ingresar
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <div className="mt-8 h-[1px] w-16 bg-white md:bg-[#003153] group-hover:bg-white transition-all duration-500 group-hover:w-40" />
        </Link>
      </section>

      {/* SECCIÓN CONSTRUCCIÓN */}
      <section className="h-1/2 md:flex-1 md:h-dvh relative group overflow-hidden ">
        <div className="absolute inset-0 z-0 transition-transform duration-[3000ms] group-hover:scale-110">
          <Image
            src="/images/bg-constructora.webp"
            alt="Background Constructora"
            fill
            className="object-cover"
          />
          {/* Base más sólida para que no sea pálido, en hover pasa a Azul Completo */}
          <div className="absolute inset-0 bg-[#003153]/60 md:bg-[#737373]/40 group-hover:bg-[#003153]/75 transition-all duration-700" />
        </div>

        <Link href="/constructora" className="relative z-10 flex flex-col items-center justify-center h-full w-full p-8 pt-24 md:pt-8 text-center">
          <div className="mb-6 scale-110 group-hover:bg-white/30 group-hover:p-1/8 group-hover:shadow-lg  rounded-full transition-all duration-500">
            <Image src="/logos/logo-constructora-white.webp" alt="MS Constructora" width={160} height={80} />
          </div>

          <h2 className="text-4xl md:text-4xl text-white text-shadow-lg/50 font-medium tracking-tighter group-hover:text-white transition-colors duration-500">
            Construcción
          </h2>
          <p className="pt-4 max-w-xs text-sm md:text-base text-white text-shadow-lg/50 font-medium leading-relaxed transition-colors duration-500">
            Diseño, proyectos y ejecución de obras personalizadas.
          </p>
          {/* Indicador de botón en Mobile */}
          <div className="md:hidden mt-4 flex items-center bg-white p-1 rounded-sm text-[#003153]/80 text-xs uppercase tracking-widest animate-bounce-x">
            Toca para ingresar
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <div className="mt-8 h-[1px] w-16 bg-white md:bg-[#003153] group-hover:bg-white transition-all duration-500 group-hover:w-40" />
          </Link>
      </section>

    </main>
  );
}