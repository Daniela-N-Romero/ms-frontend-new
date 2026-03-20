// src/config/site.ts

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
    ]
  },
  
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
        ]
      }
    ]
  }
};

export type SiteConfig = typeof siteConfig;