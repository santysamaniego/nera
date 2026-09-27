import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Banknote, Building2, Truck, Copy, Check } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
}) => {
  const [formData, setFormData] = useState({
    name: 'Sofía Samaniego',
    email: 'ssamaniego065@gmail.com',
    phone: '+54 9 11 5824-9102',
    address: 'Av. Libertador 3420, Piso 6B',
    city: 'Buenos Aires',
    postalCode: 'C1425',
    paymentMethod: 'transferencia' as 'transferencia' | 'tarjeta' | 'efectivo',
  });

  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [copiedAlias, setCopiedAlias] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((acc, it) => acc + it.product.price * it.quantity, 0);
  const isTransfer = formData.paymentMethod === 'transferencia';
  const transferDiscount = isTransfer ? rawSubtotal * 0.15 : 0;
  const shipping = rawSubtotal >= 120000 ? 0 : 4900;
  const grandTotal = rawSubtotal - transferDiscount + shipping;

  const formatPrice = (amt: number) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(amt);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `NERA-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('es-AR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      items: items.map((i) => ({
        productName: i.product.name,
        size: i.selectedSize,
        color: i.selectedColor,
        price: i.product.price,
        quantity: i.quantity,
      })),
      total: grandTotal,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      paymentMethod: formData.paymentMethod,
      status: 'Confirmado',
    };

    setConfirmedOrder(newOrder);
    onOrderCompleted(newOrder);
  };

  const copyAlias = () => {
    navigator.clipboard?.writeText('NERA.ATELIER.BA');
    setCopiedAlias(true);
    setTimeout(() => setCopiedAlias(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#141417] border border-[#2b2b32] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#232328] bg-[#18181c] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
              FINALIZAR COMPRA · NERA ATELIER
            </h2>
            <p className="text-xs text-[#a1a1aa]">
              Envío asegurado a todo el territorio nacional
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#a1a1aa] hover:text-white hover:bg-[#25252b] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedOrder ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-6 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-[#1b3524] border border-[#2d663e] flex items-center justify-center mx-auto text-[#4ade80]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-1 font-display">
                ¡ORDEN {confirmedOrder.id} CONFIRMADA!
              </h3>
              <p className="text-xs text-[#a1a1aa]">
                Te enviamos el comprobante y el seguimiento a{' '}
                <strong className="text-white">{confirmedOrder.customerEmail}</strong>.
              </p>
            </div>

            {/* Transfer details if bank transfer */}
            {confirmedOrder.paymentMethod === 'transferencia' && (
              <div className="p-4 rounded-xl bg-[#1c1c22] border border-[#2b2b32] text-left text-xs font-mono space-y-2">
                <div className="text-white font-bold uppercase flex items-center justify-between">
                  <span>Datos Bancarios para Transferir:</span>
                  <span className="text-[#9a1e36]">Total: {formatPrice(confirmedOrder.total)}</span>
                </div>
                <div className="text-[#a1a1aa] space-y-1">
                  <p>Banco: BBVA Argentina</p>
                  <p>Titular: NERA S.A.S.</p>
                  <p>CUIT: 30-71829341-8</p>
                  <div className="flex items-center justify-between bg-[#121215] p-2 rounded border border-[#26262e] mt-2">
                    <span className="text-white font-bold">Alias: NERA.ATELIER.BA</span>
                    <button
                      onClick={copyAlias}
                      className="px-2 py-1 rounded bg-[#27272f] hover:bg-[#34343d] text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedAlias ? <Check className="w-3 h-3 text-[#4ade80]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedAlias ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Summary */}
            <div className="bg-[#18181c] p-4 rounded-xl text-left text-xs font-mono border border-[#25252c]">
              <div className="text-[#a1a1aa] mb-2 font-bold uppercase text-white">Prendas reservadas:</div>
              <ul className="divide-y divide-[#202026]">
                {confirmedOrder.items.map((it, idx) => (
                  <li key={idx} className="py-1.5 flex justify-between">
                    <span>
                      {it.quantity}x {it.productName} ({it.size} - {it.color})
                    </span>
                    <span className="text-white font-bold">{formatPrice(it.price * it.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 mt-2 border-t border-[#232328] flex justify-between text-white font-bold text-sm">
                <span>Total Abonado:</span>
                <span>{formatPrice(confirmedOrder.total)}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-[#781428] hover:bg-[#941b32] text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
            >
              Volver al Catálogo
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#d4d4d8] font-bold">
                1. Datos de Contacto y Envío
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-mono text-[#a1a1aa] mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#18181c] border border-[#2b2b32] text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#781428]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#a1a1aa] mb-1">
                    WhatsApp / Teléfono
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#18181c] border border-[#2b2b32] text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#781428]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono text-[#a1a1aa] mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#18181c] border border-[#2b2b32] text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#781428]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono text-[#a1a1aa] mb-1">
                    Dirección (Calle, Número, Piso/Depto)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#18181c] border border-[#2b2b32] text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#781428]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#a1a1aa] mb-1">
                    Ciudad / Localidad
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#18181c] border border-[#2b2b32] text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#781428]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#a1a1aa] mb-1">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-[#18181c] border border-[#2b2b32] text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#781428]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3 pt-4 border-t border-[#232328]">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#d4d4d8] font-bold">
                2. Medio de Pago
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'transferencia' })}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    formData.paymentMethod === 'transferencia'
                      ? 'bg-[#221418] border-[#781428] ring-1 ring-[#781428]'
                      : 'bg-[#18181c] border-[#2b2b32] hover:border-[#42424d]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-4 h-4 text-[#9a1e36]" />
                    <span className="text-xs font-bold text-white">Transferencia</span>
                  </div>
                  <span className="text-[11px] text-[#4ade80] font-mono font-semibold">
                    15% OFF Extra
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'tarjeta' })}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    formData.paymentMethod === 'tarjeta'
                      ? 'bg-[#221418] border-[#781428] ring-1 ring-[#781428]'
                      : 'bg-[#18181c] border-[#2b2b32] hover:border-[#42424d]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="w-4 h-4 text-[#9a1e36]" />
                    <span className="text-xs font-bold text-white">Tarjeta</span>
                  </div>
                  <span className="text-[11px] text-[#a1a1aa] font-mono">
                    3 o 6 Cuotas sin interés
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'efectivo' })}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    formData.paymentMethod === 'efectivo'
                      ? 'bg-[#221418] border-[#781428] ring-1 ring-[#781428]'
                      : 'bg-[#18181c] border-[#2b2b32] hover:border-[#42424d]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Banknote className="w-4 h-4 text-[#9a1e36]" />
                    <span className="text-xs font-bold text-white">Contra Entrega</span>
                  </div>
                  <span className="text-[11px] text-[#a1a1aa] font-mono">
                    Efectivo al recibir
                  </span>
                </button>
              </div>
            </div>

            {/* Total and Submit */}
            <div className="p-4 rounded-xl bg-[#18181c] border border-[#27272e] space-y-2 text-xs font-mono">
              <div className="flex justify-between text-[#a1a1aa]">
                <span>Subtotal ({items.length} prendas):</span>
                <span>{formatPrice(rawSubtotal)}</span>
              </div>
              {isTransfer && (
                <div className="flex justify-between text-[#4ade80]">
                  <span>Descuento Transferencia (15%):</span>
                  <span>-{formatPrice(transferDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#a1a1aa]">
                <span>Envío a domicilio:</span>
                <span>{shipping === 0 ? 'Gratis' : formatPrice(shipping)}</span>
              </div>
              <div className="pt-2 border-t border-[#232328] flex justify-between text-base font-bold text-white">
                <span>Total a Pagar:</span>
                <span className="text-[#e4e4e7]">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#781428] hover:bg-[#941b32] text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all shadow-lg hover:shadow-[#781428]/40 cursor-pointer"
            >
              Confirmar Pedido · {formatPrice(grandTotal)}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
