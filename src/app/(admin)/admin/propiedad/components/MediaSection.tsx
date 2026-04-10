import ImageUploader from '@/app/inmobiliaria/propiedad/[slug]/components/ImageUploader';
import { getYouTubeEmbedUrl } from '@/utils/formHelpers';
import { ChevronDown } from 'lucide-react';

interface Props {
  register: any;
  setValue: any;
  watch: any;
  isOpen: boolean;
  onToggle: () => void;
}

export default function MediaSection({ register, setValue, watch, isOpen, onToggle }: Props) {
  const videoUrl = watch('videoUrl');
  const embedUrl = getYouTubeEmbedUrl(videoUrl || '');

  return (
    <section className="bg-white p-8 rounded-[35px] shadow-sm border border-slate-100">
       <button
        type="button"
        onClick={onToggle}
        className={`w-full flex items-center justify-between group focus:outline-none ${isOpen ? 'mb-8' : ''}`}
      >
        <h2 className="text-xl font-bold text-[#003153] flex items-center gap-2">
            <span className="w-2 h-6 bg-emerald-500 rounded-full inline-block"></span>
           Multimedia
          </h2>

          <span className={`text-[#003153] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown size={25} />
          </span>
      </button>

      {isOpen && (

      <div className="space-y-10">
        {/* Subida de Fotos */}
        <div>
          <label className="admin-label mb-4">Galería de Imágenes</label>
          <ImageUploader setValue={setValue} watch={watch} />
        </div>

        {/* Video de YouTube */}
        <div className="pt-8 border-t border-slate-100">
          <label className="admin-label">Enlace de Video (YouTube)</label>
          <input
            {...register('videoUrl')}
            className="admin-input"
            placeholder="Ej: https://www.youtube.com/watch?v=..."
          />

          {embedUrl && (
            <div className="mt-6 aspect-video w-full max-w-2xl rounded-[30px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
              <iframe
                className="w-full h-full"
                src={embedUrl}
                title="Vista previa del video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {videoUrl && !embedUrl && (
            <p className="text-xs text-red-500 font-bold mt-2 ml-2">⚠️ El enlace no es un video válido de YouTube.</p>
          )}
        </div>
      </div>
      )}
    </section>
  );
}