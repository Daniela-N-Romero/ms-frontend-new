const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const propertyService = {
  // Obtener una propiedad para editar
  getById: async (id: string) => {
    const res = await fetch(`${API_URL}/properties/${id}`);
    if (!res.ok) throw new Error('Error al obtener la propiedad');
    const data = await res.json();
    return {
      ...data,
      [data.type]: data.specificCharacteristics 
    };
  },

  // Crear nueva
  create: async (formData: FormData) => {
    const res = await fetch(`${API_URL}/properties`, {
      method: 'POST',
      body: formData,
      // Nota: No envíes Content-Type manual, el navegador lo hace solo con FormData
    });
    return res.json();
  },

  // Actualizar existente
  update: async (id: string, formData: FormData) => {
    const res = await fetch(`${API_URL}/properties/${id}`, {
      method: 'PUT',
      body: formData,
    });
    return res.json();
  }
};
