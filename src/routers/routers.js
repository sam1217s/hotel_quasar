import Home from "../pages/Home.vue";
import Habitaciones from "../pages/Habitaciones.vue";
import Restaurantes from "../pages/Restaurantes.vue";
import Bienestar from "../pages/Bienestar.vue";
import Contacto from "../pages/Contacto.vue";
import DeportesExtremos from "../pages/DeportesExtremos.vue";
import Reservas from "../pages/Reservas.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: Home },
  { path: "/Habitaciones", component: Habitaciones },
  { path: "/Restaurantes", component: Restaurantes },
  { path: "/Bienestar", component: Bienestar },
  { path: "/Contacto", component: Contacto },
  { path: "/DeportesExtremos", component: DeportesExtremos },
  { path: "/Reservas", component: Reservas },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Si hay una posición guardada (navegación con botones atrás/adelante)
    if (savedPosition) {
      return savedPosition;
    }
    // Si hay un hash (#section), scroll a esa sección
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
        top: 80, // offset para header
      };
    }
    // Por defecto, scroll al top de la página
    return {
      top: 0,
      behavior: "smooth",
    };
  },
});

export default router;
