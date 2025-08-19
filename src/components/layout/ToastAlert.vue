<script setup lang="ts">
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  message: String,
  duration: {
    type: Number,
    default: 3000, // milisegundos
  },
  show: {
    type: Boolean,
    default: false,
  },
})

// Refs internas
const visible = ref(false)
let timeoutId: number | null = null

// Emitir evento si necesitas notificar cierre
const emit = defineEmits(['close'])

const close = () => {
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
  visible.value = false
  emit('close')
}

// Mostrar y ocultar automáticamente
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      visible.value = true
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        visible.value = false
        emit('close')
      }, props.duration)
    }
  },
)
</script>

<template>
  <div
    v-if="visible"
    class="fixed w-1/3 h-20 p-2 items-start justify-start bg-strong-green rounded-lg shadow-lg z-50 transition-opacity duration-300 opacity-70"
  >
    <div class="flex flex-col w-full h-full gap-1 items-center">
      <div class="flex flex-row gap-1 items-center w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-8 text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <p class="text-white text-lg">Éxito</p>
      </div>
      <div class="w-full">
        <hr class="border-t border-white opacity-20" />
      </div>
      <div class="w-full pl-9 mt-1">
        <p class="text-white">{{ message }}</p>
      </div>
    </div>
    <button class="absolute top-2 right-2 text-white hover:text-gray-500" @click="close">✕</button>
  </div>
</template>
