import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { WHATSAPP_NUMBER } from '../data/products';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
}) => {
  // Color selection state
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : ''
  );

  // Size selection state
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ''
  );

  // Image fallback tracking
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  // Active images based on chosen color
  const activeImages: string[] = React.useMemo(() => {
    if (product.colors && product.colors.length > 0 && selectedColor) {
      const match = product.colors.find((c) => c.name === selectedColor);
      if (match && match.images && match.images.length > 0) {
        return match.images;
      }
    }
    return product.images && product.images.length > 0 ? product.images : [product.image];
  }, [product, selectedColor]);

  // Current image index for the carousel
  const [currentIdx, setCurrentIdx] = useState(0);

  // Reset index when color changes
  useEffect(() => {
    setCurrentIdx(0);
  }, [selectedColor]);

  // 4-second auto carousel if more than 1 image
  useEffect(() => {
    if (activeImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % activeImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeImages.length]);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + activeImages.length) % activeImages.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % activeImages.length);
  };

  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(product.price);

  // WhatsApp link preparation
  const whatsappMessage = encodeURIComponent(
    `Hola NERA! Quiero consultar por ${product.name} ($${product.price.toLocaleString('es-AR')})` +
      (selectedSize ? ` en talle ${selectedSize}` : '') +
      (selectedColor ? ` color ${selectedColor}` : '')
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  const currentImgSrc = activeImages[currentIdx] || product.image;
  const isFailed = imgError[currentImgSrc];
  const finalImgSrc = isFailed && product.fallbackImage ? product.fallbackImage : currentImgSrc;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col bg-[#121215] rounded-2xl border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 overflow-hidden"
    >
      {/* Product Image Container with 4s Carousel */}
      <div
        onClick={() => onQuickView(product)}
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#161619] cursor-pointer"
      >
        <img
          src={finalImgSrc}
          alt={product.name}
          onError={() => setImgError((prev) => ({ ...prev, [currentImgSrc]: true }))}
          className="w-full h-full object-cover object-center filter grayscale-[8%] contrast-105 group-hover:scale-102 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Minimal Hairline Navigation Arrows for Carousel */}
        {activeImages.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white/80 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-4 h-4 stroke-[1]" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white/80 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="w-4 h-4 stroke-[1]" />
            </button>

            {/* Subtle pagination dots */}
            <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1 z-10 pointer-events-none">
              {activeImages.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    idx === currentIdx ? 'w-4 bg-white' : 'w-1 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Category Pill Tag */}
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-[9px] uppercase tracking-wider text-[#d4d4d8] font-mono pointer-events-none">
          {product.category}
        </div>
      </div>

      {/* Product Details Area */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          {/* Title & Price */}
          <div className="flex items-start justify-between gap-2">
            <h3
              onClick={() => onQuickView(product)}
              className="text-xs sm:text-sm font-medium text-white tracking-tight group-hover:text-[#e4e4e7] transition-colors line-clamp-1 cursor-pointer"
            >
              {product.name}
            </h3>
            <span className="text-xs sm:text-sm font-semibold text-[#f4f4f5] tabular-nums shrink-0">
              {formattedPrice}
            </span>
          </div>

          {/* Color Switcher if product has multiple colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-[10px] text-[#71717a] uppercase font-mono mr-1">Color:</span>
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c.name);
                  }}
                  className={`text-[10px] px-2 py-0.5 rounded-full border transition-all cursor-pointer font-mono ${
                    selectedColor === c.name
                      ? 'border-[#781428] bg-[#781428]/30 text-white font-medium ring-1 ring-[#781428]'
                      : 'border-white/10 text-[#a1a1aa] hover:border-white/30'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          )}

          {/* Sizes Badges */}
          <div className="mt-2 flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
            <span className="text-[10px] text-[#71717a] uppercase font-mono mr-1 shrink-0">Talles:</span>
            {product.sizes.map((sz) => (
              <button
                key={sz}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(sz);
                }}
                className={`text-[10px] min-w-[22px] px-1.5 py-0.5 rounded-md border text-center transition-all cursor-pointer font-mono shrink-0 ${
                  selectedSize === sz
                    ? 'border-white/60 bg-white/10 text-white font-bold'
                    : 'border-white/10 text-[#8e8e99] hover:border-white/30'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* WhatsApp Contact / Consult Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-1 w-full py-2 sm:py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0b140e] text-[11px] sm:text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-[#25D366]/20 cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span>Consultar por WhatsApp</span>
        </a>
      </div>
    </motion.div>
  );
};
