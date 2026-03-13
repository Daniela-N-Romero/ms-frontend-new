import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ConstructoraLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen flex flex-col">
      <Header type="constructora" />
      <main className="flex-1">
        {children} {/* Aquí es donde se cargará el page.tsx de constructora */}
      </main>
      <Footer type="constructora" />
    </section>
  );
}