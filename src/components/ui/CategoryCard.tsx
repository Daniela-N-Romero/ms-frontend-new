
export function CategoryCard({ icon, title, desc, link }: { icon: any, title: string, desc: string, link: string }) {
  return (
    <a href={link} className="group p-8 border border-slate-100 rounded-3xl bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
      <div className="text-[#003153] group-hover:text-blue-500 transition-colors mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#003153] mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </a>
  );
}