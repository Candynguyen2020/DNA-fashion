export type PlaceholderProduct = {
  slug: string;
  nameVi: string;
  nameEn: string;
  gender: "men" | "women";
  price: number;
  material: string;
  collectionSlug: string;
  descVi: string;
  descEn: string;
  images: string[];
};

export type PlaceholderCollection = {
  slug: string;
  nameVi: string;
  nameEn: string;
  descVi: string;
  descEn: string;
  heroImage: string;
};

export const collections: PlaceholderCollection[] = [
  {
    slug: "signature-collection",
    nameVi: "Bộ Sưu Tập Đặc Trưng",
    nameEn: "Signature Collection",
    descVi: "Những thiết kế tiêu biểu định hình phong cách Maison DnA.",
    descEn: "The pieces that define the Maison DnA silhouette.",
    heroImage: "/images/collections/signature-collection.jpg",
  },
  {
    slug: "linen-edit",
    nameVi: "Tuyển Tập Vải Lanh",
    nameEn: "The Linen Edit",
    descVi: "Vải lanh tự nhiên cho những ngày dài, thoáng mát và bền form.",
    descEn: "Natural linen for long days — breathable, structured, built to last.",
    heroImage: "/images/collections/linen-edit.jpg",
  },
];

export const products: PlaceholderProduct[] = [
  {
    slug: "tailored-wool-blazer",
    nameVi: "Áo Blazer Len May Đo",
    nameEn: "Tailored Wool Blazer",
    gender: "men",
    price: 8_900_000,
    material: "100% Wool",
    collectionSlug: "signature-collection",
    descVi: "Blazer len cao cấp, may đo tinh xảo, form dáng thanh lịch.",
    descEn: "Premium wool blazer with precise tailoring and an elegant silhouette.",
    images: [
      "/images/products/tailored-wool-blazer-1.jpg",
      "/images/products/tailored-wool-blazer-2.jpg",
      "/images/products/tailored-wool-blazer-3.jpg",
    ],
  },
  {
    slug: "organic-cotton-oxford-shirt",
    nameVi: "Áo Sơ Mi Oxford Cotton Organic",
    nameEn: "Organic Cotton Oxford Shirt",
    gender: "men",
    price: 1_450_000,
    material: "100% Organic Cotton",
    collectionSlug: "signature-collection",
    descVi: "Sơ mi Oxford dệt từ cotton organic, form regular fit dễ phối đồ.",
    descEn: "An Oxford shirt woven in organic cotton, cut for an easy regular fit.",
    images: [
      "/images/products/organic-cotton-oxford-shirt-1.jpg",
      "/images/products/organic-cotton-oxford-shirt-2.jpg",
      "/images/products/organic-cotton-oxford-shirt-3.jpg",
    ],
  },
  {
    slug: "linen-trouser-set",
    nameVi: "Set Quần Lanh",
    nameEn: "Linen Trouser Set",
    gender: "men",
    price: 1_980_000,
    material: "100% European Linen",
    collectionSlug: "linen-edit",
    descVi: "Quần lanh Châu Âu, form suông thoải mái, phù hợp khí hậu nhiệt đới.",
    descEn: "European linen trousers, a relaxed straight cut built for warm climates.",
    images: [
      "/images/products/linen-trouser-set-1.jpg",
      "/images/products/linen-trouser-set-2.jpg",
      "/images/products/linen-trouser-set-3.jpg",
    ],
  },
  {
    slug: "silk-wrap-dress",
    nameVi: "Váy Lụa Wrap",
    nameEn: "Silk Wrap Dress",
    gender: "women",
    price: 3_200_000,
    material: "100% Mulberry Silk",
    collectionSlug: "signature-collection",
    descVi: "Váy lụa tơ tằm form wrap, tôn dáng và thoải mái cả ngày dài.",
    descEn: "A mulberry silk wrap dress, flattering and comfortable from morning to evening.",
    images: [
      "/images/products/silk-wrap-dress-1.jpg",
      "/images/products/silk-wrap-dress-2.jpg",
      "/images/products/silk-wrap-dress-3.jpg",
    ],
  },
  {
    slug: "linen-midi-skirt",
    nameVi: "Chân Váy Lanh Midi",
    nameEn: "Linen Midi Skirt",
    gender: "women",
    price: 1_650_000,
    material: "100% European Linen",
    collectionSlug: "linen-edit",
    descVi: "Chân váy lanh dáng midi, form A-line dễ phối cùng áo sơ mi hoặc áo len.",
    descEn: "A midi-length linen skirt in an A-line cut, easy with a shirt or a knit.",
    images: [
      "/images/products/linen-midi-skirt-1.jpg",
      "/images/products/linen-midi-skirt-2.jpg",
      "/images/products/linen-midi-skirt-3.jpg",
    ],
  },
  {
    slug: "cashmere-blend-sweater",
    nameVi: "Áo Len Pha Cashmere",
    nameEn: "Cashmere-Blend Sweater",
    gender: "women",
    price: 2_450_000,
    material: "70% Wool, 30% Cashmere",
    collectionSlug: "signature-collection",
    descVi: "Áo len pha cashmere mềm mại, giữ ấm nhẹ nhàng cho ngày se lạnh.",
    descEn: "A soft wool-cashmere blend sweater, light warmth for cooler days.",
    images: [
      "/images/products/cashmere-blend-sweater-1.jpg",
      "/images/products/cashmere-blend-sweater-2.jpg",
      "/images/products/cashmere-blend-sweater-3.jpg",
    ],
  },
];

export function getProductsByGender(gender: "men" | "women") {
  return products.filter((p) => p.gender === gender);
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCollectionBySlug(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function getProductsByCollection(slug: string) {
  return products.filter((p) => p.collectionSlug === slug);
}

export function formatVnd(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}
