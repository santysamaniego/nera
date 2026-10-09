import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ChevronRight, Compass } from 'lucide-react';
import { SIZING_GUIDE_DATA } from '../data/products';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'arriba' | 'abajo' | 'calculator'>('arriba');

  // Interactive Calculator State
  const [bustInput, setBustInput] = useState<string>('88');
  const [waistInput, setWaistInput] = useState<string>('68');
  const [hipInput, setHipInput] = useState<string>('96');
  const [recommendation, setRecommendation] = useState<{
    arriba: string;
    abajo: string;
    advice: string;
  } | null>(null);

  if (!isOpen) return null;

  const calculateSize = (e: React.FormEvent) => {
    e.preventDefault();
    const bust = parseFloat(bustInput) || 88;
    const waist = parseFloat(waistInput) || 68;
    const hip = parseFloat(hipInput) || 96;

    let recArriba = 'S';
    if (bust <= 84) recArriba = 'XS';
    else if (bust <= 89) recArriba = 'S';
    else if (bust <= 95) recArriba = 'M';
    else if (bust <= 102) recArriba = 'L';
    else if (bust <= 110) recArriba = 'XL';
    else recArriba = 'XXL';

    let recAbajo = '26 (S)';
    if (waist <= 63) recAbajo = '24 (XS)';
    else if (waist <= 67) recAbajo = '26 (S)';
    else if (waist <= 73) recAbajo = '28 (M)';
    else if (waist <= 79) recAbajo = '30 (L)';
    else if (waist <= 85) recAbajo = '32 (XL)';
    else recAbajo = '34 (XXL)';

    setRecommendation({
      arriba: recArriba,
      abajo: recAbajo,
      advice:
        'Para prendas superiores con caída sastrera (blazers y camperas), si estás entre dos medidas te recomendamos elegir el talle superior para lograr la silueta relajada distintiva de la marca.',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#0c0c0f] border border-white/[0.08] rounded-[24px] sm:rounded-[32px] shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Editorial Header */}
        <div className="px-5 sm:px-8 pt-6 pb-5 flex items-start justify-between border-b border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent">
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#781428] font-mono font-medium mb-1">
              <span>Moldería & Anatomía</span>
              <span>·</span>
              <span className="text-[#71717a]">NERA ATELIER</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
              Guía de Medidas & Talles
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

        {/* Floating Minimalist Tab Switcher */}
        <div className="px-5 sm:px-8 py-3.5 border-b border-white/[0.06] bg-[#0e0e12]">
          <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/[0.06] rounded-full overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('arriba')}
              className={`flex-1 min-w-[120px] py-2 px-3 text-[11px] sm:text-xs uppercase tracking-wider rounded-full font-medium transition-all text-center cursor-pointer ${
                activeTab === 'arriba'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-[#8e8e99] hover:text-white'
              }`}
            >
              Prendas Superiores
            </button>
            <button
              onClick={() => setActiveTab('abajo')}
              className={`flex-1 min-w-[120px] py-2 px-3 text-[11px] sm:text-xs uppercase tracking-wider rounded-full font-medium transition-all text-center cursor-pointer ${
                activeTab === 'abajo'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-[#8e8e99] hover:text-white'
              }`}
            >
              Prendas Inferiores
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex-1 min-w-[130px] py-2 px-3 text-[11px] sm:text-xs uppercase tracking-wider rounded-full font-medium transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'calculator'
                  ? 'bg-[#781428] text-white shadow-sm'
                  : 'text-[#8e8e99] hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Calculá tu Talle</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
          {activeTab === 'arriba' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#8e8e99]">
                <span className="font-light">
                  Blazers, camperas, remeras, bodys y tops estructurados.
                </span>
                <span className="text-[11px] font-mono text-[#781428] font-medium shrink-0">
                  Valores en centímetros (cm)
                </span>
              </div>

              {/* Minimalist Editorial Grid of Sizing */}
              <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-white/[0.01]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-white/[0.03] text-[#a1a1aa] border-b border-white/[0.06]">
                    <tr>
                      <th className="py-3 px-3 sm:px-4 font-medium uppercase tracking-wider text-[11px]">Talle</th>
                      <th className="py-3 px-3 sm:px-4 font-medium uppercase tracking-wider text-[11px]">Busto</th>
                      <th className="py-3 px-3 sm:px-4 font-medium uppercase tracking-wider text-[11px]">Cintura</th>
                      <th className="py-3 px-3 sm:px-4 font-medium uppercase tracking-wider text-[11px]">Cadera</th>
                      <th className="py-3 px-3 sm:px-4 font-medium uppercase tracking-wider text-[11px] text-[#e18092]">Equivalencia</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04] text-[#8e8e99]">
                    {SIZING_GUIDE_DATA.arriba.map((row) => (
                      <tr key={row.size} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-3 sm:px-4 font-bold text-white text-sm">{row.size}</td>
                        <td className="py-3 px-3 sm:px-4 text-[#e4e4e7]">{row.bust}</td>
                        <td className="py-3 px-3 sm:px-4">{row.waist}</td>
                        <td className="py-3 px-3 sm:px-4">{row.hips}</td>
                        <td className="py-3 px-3 sm:px-4 text-[#e18092]">{row.equivalent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'abajo' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#8e8e99]">
                <span className="font-light">
                  Jeans rígidos 13oz, polleras plisadas y bermudas sastreadas.
                </span>
                <span className="text-[11px] font-mono text-[#781428] font-medium shrink-0">
                  Valores en centímetros (cm)
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-white/[0.01]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-white/[0.03] text-[#a1a1aa] border-b border-white/[0.06]">
                    <tr>
                      <th className="py-3 px-3 sm:px-4 font-medium uppercase tracking-wider text-[11px]">Talle Denim</th>
                      <th className="py-3 px-3 sm:px-4 font-medium uppercase tracking-wider text-[11px]">Cintura</th>
                      <th className="py-3 px-3 sm:px-4 font-medium uppercase tracking-wider text-[11px]">Cadera</th>
                      <th className="py-3 px-3 sm:px-4 font-medium uppercase tracking-wider text-[11px]">Largo de Pierna</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04] text-[#8e8e99]">
                    {SIZING_GUIDE_DATA.abajo.map((row) => (
                      <tr key={row.size} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-3 sm:px-4 font-bold text-white text-sm">{row.size}</td>
                        <td className="py-3 px-3 sm:px-4 text-[#e4e4e7]">{row.waist}</td>
                        <td className="py-3 px-3 sm:px-4">{row.hips}</td>
                        <td className="py-3 px-3 sm:px-4 text-[#71717a]">{row.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'calculator' && (
            <div className="space-y-5">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.08] max-w-lg mx-auto">
                <div className="text-center space-y-1 mb-5">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-display">
                    Asesor de Calce Personalizado
                  </h3>
                  <p className="text-xs text-[#8e8e99] font-light">
                    Ingresá tus medidas anatómicas y te indicaremos tu talle ideal.
                  </p>
                </div>

                <form onSubmit={calculateSize} className="space-y-4">
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#71717a] mb-1">
                        Busto (cm)
                      </label>
                      <input
                        type="number"
                        value={bustInput}
                        onChange={(e) => setBustInput(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 text-white px-3 py-2 rounded-xl text-xs font-mono text-center focus:outline-none focus:border-[#781428]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#71717a] mb-1">
                        Cintura (cm)
                      </label>
                      <input
                        type="number"
                        value={waistInput}
                        onChange={(e) => setWaistInput(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 text-white px-3 py-2 rounded-xl text-xs font-mono text-center focus:outline-none focus:border-[#781428]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#71717a] mb-1">
                        Cadera (cm)
                      </label>
                      <input
                        type="number"
                        value={hipInput}
                        onChange={(e) => setHipInput(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 text-white px-3 py-2 rounded-xl text-xs font-mono text-center focus:outline-none focus:border-[#781428]"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#781428] hover:bg-[#941b32] text-white text-xs font-medium uppercase tracking-[0.2em] rounded-full transition-all shadow-lg hover:shadow-[#781428]/30 cursor-pointer"
                  >
                    Calcular mi talle
                  </button>
                </form>

                {recommendation && (
                  <div className="mt-5 p-4 rounded-2xl bg-[#1f1015]/70 border border-[#4d1624] text-xs space-y-2 animate-fade-in">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-[#4ade80]" />
                      <span>Recomendación sugerida:</span>
                    </div>
                    <div className="flex gap-4 font-mono text-xs pt-1">
                      <span className="text-[#a1a1aa]">
                        Arriba: <strong className="text-white text-sm">{recommendation.arriba}</strong>
                      </span>
                      <span className="text-[#781428]">·</span>
                      <span className="text-[#a1a1aa]">
                        Abajo: <strong className="text-white text-sm">{recommendation.abajo}</strong>
                      </span>
                    </div>
                    <p className="text-[11px] text-[#c4b5ba] leading-relaxed pt-1">
                      {recommendation.advice}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sizing Assistance Banner */}
          <div className="border-t border-white/[0.06] pt-4 text-[11px] text-[#71717a] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>¿Precisás ayuda personalizada con las medidas?</span>
            <a
              href="https://wa.me/5491136581397"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e18092] hover:text-white transition-colors font-medium flex items-center gap-1"
            >
              <span>Contactar</span>
              <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-8 py-4 bg-white/[0.01] border-t border-white/[0.06] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs uppercase tracking-wider font-medium rounded-full transition-colors cursor-pointer"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    </div>
  );
};
