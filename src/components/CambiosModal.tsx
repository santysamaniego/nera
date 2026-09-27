import React, { useState } from 'react';
import { X, CheckCircle2, MessageCircle, HelpCircle } from 'lucide-react';

interface CambiosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CambiosModal: React.FC<CambiosModalProps> = ({ isOpen, onClose }) => {
  const [orderQuery, setOrderQuery] = useState('');
  const [requested, setRequested] = useState(false);

  if (!isOpen) return null;

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      setRequested(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0c0c0f] border border-white/[0.08] rounded-[24px] sm:rounded-[32px] shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-5 sm:px-8 pt-6 pb-5 flex items-start justify-between border-b border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent">
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#781428] font-mono font-medium mb-1">
              <span>Garantía & Concierge</span>
              <span>·</span>
              <span className="text-[#71717a]">NERA ATELIER</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
              Cambios & Devoluciones
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
            aria-label="Cerrar ventana de cambios"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-xs text-[#a1a1aa] leading-relaxed">
          {/* Key Metric Highlights in sculpted cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center space-y-1">
              <span className="text-base font-semibold text-white block">30 Días</span>
              <span className="text-[11px] text-[#71717a] font-light">Para solicitar tu cambio desde la entrega</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#1b1014]/60 border border-[#481522] text-center space-y-1">
              <span className="text-base font-semibold text-[#f43f5e] block">1° Cambio Bonificado</span>
              <span className="text-[11px] text-[#d4a5b0] font-light">Envío de ida y vuelta 100% sin cargo</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center space-y-1">
              <span className="text-base font-semibold text-white block">Atelier Presencial</span>
              <span className="text-[11px] text-[#71717a] font-light">Cambio instantáneo en Palermo Soho</span>
            </div>
          </div>

          {/* Interactive Request Form */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06] space-y-3.5">
            <div>
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                Iniciar cambio de talle o modelo
              </h3>
              <p className="text-[11px] text-[#8e8e99] font-light mt-0.5">
                Ingresá tu número de orden para que nuestro concierge prepare tu nuevo talle.
              </p>
            </div>

            {requested ? (
              <div className="p-4 rounded-xl bg-[#18281d] border border-[#2b5834] flex items-center gap-3 text-white">
                <CheckCircle2 className="w-5 h-5 text-[#4ade80] shrink-0" />
                <div className="text-xs font-mono">
                  <p className="font-semibold text-white">Solicitud recibida para la orden {orderQuery}</p>
                  <p className="text-[11px] text-[#a7f3d0] font-light">
                    Una estilista se comunicará a tu WhatsApp en breve para coordinar el retiro y el nuevo envío.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-2 pt-1">
                <input
                  type="text"
                  required
                  placeholder="Número de orden (ej: NERA-748920)"
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value)}
                  className="flex-1 bg-black/40 border border-white/10 text-white px-4 py-2.5 rounded-full text-xs font-mono uppercase placeholder-[#52525b] focus:outline-none focus:border-[#781428]"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-white text-black hover:bg-[#e4e4e7] text-xs font-medium uppercase tracking-wider rounded-full transition-colors cursor-pointer shrink-0"
                >
                  Consultar
                </button>
              </form>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="space-y-2 border-t border-white/[0.06] pt-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-white flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#781428]" />
              <span>Condiciones para el cambio:</span>
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-[#71717a] text-[11px] font-light">
              <li>La prenda debe encontrarse sin uso, en su empaque original y con sus etiquetas colocadas.</li>
              <li>Podés cambiar por cualquier otra pieza del catálogo abonando o acreditando la diferencia.</li>
              <li>Si residís fuera de Buenos Aires, te enviamos una guía prepaga lista para despachar en la sucursal de correo más cercana.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-8 py-4 bg-white/[0.01] border-t border-white/[0.06] flex items-center justify-between">
          <a
            href="https://wa.me/5491158249102?text=Hola%20NERA,%20quisiera%20consultar%20por%20un%20cambio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-[#d4d4d8] hover:text-white transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#4ade80]" />
            <span>Asesoría directa por WhatsApp</span>
          </a>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs uppercase tracking-wider font-medium rounded-full transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
