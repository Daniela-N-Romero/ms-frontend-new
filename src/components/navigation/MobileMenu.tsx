'use client'; //el use client es necesario para usar el useState en este componente porque los componentes de Next.js son por defecto server components, y el useState solo funciona en client components
import { Instagram, X , Phone } from "lucide-react";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'inmobiliaria' | 'constructora';
}

export default function MobileMenu({ isOpen, onClose, type }: MobileMenuProps) {
  const isInmo = type === 'inmobiliaria';

  // Clases dinámicas según la sección
  const bgClass = isInmo ? 'bg-[#003153] text-white' : 'bg-white text-[#003153]';

  return (
          <div className={`fixed inset-0 z-[60] transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        {/* Fondo oscuro */}
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        
        {/* Contenido del menú */}
        <nav className={`absolute right-0 top-0 h-full w-[80%] max-w-sm p-8 shadow-2xl flex flex-col
          ${isInmo ? 'bg-[#003153] text-white' : 'bg-white text-[#003153]'}`}>
          
          <div className="flex justify-between items-center mb-12">
            <span className="text-xs uppercase tracking-widest opacity-50 font-bold">Menú</span>
            <button onClick={onClose}><X size={32} /></button>
          </div>

          <div className="flex flex-col gap-6 text-xl font-light">
             <Link href="/" onClick={onClose}>Inicio Grupo</Link>
             <hr className="opacity-10" />
             <Link href="/contacto" onClick={onClose}>Contacto</Link>
          </div>

          <div className="mt-auto pt-8 border-t border-white/10 flex gap-4">
            <Instagram size={24} className="cursor-pointer hover:opacity-70" />
            <Phone size={24} className="cursor-pointer hover:opacity-70" />
          </div>
        </nav>
      </div>
  ); 
}     