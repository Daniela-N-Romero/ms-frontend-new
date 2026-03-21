import { Zap, Warehouse, BedDouble, Bath, Home, Droplets, Flame, Wind, Car, Utensils, Waves, Trees, Fence, Armchair, FireExtinguisher, BellElectric, Blinds, AirVent, HousePlus, Clock, Shirt, WashingMachine, Dumbbell, RulerDimensionLine, BriefcaseBusiness, SquareChartGantt, Factory } from "lucide-react";

interface SpecProps {
    icon: any;
    label: string;
    value: string | number | boolean | null | undefined;
}

// Componente base reutilizable
function SpecBox({ icon, label, value }: SpecProps) {
if (value === null || value === undefined || value === false || value === 0 || value === '0') {
    return null;
  }
  
  const displayValue = typeof value === 'boolean' ? 'Sí' : value;

  return (
    <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center hover:bg-white hover:shadow-md transition-all">
      <div className="text-blue-500 mb-3 p-3 bg-blue-50 rounded-2xl">{icon}</div>
      <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">{label}</span>
      <span className="font-bold text-[#003153]">{displayValue}</span>
    </div>
  );
}

export function IndustrialSpecs({ data }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <SpecBox icon={<Wind />} label="A Estrenar" value={data.isNew} />
      <SpecBox icon={<Clock />} label="Antiguedad" value={data.age ? `${data.age} años` : false} />
      <SpecBox icon={<RulerDimensionLine />} label="Altura" value={data.height ? `${data.height}m` : false} />
      <SpecBox icon={<BriefcaseBusiness />} label="Oficinas" value={data.offices}/>
      <SpecBox icon={<Bath />} label="Baños" value={data.bathrooms}/>
      <SpecBox icon={<Car />} label="Estacionamiento" value={data.parking} />
      <SpecBox icon={<Warehouse />} label="Alma Llena" value={data.fullSoul} />
      <SpecBox icon={<Zap />} label="Trifásica" value={data.threePhasePower} />
      <SpecBox icon={<Flame />} label="Gas Ind." value={data.industrialGas} />
      <SpecBox icon={<BellElectric />} label="Red Hidrante" value={data.fireNetwork} />
      <SpecBox icon={<Factory />} label="En Parque Ind." value={data.insidePark} />
      <SpecBox icon={<SquareChartGantt />} label="Zonificación" value={data.zonification} />
    </div>
  );
}

export function ResidentialSpecs({ specs }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <SpecBox icon={<Home />} label="A Estrenar" value={specs.isNew} />
        <SpecBox icon={<Clock />} label="Antiguedad" value={specs.age ? `${specs.age} años` : false} />
        <SpecBox icon={<BedDouble />} label="Dormitorios" value={specs.rooms} />
        <SpecBox icon={<Bath />} label="Baños" value={specs.bathrooms} />
        <SpecBox icon={<AirVent />} label="Aire Acondicionado" value={specs.hasAC} />
        <SpecBox icon={<Car />} label="Garage" value={specs.hasGarage} />
        <SpecBox icon={<Utensils />} label="Parrilla" value={specs.hasGrill} />
        <SpecBox icon={<WashingMachine />} label="Lavadero" value={specs.hasLaundry} />
        <SpecBox icon={<Waves />} label="Pileta" value={specs.hasPool} />
        <SpecBox icon={<Shirt />} label="Vestidor" value={specs.hasDressingRoom} />
        <SpecBox icon={<Trees />} label="Jardín" value={specs.hasGarden} />
        <SpecBox icon={<Dumbbell />} label="Gimnasio" value={specs.hasGym} />
        <SpecBox icon={<Armchair />} label="Amoblado" value={specs.isFurnished} />
        <SpecBox icon={<Flame />} label="Gas Natural" value={specs.hasNaturalGas} />
    </div>
  );
}


export function CommercialSpecs({ specs }: any) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <SpecBox icon={<Home />} label="A Estrenar" value={specs.isNew} />
            <SpecBox icon={<Clock />} label="Antiguedad" value={specs.age ? `${specs.age} años` : false} />
            <SpecBox icon={<HousePlus />} label="Ambientes" value={specs.rooms} />
            <SpecBox icon={<Bath />} label="Baños" value={specs.bathrooms} />
            <SpecBox icon={<AirVent />} label="Aire Acondicionado" value={specs.hasAC} />
            <SpecBox icon={<Car />} label="Estacionamiento" value={specs.hasParking} />
            <SpecBox icon={<Blinds />} label="Cortina Metálica" value={specs.hasRollingShutter} />
            <SpecBox icon={<Utensils />} label="Cocina" value={specs.hasKitchen} />
            <SpecBox icon={<FireExtinguisher />} label="Sist. Contra Incendios" value={specs.hasFireProtection} />
      </div>
    );
}

export function LandSpecs({ specs }: any) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <SpecBox icon={<Home />} label="Agua Corriente" value={specs.hasWaterLine} />
            <SpecBox icon={<Flame />} label="Gas Natural" value={specs.hasGasLine} />
            <SpecBox icon={<Droplets />} label="Cloacas" value={specs.hasSewerLine} />
            <SpecBox icon={<Zap />} label="Electricidad" value={specs.hasElectricity} />
            <SpecBox icon={<Fence />} label="Cercado" value={specs.isFenced} />
            <SpecBox icon={<Trees />} label="Barrio Cerrado" value={specs.isGatedNeighborhood} />
      </div>
    );
}

