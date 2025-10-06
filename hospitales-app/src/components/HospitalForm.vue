<!-- src/components/HospitalForm.vue -->
<template>
  <div class="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">

    <form @submit.prevent="crearHospital" class="space-y-4">
      <div>
        <label for="name" class="block font-medium mb-1">Nombre</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label for="telefono" class="block font-medium mb-1">Teléfono</label>
        <input
          id="telefono"
          v-model="form.telefono"
          type="text"
          required
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label for="direccion" class="block font-medium mb-1">Dirección</label>
        <input
          id="direccion"
          v-model="form.direccion"
          type="text"
          required
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Guardar
      </button>
    </form>

    <p v-if="error" class="text-red-600 mt-4 text-center">{{ error }}</p>
    <p v-if="success" class="text-green-600 mt-4 text-center">Hospital creado correctamente</p>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useHospitalStore } from '../store/hospital'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const hospitalStore = useHospitalStore()
const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  name: '',
  telefono: '',
  direccion: ''
})

const error = ref(null)
const success = ref(false)

async function crearHospital() {
  try {
    error.value = null
    success.value = false
    await hospitalStore.createHospital(form, authStore.token)
    success.value = true

    // Limpia los campos
    form.name = ''
    form.telefono = ''
    form.direccion = ''

    // Redirige
    setTimeout(() => router.push('/hospitales'), 1000)
  } catch (err) {
    error.value = err.message
  }
}
</script>
