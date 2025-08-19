<script setup lang="ts">
import InfoHeader from '@/components/layout/InfoHeader.vue'
import MainHeader from '@/components/layout/MainHeader.vue'
</script>

<template>
  <div class="relative">
    <div class="fixed w-full z-10 shadow">
      <InfoHeader />
      <MainHeader />
    </div>
    <div class="relative">
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped></style>
