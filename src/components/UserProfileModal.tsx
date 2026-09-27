import React, { useState } from 'react';
import { X, Heart, Package, MapPin, User, LogIn, UserPlus, ShoppingBag, Trash2, CheckCircle2 } from 'lucide-react';
import { Product, Order, ClothingSize } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (product: Product) => void;
  onQuickAddToCart: (product: Product, size: ClothingSize) => void;
  orders: Order[];
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onQuickAddToCart,
  orders,
}) => {
  // Views: 'account' (authenticated view) | 'login' | 'register'
  const [viewMode, setViewMode] = useState<'account' | 'login' | 'register'>('account');
  const [accountSubTab, setAccountSubTab] = useState<'wishlist' | 'orders' | 'profile'>('wishlist');

  // Form states
  const [loginEmail, setLoginEmail] = useState('ssamaniego065@gmail.com');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthSuccessMsg('¡Bienvenida a tu espacio personal NERA!');
    setTimeout(() => {
      setAuthSuccessMsg('');
      setViewMode('account');
    }, 900);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthSuccessMsg('¡Tu membresía NERA ha sido creada exitosamente!');
    setTimeout(() => {
      setAuthSuccessMsg('');
      setViewMode('account');
    }, 1000);
  };

  const formatPrice = (amt: number) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(amt);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0c0c0f] border border-white/[0.08] rounded-[24px] sm:rounded-[32px] shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-5 sm:px-8 pt-6 pb-4 sm:pb-5 flex items-start justify-between border-b border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent">
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#781428] font-mono font-medium mb-1">
              <span>Maison & Membresía</span>
              <span>·</span>
              <span className="text-[#71717a]">NERA PRIVÉ</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
              {viewMode === 'account'
                ? 'Mi Espacio Personal'
                : viewMode === 'login'
                ? 'Acceso a tu Cuenta'
                : 'Crear tu Cuenta NERA'}
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {viewMode === 'account' ? (
              <button
                onClick={() => setViewMode('login')}
                className="text-[11px] uppercase tracking-wider text-[#8e8e99] hover:text-white transition-colors cursor-pointer py-1 px-2"
              >
                Cambiar Cuenta
              </button>
            ) : (
              <button
                onClick={() => setViewMode('account')}
                className="text-[11px] uppercase tracking-wider text-[#8e8e99] hover:text-white transition-colors cursor-pointer py-1 px-2"
              >
                Ver Mi Panel
              </button>
            )}

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* View Mode 1: Authenticated Account View */}
        {viewMode === 'account' && (
          <>
            {/* Pill tabs */}
            <div className="px-5 sm:px-8 py-3 border-b border-white/[0.06] bg-[#0e0e12]">
              <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/[0.06] rounded-full overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setAccountSubTab('wishlist')}
                  className={`flex-1 min-w-[100px] py-1.5 sm:py-2 px-3 text-[11px] sm:text-xs uppercase tracking-wider rounded-full font-medium transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                    accountSubTab === 'wishlist'
                      ? 'bg-white text-black shadow-sm'
                      : 'text-[#8e8e99] hover:text-white'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>Favoritos ({wishlistProducts.length})</span>
                </button>
                <button
                  onClick={() => setAccountSubTab('orders')}
                  className={`flex-1 min-w-[100px] py-1.5 sm:py-2 px-3 text-[11px] sm:text-xs uppercase tracking-wider rounded-full font-medium transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                    accountSubTab === 'orders'
                      ? 'bg-white text-black shadow-sm'
                      : 'text-[#8e8e99] hover:text-white'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Pedidos ({orders.length})</span>
                </button>
                <button
                  onClick={() => setAccountSubTab('profile')}
                  className={`flex-1 min-w-[100px] py-1.5 sm:py-2 px-3 text-[11px] sm:text-xs uppercase tracking-wider rounded-full font-medium transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                    accountSubTab === 'profile'
                      ? 'bg-white text-black shadow-sm'
                      : 'text-[#8e8e99] hover:text-white'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Mis Datos</span>
                </button>
              </div>
            </div>

            {/* Account Content */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-4">
              {/* Wishlist sub-view */}
              {accountSubTab === 'wishlist' && (
                <div>
                  {wishlistProducts.length === 0 ? (
                    <div className="py-16 text-center space-y-2">
                      <Heart className="w-7 h-7 text-[#25252e] mx-auto stroke-[1.5]" />
                      <p className="text-white text-xs font-medium">Tu selección de favoritos está vacía.</p>
                      <p className="text-[11px] text-[#71717a]">
                        Podés guardar prendas con el ícono de corazón en el catálogo.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {wishlistProducts.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all"
                        >
                          <div className="w-14 h-16 rounded-xl overflow-hidden bg-[#18181c] shrink-0">
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-medium text-white truncate">{p.name}</h4>
                            <div className="text-[10px] font-mono text-[#71717a] mt-0.5">
                              {p.subcategory} · Talles: {p.sizes.join(', ')}
                            </div>
                            <div className="text-xs font-semibold text-white tabular-nums mt-0.5">
                              {formatPrice(p.price)}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => onQuickAddToCart(p, p.sizes[0])}
                              className="px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-[#e4e4e7] text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span className="hidden xs:inline">Comprar</span>
                            </button>
                            <button
                              onClick={() => onRemoveWishlist(p)}
                              className="p-1.5 rounded-full text-[#71717a] hover:text-[#ef4444] transition-colors cursor-pointer"
                              title="Quitar"
                            >
                              <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Orders sub-view */}
              {accountSubTab === 'orders' && (
                <div className="space-y-3">
                  {orders.length === 0 ? (
                    <div className="py-16 text-center space-y-2">
                      <Package className="w-7 h-7 text-[#25252e] mx-auto stroke-[1.5]" />
                      <p className="text-white text-xs font-medium">Aún no registrás órdenes de compra.</p>
                      <p className="text-[11px] text-[#71717a]">Tus pedidos confirmados aparecerán aquí.</p>
                    </div>
                  ) : (
                    orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2.5 text-xs font-mono"
                      >
                        <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{ord.id}</span>
                            <span className="text-[#71717a] text-[11px]">· {ord.date}</span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-[#14281a] text-[#4ade80] border border-[#205230]">
                            {ord.status}
                          </span>
                        </div>

                        <div className="space-y-1 text-[#8e8e99] text-[11px]">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="flex justify-between">
                              <span className="truncate pr-2">
                                {it.quantity}x {it.productName} ({it.size} - {it.color})
                              </span>
                              <span className="text-white shrink-0 font-medium">
                                {formatPrice(it.price * it.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] text-xs">
                          <span className="text-[#71717a] text-[11px] truncate pr-2">
                            {ord.shippingAddress}, {ord.city}
                          </span>
                          <span className="font-bold text-white shrink-0">
                            Total: {formatPrice(ord.total)}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Profile details */}
              {accountSubTab === 'profile' && (
                <div className="space-y-3.5 text-xs">
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#781428] font-semibold block">
                      Datos de la Cuenta
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#8e8e99]">
                      <div>
                        <span className="text-[10px] text-[#71717a] uppercase font-mono block">Titular</span>
                        <span className="text-white font-medium">Sofía Samaniego</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#71717a] uppercase font-mono block">Teléfono</span>
                        <span className="text-white font-medium">+54 9 11 5824-9102</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-[10px] text-[#71717a] uppercase font-mono block">Correo Electrónico</span>
                        <span className="text-white font-medium">ssamaniego065@gmail.com</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#781428] font-semibold block mb-1">
                      Dirección de Envío
                    </span>
                    <p className="text-white font-medium">Av. del Libertador 3420, Piso 6B</p>
                    <p className="text-[#8e8e99] text-[11px]">Palermo, C1425 · Ciudad Autónoma de Buenos Aires</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* View Mode 2: Iniciar Sesión (Login) */}
        {viewMode === 'login' && (
          <div className="p-6 sm:p-10 overflow-y-auto max-w-md mx-auto w-full space-y-5">
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white font-display uppercase tracking-wider">
                Bienvenida a NERA
              </h3>
              <p className="text-xs text-[#8e8e99] font-light">
                Ingresá tus credenciales para acceder a tus pedidos y beneficios exclusivos.
              </p>
            </div>

            {authSuccessMsg && (
              <div className="p-3 rounded-full bg-[#183020] border border-[#285e35] text-xs text-[#86efac] flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{authSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs font-mono">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#71717a] mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="ejemplo@email.com"
                  className="w-full bg-black/40 border border-white/10 text-white px-4 py-2.5 rounded-full text-xs focus:outline-none focus:border-[#781428]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] uppercase tracking-wider text-[#71717a]">
                    Contraseña
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Te enviaremos un enlace seguro a tu correo para restablecer tu contraseña.')}
                    className="text-[10px] text-[#e18092] hover:underline"
                  >
                    ¿Olvidaste tu clave?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 text-white px-4 py-2.5 rounded-full text-xs focus:outline-none focus:border-[#781428]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#781428] hover:bg-[#941b32] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all shadow-lg hover:shadow-[#781428]/30 cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Iniciar Sesión</span>
              </button>
            </form>

            <div className="pt-4 border-t border-white/[0.06] text-center text-xs text-[#8e8e99]">
              <span>¿No tenés cuenta aún?</span>{' '}
              <button
                onClick={() => setViewMode('register')}
                className="text-white hover:text-[#e18092] font-medium underline ml-1 cursor-pointer"
              >
                Registrarme en NERA
              </button>
            </div>
          </div>
        )}

        {/* View Mode 3: Registrarse (Create Account) */}
        {viewMode === 'register' && (
          <div className="p-6 sm:p-10 overflow-y-auto max-w-md mx-auto w-full space-y-4">
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white font-display uppercase tracking-wider">
                Membresía NERA
              </h3>
              <p className="text-xs text-[#8e8e99] font-light">
                Creá tu cuenta para gestionar pedidos y calces personalizados.
              </p>
            </div>

            {authSuccessMsg && (
              <div className="p-3 rounded-full bg-[#183020] border border-[#285e35] text-xs text-[#86efac] flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{authSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#71717a] mb-1">
                  Nombre y Apellido
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 text-white px-4 py-2 rounded-full text-xs focus:outline-none focus:border-[#781428]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#71717a] mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 text-white px-4 py-2 rounded-full text-xs focus:outline-none focus:border-[#781428]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#71717a] mb-1">
                  WhatsApp / Celular
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+54 9 11 ..."
                  value={registerPhone}
                  onChange={(e) => setRegisterPhone(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 text-white px-4 py-2 rounded-full text-xs focus:outline-none focus:border-[#781428]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#71717a] mb-1">
                  Contraseña (mínimo 6 caracteres)
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 text-white px-4 py-2 rounded-full text-xs focus:outline-none focus:border-[#781428]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#781428] hover:bg-[#941b32] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all shadow-lg hover:shadow-[#781428]/30 cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Crear Membresía</span>
              </button>
            </form>

            <div className="pt-3 border-t border-white/[0.06] text-center text-xs text-[#8e8e99]">
              <span>¿Ya tenés una cuenta registrada?</span>{' '}
              <button
                onClick={() => setViewMode('login')}
                className="text-white hover:text-[#e18092] font-medium underline ml-1 cursor-pointer"
              >
                Iniciar sesión aquí
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-5 sm:px-8 py-3.5 bg-white/[0.01] border-t border-white/[0.06] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs uppercase tracking-wider font-medium rounded-full transition-colors cursor-pointer"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    </div>
  );
};
