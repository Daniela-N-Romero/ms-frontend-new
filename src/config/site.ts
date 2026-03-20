// src/config/site.ts

// 1. Definimos cómo es un link simple y cómo es un link con sub-menú
export interface NavLink {
  label: string;
  href?: string;     
  subLinks?: { label: string; href: string }[]; 
}

interface SectionConfig {
  name: string;
  phone: string;
  instagram: string;
  links: NavLink[]; 
}

export const siteConfig = {
  name: "MS Grupo Inmobiliario",
  url: "https://grupoms.com.ar",
  address: "Calle 541 1311, El Pato, Berazategui",
  googleMaps: "https://goo.gl/maps/tu-enlace-aqui",
  
  // Datos específicos por unidad de negocio
  inmobiliaria: {
    name: "MS Propiedades",
    phone: "1136358302",
    instagram: "grupoms.propiedades",
    links: [
      { label: "Industrial", href: "/inmobiliaria/industrial" },
      { label: "Residencial", href: "/inmobiliaria/residencial" },
      { label: "Terrenos", href: "/inmobiliaria/terrenos" },
      { label: "Ver Mapa", href: "/inmobiliaria/mapa" },
    ]
  } as SectionConfig,
  
  constructora: {
    name: "MS Constructora",
    phone: "1164773427",
    instagram: "grupoms.constructora",
    links: [
      { 
        label: "Nuestras Obras", 
        subLinks: [
          { label: "Viviendas", href: "/constructora/obras/viviendas" },
          { label: "Industrial", href: "/constructora/obras/industrial" },
        ]
      },
      { 
        label: "Ambientes", 
        subLinks: [
          { label: "Baños", href: "/constructora/ambientes/banios" },
          { label: "Cocinas", href: "/constructora/ambientes/cocinas" },
          { label: "Exteriores", href: "/constructora/ambientes/exteriores" },
        ]
      },
      { 
        label: "Servicios", 
        subLinks: [
          { label: "Planos", href: "/constructora/servicios#planos" },
          { label: "Construcción", href: "/constructora/servicios#construccion" },
          { label: "Remodelaciones", href: "/constructora/servicios#remodelaciones" },
        ]
      }
    ]
  }as SectionConfig
};

export type SiteConfig = typeof siteConfig;
