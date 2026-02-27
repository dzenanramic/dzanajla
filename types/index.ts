export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  created_at: string;
}

export interface Category {
  slug: string;
  label: string;
  description: string;
  icon?: string;
}

export interface OrderFormData {
  full_name: string;
  email: string;
  phone: string;
  message?: string;
  product_id: string;
  product_title: string;
}

export interface OrderEmailPayload extends OrderFormData {
  product_price: number;
  product_category: string;
  product_image_url: string;
}

export type ApiResponse<T = null> =
  | { success: true; data: T }
  | { success: false; error: string };
