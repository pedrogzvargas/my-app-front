<script setup lang="ts">
import InfoHeader from '@/components/layout/InfoHeader.vue'
import MainHeader from '@/components/layout/MainHeader.vue'
import authService from '@/services/auth/authService'
import type { authBody } from '@/services/auth/authBody'
import { useConfigStore } from '@/store/config'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const configStore = useConfigStore()

interface authData {
  username?: string
  password?: string
}

const formData = reactive<authData>({
  username: undefined,
  password: undefined,
})

function toAuthBody(form: authData): authBody {
  return {
    username: form.username ?? '',
    password: form.password ?? '',
  }
}

const login = async () => {
  const data = await authService.auth(toAuthBody(formData))
  configStore.setToken(data.access)
  router.push({ name: 'DashboardHome' })
}
</script>

<template>
  <div class="relative">
    <div class="fixed w-full z-10 shadow">
      <InfoHeader />
      <MainHeader />
    </div>
    <div class="flex items-center justify-center min-h-screen">
      <form class="bg-white p-6 rounded shadow-lg" onsubmit="event.preventDefault()">
        <div class="mb-4 flex justify-center">
          <h1 class="text-xl">GOVA Solutions</h1>
        </div>
        <input
          type="text"
          placeholder="Usuario"
          class="form-input block w-96 mb-4 px-4 py-3 border rounded"
          v-model="formData.username"
        />
        <input
          type="password"
          placeholder="Contraseña"
          class="block w-96 mb-4 px-4 py-3 border rounded"
          v-model="formData.password"
        />
        <button
          class="form-input w-full bg-strong-blue text-white px-4 py-3 rounded"
          @click="login"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
