import Home from "../pages/Home.vue"; import Habitaciones from "../pages/Habitaciones.vue"; import Restaurantes from "../pages/Restaurantes.vue"; import Bienestar from "../pages/Bienestar.vue"; import Contacto from "../pages/Contacto.vue"; import DeportesExtremos from "../pages/DeportesExtremos.vue"; import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {path: '/', component: Home},
    {path: '/Habitaciones', component: Habitaciones},
    {path: '/Restaurantes', component: Restaurantes},
    {path: '/Bienestar', component: Bienestar},
    {path: '/Contacto', component: Contacto},
    {path: '/DeportesExtremos', component: DeportesExtremos},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;