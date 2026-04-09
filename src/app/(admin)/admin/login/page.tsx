'use client';
import { useState } from 'react';
import { login } from '@/services/authService';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(username, password);
      // Si el login es exitoso, vamos al formulario de nueva propiedad
      router.push('/admin/propiedad/nueva');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white p-10 rounded-[40px] shadow-xl border border-slate-100 w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#003153] mb-6 text-center">Panel Admin</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="admin-label">Usuario</label>
            <input 
              type="text" 
              className="admin-input" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
          <div>
            <label className="admin-label">Contraseña</label>
            <input 
              type="password" 
              className="admin-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
          <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold hover:bg-blue-700 transition-all">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}