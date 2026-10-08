import React from 'react';
import { Ruler, RotateCcw, ChevronDown } from 'lucide-react';
import { MainCategory } from '../types';

interface FilterBarProps {
  activeCategory: MainCategory;
  selectedSubCategory: string | 'ALL';
  onSelectSubCategory: (sub: string | 'ALL') => void;
  selectedSize: string | 'ALL';
  onSelectSize: (size: string | 'ALL') => void;
  selectedColorTone: string | 'ALL';
  onSelectColorTone: (color: string | 'ALL') => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'new';
  onSelectSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'new') => void;
  onOpenSizeGuide: () => void;
  totalProductsCount: number;
  onResetFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeCategory,
  selectedSubCategory,
  onSelectSubCategory,
  selectedSize,
  onSelectSize,
  sortBy,
  onSelectSortBy,
  onOpenSizeGuide,
  totalProductsCount,
  onResetFilters,
}) => {
  const getSubcategories = (): string[] => {
    switch (activeCategory) {
      case 'INFERIOR':
        return ['Jeans', 'Minis'];
      case 'SUPERIOR':
        return ['Remeras', 'Blusas', 'Tops'];
      case 'NOCHE':
        return ['Vestidos', 'Tops', 'Shorts'];
      default:
        return ['Jeans', 'Minis', 'Remeras', 'Blusas', 'Vestidos', 'Tops', 'Shorts'];
    }
  };

  const availableSizes: string[] =
    activeCategory === 'INFERIOR'
      ? ['36', '38', '40', 'S', 'M', 'L']
      : ['S', 'M', 'L', 'XL'];

  const hasActiveFilters = selectedSubCategory !== 'ALL' || selectedSize !== 'ALL';

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pt-4 pb-6 sm:pb-8">
      {/* Category Section Header & Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-4 border-b border-[#202026]">
        <div>
          <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#71717a] font-medium mb-1">
            Prendas Seleccionadas
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white flex items-baseline gap-3">
            <span>{activeCategory === 'ALL' ? 'Colección Completa' : activeCategory}</span>
            <span className="text-xs font-normal text-[#a1a1aa] tracking-normal font-sans">
              ({totalProductsCount} {totalProductsCount === 1 ? 'prenda' : 'prendas'})
            </span>
          </h2>
        </div>

        {/* Actions: Size Guide & Minimalist Sort */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs">
          <button
            onClick={onOpenSizeGuide}
            className="flex items-center gap-1.5 text-[#d4d4d8] hover:text-white transition-colors cursor-pointer py-1"
          >
            <Ruler className="w-3.5 h-3.5 text-[#781428]" />
            <span className="font-medium underline underline-offset-4 decoration-[#781428]">
              Tabla de Talles (cm)
            </span>
          </button>

          <span className="text-[#33333d]">|</span>

          <div className="relative flex items-center">
            <select
              value={sortBy}
              onChange={(e) => onSelectSortBy(e.target.value as any)}
              className="appearance-none bg-transparent pr-5 text-xs text-[#a1a1aa] hover:text-white focus:outline-none cursor-pointer tracking-wider uppercase font-medium"
            >
              <option value="featured" className="bg-[#141418] text-white">Destacados</option>
              <option value="price-asc" className="bg-[#141418] text-white">Menor precio</option>
              <option value="price-desc" className="bg-[#141418] text-white">Mayor precio</option>
            </select>
            <ChevronDown className="w-3 h-3 text-[#71717a] pointer-events-none absolute right-0" />
          </div>

          {hasActiveFilters && (
            <>
              <span className="text-[#33333d]">|</span>
              <button
                onClick={onResetFilters}
                className="text-xs text-[#e18092] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restablecer</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Row 1: Subcategories Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto py-3 sm:py-4 scrollbar-none border-b border-[#1c1c22]">
        <button
          onClick={() => onSelectSubCategory('ALL')}
          className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-full transition-all shrink-0 cursor-pointer ${
            selectedSubCategory === 'ALL'
              ? 'bg-white text-black font-semibold shadow-sm'
              : 'text-[#a1a1aa] hover:text-white hover:bg-[#18181d]'
          }`}
        >
          Todas
        </button>
        {getSubcategories().map((sub) => {
          const isSubActive = selectedSubCategory === sub;
          return (
            <button
              key={sub}
              onClick={() => onSelectSubCategory(sub)}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-full transition-all shrink-0 cursor-pointer ${
                isSubActive
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-[#a1a1aa] hover:text-white hover:bg-[#18181d]'
              }`}
            >
              {sub}
            </button>
          );
        })}
      </div>

      {/* Row 2: Talles Bar */}
      <div className="flex items-center gap-3 pt-3.5 text-xs overflow-x-auto scrollbar-none">
        <span className="text-[#71717a] uppercase tracking-wider text-[11px] font-medium shrink-0">
          Filtrar por Talle:
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onSelectSize('ALL')}
            className={`px-3 py-1 text-xs rounded-full transition-colors cursor-pointer shrink-0 ${
              selectedSize === 'ALL'
                ? 'bg-[#781428] text-white font-medium'
                : 'text-[#a1a1aa] hover:text-white hover:bg-[#18181d]'
            }`}
          >
            Todos
          </button>
          {availableSizes.map((size) => {
            const isSizeActive = selectedSize === size;
            return (
              <button
                key={size}
                onClick={() => onSelectSize(size)}
                className={`min-w-[32px] h-7 px-2 text-xs rounded-full transition-colors cursor-pointer shrink-0 ${
                  isSizeActive
                    ? 'bg-[#781428] text-white font-semibold'
                    : 'text-[#a1a1aa] hover:text-white hover:bg-[#18181d]'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
