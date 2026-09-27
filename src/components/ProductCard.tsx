import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  isWishlisted,
  onToggleWishlist,
}) => {
  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(product.price);

  // Clean size range summary
  const sizesSummary =
    product.sizes.length > 2
      ? `${product.sizes[0]} — ${product.sizes[product.sizes.length - 1]}`
      : product.sizes.join(' · ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col cursor-pointer transition-all duration-300"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#141417]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center filter grayscale-[15%] contrast-105 group-hover:scale-103 group-hover:grayscale-0 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Minimal Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-[#e18092] transition-colors z-10 cursor-pointer"
          aria-label={isWishlisted ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#781428] text-[#781428]' : 'text-white/80'
            }`}
          />
        </button>

        {/* Subtle hover prompt */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
          <span className="text-xs uppercase tracking-widest text-white/90 font-medium">
            Ver Detalles & Talles
          </span>
        </div>
      </div>

      {/* Product Essential Info */}
      <div className="pt-3 pb-1 flex flex-col">
        <div className="flex items-center justify-between text-xs text-[#71717a] mb-0.5">
          <span className="uppercase tracking-wider text-[11px]">
            {product.subcategory}
          </span>
          <span className="text-[11px] text-[#a1a1aa]">
            {sizesSummary}
          </span>
        </div>

        <h3 className="text-sm font-medium text-white tracking-tight group-hover:text-[#e4e4e7] transition-colors line-clamp-1 mb-1">
          {product.name}
        </h3>

        <div className="text-sm font-semibold text-[#f4f4f5]">
          {formattedPrice}
        </div>
      </div>
    </motion.div>
  );
};
