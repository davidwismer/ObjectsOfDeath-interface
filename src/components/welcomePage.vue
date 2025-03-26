<script setup>
import baseButton from "./composables/BaseButton.vue"

const props = defineProps({
    lang: {
        type: String,
        default: "fr"
    }
})
const emit = defineEmits(["changePage"])

</script>

<template>
    <div v-if="props.lang == 'fr'" class="content-container">
        <div class="textContainer">
            <div class="paragraph">Tu t’apprêtes à répondre à deux questions anonymes et pourras importer des images.
            </div>
            <h3>Les réponses et images seront collectées
                dans le cadre d’un projet de recherche graphique
                explorant la question :</h3>
            <h3>« Comment les objets peuvent-ils devenir un outil
                de résistance face à l’oubli post-mortem ? »</h3>
            <div class="paragraph">En cliquant sur « envoyer », tu acceptes que tes réponses et les images que tu
                importes
                soient utilisées
                exclusivement à des fins académiques dans le cadre d’un projet scolaire affilié à l’écal.</div>
            <div class="paragraph">Ce projet est non commercial
                et ne vise aucun usage lucratif.</div>
            <div class="paragraph">Tu confirmes également que les images que tu importes t’appartiennent ou que tu as
                obtenu
                les droits
                nécessaires pour les partager dans ce contexte.</div>
        </div>
        <div class="buttonContainer">
            <base-button @click="emit('changePage')"><img class="button-img" src="../assets/fleche.png" />
                Commencer</base-button>
        </div>

    </div>
    <div v-if="props.lang == 'en'" class="content-container">
        <div class="textContainer">
            <div class="paragraph">You’re about to answer two anonymous questions and import images.</div>
            <h3>The answers and images will be collected
                as part of a graphic research project
                exploring the question:</h3>
            <h3>“How can objects become a tool of resistance
                in the face of post-mortem oblivion?”</h3>
            <div class="paragraph">By clicking on ‘send’, you agree that your answers and the images you import will be
                used exclusively
                for academic purposes as part of a school project affiliated with écal.</div>
            <div class="paragraph">This project is non-commercial and not intended for profit.</div>
            <div class="paragraph">You also confirm that the images you import belong to you
                or that you have obtained the necessary rights to share them in this context.</div>
        </div>
        <div class="buttonContainer">
            <base-button @click="emit('changePage')"><img class="button-img" src="../assets/fleche.png" />
                Start</base-button>
        </div>
    </div>
</template>

<style scoped>
.paragraph {
    font-size: 9pt;
    color: rgba(0, 0, 0, .3);
    text-align: center;
    margin-bottom: 20px;
    text-wrap: pretty;
}

.content-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.buttonContainer {
    display: flex;
    justify-content: end;
    margin-top: 10px;
}

h3 {
    font-size: 15pt;
    color: black;
    margin-bottom: 20px;
    text-align: center;
    text-wrap: pretty;
}

.button-img {
    transform: rotate(90deg);
    height: 5mm;
}
</style>