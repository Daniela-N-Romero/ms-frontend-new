'use client';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './navigation/MobileMenu';
import { NavConst } from './navigation/NavConst';
import { NavInmo } from './navigation/NavInmo';

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
            />
          </Link>

          {/* Navegación Desktop */}
          {isInmo ? <NavInmo /> : <NavConst />}

          {/* Botón Menú Mobile */}
          <button
            onClick={() => setIsOpen(true)}
            className={`lg:hidden p-2 rounded-md ${isInmo ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}
          >
            <Menu size={28} /> {/* Solo el icono aquí */}
          </button>

        </div>
        <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} type={type}/>
      </header>
    </>
  );
}