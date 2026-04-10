// Servicio para datos administrativos (Propietarios, Agentes, etc.)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const adminService = {
  getOwners: () => fetch(`${API_URL}/auth/owners`).then(res => res.json()),
  getAgents: () => fetch(`${API_URL}/auth/agents`).then(res => res.json()),
  getColleagues: () => fetch(`${API_URL}/auth/colleagues`).then(res => res.json()),
};