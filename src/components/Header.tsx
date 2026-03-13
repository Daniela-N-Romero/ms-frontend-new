'use client';
import { useState } from 'react';
import { Menu, X, Instagram, Phone, Factory, House, LandPlot,ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Definimos qué "instrucciones" puede recibir nuestro Header
interface HeaderProps {
  type: 'inmobiliaria' | 'constructora';
}

export default function Header({ type }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isInmo = type === 'inmobiliaria';

  return (
    <>
    <header className={`sticky top-0 z-50 w-full py-4 px-6 flex justify-between items-center shadow-md transition-colors 
        ${isInmo ? 'bg-[#003153] text-white' : 'bg-white text-[#003153]'}`}>

      {/* Contenedor centralizador */}
      <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center w-full">

      {/* Logo dinámico */}
      <Link href={isInmo ? '/inmobiliaria' : '/constructora'}>
        <Image
          src={isInmo ? "/logos/logo-propiedades.webp" : "/logos/logo-constructora.webp"}
          alt="Logo"
          width={150}
          height={50}
          className={isInmo ? 'invert-0' : ''}
        />
      </Link>


      {/* Navegación Desktop Constructora */}
      {!isInmo && (
        <nav className="hidden lg:flex gap-6 text-[11px] font-semibold uppercase tracking-widest">
          <div className="group relative cursor-pointer py-2">
            <span className="flex items-center hover:text-blue-600">Nuestras Obras<ChevronDown size={16} className="inline ml-1" /> </span>
            <div className="absolute z-10 hidden group-hover:block bg-white shadow-xl p-4 min-w-[150px] top-full right-[-15] border border-gray-100 text-center">
              <a href="/constructora/obras/viviendas" className="block py-2 hover:text-blue-600 text-gray-600">Viviendas</a>
              <a href="/constructora/obras/industrial" className="block py-2 hover:text-blue-600 text-gray-600">Industrial</a>
            </div>
          </div>
          <div className="group relative cursor-pointer py-2">
            <span className="flex items-center hover:text-blue-600">Por Ambientes<ChevronDown size={16} className="inline ml-1" /> </span>
            <div className="absolute z-10 hidden group-hover:block bg-white shadow-xl p-4 min-w-[150px] top-full right-[-15] border border-gray-100 text-center">
              <a href="/constructora/ambientes/banios" className="block py-2 hover:text-blue-600 text-gray-600">Baños</a>
              <a href="/constructora/ambientes/cocinas" className="block py-2 hover:text-blue-600 text-gray-600">Cocinas</a>
              <a href="/constructora/ambientes/exteriores" className="block py-2 hover:text-blue-600 text-gray-600">Exteriores</a>
            </div>
          </div>
           <div className="group relative cursor-pointer py-2">
            <span className="flex items-center hover:text-blue-600">Servicios<ChevronDown size={16} className="inline ml-1" /> </span>
            <div className="absolute z-10 hidden group-hover:block bg-white shadow-xl p-4 min-w-[150px] top-full right-[-15] border border-gray-100 text-center">
              <a href="/constructora/servicios#planos" className="block py-2 hover:text-blue-600 text-gray-600">Planos</a>
              <a href="/constructora/servicios#construccion" className="block py-2 hover:text-blue-600 text-gray-600">Construcción</a>
              <a href="/constructora/servicios#remodelaciones" className="block py-2 hover:text-blue-600 text-gray-600">Remodelaciones</a>
            </div>
          </div>
        </nav>
      )}

      {/* Navegación Desktop Inmobiliaria */}
      {isInmo && (
        <nav className="hidden lg:flex gap-6 text-[11px] font-semibold uppercase tracking-widest text-white/90 items-center">
          <a href="/inmobiliaria/industrial" className="hover:text-white transition"><p className= "hover:border-b flex items-center"><Factory className="p-1"size={24}/>Industrial</p></a>
          <a href="/inmobiliaria/residencial" className="hover:text-white transition"><p className= "hover:border-b flex items-center"><House className="p-1"size={24}/>Residencial</p></a>
          <a href="/inmobiliaria/terrenos" className="hover:text-white transition"><p className= "hover:border-b flex items-center"><LandPlot className="p-1"size={24}/>Terrenos</p></a>
          <a href="/inmobiliaria/mapa" className="text-[#003153] hover:scale-103 transition font-bold p-1 bg-white/85 border border-white/20 rounded-md shadow-md">Ver Mapa</a>
        </nav>
      )}
      {/* Botón Menú Mobile */}
        <button 
          onClick={() => setIsOpen(true)}
          className={`lg:hidden p-2 rounded-md ${isInmo ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}
        >
          <Menu size={28} />
        </button>

        </div>

      </header>

      {/* OVERLAY / PANEL LATERAL MOBILE */}
      <div className={`fixed inset-0 z-[60] transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        {/* Fondo oscuro */}
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
        
        {/* Contenido del menú */}
        <nav className={`absolute right-0 top-0 h-full w-[80%] max-w-sm p-8 shadow-2xl flex flex-col
          ${isInmo ? 'bg-[#003153] text-white' : 'bg-white text-[#003153]'}`}>
          
          <div className="flex justify-between items-center mb-12">
            <span className="text-xs uppercase tracking-widest opacity-50 font-bold">Menú</span>
            <button onClick={() => setIsOpen(false)}><X size={32} /></button>
          </div>

          <div className="flex flex-col gap-6 text-xl font-light">
             <Link href="/" onClick={() => setIsOpen(false)}>Inicio Grupo</Link>
             {/* Aquí puedes replicar tus enlaces pero en lista simple para mobile */}
             <hr className="opacity-10" />
             <Link href="/contacto" onClick={() => setIsOpen(false)}>Contacto</Link>
          </div>

          <div className="mt-auto pt-8 border-t border-white/10 flex gap-4">
            <Instagram size={24} />
            <Phone size={24} />
          </div>
        </nav>
      </div>
    </>
  );
}