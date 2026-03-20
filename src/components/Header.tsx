'use client';
import { useState } from 'react';
import { Menu, X, Instagram, Phone, Factory, House, LandPlot,ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './navigation/MobileMenu';

// Clases para el header, con variantes para inmobiliaria y constructora
const headerStyles = {
  container: `sticky top-0 z-50 w-full py-4 px-6 flex justify-between items-center shadow-md transition-colors`,
  inmo: `bg-[#003153] text-white`,
  const: `bg-white text-[#003153]`
};

// Definimos qué "instrucciones" puede recibir nuestro Header
interface HeaderProps {
  type: 'inmobiliaria' | 'constructora';
}

export default function Header({ type }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isInmo = type === 'inmobiliaria';

  return (
    <>
    <header className={`${headerStyles.container} ${isInmo ? headerStyles.inmo : headerStyles.const}`}>

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

      )}
      {/* Botón Menú Mobile */}
        <button 
          onClick={() => setIsOpen(true)}
          className={`lg:hidden p-2 rounded-md ${isInmo ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}
        >
          <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} type={type}/>
        </button>

        </div>

      </header>


    </>
  );
}