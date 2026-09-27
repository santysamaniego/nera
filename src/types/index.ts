export type MainCategory = 'ALL' | 'ARRIBA' | 'ABAJO' | 'NOCHE' | 'ACCESORIOS';

export type SubCategory =
  // Arriba
  | 'Remeras'
  | 'Tops'
  | 'Bodys'
  | 'Remerones'
  | 'Buzos'
  | 'Camperas'
  | 'Blazers'
  // Abajo
  | 'Jeans'
  | 'Joggings'
  | 'Polleras'
  | 'Shorts'
  // Noche
  | 'Vestidos'
  | 'Conjuntos'
  // Accesorios
  | 'Carteras'
  | 'Cintos'
  | 'Gorras'
  | 'Sombreros'
  | 'Joyería';

export type ClothingSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '24' | '26' | '28' | '30' | '32' | '34' | 'Único';

export interface Product {
  id: string;
  name: string;
  category: MainCategory;
  subcategory: SubCategory;
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  composition: string;
  sizes: ClothingSize[];
  colors: {
    name: string;
    hex: string;
  }[];
  image: string;
  secondaryImage?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  editorialCode: string; // e.g. "001 — RUNAWAY"
  stockPerSize: Record<string, number>;
  measurementsGuide?: {
    chest?: string;
    waist?: string;
    length?: string;
    hips?: string;
  };
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: ClothingSize;
  selectedColor: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: {
    productName: string;
    size: ClothingSize;
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
