<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import ProductCreate from './ProductCreate.vue'
import ProductService from '@/services/products/ProductService'
import ToastAlert from '../layout/ToastAlert.vue'
import type { Products } from '@/services/products/Products'
import BasePagination from '../ui/BasePagination.vue'
import ConfirmationModal from '../ui/ConfirmationModal.vue'
import ProductUpdate from './ProductUpdate.vue'

const products = ref<Products>()
const message = ref('')
const toastVisible = ref(false)
const showDeletionConfirmation = ref(false)
const showModalCreation = ref(false)
const showModalUpdate = ref(false)

const currentPage = ref(1)
const selectedId = ref(0)

onMounted(async () => {
  fetchProducts(1)
})

const fetchProducts = async (page: number) => {
  const ps = await ProductService.getProducts(page)
  products.value = ps
}

const pages = computed(() => {
  return products.value ? Number(Math.ceil(products.value?.count / 10)) : 0
})

watch(currentPage, async (newPage) => {
  await fetchProducts(newPage)
})

watch(pages, async (newPages) => {
  if (Number(currentPage.value) > newPages) {
    currentPage.value = newPages
  }
})

const onCreated = () => {
  currentPage.value = 1
  message.value = 'Producto creado exitosamente'
  toastVisible.value = true
  fetchProducts(currentPage.value)
}

const onPatched = () => {
  fetchProducts(currentPage.value)
  message.value = 'Producto actualizado exitosamente'
  toastVisible.value = true
}

const deleteProduct = async (id: number) => {
  await ProductService.deleteProduct(id)
  if (products.value) {
    products.value = { ...products.value, count: products.value.count - 1 }
  }
  fetchProducts(currentPage.value)
  showDeletionConfirmation.value = false
}

function showConfirmationModal(id: number) {
  selectedId.value = id
  showDeletionConfirmation.value = true
}

function showUpdateModal(id: number) {
  selectedId.value = id
  showModalUpdate.value = true
}
</script>

<template>
  <div class="container flex flex-col mx-auto items-center justify-center">
    <div class="container flex flex-row justify-between items-center">
      <p class="text-2xl pl-10 text-strong-blue opacity-90 cursor-default">Productos</p>
      <button
        @click="showModalCreation = true"
        class="bg-strong-green text-white px-4 py-2 rounded"
        title="Agregar Producto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>

    <ProductCreate v-model:show-modal="showModalCreation" @created="onCreated" />
    <ConfirmationModal
      v-model:show-modal="showDeletionConfirmation"
      @accepted="deleteProduct(selectedId)"
    />
    <ProductUpdate
      v-model:show-modal="showModalUpdate"
      v-model:product-id="selectedId"
      v-on:patched="onPatched"
    />
  </div>
  <div class="container flex mx-auto justify-center items-center">
    <ToastAlert :message="message" :show="toastVisible" @close="toastVisible = false" />
  </div>
  <div class="container flex mx-auto items-center rounded-lg shadow-md border border-gray-200 mt-4">
    <table class="min-w-full divide-y divide-gray-200 text-sm text-left">
      <thead class="bg-gray-100 text-gray-700 font-semibold tracking-wider">
        <tr>
          <th class="px-6 py-3">#</th>
          <th class="px-6 py-3">Nombre</th>
          <th class="px-6 py-3">Precio</th>
          <th class="px-6 py-3">Unidades</th>
          <th class="px-6 py-3">Activo</th>
          <th class="px-6 py-3">Acciones</th>
        </tr>
      </thead>
      <tbody
        class="bg-white divide-y divide-gray-100"
        v-for="product in products?.results"
        :key="product.id"
      >
        <tr class="hover:bg-gray-50">
          <td class="px-6 py-4">{{ product.id }}</td>
          <td class="px-6 py-4">{{ product.name }}</td>
          <td class="px-6 py-4">${{ product.price }}</td>
          <td class="px-6 py-4">{{ product.available_units }}</td>
          <td class="px-6 py-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 text-strong-green"
              v-if="product.is_active"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 text-strong-red"
              v-else
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </td>
          <td class="px-6 py-4">
            <button class="text-strong-blue hover:underline" @click="showUpdateModal(product.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 text-strong-blue"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
            <button
              class="text-red-600 hover:underline ml-2 dark:text-red-400"
              @click="showConfirmationModal(product.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 text-strong-red"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <BasePagination :pages="pages" v-model:current-page="currentPage" />
</template>

<style scoped></style>
