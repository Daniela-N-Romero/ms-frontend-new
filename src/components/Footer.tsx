import { Instagram, MapPin, Phone } from 'lucide-react'; // Usaremos lucide-react para iconos limpios

interface FooterProps {
  type: 'inmobiliaria' | 'constructora';
}

export default function Footer({ type }: FooterProps) {
  const isInmo = type === 'inmobiliaria';
  
  // Estos datos luego vendrán de tu base de datos
  const contact = {
    ig: isInmo ? 'grupoms.propiedades' : 'grupoms.constructora',
    tel: isInmo ? '1136358302' : '1164773427',
    address: 'Calle 541 1311, El Pato, Berazategui',
    mapsUrl: 'https://maps.app.goo.gl/JnmmTvir5aZLUhfD8'
  };

  return (
    <footer className={`py-12 px-6 border-t ${isInmo ? 'bg-[#003153] text-white' : 'bg-white text-[#003153] border-gray-100'}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Contacto con enlaces directos */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-xs uppercase tracking-widest opacity-70">Contacto</h4>
          <div className="flex flex-col gap-3">
            <a href={contact.mapsUrl} target="_blank" className="flex items-center gap-2 text-sm hover:opacity-70 transition">
              <MapPin size={18} className="text-red-500" /> {contact.address}
            </a>
            <a href={`https://wa.me/${contact.tel}`} className="flex items-center gap-2 text-sm hover:opacity-70 transition">
              <Phone size={18} className="text-green-500" /> +54 9 {contact.tel}
            </a>
            <a href={`https://instagram.com/${contact.ig}`} target="_blank" className="flex items-center gap-2 text-sm hover:opacity-70 transition">
              <Instagram size={18} className="text-pink-500" /> @{contact.ig}
            </a>
          </div>
        </div>

        {/* Newsletter o CTA */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-xs uppercase tracking-widest opacity-70">Secciones</h4>
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <a href="/" className="hover:underline">Inicio Grupo</a>
            <a href="/nosotros" className="hover:underline">Nosotros</a>
            <a href="/contacto" className="hover:underline">Contacto</a>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 text-[10px] text-center opacity-50">
        © {new Date().getFullYear()} MS GRUPO INMOBILIARIO. Desarrollado con Next.js 15.
      </div>
    </footer>
  );
}