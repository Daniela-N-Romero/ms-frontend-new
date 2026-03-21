'use client';
import { useState } from 'react';
import { Share2, MessageCircle, LinkIcon } from "lucide-react";

interface ShareButtonProps {
    url: string;
    title: string;
    // Props opcionales para posicionamiento
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
}
export function ShareButton({ url, title, top, right, bottom, left }: ShareButtonProps) {
    const [showMenu, setShowMenu] = useState(false);
    const shareText = `*${title}*\n\nMirá esta propiedad en MS Propiedades:`;

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title, text: shareText, url });
            } catch (err) { console.log('Error compartiendo:', err); }
        } else {
            setShowMenu(!showMenu);
        }
    };

    const shareWhatsApp = () => {
        const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText + " " + url)}`;
        window.open(waUrl, '_blank');
        setShowMenu(false);
    };

    const copyLink = () => {
        navigator.clipboard.writeText(url);
        alert('¡Enlace copiado!');
        setShowMenu(false);
    };

    return (
        <div className="absolute" style={{ top, right, bottom, left, zIndex: 50 }}>
            <button
                onClick={handleNativeShare}
                className="p-2 bg-black/30 backdrop-blur-md hover:bg-white text-white hover:text-[#003153] rounded-full transition-all shadow-lg"
            >
                <Share2 size={18} />
            </button>

            {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
                    <button onClick={shareWhatsApp} className="w-full flex items-center gap-3 px-4 py-3 text-xs hover:bg-slate-50 text-slate-700"><MessageCircle size={14} className="text-green-500" /> WhatsApp</button>
                    <button onClick={copyLink} className="w-full flex items-center gap-3 px-4 py-3 text-xs hover:bg-slate-50 text-slate-700 border-t border-slate-50"> <LinkIcon size={14} /> Copiar Enlace </button>
                </div>
            )}
        </div>
    );
}