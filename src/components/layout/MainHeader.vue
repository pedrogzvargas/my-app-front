<script setup lang="ts">
import ProducstMenu from './ProducstMenu.vue'
import { useConfigStore } from '@/store/config'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const configStore = useConfigStore()
const router = useRouter()

const showMenu = ref(false)
</script>
<template>
  <div class="shadow bg-white">
    <div
      class="container flex items-center mx-auto py-3"
      :class="{
        'justify-between': configStore.token,
        'justify-end': !configStore.token,
      }"
    >
      <div class="flex items-center gap-x-6" v-show="configStore.token">
        <p>GOVA Solutions</p>
        <div class="flex items-center" @click="showMenu = !showMenu">
          <a class="mr-1 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-8 text-strong-blue transition-transform duration-300 hover:scale-110 hover:opacity-95"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
              />
            </svg>
          </a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4 text-gray-400 mt-1"
            v-if="!showMenu"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4 text-gray-400 mt-1"
            v-else
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          </svg>
        </div>
      </div>
      <div class="flex items-center gap-x-1">
        <a
          v-show="!configStore.token"
          class="border border-gray-400 px-5 py-3 rounded-lg active:bg-light-blue hover:bg-light-blue cursor-pointer"
          @click="router.push({ name: 'Login' })"
          >Log In</a
        >
        <a
          v-show="!configStore.token"
          class="px-5 py-3 rounded bg-strong-blue text-white hover:text-gray-200"
          >Sign Up</a
        >
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-8 text-strong-blue transition-transform duration-300 hover:rotate-12 hover:opacity-95"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
        </a>
        <a v-show="configStore.token" @click="router.push({ name: 'DashboardProfile' })">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-8 text-strong-blue transition-transform duration-300 hover:rotate-12 hover:opacity-95"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
  <ProducstMenu :show-menu="showMenu" @hideMenu="showMenu = false" />
</template>

<style scoped></style>
