// Función para convertir un enlace de YouTube en un enlace de embed seguro y compatible con iframes
  export const getYouTubeEmbedUrl = (url: string): string | null => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      const videoId = match[2];
      return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
    }
    return null;
  };

  
  // Función para formatear el precio con separador de miles mientras escriben
export const formatPriceInput = (rawValue: string): string => {
  const digits = rawValue.replace(/\D/g, ""); // Solo números
  if (!digits) return "";
  return new Intl.NumberFormat('de-DE').format(Number(digits));
};

//Quita los separadores de miles para enviar el número puro al backend.
export const cleanPriceForBackend = (formattedValue: string): string => {
  return formattedValue.replace(/\./g, '');
};


