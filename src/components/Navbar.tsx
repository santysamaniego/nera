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
