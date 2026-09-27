import React from 'react';
import { Search, User } from 'lucide-react';
import { MainCategory } from '../types';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenSizeGuide: () => void;
  onOpenInfo: () => void;
  onOpenCambios: () => void;
  onOpenCart: () => void;
  onOpenProfile: () => void;
  cartCount: number;
  wishlistCount: number;
  activeCategory: MainCategory;
  onSelectCategory: (category: MainCategory) => void;
  onSelectNew: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenSizeGuide,
  onOpenInfo,
  onOpenCambios,
  onOpenCart,
  onOpenProfile,
  cartCount,
  wishlistCount,
  onSelectNew,
}) => {
  const tickerItems = [
    'ENVÍOS SIN CARGO A TODO EL PAÍS SUPERANDO $120.000',
    '3 Y 6 CUOTAS SIN INTERÉS',
    '15% OFF ABONANDO CON TRANSFERENCIA BANCARIA',
    'PRIMER CAMBIO GRATIS EN NUESTRO ATELIER O A DOMICILIO (30 DÍAS)',
    'SHOWROOM PALERMO SOHO: MIÉRCOLES A SÁBADOS 14 A 20 HS',
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0e0e10]/95 backdrop-blur-md border-b border-[#1f1f24] transition-all">
      {/* Infinite Looping Marquee Ticker */}
      <div className="bg-[#141418] py-2 border-b border-[#1c1c22] overflow-hidden whitespace-nowrap select-none">
        <div className="animate-marquee flex items-center text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#a1a1aa] font-medium">
          {/* Loop block 1 */}
          <div className="flex items-center gap-6 pr-6">
            {tickerItems.map((text, idx) => (
              <React.Fragment key={`t1-${idx}`}>
                <span>{text}</span>
                <span className="text-[#781428] font-bold">◆</span>
              </React.Fragment>
            ))}
          </div>
          {/* Loop block 2 (duplicate for seamless loop) */}
          <div className="flex items-center gap-6 pr-6" aria-hidden="true">
            {tickerItems.map((text, idx) => (
              <React.Fragment key={`t2-${idx}`}>
                <span>{text}</span>
                <span className="text-[#781428] font-bold">◆</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main navigation row matching client sketch */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Left: Search button */}
        <div className="flex items-center">
          <button
            onClick={onOpenSearch}
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d4d4d8] hover:text-white transition-colors py-2 px-1 focus:outline-none cursor-pointer"
            aria-label="Abrir buscador de prendas"
          >
            <Search className="w-3.5 h-3.5 text-[#a1a1aa] group-hover:text-white transition-colors" />
            <span className="font-medium">SEARCH</span>
          </button>
        </div>

        {/* Center: Essential text links from client's sketch */}
        <nav className="hidden md:flex items-center gap-8 text-[12px] uppercase tracking-[0.22em] font-medium text-[#a1a1aa]">
          <button
            onClick={onSelectNew}
            className="hover:text-white transition-colors relative py-1 text-left after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#781428] after:transition-all cursor-pointer"
          >
            - NEW
          </button>
          <button
            onClick={onOpenSizeGuide}
            className="hover:text-white transition-colors relative py-1 text-left after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#781428] after:transition-all cursor-pointer"
          >
            - TABLA DE TALLES
          </button>
          <button
            onClick={onOpenInfo}
            className="hover:text-white transition-colors relative py-1 text-left after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#781428] after:transition-all cursor-pointer"
          >
            - INFO
          </button>
          <button
            onClick={onOpenCambios}
            className="hover:text-white transition-colors relative py-1 text-left after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#781428] after:transition-all cursor-pointer"
          >
            - CAMBIOS
          </button>
        </nav>

        {/* Right: User Profile & Redesigned Luxury Shopping Bag */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onOpenProfile}
            className="p-2 text-[#a1a1aa] hover:text-white transition-colors rounded-full hover:bg-[#1a1a1e] relative focus:outline-none cursor-pointer"
            title="Mi Cuenta NERA"
            aria-label="Mi Cuenta"
          >
            <User className="w-4 h-4 stroke-[1.5]" />
            {wishlistCount > 0 && (
              <span className="absolute 1 top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#781428]" />
            )}
          </button>

          {/* Elegant Luxury Bag Button (Replacing technical brackets) */}
          <button
            onClick={onOpenCart}
            className="group flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-transparent hover:bg-[#18181c] border border-[#2b2b32] hover:border-[#781428] text-white transition-all cursor-pointer"
            aria-label={`Bolsa de compras con ${cartCount} prendas`}
          >
            {/* Custom Luxury Minimalist Tote Bag SVG */}
            <svg
              className="w-3.5 h-3.5 text-[#d4d4d8] group-hover:text-white transition-colors"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="text-xs uppercase tracking-[0.15em] font-medium text-[#e4e4e7] group-hover:text-white">
              Bolsa
            </span>
            <span className="text-[11px] font-mono text-[#e18092] font-semibold">
              ({cartCount})
            </span>
          </button>
        </div>
      </div>

      {/* Mobile secondary links strip */}
      <div className="md:hidden flex items-center justify-around py-2 border-t border-[#1a1a20] text-[11px] uppercase tracking-wider text-[#a1a1aa] bg-[#0c0c0e]">
        <button onClick={onSelectNew} className="hover:text-white cursor-pointer">- NEW</button>
        <button onClick={onOpenSizeGuide} className="hover:text-white cursor-pointer">- TALLES</button>
        <button onClick={onOpenInfo} className="hover:text-white cursor-pointer">- INFO</button>
        <button onClick={onOpenCambios} className="hover:text-white cursor-pointer">- CAMBIOS</button>
      </div>
    </header>
  );
};
