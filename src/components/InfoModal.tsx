import React from 'react';
import { X, MapPin, Clock, Compass, ShieldCheck } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0c0c0f] border border-white/[0.08] rounded-[24px] sm:rounded-[32px] shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-5 sm:px-8 pt-6 pb-5 flex items-start justify-between border-b border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent">
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#781428] font-mono font-medium mb-1">
              <span>Manifiesto de Marca</span>
              <span>·</span>
              <span className="text-[#71717a]">FAIT NOTABLE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
              NERA Atelier
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
            aria-label="Cerrar ventana de información"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-7 text-xs text-[#a1a1aa] leading-relaxed">
          {/* Chapter I: Philosophy */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#71717a] block">
              I. La Filosofía
            </span>
            <h3 className="text-base sm:text-lg font-light text-white tracking-tight leading-snug">
              Siluetas arquitectónicas concebidas para trascender las temporadas.
            </h3>
            <p className="text-xs text-[#8e8e99] font-light leading-relaxed pt-1">
              NERA nació para ofrecer un refugio de discreción y elegancia pura. Diseñamos con un
              estricto rigor en moldería sastrera, renunciando a lo superfluo y concentrando el
              protagonismo en la calidad tangible de la caída, las proporciones y una paleta
              monocromática con acento en vino borgoña.
            </p>
          </div>

          {/* Chapter II: Noble Materials */}
          <div className="space-y-3 pt-2 border-t border-white/[0.06]">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#71717a] block">
              II. Textiles & Confección
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2 text-white font-medium text-xs">
                  <Compass className="w-3.5 h-3.5 text-[#781428]" />
                  <span className="uppercase tracking-wider text-[11px]">Fibras Naturales</span>
                </div>
                <p className="text-[11px] text-[#71717a] font-light leading-relaxed">
                  Lana fría italiana para sastrería liviana, satén de seda fluida para prendas de noche
                  y algodón pima peruano pesado de 320g indeformable.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2 text-white font-medium text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#781428]" />
                  <span className="uppercase tracking-wider text-[11px]">Calibración Anatómica</span>
                </div>
                <p className="text-[11px] text-[#71717a] font-light leading-relaxed">
                  Cada prenda se prueba y calibra en centímetros exactos, asegurando un calce cómodo,
                  favorecedor y con estructura duradera.
                </p>
              </div>
            </div>
          </div>

          {/* Chapter III: Atelier */}
          <div className="space-y-3 pt-2 border-t border-white/[0.06]">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#71717a] block">
              III. Showroom & Atelier Palermo
            </span>

            <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06] space-y-3">
              <div className="flex items-start gap-3 text-xs text-white">
                <MapPin className="w-4 h-4 text-[#781428] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium block">Armenia 1640, Palermo Soho</span>
                  <span className="text-[11px] text-[#71717a]">Ciudad Autónoma de Buenos Aires, Argentina</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-[#a1a1aa] pt-1 border-t border-white/[0.04]">
                <Clock className="w-4 h-4 text-[#781428] shrink-0 mt-0.5" />
                <span className="text-[11px]">
                  Miércoles a Sábados de 14:00 a 20:00 hs. Podés acercarte a probar prendas sin cita previa o coordinar atención exclusiva por WhatsApp.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-8 py-4 bg-white/[0.01] border-t border-white/[0.06] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs uppercase tracking-wider font-medium rounded-full transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
