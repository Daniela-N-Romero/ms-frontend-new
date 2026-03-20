interface IndicadorAvanceMobileProps {
    message: string;
    bgColor: string;
    textColor: string;
}

export function IndicadorAvanceMobile ({message, bgColor, textColor}: IndicadorAvanceMobileProps) {
    return (
        <div className={`md:hidden mt-4 flex items-center  bg-white p-1  rounded-sm text-xs uppercase tracking-widest animate-bounce-x`} style={{ backgroundColor: bgColor, color: textColor }}>
            {message}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
    );
}