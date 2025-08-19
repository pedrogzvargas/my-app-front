export interface Product {
  id: number
  name: string
  price: number
  available_units: number
  is_active: boolean
}

export type CreateProduct = Omit<Product, 'id'>
