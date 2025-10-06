// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'

// Importación correcta de vistas y componentes
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HospitalListView from '../views/HospitalListView.vue'
import HospitalFormView from '../components/HospitalForm.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/hospitales',
    name: 'Hospitales',
    component: HospitalListView,
    meta: { requiresAuth: true }
  },
  {
    path: '/hospitales/nuevo',
    name: 'NuevoHospital',
    component: HospitalFormView,
    meta: { requiresAuth: true }
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/' // Ruta por defecto si no encuentra ninguna
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard global para validar autenticación y persistencia de sesión
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const savedToken = localStorage.getItem('token')

  if (savedToken && !auth.token) {
    auth.token = savedToken
  }

  // Bloquea rutas protegidas si no hay token
  if (to.meta.requiresAuth && !auth.token) {
    auth.logout()
    next({ path: '/' })
    return
  }

  next()
})

export default router
