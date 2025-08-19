<script setup lang="ts">
import { computed, reactive } from 'vue'
import ProductService from '@/services/products/ProductService'
import type { CreateProduct } from '@/services/products/Product'

// const showModal = ref(false)
const props = defineProps(['showModal'])

const emit = defineEmits(['created', 'update:showModal'])

interface Product {
  name?: string
  price?: number
  available_units?: number
  is_active?: boolean
}

const formData = reactive<Product>({
  name: undefined,
  price: undefined,
  available_units: undefined,
  is_active: undefined,
})

function aceptar() {
  const product = toCreateProduct(formData)
  createProduct(product)
  resetForm()
  changeModal.value = false
}

function cancel() {
  resetForm()
  changeModal.value = false
}

const changeModal = computed({
  get: () => props.showModal,
  set: (val: boolean) => emit('update:showModal', val),
})

function resetForm() {
  Object.assign(formData, {
    name: undefined,
    price: undefined,
    available_units: undefined,
    is_active: undefined,
  })
}

function toCreateProduct(form: Product): CreateProduct {
  return {
    name: form.name ?? '',
    price: form.price ?? 0,
    available_units: form.available_units ?? 0,
    is_active: form.is_active ?? false,
  }
}

const createProduct = async (product: CreateProduct) => {
  await ProductService.createProduct(product)
  emit('created')
}
</script>

<template>
  <div>
    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center z-50"
      @click.self="cancel"
    >
      <div class="bg-white rounded-lg p-8 w-full max-w-xl shadow-lg relative">
        <h2 class="text-xl font-semibold mb-4">Nuevo producto</h2>
        <div class="flex flex-col gap-y-5 w-full">
          <form>
            <input
              type="text"
              placeholder="Nombre"
              class="form-input rounded px-4 py-3 w-full mb-1 border border-gray-200 placeholder:text-gray-300"
              v-model="formData.name"
            />
            <input
              type="number"
              placeholder="Precio"
              class="form-input rounded px-4 py-3 w-full mb-1 border border-gray-200 placeholder:text-gray-300"
              v-model="formData.price"
            />
            <input
              type="number"
              placeholder="Unidades"
              class="form-input rounded px-4 py-3 w-full mb-1 border border-gray-200 placeholder:text-gray-300"
              v-model="formData.available_units"
            />
            <input
              type="checkbox"
              class="form-checkbox rounded text-strong-blue border border-gray-400"
              v-model="formData.is_active"
            />
          </form>
        </div>
        <div class="flex justify-end gap-2">
          <button @click="cancel" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
            Cancelar
          </button>
          <button
            @click="aceptar"
            class="bg-strong-blue text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
        <!-- Botón de cerrar (X) -->
        <button @click="cancel" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
    </div>
  </div>
</template>
