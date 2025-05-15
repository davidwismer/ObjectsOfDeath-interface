<script setup>
import baseButton from "./composables/BaseButton.vue"

const props = defineProps({
    lang: {
        type: String,
        default: "fr"
    }
})
</script>

<template>
    <img src="../assets/rose.gif" alt="falling rose">
    <div v-if="props.lang == 'fr'" class="contentContainer">
        <div>Merci pour ta réponse, qui a été enregistrée !</div>
        <div>Longue et joyeuse vie †</div>
        <a href="#results"><base-button>
                Voir les réponses</base-button></a>
    </div>
    <div v-if="props.lang == 'en'" class="contentContainer">
        <div>Thanks for your reply, which has been saved!</div>
        <div>Have a nice and long life †</div>
        <a href="#results"><base-button>
                See answers</base-button></a>
    </div>
</template>

<style scoped>
img {
    z-index: -1000;
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);
}

.contentContainer {
    margin-top: 100px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}

a {
    margin-top: 30px;
}
</style>