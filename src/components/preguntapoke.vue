<template>
    <div class="contenedor-adivinar-pokemon">
        <div class="imagen-carga" v-if="aparecerpantalla">
            <div class="grupo2">
                <img class="silueta" src="../img/silueta 1.png" alt="">
               
                <div class="prr2">
                    <h2>Adivina al <strong>Pokémon</strong> </h2>
                    <h2 class="prr1">¡Ponte a prueba y trata de adivinar al <strong>Pokémon</strong> favorito en nuestra
                        Pokédex!</h2>
                    <h2 class="prr1">¡Veamos si puedes descubrirlo!</h2>

                    <button class="btn-jugar" @click="start" :disabled="isRunning || currentTime === 0">JUGAR</button>
                </div>
            </div>
            <img class="loading-image" src="../img/Fondo Adivina Poke.png" alt="">
        </div>
        <div class="cont-pokemon" v-if="aparecerpokemon">
            <div class="div_pk">
                <div class="imagenpokemon" :style="{ 'background-image': 'url(' + pokemon.sprites?.other['official-artwork'].front_default + ')' }"></div>

            </div>
            <div class="objetos">
                <div class="contador">
                    <h3 class="num-contador" :class="{ 'red-text': currentTime <= 10 }">{{ formattedTime }}</h3>
                </div>
                <div class="contador_intentos">
                    <h3 class="num-contador" :class="{ 'red-text': intentos <= 1 }">Intentos: {{ intentos }}</h3>
                </div>
                <button class="btn-jugar2" @click="restart" :disabled="currentTime !== 0">Volver a Jugar</button>
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

            <h2 class="titulopoke">¿Quién es este Pokémon?</h2>
            <div class="nombres-pokemon">
                  <button class="contenedor-poke" v-for="(name, index) in pokemonNames" :key="index"
                @click="seleccionPokemon(index)" :style="{ 'background-color': getButtonColor(name) }">
                {{ name }}
            </button>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { ref, computed,onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2';
const totalTime = 30
const currentTime = ref(totalTime)
const isRunning = ref(false)
let intervalId = null
const pokemonImage = ref('')
const puntos = ref(0)
const pokemonNames = ref([])
const numero = 4
const pokemon = ref({})
const volverajugar = ref(false)
const elemento = ref('');
const aparecerpokemon = ref(false)
const aparecerpantalla = ref(true)

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

    aparecerpokemon.value = true
    aparecerpantalla.value = false

    pokemonNames.value.forEach((name, i) => {
        document.querySelectorAll(".contenedor-poke")[i].disabled = false;
    });


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
    intentos.value = totalintentos;

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

        const tipoPokemon = pokemonData.types[0].type.name;
        const matchingType = tipopoke.find(pokemon => pokemon.type === tipoPokemon);
        if (matchingType) {

            elemento.value = matchingType.img;
            console.log(elemento.value);
        }

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


let tipopoke = [
    { img: '../img/Png/Normal.png', type: 'normal' },
    { img: '../img/Png/Lucha.png', type: 'fighting' },
    { img: '../img/Png/Volador.png', type: 'flying' },
    { img: '../img/Png/Veneno.png', type: 'poison' },
    { img: '../img/Png/Tierra.png', type: 'ground' },
    { img: '../img/Png/Roca.png', type: 'rock' },
    { img: '../img/Png/Bicho.png', type: 'bug' },
    { img: '../img/Png/Fantasma.png', type: 'ghost' },
    { img: '../img/Png/Acero.png', type: 'steel' },
    { img: '../img/Png/Fuego.png', type: 'fire' },
    { img: '../img/Png/Agua.png', type: 'water' },
    { img: '../img/Png/Planta.png', type: 'grass' },
    { img: '../img/Png/Electrico.png', type: 'electric' },
    { img: '../img/Png/Psiquico.png', type: 'psychic' },
    { img: '../img/Png/Hielo.png', type: 'ice' },
    { img: '../img/Png/Dragon.png', type: 'dragon' },
    { img: '../img/Png/Siniestro.png', type: 'dark' },
    { img: '../img/Png/Hada.png', type: 'fairy' }
]


function obtenerImagenPokemon(tipoPokemon) {
    const tipoPokemonEncontrado = tipopoke.find(pokemon => pokemon.type === tipoPokemon);

    if (tipoPokemonEncontrado) {
        return tipoPokemonEncontrado.img;
    }


    return '';
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

const totalintentos = 3;
const intentos = ref(totalintentos);

const seleccionPokemon = async (index) => {
    if (pokemonNames.value[index] === pokemon.value.name) {
        currentTime.value = 0;
        Swal.fire({
            title: '¡Correcto!',
            text: '¡Ese es el Pokémon correcto!',
            icon: 'success',
            confirmButtonText: '¡Genial!'
        })
        console.log('¡Correcto! Ese es el Pokémon correcto.');
        const pokemonImageUrl = pokemonImage.value;
        pokemonImage.value = pokemonImageUrl;
        volverajugar.value = true;
        document.querySelector(".imagenpokemon").style.filter = "brightness(1.0)";
        
        pokemonNames.value.forEach((name, i) => {
            document.querySelectorAll(".contenedor-poke")[i].disabled = true;
        });
    } else {
        Swal.fire({
            title: '¡Incorrecto!',
            text: '¡Ese no es el Pokémon correcto!',
            icon: 'error',
            confirmButtonText: '¡Volver a intentar!'
        })
        console.log('¡Incorrecto! Ese no es el Pokémon correcto.');
        start();
        intentos.value--;

        if (intentos.value === 0) {
            currentTime.value = 0;
            document.querySelector(".imagenpokemon").style.filter = "brightness(1.0)";
            volverajugar.value = true;
         
            pokemonNames.value.forEach((name, i) => {
                document.querySelectorAll(".contenedor-poke")[i].disabled = true;
            });
        }
    }
};



const cambiodeposicion = () => {
    for (let i = pokemonNames.value.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const temp = pokemonNames.value[i]
        pokemonNames.value[i] = pokemonNames.value[randomIndex]
        pokemonNames.value[randomIndex] = temp
    }
}

const getButtonColor = (name) => {
    if (currentTime.value === 0 && name === pokemon.value.name) {
        return 'green';
    } else if (intentos.value === 0 && name === pokemon.value.name) {
        return 'red'; 
    } else if (intentos.value === 0 && name !== pokemon.value.name) {
        return 'red'; 
    } else {
        return ''; 
    }
};
</script>

