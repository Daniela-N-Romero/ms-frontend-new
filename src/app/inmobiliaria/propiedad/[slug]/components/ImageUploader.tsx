'use client';
import { useState } from 'react';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  rectSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Camera, X, GripVertical, Star } from 'lucide-react';

// --- COMPONENTE DE CADA FOTO ---
function SortablePhoto({ id, src, index, onRemove }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  const isPortada = index === 0;

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="relative h-40 rounded-[30px] overflow-hidden border-2 border-slate-100 shadow-sm bg-white group"
    >
      <img src={src} className="w-full h-full object-cover" alt="preview" />
      
      {/* Botón Eliminar (Fuera de los listeners de arrastre) */}
      <button
        onClick={() => onRemove(index)}
        className="absolute top-2 right-2 z-20 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md"
      >
        <X size={14} />
      </button>

      {/* Handler para arrastrar (listeners van aquí) */}
      <div 
        {...attributes} 
        {...listeners} 
        className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="text-white" size={24} />
      </div>

      {isPortada && (
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase flex items-center gap-1 shadow-md z-10">
          <Star size={10} className="fill-white" /> Portada
        </div>
      )}
    </div>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function ImageUploader({ setValue, watch }: any) {
  const images = watch('images') || [];
  // Usamos un estado para las previews (necesitan un ID único para dnd-kit)
  const [previews, setPreviews] = useState<{id: string, url: string}[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPreviews = files.map(file => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      url: URL.createObjectURL(file)
    }));

    setPreviews(prev => [...prev, ...newPreviews]);
    setValue('images', [...images, ...files]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index].url);
    const newPreviews = previews.filter((_, i) => i !== index);
    const newImages = images.filter((_: any, i: number) => i !== index);
    
    setPreviews(newPreviews);
    setValue('images', newImages);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = previews.findIndex(item => item.id === active.id);
      const newIndex = previews.findIndex(item => item.id === over.id);

      const nextPreviews = arrayMove(previews, oldIndex, newIndex);
      const nextImages = arrayMove(images, oldIndex, newIndex);

      setPreviews(nextPreviews);
      setValue('images', nextImages);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <label className="border-2 border-dashed border-slate-200 rounded-[30px] h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all group bg-slate-50">
          <Camera className="w-10 h-10 text-slate-400 group-hover:text-blue-500 transition-colors" />
          <span className="text-xs font-bold text-slate-500 mt-2">Añadir Fotos</span>
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleFiles} />
        </label>

        <DndContext 
          sensors={sensors} 
          collisionDetection={closestCenter} 
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={previews.map(p => p.id)} strategy={rectSortingStrategy}>
            {previews.map((item, index) => (
              <SortablePhoto 
                key={item.id} 
                id={item.id} 
                src={item.url} 
                index={index} 
                onRemove={removeImage} 
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      
      {previews.length > 0 && (
        <p className="text-xs text-slate-400 italic">
          * La primera imagen aparecerá como portada de la propiedad.
        </p>
      )}
    </div>
  );
}