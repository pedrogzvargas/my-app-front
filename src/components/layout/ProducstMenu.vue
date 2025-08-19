<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = withDefaults(
  defineProps<{
    showMenu?: boolean
  }>(),
  {
    showMenu: false,
  },
)

const router = useRouter()
const emit = defineEmits(['hideMenu'])

function goToProducts() {
  router.push({ name: 'DashboardProducts' })
  emit('hideMenu')
}

function goToProfile() {
  router.push({ name: 'DashboardProfile' })
  emit('hideMenu')
}
</script>

<template>
  <div class="bg-white px-38 pt-5 pb-3" v-show="props.showMenu">
    <div class="font-bold uppercase">SECCIONES</div>
    <div class="flex">
      <div class="w-1/3">
        <div class="group px-3 py-2 hover:bg-light-blue rounded-lg">
          <h3 class="font-medium text-lg pb-2 group-hover:text-medium-blue">Usuarios</h3>
          <p class="text-gray-500">Crea y edita usuarios</p>
        </div>
        <div class="group px-3 py-2 hover:bg-light-blue rounded-lg">
          <h3 class="font-medium text-lg pb-2 group-hover:text-medium-blue">Permisos</h3>
          <p class="text-gray-500">Asigna y desasigna persmisos</p>
        </div>
        <div
          class="group px-3 py-2 hover:bg-light-blue rounded-lg cursor-pointer"
          @click="goToProducts"
        >
          <h3 class="font-medium text-lg pb-2 group-hover:text-medium-blue">Productos</h3>
          <p class="text-gray-500">Toma el control de tus productos</p>
        </div>
      </div>
      <div class="w-1/3">
        <div class="group px-3 py-2 hover:bg-light-blue rounded-lg">
          <h3 class="font-medium text-lg pb-2 group-hover:text-medium-blue">Tickets</h3>
          <p class="text-gray-500">Solicita y da seguimiento a tu soporte</p>
        </div>
        <div class="group px-3 py-2 hover:bg-light-blue rounded-lg">
          <h3 class="font-medium text-lg pb-2 group-hover:text-medium-blue">Inventario</h3>
          <p class="text-gray-500">Maneja el inventiario de tus productos</p>
        </div>
        <div class="group px-3 py-2 hover:bg-light-blue rounded-lg">
          <h3 class="font-medium text-lg pb-2 group-hover:text-medium-blue">Notificaciones</h3>
          <p class="text-gray-500">Enterate de lo que pasa en tu sistema</p>
        </div>
      </div>
      <div class="w-1/3">
        <div
          class="group px-3 py-2 hover:bg-light-blue rounded-lg cursor-pointer"
          @click="goToProfile"
        >
          <h3 class="font-medium text-lg pb-2 group-hover:text-medium-blue">Perfil</h3>
          <p class="text-gray-500">Edita tu información</p>
        </div>
        <div class="group px-3 py-2 hover:bg-light-blue rounded-lg">
          <h3 class="font-medium text-lg pb-2 group-hover:text-medium-blue">Cerrar sesión</h3>
          <p class="text-gray-500">Da por terminada tu sesión</p>
        </div>
      </div>
    </div>
  </div>
</template>
