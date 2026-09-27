import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MainCategory } from '../types';
import { CATEGORIES_DATA } from '../data/products';

interface CategoryCarouselProps {
  activeCategory: MainCategory;
  onSelectCategory: (category: MainCategory) => void;
}

export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 260;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="categorias-section" className="py-8 md:py-12 px-4 md:px-8 max-w-[1440px] mx-auto">
      {/* Category Header with Navigation Arrows */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#1f1f24]">
        <div>
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#71717a] font-medium block mb-0.5">
            Colección
          </span>
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-white">
            CATEGORÍAS
          </h2>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => onSelectCategory('ALL')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs uppercase tracking-wider rounded-full transition-colors cursor-pointer ${
              activeCategory === 'ALL'
                ? 'bg-white text-black font-semibold'
                : 'text-[#a1a1aa] hover:text-white bg-[#16161b]'
            }`}
          >
            Ver Todo
          </button>

          <button
            onClick={() => scroll('left')}
            className="p-2 sm:p-2.5 rounded-full bg-[#16161b] hover:bg-[#202028] text-[#d4d4d8] hover:text-white transition-colors cursor-pointer"
            aria-label="Desplazar categorías hacia la izquierda"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 sm:p-2.5 rounded-full bg-[#16161b] hover:bg-[#202028] text-[#d4d4d8] hover:text-white transition-colors cursor-pointer"
            aria-label="Desplazar categorías hacia la derecha"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Stadium Arch Capsules Grid/Carousel: On Mobile shows 2 per view (compact), on desktop smooth carousel */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-3 sm:gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory focus:outline-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CATEGORIES_DATA.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <motion.button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative flex-shrink-0 snap-start text-left cursor-pointer overflow-hidden transition-all duration-300 w-[calc(50%-6px)] sm:w-[220px] md:w-[260px] lg:w-[280px] h-[220px] sm:h-[340px] md:h-[420px] rounded-[60px] sm:rounded-[110px] md:rounded-[140px] ${
                isActive
                  ? 'ring-2 ring-[#781428]'
                  : 'hover:opacity-95'
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 bg-[#161619]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center filter grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Gradient Scrim for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 group-hover:from-black/95 transition-all duration-500" />

              {/* Bottom Category Typography */}
              <div className="absolute inset-x-2 sm:inset-x-4 bottom-5 sm:bottom-8 flex flex-col items-center text-center">
                <h3 className="font-display text-base sm:text-2xl md:text-3xl font-extrabold uppercase tracking-wider text-white mb-1 drop-shadow-sm group-hover:tracking-[0.18em] transition-all duration-300">
                  {cat.title}
                </h3>

                <p className="text-[10px] sm:text-xs text-[#d4d4d8] font-light max-w-[180px] line-clamp-1 mb-1 hidden xs:block">
                  {cat.subtitle}
                </p>

                {isActive && (
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#781428] mt-0.5 sm:mt-1" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};
