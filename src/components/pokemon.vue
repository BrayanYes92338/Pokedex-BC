<template>
  <div class="tipo_pokemon">

    <div class="contenedor-busqueda">
      <input type="text" placeholder="Ingrese el ID o Nombre del Pokemon" class="busc" v-model="id">
      <button @click="traer()" class="lupa"><i class="fas fa-search"></i></button>
    </div>
    <div class="cuerpo">

      <div class="datos">
        <div class="primera_parte">
          <div class="otros_datos">
            <p class="tipo_poke">
              <span v-for="(typeData, index) in pokemon.types" :key="index">
                {{ index === 0 ? typeData.type.name.charAt(0).toUpperCase() + typeData.type.name.slice(1) :
                  typeData.type.name.charAt(0).toUpperCase() + typeData.type.name.slice(1) }}
                <span v-if="index !== pokemon.types.length - 1 && index !== 0">,</span>
              </span>
            </p>
            <h2 class="nombre_poke"><strong>{{ pokemon.name ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
              : '' }}</strong></h2>
            <div class="poke_datos">
              <p><strong>Altura:</strong></p>
              <p>{{ pokemon.height / 10 }} M</p>
            </div>
            <div class="poke_datos">
              <p><strong>Peso:</strong></p>
              <p>{{ pokemon.weight / 10 }} kg</p>
            </div>
          </div>
          <div class="pimagen">
            <img class="imagen-poke" v-if="pokemon.sprites && pokemon.sprites.front_default"
              :src="pokemon.sprites.front_default" :alt="pokemon.name">
            <h1 class="id_poke">#{{ pokemon && pokemon.id ? pokemon.id.toString().padStart(3, '0').slice(-3) : '' }}</h1>

          </div>
        </div>
      </div>
      <div class="stats q-pa-md">
        <h2 class="estadisticas"><strong>Estadisticas:</strong></h2>
        <ul>
          <li v-if="pokemon.stats && pokemon.stats.length"
            v-for="(group, groupIndex) in Math.ceil(pokemon.stats.length / 3)" :key="groupIndex">
            <span v-for="(stat, statIndex) in pokemon.stats.slice(groupIndex * 3, groupIndex * 3 + 3)" :key="statIndex">
              <div class="stat-info">
                <span class="stat-name">{{ stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1) }}:</span>
                <span class="bar-progres">{{ stat.base_stat }} / 255</span>
              </div>
              <q-linear-progress stripe size="30px" :value="stat.base_stat / 255" class="progress-bar" color="white" />
            </span>
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