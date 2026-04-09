const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function getLocationHierarchy() {
  const res = await fetch(`${API_URL}/api/locations/hierarchy`);
  if (!res.ok) throw new Error('Error al cargar ubicaciones');
  return res.json();
}

export async function createQuickLocation(data: { name: string, districtId: number, provinceId: number }) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/api/locations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}