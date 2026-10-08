import { Product } from '../types';

import arribaImg from '../assets/images/superior.jpg';
import abajoImg from '../assets/images/inferior.jpg';
import nocheImg from '../assets/images/noche.jpg';

export { arribaImg, abajoImg, nocheImg };

export const WHATSAPP_NUMBER = '5491136581397';
export const WHATSAPP_DISPLAY = '11 3658-1397';

export const CATEGORIES_DATA = [
  {
    id: 'INFERIOR' as const,
    title: 'INFERIOR',
    subtitle: 'Jeans, Minis & Shorts',
    image: abajoImg,
    count: 8,
    description: 'Pantalones denim rígidos 100% algodón, faldas y minis estructuradas.',
  },
  {
    id: 'SUPERIOR' as const,
    title: 'SUPERIOR',
    subtitle: 'Remeras, Blusas & Oversize',
    image: arribaImg,
    count: 8,
    description: 'Básicos depurados, blusas fluidas y cortes boxy de alta densidad.',
  },
  {
    id: 'NOCHE' as const,
    title: 'NOCHE',
    subtitle: 'Vestidos, Tops & Fiesta',
    image: nocheImg,
    count: 8,
    description: 'Siluetas de fiesta, satenes fluidos, escotes estructurados y brillos sutiles.',
  },
];

export const PRODUCTS: Product[] = [
  // 1. Wide ossido
  {
    id: 'wide-ossido',
    name: 'Wide ossido',
    category: 'INFERIOR',
    subcategory: 'Jeans',
    price: 54000,
    sizes: ['36', '38', '40'],
    image: '/images/wide_ossido_principal.jpeg',
    images: ['/images/wide_ossido_principal.jpeg', '/images/wide_ossido_inferior.jpeg'],
    fallbackImage: prodJeans,
    description: 'Pantalón wide leg confeccionado en denim rígido tono óxido con calce a la cintura y caída recta amplia.',
  },

  // 2. Wide nuvola
  {
    id: 'wide-nuvola',
    name: 'Wide nuvola',
    category: 'INFERIOR',
    subcategory: 'Jeans',
    price: 52000,
    sizes: ['36', '38', '40'],
    image: '/images/wide_nuvola_principal.jpeg',
    images: [
      '/images/wide_nuvola_principal.jpeg',
      '/images/wide_nuvola_inferior.jpeg',
      '/images/wide_nuvola_inferior2.jpeg',
      '/images/wide_nuvola_inferior3.jpeg',
    ],
    fallbackImage: prodJeans,
    description: 'Denim wide leg en lavado suave celeste nuvola con tiro medio-alto y costuras reforzadas.',
  },

  // 3. Wide Fiume
  {
    id: 'wide-fiume',
    name: 'Wide Fiume',
    category: 'INFERIOR',
    subcategory: 'Jeans',
    price: 62000,
    sizes: ['36', '38', '40'],
    image: '/images/wide_fiume_principal.jpeg',
    images: [
      '/images/wide_fiume_principal.jpeg',
      '/images/wide_fiume_inferior.jpeg',
      '/images/wide_fiume_inferior2.jpeg',
    ],
    fallbackImage: prodJeans,
    description: 'Jeans wide de lavado profundo clásico azul río con acabado artesanal y calce fluido.',
  },

  // 4. Wide nera
  {
    id: 'wide-nera',
    name: 'Wide nera',
    category: 'INFERIOR',
    subcategory: 'Jeans',
    price: 50000,
    sizes: ['36', '38', '40'],
    image: '/images/wide_nera_principal.jpeg',
    images: ['/images/wide_nera_principal.jpeg', '/images/wide_nera_inferior.jpeg'],
    fallbackImage: prodJeans,
    description: 'Pantalón wide leg negro profundo, teñido reactivo que preserva el color y textura prémium.',
  },

  // 5. Mini pianto
  {
    id: 'mini-pianto',
    name: 'Mini pianto',
    category: 'INFERIOR',
    subcategory: 'Minis',
    price: 47000,
    sizes: ['S', 'M', 'L'],
    image: '/images/mini_pianto_principal.jpeg',
    images: [
      '/images/mini_pianto_principal.jpeg',
      '/images/mini_pianto_inferior.jpeg',
      '/images/mini_pianto_inferior2.jpeg',
      '/images/mini_pianto_inferior3.jpeg',
    ],
    fallbackImage: prodPollera,
    description: 'Minifalda sastrera con tablas frontales y detalle asimétrico de diseño minimalista.',
  },

  // 6. Mini lotto
  {
    id: 'mini-lotto',
    name: 'Mini lotto',
    category: 'INFERIOR',
    subcategory: 'Minis',
    price: 47000,
    sizes: ['S', 'M', 'L'],
    image: '/images/mini_lotto_principal.jpeg',
    images: [
      '/images/mini_lotto_principal.jpeg',
      '/images/mini_lotto_inferior.jpeg',
      '/images/mini_lotto_inferior2.jpeg',
    ],
    fallbackImage: prodPollera,
    description: 'Pollera mini de corte recto al cuerpo con terminaciones ocultas y cintura limpia.',
  },

  // 7. Mini moon
  {
    id: 'mini-moon',
    name: 'Mini moon',
    category: 'INFERIOR',
    subcategory: 'Minis',
    price: 55000,
    sizes: ['S', 'M', 'L'],
    image: '/images/mini_moon_principal.jpeg',
    images: [
      '/images/mini_moon_principal.jpeg',
      '/images/mini_moon_inferior.jpeg',
      '/images/mini_moon_inferior2.jpeg',
      '/images/mini_moon_inferior3.jpeg',
    ],
    fallbackImage: prodPollera,
    description: 'Minifalda estructurada en tejido texturado con silueta envolvente y forrería suave.',
  },

  // 8. Mini Stella
  {
    id: 'mini-stella',
    name: 'Mini Stella',
    category: 'INFERIOR',
    subcategory: 'Minis',
    price: 55000,
    sizes: ['S', 'M', 'L'],
    image: '/images/mini_stella_principal.jpeg',
    images: ['/images/mini_stella_principal.jpeg', '/images/mini_stella_inferior.jpeg'],
    fallbackImage: prodPollera,
    description: 'Falda mini entallada con destellos tenues para salidas y eventos nocturnos.',
  },

  // 9. Dress ginevra
  {
    id: 'dress-ginevra',
    name: 'Dress ginevra',
    category: 'NOCHE',
    subcategory: 'Vestidos',
    price: 60000,
    sizes: ['S', 'M', 'L'],
    image: '/images/dress_ginevra.jpeg',
    images: ['/images/dress_ginevra.jpeg'],
    fallbackImage: prodVestido,
    description: 'Vestido largo de fiesta de caída etérea con escote limpio y silueta lánguida refinada.',
  },

  // 10. Dress maglietta (Con colores Negro y Blanco)
  {
    id: 'dress-maglietta',
    name: 'Dress maglietta',
    category: 'NOCHE',
    subcategory: 'Vestidos',
    price: 28000,
    sizes: ['S', 'M', 'L'],
    image: '/images/dress_maglietta_negro_principal.jpeg',
    images: [
      '/images/dress_maglietta_negro_principal.jpeg',
      '/images/dress_maglietta_negro_inferior.jpeg',
      '/images/dress_maglietta_blanco_principal.jpeg',
      '/images/dress_maglietta_blanco_inferior.jpeg',
    ],
    colors: [
      {
        name: 'Negro',
        hex: '#0f0f12',
        images: [
          '/images/dress_maglietta_negro_principal.jpeg',
          '/images/dress_maglietta_negro_inferior.jpeg',
        ],
      },
      {
        name: 'Blanco',
        hex: '#f5f5f7',
        images: [
          '/images/dress_maglietta_blanco_principal.jpeg',
          '/images/dress_maglietta_blanco_inferior.jpeg',
        ],
      },
    ],
    fallbackImage: prodVestido,
    description: 'Vestido estilo camiseta en rib premium con entalle sutil, disponible en blanco y en negro.',
  },

  // 11. Dress Sakura
  {
    id: 'dress-sakura',
    name: 'Dress Sakura',
    category: 'NOCHE',
    subcategory: 'Vestidos',
    price: 22500,
    sizes: ['S', 'M', 'L'],
    image: '/images/dress_sakura_principal.jpeg',
    images: ['/images/dress_sakura_principal.jpeg', '/images/dress_sakura_noche.jpeg'],
    fallbackImage: prodVestido,
    description: 'Vestido corto con movimiento fluido y tirantes delicados para ocasiones especiales.',
  },

  // 12. Blusa pois
  {
    id: 'blusa-pois',
    name: 'Blusa pois',
    category: 'SUPERIOR',
    subcategory: 'Blusas',
    price: 35000,
    sizes: ['S', 'M', 'L'],
    image: '/images/blusa_pois_principal.jpeg',
    images: ['/images/blusa_pois_principal.jpeg', '/images/blusa_pois_superior.jpeg'],
    fallbackImage: prodRemera,
    description: 'Blusa fluida con motivo sutil a lunares pois, cuello arquitectónico y manga holgada.',
  },

  // 13. Basic over (Colores Blanca y Negra)
  {
    id: 'basic-over',
    name: 'Basic over',
    category: 'SUPERIOR',
    subcategory: 'Remeras',
    price: 22500,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/images/basic_over_blanca_principal.jpeg',
    images: [
      '/images/basic_over_blanca_principal.jpeg',
      '/images/basic_over_blanca.jpeg',
      '/images/basic_over_negro_principal.jpeg',
      '/images/basic_over_negra.jpeg',
    ],
    colors: [
      {
        name: 'Blanco',
        hex: '#ffffff',
        images: [
          '/images/basic_over_blanca_principal.jpeg',
          '/images/basic_over_blanca.jpeg',
        ],
      },
      {
        name: 'Negro',
        hex: '#111113',
        images: [
          '/images/basic_over_negro_principal.jpeg',
          '/images/basic_over_negra.jpeg',
        ],
      },
    ],
    fallbackImage: prodRemera,
    description: 'Remera de corte oversize holgado confeccionada en algodón pesado de máxima suavidad.',
  },

  // 14. Bianca over
  {
    id: 'bianca-over',
    name: 'Bianca over',
    category: 'SUPERIOR',
    subcategory: 'Remeras',
    price: 33000,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/images/over_bianca_principal.jpeg',
    images: [
      '/images/over_bianca_principal.jpeg',
      '/images/bianca_over.jpeg',
      '/images/bianca_over2.jpeg',
      '/images/bianca_over3.jpeg',
    ],
    fallbackImage: prodRemera,
    description: 'Remerón premium boxy blanco impoluto con cuello ribb reforzado y hombros caídos.',
  },

  // 15. Basic lore
  {
    id: 'basic-lore',
    name: 'Basic lore',
    category: 'SUPERIOR',
    subcategory: 'Tops',
    price: 20500,
    sizes: ['S', 'M', 'L'],
    image: '/images/basic_lore_principal.jpeg',
    images: ['/images/basic_lore_principal.jpeg', '/images/basic_lore.jpeg'],
    fallbackImage: prodRemera,
    description: 'Básico indispensable de calce al cuerpo con escote suave y algodón elástizado.',
  },

  // 16. Top angolo
  {
    id: 'top-angolo',
    name: 'Top angolo',
    category: 'NOCHE',
    subcategory: 'Tops',
    price: 10000,
    sizes: ['S', 'M', 'L'],
    image: '/images/top_angolo.jpeg',
    images: ['/images/top_angolo.jpeg', '/images/top_angolo2.jpeg'],
    fallbackImage: prodRemera,
    description: 'Top de noche con corte angular estructurado y diseño contemporáneo minimalista.',
  },

  // 17. Basic strap
  {
    id: 'basic-strap',
    name: 'Basic strap',
    category: 'NOCHE',
    subcategory: 'Tops',
    price: 6800,
    sizes: ['S', 'M', 'L'],
    image: '/images/basic_strap.jpeg',
    images: ['/images/basic_strap.jpeg', '/images/basic_strap2.jpeg', '/images/basic_strap3.jpeg'],
    fallbackImage: prodRemera,
    description: 'Top minimalista con finos tirantes tipo bretel y calce al cuerpo impecable.',
  },

  // 18. Basic old (Colores Blanca y Negra)
  {
    id: 'basic-old',
    name: 'Basic old',
    category: 'SUPERIOR',
    subcategory: 'Remeras',
    price: 15000,
    sizes: ['S', 'M', 'L'],
    image: '/images/basic_old_blanca_principal.jpeg',
    images: [
      '/images/basic_old_blanca_principal.jpeg',
      '/images/basic_old_blanca.jpeg',
      '/images/basic_old_negra_principal.jpeg',
      '/images/basic_old_blanca_negra.jpeg',
    ],
    colors: [
      {
        name: 'Blanco',
        hex: '#ffffff',
        images: [
          '/images/basic_old_blanca_principal.jpeg',
          '/images/basic_old_blanca.jpeg',
        ],
      },
      {
        name: 'Negro',
        hex: '#111113',
        images: [
          '/images/basic_old_negra_principal.jpeg',
          '/images/basic_old_blanca_negra.jpeg',
        ],
      },
    ],
    fallbackImage: prodRemera,
    description: 'Remera básica de corte clásico atemporal con tacto suave, disponible en blanco y negro.',
  },

  // 19. Blusa goccia
  {
    id: 'blusa-goccia',
    name: 'Blusa goccia',
    category: 'SUPERIOR',
    subcategory: 'Blusas',
    price: 10000,
    sizes: ['S', 'M', 'L'],
    image: '/images/blusa_goccia_principal.jpeg',
    images: ['/images/blusa_goccia_principal.jpeg', '/images/blusa_goccia.jpeg'],
    fallbackImage: prodRemera,
    description: 'Blusa ligera con escote gota en la espalda y caída suave en crepé liviano.',
  },

  // 20. Blusa Asia
  {
    id: 'blusa-asia',
    name: 'Blusa Asia',
    category: 'SUPERIOR',
    subcategory: 'Blusas',
    price: 13000,
    sizes: ['S', 'M', 'L'],
    image: '/images/blusa_asia_blanca_principal.jpeg',
    images: ['/images/blusa_asia_blanca_principal.jpeg', '/images/blusa_asia.jpeg'],
    fallbackImage: prodRemera,
    description: 'Blusa envolvente de inspiración oriental en satén blanco suave con lazo ajustable.',
  },

  // 21. Top Stella
  {
    id: 'top-stella',
    name: 'Top Stella',
    category: 'NOCHE',
    subcategory: 'Tops',
    price: 50000,
    sizes: ['S', 'M', 'L'],
    image: '/images/top_stella.jpeg',
    images: ['/images/top_stella.jpeg'],
    fallbackImage: prodRemera,
    description: 'Top joya para eventos de noche con destellos elegantes y espalda al descubierto.',
  },

  // 22. Top moon
  {
    id: 'top-moon',
    name: 'Top moon',
    category: 'NOCHE',
    subcategory: 'Tops',
    price: 50000,
    sizes: ['S', 'M', 'L'],
    image: '/images/top_moon.jpeg',
    images: ['/images/top_moon.jpeg', '/images/top_moon2.jpeg'],
    fallbackImage: prodRemera,
    description: 'Top de noche estructurado en satén lustrado con detalle lunar esculpido en el escote.',
  },

  // 23. Short bellagio
  {
    id: 'short-bellagio',
    name: 'Short bellagio',
    category: 'NOCHE',
    subcategory: 'Shorts',
    price: 43000,
    sizes: ['S', 'M', 'L'],
    image: '/images/short_bellagio_principal.jpeg',
    images: ['/images/short_bellagio_principal.jpeg', '/images/short_bellagio.jpeg'],
    fallbackImage: prodPollera,
    description: 'Short sastrero de noche con pinzas pronunciadas, tiro alto y bolsillos discretos.',
  },

  // 24. Basic cotone
  {
    id: 'basic-cotone',
    name: 'Basic cotone',
    category: 'SUPERIOR',
    subcategory: 'Remeras',
    price: 12500,
    sizes: ['S', 'M', 'L'],
    image: '/images/basic_cotone_principal.jpeg',
    images: ['/images/basic_cotone_principal.jpeg', '/images/basic_cotone_2.jpeg'],
    fallbackImage: prodRemera,
    description: 'Remera 100% puro algodón peinado, fresca y transpirable para uso diario.',
  },
];

export const SIZING_GUIDE_DATA = {
  arriba: [
    { size: 'XS', bust: '80 - 84 cm', waist: '60 - 64 cm', hips: '86 - 90 cm', equivalent: '34 / 0 US' },
    { size: 'S', bust: '85 - 89 cm', waist: '65 - 69 cm', hips: '91 - 95 cm', equivalent: '36 / 2-4 US' },
    { size: 'M', bust: '90 - 95 cm', waist: '70 - 75 cm', hips: '96 - 101 cm', equivalent: '38 / 6-8 US' },
    { size: 'L', bust: '96 - 102 cm', waist: '76 - 82 cm', hips: '102 - 107 cm', equivalent: '40 / 10 US' },
    { size: 'XL', bust: '103 - 110 cm', waist: '83 - 90 cm', hips: '108 - 115 cm', equivalent: '42 / 12 US' },
    { size: 'XXL', bust: '111 - 118 cm', waist: '91 - 98 cm', hips: '116 - 122 cm', equivalent: '44 / 14 US' },
  ],
  abajo: [
    { size: '36', waist: '64 - 67 cm', hips: '90 - 93 cm', length: '106 cm' },
    { size: '38', waist: '68 - 72 cm', hips: '94 - 98 cm', length: '107 cm' },
    { size: '40', waist: '73 - 77 cm', hips: '99 - 103 cm', length: '108 cm' },
  ],
};
