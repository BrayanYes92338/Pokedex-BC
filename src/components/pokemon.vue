<template>
  <div class="tipo_pokemon">

    <div class="contenedor-busqueda">
      <input type="text" placeholder="Ingrese el ID o Nombre del Pokemon" class="busc" v-model="id">
      <button @click="traer()" class="lupa"><i class="fas fa-search"></i></button>
    </div>
    <div class="cuerpo" v-if="aparecer">
      <div class="datos">
        <div class="primera_parte">
          <div class="otros_datos">
            <p class="tipo_poke">
              <span v-for="(typeData, index) in pokemon.types" :key="index">
                <img :src="getTipoImagen(typeData.type.name)" alt="">
                <span :style="{
                  background: typeStyles[typeData.type.name].bgColor,
                  padding: '8px 10px',
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  border: '1px solid #A3A7A8'
                }">
                  {{ index === 0 ? typeData.type.name.charAt(0).toUpperCase() + typeData.type.name.slice(1) :
                    ' ' + typeData.type.name.charAt(0).toUpperCase() + typeData.type.name.slice(1) }}
                </span>
                <template v-if="index !== pokemon.types.length - 1">&nbsp;</template>
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
            <div class="fotopoke"
              :style="{ 'background-image': 'url(' + pokemon.sprites?.other['official-artwork'].front_default + ')' }">
            </div>
            <h1 class="id_poke">#{{ pokemon && pokemon.id ? (pokemon.id < 1000 ? pokemon.id.toString().padStart(3, '0') :
              pokemon.id) : '' }}</h1>

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
import { ref } from 'vue';
import axios from 'axios';

const pokemon = ref({});
const id = ref('');
const aparecer = ref(false);

const imagenes = [
  '../img/Png/Tipo Normal.png',
  '../img/Png/Tipo Lucha.png',
  '../img/Png/Tipo Volador.png',
  '../img/Png/Tipo Veneno.png',
  '../img/Png/Tipo Tierra.png',
  '../img/Png/Tipo Roca.png',
  '../img/Png/Tipo Bicho.png',
  '../img/Png/Tipo Fantasma.png',
  '../img/Png/Tipo Acero.png',
  '../img/Png/Tipo Fuego.png',
  '../img/Png/Tipo Agua.png',
  '../img/Png/Tipo Planta.png',
  '../img/Png/Tipo Eléctrico.png',
  '../img/Png/Tipo Psíquico.png',
  '../img/Png/Tipo Hielo.png',
  '../img/Png/Tipo Dragón.png',
  '../img/Png/Tipo Siniestro.png',
  '../img/Png/Tipo Hada.png'
];

function getTipoImagen(tipo) {
  let imagen;
  switch (tipo) {
    case 'water':
      imagen = '../img/Png/Tipo Agua.png';
      break;
    case 'fighting':
      imagen = '../img/Png/Tipo Lucha.png';
      break;

    default:
      imagen = '';
  }
  return imagen;
}

const typeStyles = {
  normal: { bgColor: '#705358' },
  fighting: { bgColor: '#993E23' },
  flying: { bgColor: '#44677A' },
  poison: { bgColor: '#5A2E87' },
  ground: { bgColor: '#A5702C' },
  rock: { bgColor: '#471909' },
  bug: { bgColor: '#127836' },
  ghost: { bgColor: '#30336A' },
  steel: { bgColor: '#5C716A' },
  fire: { bgColor: '#AA1F22' },
  water: { bgColor: '#1153DF' },
  grass: { bgColor: '#127836' },
  electric: { bgColor: '#E1E326' },
  psychic: { bgColor: '#A42A67' },
  ice: { bgColor: ' #85D2F0' },
  dragon: { bgColor: '#448A92' },
  dark: { bgColor: '#050704' },
  fairy: { bgColor: '#941B44' },
};

async function traer() {
  try {
    const datos = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id.value}`);
    pokemon.value = datos.data;
    aparecer.value = true;
    console.log(datos.data);
  } catch (error) {
    console.log(error);
  }
  limpiar();
}



function limpiar() {
  id.value = '';
}
</script>