import Home from "../components/Home.vue";
import Habitaciones from "../components/Habitaciones.vue";
import Restaurantes from "../components/Restaurantes.vue";
import Bienestar from "../components/Bienestar.vue";
import Contacto from "../components/Contacto.vue";
import DeportesExtremos from "../components/DeportesExtremos.vue";


import { createRouter, createWebHistory } from 'vue-router';

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