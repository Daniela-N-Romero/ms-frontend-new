const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function getPropertyBySlug(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/properties/slug/${slug}`, {
      cache: 'no-store' // Para desarrollo, luego podés usar revalidate
      // next: { revalidate: 3600 } // Cache de 1 hora para SEO
    });
    
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching property by slug:", error);
    return null;
  }
}