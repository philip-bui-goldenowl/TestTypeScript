export interface Order {
  customer_id: string,
  id: number,
  discount_price: string,
  order_date: string,
  product: string,
  purchase_price: string,
  transaction_id: string,
  image: string,
  color: string,
  size: string
}

export interface Category {
  id: number,
  image: string,
  title: string,
  banner: string
}

export interface CategoryList {
  order: Order[]
  category: Category[]
}