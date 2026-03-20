// src/components/Footer.tsx
import { Instagram, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

interface FooterProps {
  type: 'inmobiliaria' | 'constructora';
}

export default function Footer({ type }: FooterProps) {
  const isInmo = type === 'inmobiliaria';
  
  // Extraemos la configuración específica según el tipo
  const config = isInmo ? siteConfig.inmobiliaria : siteConfig.constructora;

  return (
    <footer className={`py-12 px-6 border-t transition-colors duration-500 ${
      isInmo 
        ? 'bg-[#003153] text-white border-white/10' 
        : 'bg-white text-[#003153] border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        
        {/* COLUMNA 1: CONTACTO DINÁMICO */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-xs uppercase tracking-widest opacity-70">
            Contacto {config.name}
          </h4>
          <div className="flex flex-col gap-3">
            <a 
              href={siteConfig.googleMaps} 
              target="_blank" 
              className="flex items-center gap-2 text-sm hover:opacity-70 transition"
            >
              <MapPin size={18} className="text-red-500" /> 
              {siteConfig.address}
            </a>
            <a 
              href={`https://wa.me/${config.phone}`} 
              className="flex items-center gap-2 text-sm hover:opacity-70 transition"
            >
              <Phone size={18} className="text-green-500" /> 
              +54 9 {config.phone}
            </a>
            <a 
              href={`https://instagram.com/${config.instagram}`} 
              target="_blank" 
              className="flex items-center gap-2 text-sm hover:opacity-70 transition"
            >
              <Instagram size={18} className="text-pink-500" /> 
              @{config.instagram}
            </a>
          </div>
        </div>

        {/* COLUMNA 2: SECCIONES ESPECÍFICAS */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-xs uppercase tracking-widest opacity-70">
            Explorar {isInmo ? 'Propiedades' : 'Obras'}
          </h4>
          <nav className="flex flex-col gap-2 text-sm">
            {config.links.map((link) => (
              // Si el link tiene href directo lo usamos, si no (es subLinks), apuntamos a la sección principal
              <Link 
                key={link.label} 
                href={link.href || (link.subLinks ? link.subLinks[0].href : '#')} 
                className="hover:underline opacity-80 hover:opacity-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* COLUMNA 3: NAVEGACIÓN GLOBAL */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-xs uppercase tracking-widest opacity-70">Corporativo</h4>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/" className="hover:underline opacity-80">Inicio Grupo</Link>
          </nav>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-current/10 text-[10px] text-center opacity-50">
        © {new Date().getFullYear()} {siteConfig.name.toUpperCase()}. 
        Todos los derechos reservados.
      </div>
    </footer>
  );
}