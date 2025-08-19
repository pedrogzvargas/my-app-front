<script setup lang="ts">
import { computed } from 'vue'

// const currentPage = ref(1)
const props = defineProps(['pages', 'currentPage'])
const emit = defineEmits(['update:currentPage'])
const pageValue = computed({
  get: () => props.currentPage,
  set: (val) => emit('update:currentPage', val),
})

function increasePage() {
  pageValue.value += 1
}

function decreasePage() {
  pageValue.value -= 1
}

function setPage(page: number) {
  pageValue.value = page
}
</script>

<template>
  <div class="flex items-center justify-center space-x-2 mt-4">
    <!-- Botón anterior -->
    <button
      class="px-3 py-1 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      @click="decreasePage"
      :disabled="currentPage === 1"
    >
      &laquo;
    </button>

    <!-- Números -->
    <div v-for="page in pages" :key="page">
      <button
        :class="{
          'bg-strong-blue': page === currentPage,
        }"
        class="px-3 py-1 text-white bg-gray-300 border-bg-strong-blue rounded-lg hover:bg-medium-blue"
        @click="setPage(page)"
      >
        {{ page }}
      </button>
    </div>

    <!-- Botón siguiente -->
    <button
      class="px-3 py-1 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="currentPage === pages"
      @click="increasePage"
    >
      &raquo;
    </button>
  </div>
</template>

<style scoped></style>
