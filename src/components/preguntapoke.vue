<template>
    <div class="contenedor-adivinar-pokemon">
        <button class="btn-jugar" @click="start" :disabled="isRunning || currentTime === 0">JUGAR</button>
        <div class="cont-pokemon">
            <div class="div_pk">
                <div class="imagenpokemon" :style="{ 'background-image': 'url(' + pokemonImage + ')' }"></div>
            </div>
            <div class="contador">
                <h3 class="num-contador" :class="{ 'red-text': currentTime <= 10 }">{{ formattedTime }}</h3>
            </div>
            <p class="tipos_poke">
                <span v-for="(typeData, index) in pokemon.types" :key="index">
                    <span :style="{
                        background: tipodeestilo[typeData.type.name].bgColor,
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
            <h2>¿Quién es este Pokémon?</h2>
            <div class="nombres-pokemon">
                <button class="contenedor-poke" v-for="(name, index) in pokemonNames" :key="index"
                    @click="seleccionPokemon(index)">
                    {{ name }}
                </button>
            </div>
            <button class="btn-jugar2" @click="restart" :disabled="currentTime !== 0">Volver a Jugar</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'

const totalTime = 30
const currentTime = ref(totalTime)
const isRunning = ref(false)
let intervalId = null
const pokemonImage = ref('')
const puntos = ref(0)
const pokemonNames = ref([])
const numero = 4
const pokemon = ref({})
const aparecerpokemon = ref(false)
const volverajugar = ref(false)
const start = () => {
    if (!isRunning.value) {
        isRunning.value = true;
        if (currentTime.value === totalTime) {
            buscar();
        }
        intervalId = setInterval(() => {
            if (isRunning.value) {
                if (currentTime.value <= 0) {
                    stop();
                } else {
                    currentTime.value--;
                }
            }
        }, 1000);
    }
};

const stop = () => {
    isRunning.value = false
    clearInterval(intervalId)
}

const restart = () => {
    currentTime.value = totalTime
    start()
    buscar()
    cambiodeposicion()
    const pokemonImageElement = document.querySelector(".imagenpokemon");
    if (pokemonImageElement) {
        pokemonImageElement.style.filter = "brightness(0)";
    }

}

const formattedTime = computed(() => {
    const seconds = String(Math.floor(currentTime.value % 60)).padStart(2, '0')
    return `${seconds}`
})

const buscar = async () => {
    try {
        const id = Math.floor(Math.random() * 1025) + 1
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokemonData = response.data

        pokemonImage.value = pokemonData.sprites.other['official-artwork'].front_default

        const pokemonName = pokemonData.name;
        const names = await generadordenombres(numero - 1, pokemonName);
        pokemonNames.value = [pokemonName, ...names]
        pokemon.value = pokemonData

        cambiodeposicion();
    } catch (error) {
        console.log(error)
    }
}

const generadordenombres = async (count, correctName) => {
    const names = []
    try {
        for (let i = 0; i < count; i++) {
            const id = Math.floor(Math.random() * 1025) + 1
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const pokemonData = response.data
            const name = pokemonData.name
            if (name !== correctName) {
                names.push(name)
            }
        }
    } catch (error) {
        console.log(error)
    }
    return names.map(name => name.replace(/-/g, ' '));
}


const tipodeestilo = {
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
}

const seleccionPokemon = async (index) => {

    
    if (pokemonNames.value[index] === pokemon.value.name) {
        currentTime.value = 0;
        console.log('¡Correcto! Ese es el Pokémon correcto.');
        const pokemonImageUrl = pokemonImage.value;
        pokemonImage.value = pokemonImageUrl;
        volverajugar.value = true; 
        document.querySelector(".imagenpokemon").style.filter = "brightness(1.0)";
    } else {
        console.log('¡Incorrecto! Ese no es el Pokémon correcto.');
        start();
    }
}



const cambiodeposicion = () => {
    for (let i = pokemonNames.value.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const temp = pokemonNames.value[i]
        pokemonNames.value[i] = pokemonNames.value[randomIndex]
        pokemonNames.value[randomIndex] = temp
    }
}
</script>
