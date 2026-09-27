import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryCarousel } from './components/CategoryCarousel';
import { FilterBar } from './components/FilterBar';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { InfoModal } from './components/InfoModal';
import { CambiosModal } from './components/CambiosModal';
import { SearchModal } from './components/SearchModal';
import { UserProfileModal } from './components/UserProfileModal';
import { Footer } from './components/Footer';

import { PRODUCTS } from './data/products';
import { MainCategory, SubCategory, ClothingSize, Product, CartItem, Order } from './types';

export default function App() {
  // Navigation & Filtering State
  const [activeCategory, setActiveCategory] = useState<MainCategory>('ALL');
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | 'ALL'>('ALL');
  const [selectedSize, setSelectedSize] = useState<ClothingSize | 'ALL'>('ALL');
  const [selectedColorTone, setSelectedColorTone] = useState<string | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'new'>('featured');

  // Modals & Drawers State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isCambiosOpen, setIsCambiosOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  // Cart State (Initialized with 1 sample luxury item so the user sees a living bag right away)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      product: PRODUCTS[0], // Blazer Sastreado Oversized Nero
      selectedSize: 'M',
      selectedColor: 'Nero Black',
      quantity: 1,
    },
  ]);

  // Wishlist & Orders State
  const [wishlistIds, setWishlistIds] = useState<string[]>([PRODUCTS[7].id, PRODUCTS[12].id]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'NERA-748920',
      date: '14 Sep 2026',
      items: [
        {
          productName: 'Remera Boxy Washed 320g',
          size: 'M',
          color: 'Washed Charcoal',
          price: 49000,
          quantity: 1,
        },
      ],
      total: 49000,
      customerName: 'Sofía Samaniego',
      customerEmail: 'ssamaniego065@gmail.com',
      customerPhone: '+54 9 11 5824-9102',
      shippingAddress: 'Av. Libertador 3420, Piso 6B',
      city: 'Buenos Aires',
      postalCode: 'C1425',
      paymentMethod: 'transferencia',
      status: 'Enviado',
    },
  ]);

  // Category Selection Handler
  const handleSelectCategory = (category: MainCategory) => {
    setActiveCategory(category);
    setSelectedSubCategory('ALL');
    setSelectedSize('ALL');
    const catalogElement = document.getElementById('catalogo-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectNew = () => {
    setActiveCategory('ALL');
    setSortBy('new');
    const catalogElement = document.getElementById('catalogo-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setActiveCategory('ALL');
    setSelectedSubCategory('ALL');
    setSelectedSize('ALL');
    setSelectedColorTone('ALL');
    setSortBy('featured');
  };

  // Cart Actions
  const handleAddToCart = (
    product: Product,
    size: ClothingSize,
    color: string,
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (it) =>
          it.product.id === product.id &&
          it.selectedSize === size &&
          it.selectedColor === color
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }

      return [
        ...prev,
        {
          id: `${product.id}-${size}-${color}-${Date.now()}`,
          product,
          selectedSize: size,
          selectedColor: color,
          quantity,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const handleOrderCompleted = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setIsCartOpen(false);
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (activeCategory !== 'ALL') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (selectedSubCategory !== 'ALL') {
      result = result.filter((p) => p.subcategory === selectedSubCategory);
    }

    if (selectedSize !== 'ALL') {
      result = result.filter((p) => p.sizes.includes(selectedSize));
    }

    if (selectedColorTone !== 'ALL') {
      const query = selectedColorTone.toLowerCase();
      result = result.filter((p) =>
        p.colors.some(
          (c) =>
            c.name.toLowerCase().includes(query) ||
            (query.includes('borgoña') && (c.name.toLowerCase().includes('borgoña') || c.name.toLowerCase().includes('vino'))) ||
            (query.includes('blanco') && (c.name.toLowerCase().includes('blanco') || c.name.toLowerCase().includes('chalk') || c.name.toLowerCase().includes('crudo') || c.name.toLowerCase().includes('bone'))) ||
            (query.includes('negro') && (c.name.toLowerCase().includes('black') || c.name.toLowerCase().includes('nero') || c.name.toLowerCase().includes('dark'))) ||
            (query.includes('gris') && (c.name.toLowerCase().includes('grey') || c.name.toLowerCase().includes('charcoal') || c.name.toLowerCase().includes('graphite') || c.name.toLowerCase().includes('slate') || c.name.toLowerCase().includes('stone')))
        )
      );
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'new':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
    }

    return result;
  }, [activeCategory, selectedSubCategory, selectedSize, selectedColorTone, sortBy]);

  const wishlistProducts = useMemo(
    () => PRODUCTS.filter((p) => wishlistIds.includes(p.id)),
    [wishlistIds]
  );

  return (
    <div className="min-h-screen bg-[#0e0e10] text-[#e4e4e7] flex flex-col selection:bg-[#781428] selection:text-white">
      {/* Top 3-Zone Navigation Header */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenInfo={() => setIsInfoOpen(true)}
        onOpenCambios={() => setIsCambiosOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
        wishlistCount={wishlistIds.length}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onSelectNew={handleSelectNew}
      />

      <main className="flex-1">
        {/* Giant NERA Wordmark Hero & Editorial Fashion Banner */}
        <Hero
          onExploreClick={() => {
            const el = document.getElementById('categorias-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Categories Section with Stadium Arched Capsules */}
        <CategoryCarousel
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Catalog Section Anchor & Filter Bar */}
        <div id="catalogo-section">
          <FilterBar
            activeCategory={activeCategory}
            selectedSubCategory={selectedSubCategory}
            onSelectSubCategory={setSelectedSubCategory}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
            selectedColorTone={selectedColorTone}
            onSelectColorTone={setSelectedColorTone}
            sortBy={sortBy}
            onSelectSortBy={setSortBy}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            totalProductsCount={filteredProducts.length}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Product Cards Grid - Clean Minimalist Editorial */}
        <ProductGrid
          products={filteredProducts}
          onQuickView={(p) => setDetailProduct(p)}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenInfo={() => setIsInfoOpen(true)}
        onOpenCambios={() => setIsCambiosOpen(true)}
      />

      {/* Modals & Slide-overs */}
      <ProductDetailModal
        product={detailProduct}
        isOpen={!!detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        isWishlisted={detailProduct ? wishlistIds.includes(detailProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onStartCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderCompleted={handleOrderCompleted}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />

      <CambiosModal
        isOpen={isCambiosOpen}
        onClose={() => setIsCambiosOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setDetailProduct(p)}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onQuickAddToCart={(p, sz) => handleAddToCart(p, sz, p.colors[0]?.name || 'Nero', 1)}
        orders={orders}
      />
    </div>
  );
}
