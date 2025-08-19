import api from '@/api/api'
import type { Product } from '@/services/products/Product'
import type { Products } from './Products'
import type { CreateProduct } from '@/services/products/Product'

const getProducts = async (page?: number): Promise<Products> => {
  const { data } = await api.get(`api/v1/product/?page=${page}`)
  return data
}

const getProduct = async (id: number): Promise<Product> => {
  const { data } = await api.get(`api/v1/product/${id}`)
  return data
}

const createProduct = async (product: CreateProduct): Promise<Product> => {
  const { data } = await api.post(`api/v1/product/`, product)
  return data
}

const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`api/v1/product/${id}/`)
}

const patchProduct = async (id: number, product: CreateProduct): Promise<void> => {
  await api.patch(`api/v1/product/${id}/`, product)
}

export default {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  patchProduct,
}
