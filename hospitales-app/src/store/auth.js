// src/store/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null
  }),

  getters: {
    isAuthenticated(state) {
      return !!state.token
    }
  },

  actions: {
    async login(username, password) {
      console.log('Iniciando sesión con:', { username, password })

      const res = await fetch('https://meddi-training.vercel.app/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await res.json()
      console.log('Respuesta de login:', data)

      if (data.ok && data.data?.jwtToken) {
        this.token = data.data.jwtToken
        localStorage.setItem('token', this.token)
      } else {
        throw new Error(data.data?.message || 'Error al iniciar sesión')
      }
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    }
  }
})
