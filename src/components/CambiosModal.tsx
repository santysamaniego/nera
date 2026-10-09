import React from 'react';
import { X, MessageCircle, Instagram, Mail, Calendar } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '../data/products';

interface CambiosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CambiosModal: React.FC<CambiosModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0c0c0f] border border-white/[0.08] rounded-[24px] sm:rounded-[32px] shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 flex items-start justify-between border-b border-white/[0.06]">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#781428] font-mono font-medium mb-1">
              FATTI NOTARE
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
              Cambios & Devoluciones
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 text-xs text-[#a1a1aa] leading-relaxed">
          {/* Policy Highlight */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3.5">
            <Calendar className="w-5 h-5 text-[#781428] shrink-0 mt-0.5" />
            <p className="text-xs text-white leading-relaxed font-light">
              Los cambios se efectúan durante los <strong>10 días hábiles próximos</strong>, después de recibir el producto.
            </p>
          </div>

          {/* Contact Channels */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#71717a] block">
              Canales de Atención
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href="https://instagram.com/nera.official.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.2] transition-colors flex items-center gap-3 text-white"
              >
                <Instagram className="w-4 h-4 text-[#e18092] shrink-0" />
                <div>
                  <span className="text-[10px] text-[#71717a] uppercase font-mono block">Instagram</span>
                  <span className="text-xs font-medium">Nera.official.ar</span>
                </div>
              </a>

              <a
                href="mailto:neraastoree@gmail.com"
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.2] transition-colors flex items-center gap-3 text-white"
              >
                <Mail className="w-4 h-4 text-[#e18092] shrink-0" />
                <div>
                  <span className="text-[10px] text-[#71717a] uppercase font-mono block">Correo</span>
                  <span className="text-xs font-medium truncate">neraastoree@gmail.com</span>
                </div>
              </a>
            </div>
          </div>

          {/* Sincere Brand Message */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06] text-center space-y-2">
            <p className="text-xs text-[#d4d4d8] leading-relaxed font-light italic">
              "Gracias por elegir NERA, cada prenda fue elegida con dedicación para inspirarte y recordarte que el verdadero estilo nace de ser uno mismo."
            </p>
            <p className="text-[11px] font-mono tracking-widest text-white uppercase pt-1">
              Fatti notare, con gratitudine, da NERA
            </p>
          </div>

          {/* WhatsApp Direct Action Button */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola NERA! Quisiera consultar por un cambio de mi pedido.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-[#0b140e] text-xs font-bold uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Contactar</span>
          </a>
        </div>
      </div>
    </div>
  );
};
