export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

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

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId?: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

export interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
}