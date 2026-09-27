import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { PackageX } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onResetFilters: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onQuickView,
  wishlistIds,
  onToggleWishlist,
  onResetFilters,
}) => {
  if (products.length === 0) {
    return (
      <div className="py-20 px-4 text-center max-w-[480px] mx-auto">
        <div className="w-14 h-14 rounded-full bg-[#16161b] flex items-center justify-center mx-auto mb-4 text-[#71717a]">
          <PackageX className="w-7 h-7 text-[#781428]" />
        </div>
        <h3 className="text-base font-semibold text-white mb-1.5">
          No se encontraron prendas con estos filtros
        </h3>
        <p className="text-xs text-[#a1a1aa] mb-5">
          Probá seleccionando otro talle o restableciendo la categoría.
        </p>
        <button
          onClick={onResetFilters}
          className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-[#e4e4e7] text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
        >
          Restablecer Filtros
        </button>
      </div>
    );
  }

  return (
    <section className="px-3 sm:px-6 md:px-8 max-w-[1440px] mx-auto pb-20">
      {/* Responsive Grid: 2 columns on mobile, 3 columns on tablet & desktop as requested */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3.5 sm:gap-6 md:gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={onQuickView}
            isWishlisted={wishlistIds.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    </section>
  );
};
