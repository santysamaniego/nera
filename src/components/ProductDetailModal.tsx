import React, { useState } from 'react';
import { X, Ruler, Plus, Minus, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Product, ClothingSize } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: ClothingSize, color: string, quantity: number) => void;
  onOpenSizeGuide: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onOpenSizeGuide,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState<ClothingSize>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Nero');
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const availableStock = product.stockPerSize[selectedSize] ?? 4;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#141417] border border-[#2b2b32] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-[#d4d4d8] hover:text-white transition-colors cursor-pointer"
          aria-label="Cerrar ventana de detalles"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="md:w-1/2 bg-[#18181c] relative flex flex-col justify-between overflow-hidden">
          <div className="relative aspect-[3/4] w-full max-h-[480px] md:max-h-none overflow-hidden">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center filter grayscale-[10%] contrast-105"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Alternate thumbnails */}
          {product.secondaryImage && (
            <div className="p-3 bg-[#111114] border-t border-[#232328] flex items-center gap-2">
              <button
                onClick={() => setSelectedImage(product.image)}
                className={`w-14 h-16 rounded overflow-hidden border-2 transition-all cursor-pointer ${
                  selectedImage === product.image ? 'border-[#781428]' : 'border-transparent opacity-60'
                }`}
              >
                <img src={product.image} alt="Vista 1" className="w-full h-full object-cover" />
              </button>
              <button
                onClick={() => setSelectedImage(product.secondaryImage!)}
                className={`w-14 h-16 rounded overflow-hidden border-2 transition-all cursor-pointer ${
                  selectedImage === product.secondaryImage
                    ? 'border-[#781428]'
                    : 'border-transparent opacity-60'
                }`}
              >
                <img
                  src={product.secondaryImage}
                  alt="Vista 2"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Product Configurator & Purchasing */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh] bg-[#141417]">
          <div className="space-y-5">
            {/* Header info */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#71717a] mb-1">
                NERA · {product.category} · {product.subcategory}
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
                {product.name}
              </h2>
              <div className="mt-2 font-mono text-xl font-bold text-white tabular-nums flex items-baseline gap-2">
                <span>{formattedPrice}</span>
                <span className="text-xs font-normal text-[#9a1e36]">
                  (15% OFF con transferencia: {new Intl.NumberFormat('es-AR', {
                    style: 'currency',
                    currency: 'ARS',
                    maximumFractionDigits: 0,
                  }).format(product.price * 0.85)})
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              {product.description}
            </p>

            {/* Color Selector */}
            <div>
              <label className="block text-xs font-mono uppercase text-[#d4d4d8] mb-2">
                Tono: <strong className="text-white">{selectedColor}</strong>
              </label>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    title={c.name}
                    className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                      selectedColor === c.name
                        ? 'ring-2 ring-[#781428] border-white scale-110'
                        : 'border-[#3f3f46] hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector - Requested prominent placement */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase text-[#d4d4d8]">
                  Talle Seleccionado: <strong className="text-[#e18092]">{selectedSize}</strong>
                </label>
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="flex items-center gap-1 text-[11px] text-[#a1a1aa] hover:text-white underline cursor-pointer"
                >
                  <Ruler className="w-3 h-3 text-[#781428]" />
                  <span>Ver medidas en cm</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => {
                  const isSzActive = selectedSize === sz;
                  const stock = product.stockPerSize[sz] ?? 3;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[42px] h-9 px-3 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                        isSzActive
                          ? 'bg-[#781428] text-white ring-2 ring-[#9a1e36] font-bold'
                          : 'bg-[#1b1b20] text-[#d4d4d8] hover:text-white border border-[#2b2b32] hover:border-[#52525c]'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>

              <p className="mt-2 text-[11px] font-mono text-[#71717a]">
                Disponibilidad: <span className="text-[#a1a1aa] font-medium">{availableStock} unidades en stock</span>
              </p>
            </div>

            {/* Quantity Stepper & Add to Bag */}
            <div className="pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center bg-[#1b1b20] border border-[#2d2d35] rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-mono font-semibold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(availableStock, quantity + 1))}
                    className="p-2.5 text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Add CTA */}
                <button
                  onClick={handleAdd}
                  disabled={addedSuccess}
                  className={`flex-1 py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    addedSuccess
                      ? 'bg-[#1b3b24] text-[#4ade80] border border-[#286337]'
                      : 'bg-[#781428] hover:bg-[#941b32] text-white shadow-lg hover:shadow-[#781428]/30'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {addedSuccess
                      ? '¡Agregado a la Bolsa!'
                      : `Comprar · ${new Intl.NumberFormat('es-AR', {
                          style: 'currency',
                          currency: 'ARS',
                          maximumFractionDigits: 0,
                        }).format(product.price * quantity)}`}
                  </span>
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="p-3 rounded-lg bg-[#1b1b20] border border-[#2d2d35] hover:border-[#781428] text-white transition-colors cursor-pointer"
                  title="Guardar en favoritos"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted ? 'fill-[#781428] text-[#781428]' : 'text-[#a1a1aa]'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Details accordion / specifications */}
            <div className="border-t border-[#232328] pt-4 space-y-2 text-xs">
              <h4 className="font-semibold text-[#d4d4d8] uppercase tracking-wider text-[11px]">
                Composición & Cuidados
              </h4>
              <p className="text-[#a1a1aa]">{product.composition}</p>
              <ul className="list-disc pl-4 space-y-1 text-[#71717a] pt-1">
                {product.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>

            {/* Trust markers */}
            <div className="border-t border-[#232328] pt-4 grid grid-cols-2 gap-3 text-[11px] text-[#71717a]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#781428] shrink-0" />
                <span>Envío seguro a todo el país</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#781428] shrink-0" />
                <span>Primer cambio gratis (30 días)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
