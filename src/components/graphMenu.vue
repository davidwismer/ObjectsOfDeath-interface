<script setup>
import baseButton from "./composables/BaseButton.vue"

const props = defineProps({
    currentDisplay: {
        type: String,
        default: "list"
    }
})

const emit = defineEmits(["changeDisplay"])
</script>

<template>
    <div class="menu-container">
        <div class="button-container" :class="props.currentDisplay === 'list' ? 'currentDisplay' : ''">
            <base-button @click="$emit('changeDisplay', 'list')">Liste</base-button>
        </div>
        <div class="button-container" :class="props.currentDisplay === 'ligneDeVie' ? 'currentDisplay' : ''">
            <base-button @click="$emit('changeDisplay', 'ligneDeVie')">Ligne de vie des objets</base-button>
        </div>
        <div class="button-container" :class="props.currentDisplay === 'emotion' ? 'currentDisplay' : ''">
            <base-button @click="$emit('changeDisplay', 'emotion')">Radar émotionnel</base-button>
        </div>
        <div class="button-container" :class="props.currentDisplay === 'fonction' ? 'currentDisplay' : ''">
            <base-button @click="$emit('changeDisplay', 'fonction')">Typologie fonctionnelle</base-button>
        </div>
        <div class="button-container" :class="props.currentDisplay === 'destination' ? 'currentDisplay' : ''">
            <base-button @click="$emit('changeDisplay', 'destination')">Mémoire personnelle vs collective</base-button>
        </div>
        <div class="button-container" :class="props.currentDisplay === 'espaceMental' ? 'currentDisplay' : ''">
            <base-button @click="$emit('changeDisplay', 'espaceMental')">Cartographie mentale</base-button>
        </div>
    </div>
</template>

<style scoped>

.menu-container {
    position: fixed;
    left: 0;
    top: 50%;
    transform: translate(30px, -50%);
    display: flex;
    flex-direction: column;
    gap: 10px;
    pointer-events: none;
    z-index: 100;
}

.button-container {
    width: fit-content;
    height: 40px;
    cursor: pointer;
    transform: translateX(-100%);
    transition: 1s;
    pointer-events: auto;
}

.button-container:hover {
    transform: translateX(-30px);
    transition: 0.5s;
}

.currentDisplay{
    transform: translateX(-30px);
}

@media screen and (max-width: 500px) {
  .menu-container {
    display: none;
  }
}
</style>