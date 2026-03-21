import { Factory, House, LandPlot, BriefcaseBusiness} from "lucide-react";

export function NavInmo(){
    return(
        <nav className="hidden lg:flex gap-6 text-[11px] font-semibold uppercase tracking-widest text-white/90 items-center">
          <a href="/inmobiliaria/industrial" className="hover:text-white transition"><p className= "hover:border-b flex items-center"><Factory className="p-1"size={24}/>Industrial</p></a>
          <a href="/inmobiliaria/residencial" className="hover:text-white transition"><p className= "hover:border-b flex items-center"><House className="p-1"size={24}/>Residencial</p></a>
          <a href="/inmobiliaria/terrenos" className="hover:text-white transition"><p className= "hover:border-b flex items-center"><LandPlot className="p-1"size={24}/>Terrenos</p></a>
          <a href="/inmobiliaria/comercial" className="hover:text-white transition"><p className= "hover:border-b flex items-center"><BriefcaseBusiness className="p-1"size={24}/>Comercial</p></a>
          <a href="/inmobiliaria/mapa" className="text-[#003153] hover:scale-103 transition font-bold p-1 bg-white/85 border border-white/20 rounded-md shadow-md">Ver Mapa</a>
        </nav>
    )
}