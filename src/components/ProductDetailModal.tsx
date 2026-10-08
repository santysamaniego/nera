import React, { useState, useEffect } from 'react';
import { X, Ruler, MessageCircle, Truck, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { WHATSAPP_NUMBER } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product, size: string, color: string, quantity: number) => void;
  onOpenSizeGuide: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onOpenSizeGuide,
}) => {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '');
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
    setSelectedSize(product.sizes[0] || '');
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#0c0c0f] border border-white/[0.08] rounded-[24px] sm:rounded-[32px] shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Cerrar ventana"
        >
          <X className="w-4 h-4 stroke-[1.5]" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="md:w-1/2 bg-[#121215] relative flex flex-col justify-between overflow-hidden">
          <div className="relative aspect-[3/4] w-full max-h-[380px] md:max-h-none overflow-hidden bg-[#161619]">
            <img
              src={finalImgSrc}
              alt={product.name}
              onError={() => setImgError((prev) => ({ ...prev, [currentImgSrc]: true }))}
              className="w-full h-full object-cover object-center filter grayscale-[5%] contrast-105"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Thumbnails if multiple images */}
          {activeImages.length > 1 && (
            <div className="p-3 bg-[#0e0e12] border-t border-white/[0.06] flex items-center gap-2 overflow-x-auto scrollbar-none">
              {activeImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIdx(i)}
                  className={`w-12 h-14 rounded-lg overflow-hidden border transition-all cursor-pointer shrink-0 ${
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
        </div>

        {/* Right Column: Details & WhatsApp Action */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh] bg-[#0c0c0f]">
          <div className="space-y-4 sm:space-y-5">
            {/* Header info */}
            <div>
              <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#71717a] mb-1">
                NERA · {product.category} {product.subcategory ? `· ${product.subcategory}` : ''}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug font-display">
                {product.name}
              </h2>
              <div className="mt-2 font-mono text-lg sm:text-xl font-bold text-white tabular-nums">
                {formattedPrice}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-xs text-[#8e8e99] leading-relaxed font-light">
                {product.description}
              </p>
            )}

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#d4d4d8] mb-1.5">
                  Color Seleccionado: <strong className="text-white">{selectedColor}</strong>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`text-xs px-3 py-1 rounded-full border transition-all cursor-pointer font-mono ${
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

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-mono uppercase text-[#d4d4d8]">
                  Talle: <strong className="text-white">{selectedSize}</strong>
                </label>
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="flex items-center gap-1 text-[10px] text-[#a1a1aa] hover:text-white underline cursor-pointer"
                >
                  <Ruler className="w-3 h-3 text-[#781428]" />
                  <span>Tabla de talles</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-[42px] h-9 px-3 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-white text-black font-bold'
                        : 'bg-white/[0.04] text-[#d4d4d8] hover:text-white border border-white/[0.08]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA Action */}
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-[#0b140e] text-xs font-bold uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[#25D366]/20 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Consultar por WhatsApp</span>
              </a>
              <p className="mt-2 text-[10px] text-center text-[#71717a] font-mono">
                Atención directa NERA Atelier · 11 3658-1397
              </p>
            </div>

            {/* Trust markers */}
            <div className="border-t border-white/[0.06] pt-4 grid grid-cols-2 gap-3 text-[10px] text-[#71717a]">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#781428] shrink-0" />
                <span>Envíos a todo el país</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-[#781428] shrink-0" />
                <span>Primer cambio sin cargo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
