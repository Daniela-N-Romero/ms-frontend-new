import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function InmoLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen flex flex-col">
      <Header type="inmobiliaria" />
      <main className="flex-1">
        {children} {/* Aquí es donde se cargará el page.tsx de inmobiliaria */}
      </main>
      <Footer type="inmobiliaria" />
    </section>
  );
}