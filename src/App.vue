<template>
  <div>
    <header class="header">
      <nav class="nav">
        <a href="#" class="logo"><img src="./img/Logo Pagina Web.png" alt="" class="img"></a>
        <button class="nav-toggle" aria-label="Abrir Menu">
          <i class="fas fa-bars"></i>
        </button>
        <ul class="nav-menu">
          <li class="nav-menu-item"><router-link to="/" class="nav-menu-link nav-link">Inicio</router-link></li>
          <li class="nav-menu-item"><router-link to="/pokemon" class="nav-menu-link nav-link">Pokedex</router-link></li>
          <li class="nav-menu-item"><router-link to="/preguntapoke" class="nav-menu-link nav-link">Adivina
              Pokemon</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer class="footer">
      <div class="copy">
        <p>Copyright © 2024. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import './style.css';

</script>

