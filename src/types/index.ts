export type MainCategory = 'ALL' | 'INFERIOR' | 'SUPERIOR' | 'NOCHE';

export type SubCategory = string;

export type ClothingSize = string;

export interface ProductColor {
  name: string;
  hex: string;
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  category: MainCategory;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  description?: string;
  details?: string[];
  composition?: string;
  sizes: string[];
  colors?: ProductColor[];
  image: string;
  images: string[];
  fallbackImage?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  editorialCode?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: {
    productName: string;
    size: string;
    color: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  paymentMethod: 'transferencia' | 'tarjeta' | 'efectivo';
  status: 'Confirmado' | 'En preparación' | 'Enviado';
}
