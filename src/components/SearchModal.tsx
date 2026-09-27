import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const popularQueries = [
    'Blazer oversized',
    'Vestido noche',
    'Jeans wide leg',
    'Borgoña',
    'Remera boxy',
    'Cartera hobo',
  ];

  const filteredProducts = searchTerm.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.subcategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.colors.some((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  const formatPrice = (amt: number) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(amt);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#141417] border border-[#2b2b32] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#232328] bg-[#18181c] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#781428] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Buscar por prenda, talle, color (ej: blazer, borgoña, jeans)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-white text-sm placeholder-[#71717a] focus:outline-none font-mono"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-[#a1a1aa] hover:text-white px-2 font-mono"
            >
              Borrar
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#a1a1aa] hover:text-white hover:bg-[#25252b] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto">
          {!searchTerm.trim() ? (
            <div className="space-y-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#71717a]">
                Búsquedas Frecuentes
              </div>
              <div className="flex flex-wrap gap-2">
                {popularQueries.map((query) => (
                  <button
                    key={query}
                    onClick={() => setSearchTerm(query)}
                    className="px-3 py-1.5 rounded-lg bg-[#1a1a20] hover:bg-[#25252d] border border-[#27272e] text-xs text-[#d4d4d8] hover:text-white transition-colors cursor-pointer"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#a1a1aa]">
              No encontramos resultados para "<span className="text-white">{searchTerm}</span>".
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#71717a] mb-3">
                {filteredProducts.length} Resultados encontrados
              </div>
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-[#1c1c22] border border-transparent hover:border-[#2b2b32] transition-colors cursor-pointer group"
                >
                  <div className="w-12 h-14 rounded-lg overflow-hidden bg-[#202026] shrink-0">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#71717a]">
                      {p.category} · {p.subcategory}
                    </div>
                    <div className="text-xs font-semibold text-white group-hover:text-[#e4e4e7]">
                      {p.name}
                    </div>
                    <div className="text-xs font-mono text-[#a1a1aa] mt-0.5">
                      Talles: {p.sizes.join(', ')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-white tabular-nums">
                      {formatPrice(p.price)}
                    </div>
                    <span className="text-[10px] text-[#781428] font-mono group-hover:underline">
                      Ver prenda →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
