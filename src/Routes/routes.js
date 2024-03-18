import home from "../components/home.vue"
import pokemon from "../components/pokemon.vue"
import preguntapoke from "../components/preguntapoke.vue"
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    { path: "/", component: home },
    { path: "/pokemon", component: pokemon },
    { path: "/preguntapoke", component: preguntapoke }
    
];

export const  router = createRouter({
    history:createWebHashHistory(),
    routes
})
