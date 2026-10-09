import React, { useState } from 'react';
import { Instagram, Mail, ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '../data/products';

interface FooterProps {
  onOpenSizeGuide: () => void;
  onOpenInfo: () => void;
  onOpenCambios: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSizeGuide,
  onOpenInfo,
  onOpenCambios,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="border-t border-[#1f1f24] bg-[#0c0c0e] text-[#a1a1aa] text-xs pt-12 pb-10 px-4 md:px-8">
      <div className="max-w-[1440px] mx-auto space-y-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand & Slogan */}
          <div className="md:col-span-1 space-y-2.5">
            <h2 className="font-display font-extrabold text-3xl tracking-tight text-white uppercase">
              NERA
            </h2>
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#781428] font-semibold">
              FATTI NOTARE
            </div>
            <p className="text-xs text-[#71717a] leading-relaxed font-light pr-4">
              Cada prenda fue elegida con dedicación para inspirarte y recordarte que el verdadero estilo nace de ser uno mismo.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#e4e4e7] font-semibold">
              Atención al Cliente
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tabla de Talles (cm)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCambios}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cambios & Devoluciones (10 días)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenInfo}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sobre NERA
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 text-[#4ade80]"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Contactar</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Redes & Contacto */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#e4e4e7] font-semibold">
              Contacto & Redes
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://instagram.com/nera.official.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#e18092]" />
                  <span>Nera.official.ar</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:neraastoree@gmail.com"
                  className="hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-[#e18092]" />
                  <span>neraastoree@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#e4e4e7] font-semibold">
              Novedades
            </div>
            <p className="text-xs text-[#71717a]">
              Recibí avisos de nuevas prendas y ediciones limitadas.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-[#141418] border border-[#27272e] text-white text-xs px-3 py-2 rounded-lg font-mono placeholder-[#52525b] focus:outline-none focus:border-[#781428]"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-[#781428] hover:bg-[#941b32] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                {subscribed ? <Check className="w-4 h-4 text-white" /> : 'Unirse'}
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-[#4ade80] font-mono">
                ✓ Te suscribiste correctamente a NERA.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-6 border-t border-[#1d1d23] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#52525b]">
          <div>
            © {new Date().getFullYear()} NERA — FATTI NOTARE.
          </div>
          <div className="flex items-center gap-3">
            <span>Fatti notare, con gratitudine, da NERA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
