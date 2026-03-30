// src/services/properties.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllProperties() {
  try {
    const response = await fetch(`${API_URL}/api/propiedades`); 
    if (!response.ok) throw new Error('Error al obtener propiedades');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}