export interface Product {
  id: string
  name: string
  description: string
  price: number
  category_id: number
  product_images: { image_url: string }[]
  category?: { id: number; name: string }
}

export interface CartItem {
  id: string
  product_id: string
  name: string
  price: number
  size: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  total: number
  status: string
  created_at: string
  order_items: OrderItem[]
}

export interface OrderItem {
  id: string
  product_id: string
  quantity: number
  price: number
  size: number
  product: {
    id: string
    name: string
    product_images: { image_url: string }[]
  }
}

export interface Address {
  id: string
  user_id: string
  street: string
  city: string
  state: string
  postal_code: string
  country: string
  is_default: boolean
}

export interface Profile {
  id: string
  name: string
  phone?: string
  role: string
}