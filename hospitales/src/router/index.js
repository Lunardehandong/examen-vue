import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import HospitalList from '../pages/HospitalList.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  {
    path: '/hospitales',
    component: HospitalList,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Protección de rutas
router.beforeEach((to, from, next) => {
  const logueado = localStorage.getItem("usuarioLogueado");
  if (to.meta.requiresAuth && !logueado) {
    next('/');
  } else {
    next();
  }
});

export default router;
