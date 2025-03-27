<script setup>
import { ref, onMounted, watchEffect } from 'vue';

import { getAllAnswersPerQuestion } from './utils';

const apiURL = 'https://objectsofdeath-api2.onrender.com/'
const apiURL2 = 'https://objectsofdeath-api3.onrender.com/'
const apiURL3 = 'https://objectsofdeath-api4.onrender.com/'
/* const apiURL = 'http://localhost:3000/' */


const answersQuestion1 = ref()
const answersQuestion2 = ref()
async function getAnswers() {
    answersQuestion1.value = await getAllAnswersPerQuestion(apiURL, apiURL2, apiURL3, 1)
    answersQuestion2.value = await getAllAnswersPerQuestion(apiURL, apiURL2, apiURL3, 2)
}
onMounted(async () => {
    getAnswers()
})

watchEffect(() => {
    console.log(answersQuestion1.value)
    console.log(answersQuestion2.value)
})
</script>

<template>
    <main>
        <div class="questionContainer">
            <h3>« Quel objet apporterai-tu dans la mort ? »</h3>
            <div class="answerContainer" v-for="answerQuestion1 in answersQuestion1">
                <div class="photoContainer">
                    <span class="answer">{{ answerQuestion1.answer }}</span>
                    <img v-if="answerQuestion1.image" :src="answerQuestion1.image.base64" />
                </div>
                <div class="commentContainer">
                    <span class="comment"> {{ answerQuestion1.comment }}</span>
                </div>
            </div>
        </div>
        <div class="questionContainer">
            <h3>« Par quel objet se souviendra-t-on de toi après ta mort ? »</h3>
            <div class="answerContainer" v-for="answerQuestion2 in answersQuestion2">
                <div class="photoContainer">
                    <span class="answer">{{ answerQuestion2.answer }}</span>
                    <img v-if="answerQuestion2.image" :src="answerQuestion2.image.base64" />
                </div>
                <div class="commentContainer">
                    <span class="comment"> {{ answerQuestion2.comment }}</span>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    gap: 50px;
}

.questionContainer {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

h3 {
    font-family: "MNKYKoko-medium";
    font-size: 15pt;
}

img {
    width: 100%;
}

.answerContainer {
    display: flex;
    justify-content: space-between;
    font-size: 9pt;
    border: 1pt solid rgba(0, 0, 0, .3);
    background-color: rgba(0, 0, 0, .1);
    color: rgba(0, 0, 0, .3);
    border-radius: 1pt;
    padding: 5px 10px;
}

.photoContainer {
    width: 45%;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.commentContainer {
    width: 45%;
}
</style>
