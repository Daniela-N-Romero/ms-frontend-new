import { BriefcaseBusiness, Factory, Home, LandPlot } from "lucide-react";
import { CategoryCard } from "../ui/CategoryCard";

 export function ShortcutsInmo() {
return ( 
 <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#003153] tracking-tight">Explorá por sector</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <CategoryCard 
            icon={<LandPlot size={40} />} 
            title="Terrenos y Lotes" 
            desc="Oportunidades de inversión en tierra para desarrollo o vivienda."
            link="/inmobiliaria/terrenos"
          />
          <CategoryCard 
              icon={<Factory size={40} />} 
              title="Sector Industrial" 
              desc="Galpones, depósitos y parques industriales estratégicos."
              link="/inmobiliaria/industrial"
            />
          <CategoryCard 
            icon={<Home size={40} />} 
            title="Residencial" 
            desc="Casas y departamentos en las mejores zonas de El Pato y alrededores."
            link="/inmobiliaria/residencial"
          />
          <CategoryCard 
            icon={<BriefcaseBusiness size={40} />} 
            title="Comercial" 
            desc="Locales, oficinas y espacios comerciales en zona estratégica."
            link="/inmobiliaria/comercial"
          />

        </div>
      </section>
);
}