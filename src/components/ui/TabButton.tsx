// Sub-componente para los botones de las pestañas
export function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-1 px-5 py-2 rounded-t-xl text-xs font-bold uppercase tracking-tighter transition-all border border-slate-200/30
      ${active ? 'bg-white text-[#003153] shadow-sm' : 'bg-slate-800/20 text-white/60 hover:text-white'}`}
    >
      {icon}
      {label}
    </button>
  );
}