<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps(['showModal'])

const emit = defineEmits(['accepted', 'update:showModal'])

const changeModal = computed({
  get: () => props.showModal,
  set: (val: boolean) => emit('update:showModal', val),
})

function accept() {
  emit('accepted')
}

function hideModal() {
  changeModal.value = false
}
</script>

<template>
  <div>
    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center z-50"
      @click.self="hideModal"
    >
      <div class="bg-white rounded-lg p-8 w-full max-w-xl shadow-lg relative">
        <h2 class="text-xl font-semibold mb-4">¿Deseas eliminar este producto?</h2>
        <div class="flex justify-end gap-2">
          <button @click="hideModal" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
            Cancelar
          </button>
          <button
            @click="accept"
            class="bg-strong-blue text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Aceptar
          </button>
        </div>
        <!-- Botón de cerrar (X) -->
        <button @click="hideModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
    </div>
  </div>
</template>
