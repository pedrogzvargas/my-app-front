<script setup lang="ts">
import InfoHeader from './layout/InfoHeader.vue'
import MainHeader from './layout/MainHeader.vue'
import LoginApp from './LoginApp.vue'
import NotificationsApp from './NotificationsApp.vue'
</script>

<template>
  <div class="relative">
    <div class="fixed w-full z-10 shadow">
      <InfoHeader />
      <MainHeader />
    </div>
    <div class="relative">
      <LoginApp />
      <NotificationsApp />
    </div>
  </div>
</template>

<style scoped></style>
