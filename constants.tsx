import { NavItem, Product } from './types';

export const ALL_PRODUCTS: Product[] = [
  {
    id: "BM216",
    sku: "BM-216",
    name: "Dish Rack - BM 216",
    price: 1800,
    originalPrice: 2500,
    images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop"],
    description: ["Premium dish rack for modern kitchens."],
    features: ["Steel construction", "Easy drainage"],
    category: "Kitchen Accessories",
    stock: true
  },
  {
    id: "BM147",
    sku: "BM-147",
    name: "Kitchen oven Cabinet - Code BM 147",
    price: 9000,
    originalPrice: 10500,
    images: ["https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop"],
    description: ["Spacious oven cabinet."],
    features: ["Heat resistant", "Multiple shelves"],
    category: "Kitchen Cabinets",
    stock: true
  },
  {
    id: "BM209",
    sku: "BM-209",
    name: "Kitchen Cabinet - BM209",
    price: 10000,
    originalPrice: 11500,
    images: ["https://images.unsplash.com/photo-1556911261-6bd741360f01?q=80&w=1000&auto=format&fit=crop"],
    description: ["Elegant kitchen cabinet."],
    features: ["Premium finish", "Durable"],
    category: "Kitchen Cabinets",
    stock: true
  },
  {
    id: "BM207",
    sku: "BM-207",
    name: "Modern Kitchen Shelf - BM 207",
    price: 6000,
    originalPrice: 6500,
    images: ["https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=1000&auto=format&fit=crop"],
    description: ["Multi-layer kitchen shelf."],
    features: ["Space saving", "Heavy duty"],
    category: "Kitchen Storage",
    stock: true
  },
  {
    id: "BM161",
    sku: "BM-161",
    name: "Wall hangging helmet rack - BM161",
    price: 950,
    originalPrice: 1150,
    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop"
    ],
    description: ["Stylish helmet rack."],
    features: ["Wall mounted", "Steel"],
    category: "Home Decor",
    stock: true
  },
  {
    id: "BM170",
    sku: "BM-170",
    name: "Simple shoe rack - BM170",
    price: 3000,
    originalPrice: 3500,
    images: ["https://images.unsplash.com/photo-1595945731027-626093153da3?q=80&w=1000&auto=format&fit=crop"],
    description: ["Minimalist shoe storage."],
    features: ["3-Tier", "Steel"],
    category: "Home Organizers",
    stock: true
  }
];

export const PRODUCT_DATA = ALL_PRODUCTS[4]; // Default to helmet rack

export const PHONE_NUMBER = "01718-952852";
export const EMAIL = "Nobih83@gmail.com";
export const ADDRESS = "Manikdi, Namapara, Dhaka Cantonment, Dhaka, Bangladesh";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#" },
  { label: "Shop", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms and Conditions", href: "#" }
];