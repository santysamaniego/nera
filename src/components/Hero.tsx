import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { heroImg } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative w-full pt-6 md:pt-10 pb-8 md:pb-12 px-4 md:px-8 max-w-[1440px] mx-auto overflow-hidden">
      {/* Giant Editorial Brand Wordmark */}
      <div className="text-center mb-6 md:mb-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display font-extrabold text-[20vw] sm:text-[16vw] md:text-[14vw] lg:text-[13vw] leading-[0.82] tracking-[-0.04em] text-white uppercase select-none hover:tracking-[-0.03em] transition-all duration-700">
            Nera
          </h1>

          {/* Subtitle from Client Sketch: 'FAIT NOTABLE' */}
          <div className="mt-2.5 md:mt-3 flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#a1a1aa]">
            <span className="h-[1px] w-6 sm:w-16 bg-[#33333a]"></span>
            <span className="text-[#f4f4f5] font-medium tracking-[0.35em]">FATTI NOTARE</span>
            <span className="text-[#781428] font-bold">·</span>
            <span className="text-[#8e8e99] hidden xs:inline">COLLECTION AUTOMNE / HIVER</span>
            <span className="h-[1px] w-6 sm:w-16 bg-[#33333a]"></span>
          </div>
        </motion.div>
      </div>

      {/* Editorial Hero Image Showcase */}
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden group rounded-2xl md:rounded-3xl"
      >
        {/* Hero Image Container: on mobile it shows pure uninterrupted photography */}
        <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] w-full max-h-[560px] overflow-hidden bg-[#121215]">
          <img
            src={heroImg}
            alt="../assets/images/7_1.jpeg"
            className="w-full h-full object-cover object-top sm:object-center filter grayscale contrast-105 group-hover:scale-102 transition-transform duration-1000 ease-out"
            referrerPolicy="no-referrer"
          />

          {/* Desktop Overlay only - subtle scrim */}
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

          {/* Desktop floating text & button */}
          <div className="hidden sm:flex absolute bottom-8 left-8 right-8 md:left-12 md:right-12 items-end justify-between gap-6">
            <div className="max-w-lg">
              <span className="text-xs uppercase tracking-[0.3em] text-[#d4d4d8] font-medium block mb-2">
                Nueva Colección
              </span>
              <p className="text-white text-xl md:text-2xl font-light leading-snug tracking-tight">
                Sastrería contemporánea, tonos neutros y acentos en borgoña.
              </p>
            </div>

            <button
              onClick={onExploreClick}
              className="flex items-center justify-center gap-3 px-7 py-3.5 bg-white text-black hover:bg-[#e4e4e7] text-xs uppercase tracking-[0.2em] font-medium transition-all rounded-full shadow-lg cursor-pointer shrink-0"
            >
              <span>Ver Colección</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile View: Text and button positioned CLEANLY BELOW the photo so the photo is 100% visible */}
        <div className="sm:hidden pt-4 pb-2 px-1 flex flex-col items-center text-center space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#a1a1aa] font-medium">
            Nueva Colección
          </span>
          <p className="text-white text-sm font-light leading-snug tracking-tight max-w-xs">
            Sastrería contemporánea, siluetas depuradas y acentos en borgoña.
          </p>
          <button
            onClick={onExploreClick}
            className="w-full py-3 px-6 bg-white text-black text-xs uppercase tracking-[0.2em] font-medium rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer mt-1"
          >
            <span>Explorar Colección</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};
