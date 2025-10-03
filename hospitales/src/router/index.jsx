import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import HospitalList from "../pages/HospitalList.vue";
import HospitalForm from "../pages/HospitalForm.vue";
import HospitalDetails from "../pages/HospitalDetails.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
  { path: "/hospitales", component: HospitalList },
  { path: "/hospitales/nuevo", component: HospitalForm },
  { path: "/hospitales/:id", component: HospitalDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
