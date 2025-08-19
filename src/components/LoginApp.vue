<template>
  <div class="pt-64 border border-blue-700">
    <div class="container flex mx-auto items-center">
      <div class="w-1/2 border border-red-700">
        <h1 class="text-6xl">GOVA Solutions</h1>
        <p class="mt-5 text-xl">Software solutions</p>
      </div>
      <div class="w-1/2 border border-amber-700">
        <div>Welcome to GOVA Solutions</div>
        <form>
          <div class="flex flex-col gap-y-5 w-4/5">
            <input
              class="px-5 py-4 rounded-lg border border-gray-400"
              type="text"
              placeholder="Username"
            />
            <input
              class="px-5 py-4 rounded-lg border border-gray-400"
              type="text"
              placeholder="Password"
            />
            <input
              class="px-5 py-4 rounded-lg border border-gray-400"
              type="password"
              placeholder="Password"
            />
            <div class="flex justify-between gap-x-4">
              <button class="w-2/3 px-5 py-3 rounded bg-strong-blue text-white hover:text-gray-200">
                Iniciar Sesión
              </button>
              <button class="px-5 py-3 bg-gray-200 rounded-lg">Google</button>
              <button class="px-5 py-3 bg-gray-200 rounded-lg">GitHub</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
