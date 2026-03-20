import { ChevronDown } from "lucide-react";

const groupStyles = "group relative cursor-pointer py-2";
const menuStyles = "flex items-center gap-1 hover:text-blue-600";
const dropdownStyles = "absolute z-10 hidden group-hover:block bg-white shadow-xl p-4 min-w-[150px] top-full right-[-15] border border-gray-100 text-center";
const linkStyles = "block py-2 hover:text-blue-600 text-gray-600";

export function NavConst(){
    return(
        <nav className="hidden max-h-screen lg:flex gap-6 text-[11px] font-semibold uppercase tracking-widest">
          <div className={groupStyles}>
            <span className={menuStyles}>Nuestras Obras<ChevronDown size={16} className="inline ml-1" /> </span>
            <div className={dropdownStyles}>
              <a href="/constructora/obras/viviendas" className={linkStyles}>Viviendas</a>
              <a href="/constructora/obras/industrial" className={linkStyles}>Industrial</a>
            </div>
          </div>
          <div className={groupStyles}>
            <span className={menuStyles}>Por Ambientes<ChevronDown size={16} className="inline ml-1" /> </span>
            <div className={dropdownStyles}>
              <a href="/constructora/ambientes/banios" className={linkStyles} >Baños</a>
              <a href="/constructora/ambientes/cocinas" className={linkStyles}>Cocinas</a>
              <a href="/constructora/ambientes/exteriores" className={linkStyles}>Exteriores</a>
            </div>
          </div>
           <div className={groupStyles}>
            <span className={menuStyles}>Servicios<ChevronDown size={16} className="inline ml-1" /> </span>
            <div className={dropdownStyles}>
              <a href="/constructora/servicios#planos" className={linkStyles}>Planos</a>
              <a href="/constructora/servicios#construccion" className={linkStyles}>Construcción</a>
              <a href="/constructora/servicios#remodelaciones" className={linkStyles}>Remodelaciones</a>
            </div>
          </div>
        </nav>
    )
}