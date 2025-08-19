<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'

const messages = ref<string[]>([])
let socket: WebSocket | null = null

interface ChatMessage {
  type: string
  message: string
}

onMounted(() => {
  // Reemplaza con tu ruta real del WebSocket
  socket = new WebSocket('ws://127.0.0.1:8000/ws/notifications/')

  socket.onopen = () => {
    console.log('✅ WebSocket conectado')
  }

  socket.onmessage = (event: MessageEvent) => {
    console.log(event)
    try {
      const data: ChatMessage = JSON.parse(event.data)
      console.log('📩 Mensaje recibido:', data)

      if (data.message) {
        messages.value.push(data.message)
      }
    } catch (err) {
      console.error('❌ Error al parsear mensaje:', err)
    }
  }

  socket.onclose = () => {
    console.warn('🔌 WebSocket cerrado')
  }

  socket.onerror = (err) => {
    console.error('🚨 Error en WebSocket:', err)
  }
})

onBeforeUnmount(() => {
  socket?.close()
})
</script>
<template>
  <div class="p-4 bg-white rounded shadow">
    <h2 class="text-xl font-semibold mb-2">📡 Mensajes en vivo</h2>
    <ul class="list-disc pl-6">
      <li v-for="(msg, i) in messages" :key="i">
        {{ msg }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
