'use client';
import { useState } from 'react';
import { Search, Map, Factory, Home, LandPlot, ChevronDown } from 'lucide-react';
import { TabButton } from '../ui/TabButton';

type SearchCategory = 'industrial' | 'residencial' | 'terrenos';

export default function PropertySearch() {
  const [category, setCategory] = useState<SearchCategory>('industrial');

  return (
    <div className="w-full max-w-5xl mx-auto px-4 -mt-12 relative z-20">
      {/* 1. TABS DE CATEGORÍA */}
      <div className="flex gap-1 mb-2 ml-2">
        <TabButton 
          active={category === 'industrial'} 
          onClick={() => setCategory('industrial')}
          icon={<Factory size={16} />}
          label="Industrial"
        />
        <TabButton 
          active={category === 'residencial'} 
          onClick={() => setCategory('residencial')}
          icon={<Home size={16} />}
          label="Residencial"
        />
        <TabButton 
          active={category === 'terrenos'} 
          onClick={() => setCategory('terrenos')}
          icon={<LandPlot size={16} />}
          label="Terrenos"
        />
      </div>

      {/* 2. CUERPO DEL BUSCADOR */}
      <div className="bg-white rounded-2xl md:rounded-full shadow-2xl p-2 md:p-3 flex flex-col md:flex-row items-center gap-2 border border-slate-200">
        
        {/* Ubicación / Palabra clave */}
        <div className="w-full md:flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-slate-100">
          <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">Ubicación</label>
          <div className="flex items-center gap-2">
            <Search size={18} className="text-[#003153]" />
            <input 
              type="text" 
              placeholder="¿Dónde buscamos?" 
              className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-300 text-sm"
            />
          </div>
        </div>

        {/* Tipo de Operación */}
        <div className="w-full md:w-48 px-4 py-2 border-b md:border-b-0 md:border-r border-slate-100 group cursor-pointer">
          <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold">Operación</label>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Venta / Alquiler</span>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
        </div>

        {/* Filtros extra (Mobile: se puede ocultar o simplificar) */}
        <div className="hidden lg:block w-40 px-4 py-2 border-r border-slate-100">
          <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold">Presupuesto</label>
          <span className="text-sm text-slate-600 italic">Cualquiera</span>
        </div>

        {/* BOTONES DE ACCIÓN */}
        <div className="w-full md:w-auto flex gap-2 p-1">
          <button className="flex-1 md:flex-none bg-[#003153] text-white px-8 py-3 rounded-xl md:rounded-full font-bold text-sm hover:bg-blue-900 transition-all flex items-center justify-center gap-2">
            <Search size={18} />
            Buscar
          </button>
          <button className="bg-slate-100 text-[#003153] p-3 rounded-xl md:rounded-full hover:bg-slate-200 transition-all shadow-inner" title="Ver en mapa">
            <Map size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

