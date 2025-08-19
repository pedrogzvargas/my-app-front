import type { Product } from './Product'

export interface Products {
  count: number
  next?: string
  previous?: string
  results: Product[]
}
