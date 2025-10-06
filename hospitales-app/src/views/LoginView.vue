<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <q-card class="p-8 w-96">
      <h2 class="text-xl mb-4 text-center">Iniciar Sesión</h2>
      <q-input v-model="email" label="Correo electrónico" outlined class="mb-3" />
      <q-input v-model="password" label="Contraseña" type="password" outlined class="mb-4" />
      <q-btn label="Entrar" color="primary" @click="loginUser" class="w-full" />
      <q-btn flat label="¿No tienes cuenta? Regístrate" to="/register" class="w-full mt-2" />
      <p v-if="error" class="text-red-500 text-center mt-3">{{ error }}</p>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const auth = useAuthStore()
const router = useRouter()

const loginUser = async () => {
  try {
    await auth.login(email.value, password.value)
    router.push('/hospitales')
  } catch (err) {
    error.value = err.message
  }
}
</script>
