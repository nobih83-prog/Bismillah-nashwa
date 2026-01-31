
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string[];
  features: string[];
  sku: string;
  category: string;
  stock: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
}
