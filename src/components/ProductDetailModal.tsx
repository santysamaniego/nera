import React, { useState, useEffect } from 'react';
import { X, Ruler, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenSizeGuide: () => void;
  onAddToCart?: (product: Product, size: string, color: string, quantity?: number) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onOpenSizeGuide,
}) => {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ''
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : ''
  );

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

  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setActiveImageIdx(0);
    setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : '');
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0].name);
    } else {
      setSelectedColor('');
    }
  }, [product]);

  const currentImgSrc = activeImages[activeImageIdx] || product.image;
  const isFailed = imgError[currentImgSrc];
  const finalImgSrc = isFailed && product.fallbackImage ? product.fallbackImage : currentImgSrc;

  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(product.price);

  const whatsappMessage = encodeURIComponent(
    `Hola NERA! Quiero consultar por ${product.name} ($${product.price.toLocaleString('es-AR')})` +
      (selectedSize ? ` en talle ${selectedSize}` : '') +
      (selectedColor ? ` color ${selectedColor}` : '')
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  const handlePrevImg = () => {
    setActiveImageIdx((prev) => (prev - 1 + activeImages.length) % activeImages.length);
  };

  const handleNextImg = () => {
    setActiveImageIdx((prev) => (prev + 1) % activeImages.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0c0c0f] border border-white/[0.08] rounded-[24px] sm:rounded-[32px] shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col my-auto max-h-[96vh]">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          aria-label="Cerrar ventana"
        >
          <X className="w-4 h-4 stroke-[1.5]" />
        </button>

        {/* 1. DOMINANT MAIN IMAGE CONTAINER */}
        <div className="relative w-full aspect-[3/4] max-h-[58vh] sm:max-h-[62vh] overflow-hidden bg-[#141417]">
          <img
            src={finalImgSrc}
            alt={product.name}
            onError={() => setImgError((prev) => ({ ...prev, [currentImgSrc]: true }))}
            className="w-full h-full object-cover object-top sm:object-center filter grayscale-[4%] contrast-105"
            referrerPolicy="no-referrer"
          />

          {/* Manual arrows if multiple images */}
          {activeImages.length > 1 && (
            <>
              <button
                onClick={handlePrevImg}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-sm text-white flex items-center justify-center transition-all z-20 cursor-pointer"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
              </button>
              <button
                onClick={handleNextImg}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-sm text-white flex items-center justify-center transition-all z-20 cursor-pointer"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="w-4 h-4 stroke-[1.5]" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1 z-20 pointer-events-none">
                {activeImages.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      idx === activeImageIdx ? 'w-4 bg-white' : 'w-1 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Category Tag badge */}
          <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-[9px] uppercase tracking-wider text-[#d4d4d8] font-mono pointer-events-none">
            {product.category}
          </div>
        </div>

        {/* 2. COMPACT FLOATING DETAILS SECTION BENEATH IMAGE */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 bg-[#0c0c0f] border-t border-white/[0.06]">
          {/* Title and Price */}
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight font-display">
              {product.name}
            </h2>
            <span className="text-sm sm:text-base font-semibold text-[#f4f4f5] tabular-nums font-mono shrink-0">
              {formattedPrice}
            </span>
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-[11px] text-[#8e8e99] leading-relaxed font-light">
              {product.description}
            </p>
          )}

          {/* Multiple Image Thumbnails strip (compact) */}
          {activeImages.length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
              {activeImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIdx(i)}
                  className={`w-9 h-11 rounded-md overflow-hidden border transition-all cursor-pointer shrink-0 ${
                    activeImageIdx === i ? 'border-[#781428] ring-1 ring-[#781428]' : 'border-white/10 opacity-60'
                  }`}
                >
                  <img
                    src={imgError[img] && product.fallbackImage ? product.fallbackImage : img}
                    alt={`Vista ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Color Selector if applicable */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-2 pt-0.5">
              <span className="text-[10px] font-mono uppercase text-[#71717a]">Color:</span>
              <div className="flex items-center gap-1.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`text-[10px] px-2.5 py-0.5 rounded-full border transition-all cursor-pointer font-mono ${
                      selectedColor === c.name
                        ? 'border-[#781428] bg-[#781428]/30 text-white font-medium ring-1 ring-[#781428]'
                        : 'border-white/10 text-[#a1a1aa] hover:border-white/30'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes Selector ONLY for Jeans */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex items-center justify-between gap-2 pt-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono uppercase text-[#71717a]">Talle:</span>
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-[28px] h-6 px-2 rounded-md text-[10px] font-mono transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-white text-black font-bold'
                        : 'bg-white/[0.04] text-[#d4d4d8] hover:text-white border border-white/[0.08]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={onOpenSizeGuide}
                className="flex items-center gap-1 text-[10px] text-[#a1a1aa] hover:text-white underline cursor-pointer"
              >
                <Ruler className="w-3 h-3 text-[#781428]" />
                <span>Guía</span>
              </button>
            </div>
          )}

          {/* WhatsApp Direct Consultation CTA Button */}
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-[#0b140e] text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Contactar</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
