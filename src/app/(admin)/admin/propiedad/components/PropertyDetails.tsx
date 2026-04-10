import ResidentialFields from '../components/ResidentialFields';
import CommercialFields from '../components/CommercialFields';
import IndustrialFields from '../components/IndustrialFields';
import LandFields from '../components/LandFields';
import { ChevronDown } from "lucide-react";


export default function AdminPrivateFields({ register, watch, propertyType, control, isOpen, onToggle }: any) {

    return (<section className="bg-white p-8 rounded-[35px] shadow-sm border border-slate-100">

        <button
            type="button"
            onClick={onToggle}
            className="w-full flex items-center justify-between group focus:outline-none"
        >
            <h2 className={`text-xl font-bold text-[#003153] mb-1 flex items-center gap-2 ${isOpen ? 'mb-6' : ''}`}><span className="w-2 h-6  bg-emerald-500 rounded-full inline-block"></span>Detalles de la propiedad</h2>
            <span className={`text-[#003153] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                <ChevronDown size={25} />
            </span>
        </button>
        {isOpen && (<div>
            {!propertyType && (
                <p className="text-slate-500">Por favor, seleccione un tipo de propiedad para poder completar los detalles.</p>
            )}
            {propertyType && (
                <div>
                    {propertyType === 'residential' && <ResidentialFields register={register} watch={watch} control={control} />}
                    {propertyType === 'commercial' && <CommercialFields register={register} watch={watch} control={control} />}
                    {propertyType === 'industrial' && <IndustrialFields register={register} watch={watch} control={control} />}
                    {propertyType === 'land' && <LandFields register={register} />}
                </div>
            )}
        </div>)}

    </section>
    );
}