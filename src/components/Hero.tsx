import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative w-full pt-10 sm:pt-14 pb-10 sm:pb-14 px-4 md:px-8 max-w-[1440px] mx-auto overflow-hidden text-center bg-[#0e0e10]">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto flex flex-col items-center"
      >
        {/* Giant Monumental Editorial NERA Wordmark */}
        <h1 className="font-display font-extrabold text-[22vw] sm:text-[18vw] md:text-[15vw] lg:text-[13vw] leading-[0.8] tracking-[-0.04em] text-white uppercase select-none hover:tracking-[-0.03em] transition-all duration-700">
          Nera
        </h1>

        {/* Subtitle: FAIT NOTABLE */}
        <div className="mt-4 sm:mt-6 flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#a1a1aa]">
          <span className="h-[1px] w-6 sm:w-16 bg-[#33333a]"></span>
          <span className="text-[#f4f4f5] font-medium tracking-[0.35em]">FAIT NOTABLE</span>
          <span className="text-[#781428] font-bold">·</span>
          <span className="text-[#8e8e99] hidden xs:inline">COLLECTION</span>
          <span className="h-[1px] w-6 sm:w-16 bg-[#33333a]"></span>
        </div>

        {/* Minimalist Categories Statement & Explore Action */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-4">
          <p className="text-[#71717a] text-xs uppercase tracking-[0.25em] font-mono">
            INFERIOR · SUPERIOR · NOCHE
          </p>

          <button
            onClick={onExploreClick}
            className="mt-2 flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-white/10 hover:border-white/30 text-white text-xs uppercase tracking-[0.2em] font-medium transition-all hover:bg-white/[0.04] cursor-pointer"
          >
            <span>Ver Catálogo</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};
