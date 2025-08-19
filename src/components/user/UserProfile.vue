<script setup lang="ts">
import ProfileService from '@/services/user/ProfileService'
import { onMounted, reactive, ref } from 'vue'

const loading = ref(false)

interface Profile {
  username?: string
  first_name?: string
  second_name?: string
  last_name?: string
  second_last_name?: string
  email?: string
  bio?: string
}

const formData = reactive<Profile>({
  username: undefined,
  first_name: undefined,
  second_name: undefined,
  last_name: undefined,
  second_last_name: undefined,
  email: undefined,
  bio: undefined,
})

const fetchProfile = async () => {
  const profile = await ProfileService.getProfile()
  Object.assign(formData, profile)
}

const patchProfile = async (profile: Profile) => {
  loading.value = true
  const profile_response = await ProfileService.patchProfile(profile)
  Object.assign(formData, profile_response)
  await new Promise((res) => setTimeout(res, 1500))
  loading.value = false
}

onMounted(async () => {
  await fetchProfile()
})
</script>

<template>
  <div class="container flex flex-col mx-auto items-center p-10">
    <div class="flex w-2/3 flex-col items-center p-10 shadow">
      <div class="w-full flex flex-row justify-center">
        <img src="https://randomuser.me/api/portraits/men/75.jpg" class="rounded-full" />
      </div>
      <div class="w-full mb-5 mt-5 justify-center">
        <form onsubmit="event.preventDefault()">
          <div class="w-full flex flex-row gap-4">
            <input
              type="text"
              class="form-input w-1/3 text-gray-600 border border-gray-300 focus:border-light-blue focus:ring focus:ring-blue-200 rounded px-4 py-3 outline-none placeholder:text-gray-300"
              placeholder="Username"
              :disabled="loading"
              v-model="formData.username"
            />
            <input
              type="text"
              class="form-input w-2/3 text-gray-600 border border-gray-300 focus:border-light-blue focus:ring focus:ring-blue-200 rounded px-4 py-3 outline-none placeholder:text-gray-300"
              placeholder="Email"
              :disabled="loading"
              v-model="formData.email"
            />
          </div>
          <div class="w-full flex gap-4 mt-4">
            <input
              type="text"
              class="form-input w-1/2 text-gray-600 border border-gray-300 focus:border-light-blue focus:ring focus:ring-blue-200 rounded px-4 py-3 outline-none placeholder:text-gray-300"
              placeholder="Nombre"
              :disabled="loading"
              v-model="formData.first_name"
            />
            <input
              type="text"
              class="form-input w-1/2 text-gray-600 border border-gray-300 focus:border-light-blue focus:ring focus:ring-blue-200 rounded px-4 py-3 outline-none placeholder:text-gray-300"
              placeholder="Segundo nombre"
              :disabled="loading"
              v-model="formData.second_name"
            />
          </div>
          <div class="w-full flex gap-4 mt-4">
            <input
              type="text"
              class="form-input w-1/2 text-gray-600 border border-gray-300 focus:border-light-blue focus:ring focus:ring-blue-200 rounded px-4 py-3 outline-none placeholder:text-gray-300"
              placeholder="Apellido paterno"
              :disabled="loading"
              v-model="formData.last_name"
            />
            <input
              type="text"
              class="form-input w-1/2 text-gray-600 border border-gray-300 focus:border-light-blue focus:ring focus:ring-blue-200 rounded px-4 py-3 outline-none placeholder:text-gray-300"
              placeholder="Apellido materno"
              :disabled="loading"
              v-model="formData.second_last_name"
            />
          </div>
          <div class="w-full flex gap-4 mt-4">
            <textarea
              class="form-input w-full text-gray-600 border border-gray-300 focus:border-light-blue focus:ring focus:ring-blue-200 rounded px-4 py-3 outline-none placeholder:text-gray-300"
              placeholder="Biografia"
              :disabled="loading"
              v-model="formData.bio"
            ></textarea>
          </div>
          <div class="w-full flex gap-4 mt-4 justify-end">
            <button
              class="px-4 py-3 bg-strong-blue rounded text-white w-1/5 flex items-center justify-center disabled:bg-medium-blue disabled:cursor-progress"
              @click="patchProfile(formData)"
              :disabled="loading"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 transition-transform duration-300 animate-spin"
                v-if="loading"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              <div v-else>Guardar</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
