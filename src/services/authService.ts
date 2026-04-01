const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al iniciar sesión');
  }

  const data = await res.json();
  
  // Guardamos el token en localStorage para usarlo luego
  if (data.token) {
    localStorage.setItem('token', data.token);
  }

  return data;
}