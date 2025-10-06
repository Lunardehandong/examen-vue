<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <q-card class="p-8 w-96">
      <h2 class="text-xl mb-4 text-center">Registro</h2>

      <q-input v-model="name" label="Nombre completo" outlined class="mb-3" />
      <q-input v-model="username" label="Correo electrónico" outlined class="mb-3" />
      <q-input v-model="cellphone" label="Teléfono (10 dígitos)" outlined class="mb-3" />
      <q-input v-model="password" label="Contraseña" type="password" outlined class="mb-4" />

      <q-btn label="Registrar" color="primary" @click="registerUser" class="w-full" />
      <q-btn flat label="¿Ya tienes cuenta? Inicia sesión" to="/" class="w-full mt-2" />

      <p v-if="error" class="text-red-500 text-center mt-3">{{ error }}</p>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const name = ref('')
const username = ref('')   // 👈 antes era email
const password = ref('')
const cellphone = ref('')  // 👈 antes era phone
const error = ref('')

const auth = useAuthStore()
const router = useRouter()

const registerUser = async () => {
  try {
    await auth.register(name.value, username.value, password.value, cellphone.value)
    router.push('/')
  } catch (err) {
    error.value = err.message
  }
}
</script>
