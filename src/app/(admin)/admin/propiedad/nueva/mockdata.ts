import { PropertyFormValues } from "@/types/property";

export const MOCK_PROPERTY_FOR_EDIT: PropertyFormValues = {
  category: "alquiler",
  name: "Galpón en el Pato",
  address: "calle x",
  locality: "ciudad",
  latitude: "0",
  longitude: "0",
  totalSurface: "100",
  coveredSurface: "80",
  description: "Acuerdo de prueba",
  type: "industrial", // exactly union value
  propertySource: "colega",
  colleagueId: "10",
  privateNotes: "Acuerdo de prueba",
  industrial: { height: "15", offices: "2", hasThreePhasePower: true },
  internalDocsUrls: [],
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  isPublished: true,
  colleague: {
    fullName: "Pablo",
    agencyName: "REMAX",
    phoneNumber: "112553589",
  },
  price: "100000",
  currency: "USD",
  images: [
    "https://via.placeholder.com/600x400",
    "https://via.placeholder.com/600x400",
  ],
  slug: "string",
  subtype: "",
};


export const MOCK_ADMIN_DATA = {
  propietarios: [
    { id: "1", fullName: "Adriana Dueña", phoneNumber: "1169279805" },
    { id: "2", fullName: "Juan Perez", phoneNumber: "1122334455" }
  ],
  colegas: [
    { id: "10", agencyName: "Bridge Propiedades", fullName: "Gastón", phoneNumber: "1199887766" },
    { id: "11", agencyName: "REMAX", fullName: "Pablo Fiorita", phoneNumber: "1144556677" }
  ],
  agentes: [
    { id: "100", fullName: "Agente MS 1", phoneNumber: "1100001111" }
  ]
};