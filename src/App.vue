<template>
  <div>
    <header class="header">
      <div class="contenedor-busqueda">
        <input type="text" placeholder="Ingrese el ID o Nombre del Pokemon" class="busc" v-model="id">
        <button @click="traer()" class="lupa"><i class="fas fa-search"></i></button>
      </div>
    </header>

    <div class="cuerpo">
      <div class="imagen_pokemon">
        <img v-if="pokemon.sprites && pokemon.sprites.front_default" :src="pokemon.sprites.front_default"
          :alt="pokemon.name">
      </div>
      <div class="primeros_datos_pokemon">
        <h1>Nombre Pokemon:</h1>
        <p>{{ pokemon.name }}</p>
      </div>
      <div class="id_pokemon">
        <h1>Numero:</h1>
        <p>{{ pokemon.id }}</p>
      </div>
      <div class="tipo_pokemon">
        <h1>Tipo:</h1>
        <p> <span v-for="(typeData, index) in pokemon.types" :key="index">
            {{ typeData.type.name }}
            <span v-if="index !== pokemon.types.length - 1">,</span>
          </span></p>
      </div>
      <div class="peso_pokemon">
        <h1>Peso:</h1>
        <p>{{ pokemon.weight }}</p>
      </div>
      <div>
        <ul class="Estadisticas">
          <h2>Estadisticas:</h2>
          <li v-for="(stat, key) in pokemon.stats" :key="key">
            <span>{{ stat.stat.name }} -> {{ stat.base_stat }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import axios from "axios"
let pokemon = ref([]);
let id = ref("")

async function traer() {
  try {
    let datos = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id.value)
    pokemon.value = datos.data
    console.log(datos.data);
  } catch (error) {
    console.log(error);
  }
}
</script>