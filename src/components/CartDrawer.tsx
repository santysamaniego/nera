import React, { useState } from 'react';
import { X, ArrowRight, Truck, Trash2, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onStartCheckout: () => void;
  onOpenSizeGuide: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onStartCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponFeedback, setCouponFeedback] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((acc, it) => acc + it.product.price * it.quantity, 0);
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const total = rawSubtotal - discountAmount;

  const FREE_SHIPPING_THRESHOLD = 120000;
  const progressToFreeShipping = Math.min(100, (rawSubtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const diffToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - rawSubtotal);

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'NERA10') {
      setDiscountPercent(10);
      setCouponFeedback({ type: 'ok', msg: 'Beneficio NERA10 aplicado (10% OFF)' });
    } else {
      setCouponFeedback({ type: 'err', msg: 'Código no válido. Podés utilizar NERA10' });
    }
  };

  const formatPrice = (amt: number) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(amt);

  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md transition-all duration-300">
      <div className="relative w-full max-w-[440px] bg-[#101013] border-l border-[#202026] shadow-2xl h-full flex flex-col justify-between overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-[#1c1c22] bg-[#121216] flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#71717a] font-mono">
              SELECCIÓN ACTUAL
            </div>
            <h2 className="text-base font-bold uppercase tracking-wider text-white font-display">
              BOLSA DE COMPRAS <span className="text-[#e18092] font-mono font-normal">({totalQuantity})</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#a1a1aa] hover:text-white hover:bg-[#1a1a20] transition-colors cursor-pointer"
            aria-label="Cerrar bolsa de compras"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-6 py-3.5 bg-[#141418] border-b border-[#1d1d24]">
          <div className="flex items-center justify-between text-[11px] mb-2 font-mono">
            <span className="flex items-center gap-2 text-[#d4d4d8]">
              <Truck className="w-3.5 h-3.5 text-[#781428]" />
              {diffToFreeShipping === 0 ? (
                <span className="text-[#4ade80] font-semibold">¡Tenés Envío Gratis Bonificado!</span>
              ) : (
                <span>Te faltan {formatPrice(diffToFreeShipping)} para envío sin cargo</span>
              )}
            </span>
            <span className="text-[#a1a1aa]">{Math.round(progressToFreeShipping)}%</span>
          </div>
          <div className="w-full h-1 bg-[#22222a] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#781428] transition-all duration-500 rounded-full"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-24 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#18181e] flex items-center justify-center mx-auto text-[#71717a]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <p className="text-sm text-[#a1a1aa] font-light">
                Tu bolsa no contiene prendas aún.
              </p>
              <button
                onClick={onClose}
                className="inline-block text-xs uppercase tracking-widest text-[#e18092] hover:text-white transition-colors cursor-pointer pt-2"
              >
                Descubrir colección →
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="group/item flex gap-4 p-3.5 rounded-xl bg-[#141418] border border-[#202027] hover:border-[#2d2d38] transition-all"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-24 rounded-lg overflow-hidden bg-[#1c1c22] shrink-0 relative">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info & Modifiers */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-medium text-white leading-snug line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#52525b] hover:text-[#ef4444] transition-colors p-0.5 cursor-pointer"
                        title="Eliminar de la bolsa"
                      >
                        <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                      </button>
                    </div>

                    <div className="mt-1 text-[11px] font-mono text-[#a1a1aa] space-x-1">
                      <span>Talle: <strong className="text-white">{item.selectedSize}</strong></span>
                      <span>·</span>
                      <span>{item.selectedColor}</span>
                    </div>
                  </div>

                  {/* Quantity Stepper & Subtotal */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-[#2b2b34] rounded-md bg-[#111114]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-1 text-xs text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-medium text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-1 text-xs text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-mono font-semibold text-white tabular-nums">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Action */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#1c1c22] bg-[#121216] space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={applyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="Código promocional (ej: NERA10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 bg-[#16161b] border border-[#282832] text-white text-xs px-3.5 py-2.5 rounded-lg font-mono uppercase placeholder-[#52525b] focus:outline-none focus:border-[#781428]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg bg-[#202027] hover:bg-[#2b2b35] text-xs font-medium text-white uppercase tracking-wider transition-colors cursor-pointer"
              >
                Aplicar
              </button>
            </form>

            {couponFeedback && (
              <p
                className={`text-[11px] font-mono ${
                  couponFeedback.type === 'ok' ? 'text-[#4ade80]' : 'text-[#ef4444]'
                }`}
              >
                {couponFeedback.msg}
              </p>
            )}

            {/* Price Calculations */}
            <div className="space-y-2 text-xs font-mono pt-1">
              <div className="flex justify-between text-[#a1a1aa]">
                <span>Subtotal:</span>
                <span className="tabular-nums">{formatPrice(rawSubtotal)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-[#4ade80]">
                  <span>Descuento ({discountPercent}%):</span>
                  <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#a1a1aa]">
                <span>Envío:</span>
                <span className="tabular-nums text-white">
                  {rawSubtotal >= FREE_SHIPPING_THRESHOLD ? 'Gratis' : '$4.900'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#1e1e26]">
                <span className="uppercase tracking-wider">Total:</span>
                <span className="tabular-nums text-[#f4f4f5]">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={onStartCheckout}
              className="w-full py-3.5 px-4 bg-[#781428] hover:bg-[#941b32] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[#781428]/30 cursor-pointer"
            >
              <span>Finalizar Compra</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-[#71717a] uppercase tracking-wider font-mono">
              Compra protegida · 3 y 6 Cuotas Sin Interés
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
