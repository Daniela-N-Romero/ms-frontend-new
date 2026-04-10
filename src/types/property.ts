
export type PropertyType = "" | "residential" | "industrial" | "commercial" | "land";

export const PROPERTY_SUBTYPES : Record<string, string[]>= {
  residential: ['Casa', 'Departamento', 'PH', 'Duplex', 'Quinta'],
  industrial: ['Nave', 'Galpón', 'Lote Industrial'],
  commercial: ['Oficina', 'Local', 'Salón'],
  land: ['Terreno', 'Campo', 'Lote en Barrio Cerrado']
};

export interface PropertyFormValues {
  id: number;
  name: string;
  address: string;
  locationId: number;

  totalSurface: string;
  coveredSurface?: string;

  category:string;
  latitude: string;
  longitude: string;
  description: string;
  type: PropertyType;
  subtype: string;

  propertySource: "ms_propia" | "colega";
  privateNotes?: string;
  
  residential?: { isNew?: boolean, age?: string, rooms?: string, bathrooms?: string, hasPool?: boolean, hasGrill?: boolean, hasGarden?: boolean, hasAC?: boolean, hasGarage?: boolean, hasLaundry?: boolean, hasDressingRoom?: boolean, hasGym?: boolean, isFurnished?: boolean, hasNaturalGas?: boolean },
  commercial?: { isNew?: boolean, age?: string, rooms?: string, bathrooms?: string, hasAC?: boolean, hasParking?: boolean, hasRollingShutter?: boolean, hasKitchen?: boolean, hasFireProtection?: boolean },
  industrial?: { isNew?: boolean, age?: string, height?: string, offices?: string, bathrooms?: string, hasParking?: boolean, hasFullSoul?: boolean, hasThreePhasePower?: boolean, hasIndustrialGas?: boolean, hasFireNetwork?: boolean, isInsidePark?: boolean, zonification?: string },
  land?: { frontMeters?: string, backMeters?: string, hasWaterLine?: boolean, hasGasLine?: boolean, hasSewerLine?: boolean, hasElectricity?: boolean, isFenced?: boolean, isGatedNeighborhood?: boolean },
  
  internalDocsUrls?: string[];
  videoUrl?: string;
  pdfUrl?: string;
  isPublished: boolean;
  
  colleagueId?: number;
  colleague?: { fullName: string, agencyName?: string, phoneNumber: string, email?: string };
  ownerId?: number;
  owner?: { fullName: string, phoneNumber: string, email?: string };
  agentId?: number;
  agent?: { fullName: string, phoneNumber: string, email?: string };  
  
  price: string;
  currency: string;
  images: any[];
  slug: string;
}
  
