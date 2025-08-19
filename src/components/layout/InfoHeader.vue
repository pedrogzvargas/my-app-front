<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goToDocs() {
  router.push({ name: 'DashboardDocs' })
}

function goToBlog() {
  router.push({ name: 'DashboardBlog' })
}

function goToSupport() {
  router.push({ name: 'Support' })
}
</script>

<template>
  <div class="bg-strong-blue text-white text-sm">
    <div class="container mx-auto flex justify-between py-3">
      <div>
        <div>Blog de pruebas</div>
      </div>
      <div class="flex gap-x-4 items-center">
        <a class="px-3 py-1 hover:text-gray-200 cursor-pointer" @click="goToBlog">Blog</a>
        <a class="hover:text-gray-200 cursor-pointer" @click="goToDocs">Docs</a>
        <a class="hover:text-gray-200 cursor-pointer" @click="goToSupport">Get Support</a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
