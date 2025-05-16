<script setup>
import graphMenu from "./graphMenu.vue"
import mentalSpaceTemplate from "./mentalSpaceTemplate.vue";

import { ref, onMounted, watchEffect } from 'vue';

import { getAllAnswersPerQuestion } from '../utils';

const apiURL = 'https://objectsofdeath-api2.onrender.com/'
/* const apiURL = 'http://localhost:3000/' */


const answersQuestion1 = ref()
const answersQuestion2 = ref()
async function getAnswers() {
    answersQuestion1.value = await getAllAnswersPerQuestion(apiURL, 1)
    answersQuestion2.value = await getAllAnswersPerQuestion(apiURL, 2)
}
onMounted(async () => {
    await getAnswers()
    getThemesOfAnswers()
    /* getInitialStyleProperties() */

})

function getCategory(answer) {
    if (answer !== undefined) {
        if (answer[0] !== undefined) {
            return answer[0].split(' ').join('')
        }
    }
}

//Extract the themes of each answers from the big array
let allThemes = {}
function getThemesOfAnswers() {
    if (answersQuestion1.value) {
        answersQuestion1.value.forEach(answer => {
            const graphs = (({ destination, emotion, espaceMental, fonction, ligneDeVie }) => ({ destination, emotion, espaceMental, fonction, ligneDeVie }))(answer);
            for (const [key, value] of Object.entries(graphs)) {
                if (!allThemes[key]) {
                    allThemes[key] = {
                        [value[0]]: 1
                    }
                } else if (!allThemes[key][value[0]]) {
                    allThemes[key][value[0]] = 1
                } else {
                    allThemes[key][value[0]] += 1
                }
            }
        })
    }
    if (answersQuestion2.value) {
        answersQuestion2.value.forEach(answer => {
            const graphs = (({ destination, emotion, espaceMental, fonction, ligneDeVie }) => ({ destination, emotion, espaceMental, fonction, ligneDeVie }))(answer);
            for (const [key, value] of Object.entries(graphs)) {
                if (!allThemes[key]) {
                    allThemes[key] = {
                        [value[0]]: 1
                    }
                } else if (!allThemes[key][value[0]]) {
                    allThemes[key][value[0]] = 1
                } else {
                    allThemes[key][value[0]] += 1
                }
            }
        })
    }
}

/* function getInitialStyleProperties() {
    document.querySelectorAll("img.image").forEach(image => {
        image.style.top = `${image.getBoundingClientRect().top}px`
        image.style.left = `${image.getBoundingClientRect().left}px`
        image.style.width = `${image.getBoundingClientRect().width}px`
    })
    document.querySelectorAll(".answer").forEach(answer => {
        answer.style.top = `${answer.getBoundingClientRect().top}px`
        answer.style.left = `${answer.getBoundingClientRect().left}px`
        answer.style.width = `${answer.getBoundingClientRect().width}px`
    })
} */

//Manage display of the results
const display = ref("list")
function changeDisplay(newDisplay) {
    display.value = newDisplay
}

//Set position of the answers
function setPositionOfAnswers(sortableThemes) {
    document.querySelectorAll("img.image").forEach(image => {
        image.style.top = ``
        image.style.left = ``
    })
    document.querySelectorAll(".answer").forEach(answer => {
        answer.style.top = ``
        answer.style.left = ``
    })
    setTimeout(() => {
        sortableThemes.forEach(theme => {
            let themeWithoutSpace = theme[0]
            if (themeWithoutSpace.indexOf(' ') >= 0) {
                themeWithoutSpace = themeWithoutSpace.split(' ').join('')
            }
            let themedAnswers = document.querySelectorAll(`.${themeWithoutSpace} .answer, .${themeWithoutSpace} .image`)
            let xMinMax = getXMinMaxCircle(themeWithoutSpace)
            let yMinMax = getYMinMaxCircle(themeWithoutSpace)
            themedAnswers.forEach(answer => {
                //Go where the theme circle is but random
                answer.style.left = `${randomInt(xMinMax[0], xMinMax[1])}px`
                answer.style.top = `${randomInt(yMinMax[0], yMinMax[1])}px`
            })
        })
    }, 1000)
}

function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getXMinMaxCircle(theme) {
    let circle = document.getElementById(theme)
    let xmin = circle.getBoundingClientRect().left
    let xmax = circle.getBoundingClientRect().right
    return [xmin, xmax]
}

function getYMinMaxCircle(theme) {
    let circle = document.getElementById(theme)
    let ymin = circle.getBoundingClientRect().top
    let ymax = circle.getBoundingClientRect().bottom
    return [ymin, ymax]
}
</script>

<template>
    <section class="results-page">
        <graph-menu @change-display="changeDisplay" :currentDisplay="display"></graph-menu>
        <div class="questionContainer" :class="display">
            <h3 v-if="display == 'list'">« Quel objet apporterais-tu dans la mort ? »</h3>
            <div class="answerContainer" :class="`${display} ${getCategory(answerQuestion1[display])}`"
                :id="answerQuestion1._id" v-for="(answerQuestion1) in answersQuestion1">
                <div class="photoContainer" :class="display">
                    <span class="answer" :class="display">{{ answerQuestion1.answer }}</span>
                    <img v-if="answerQuestion1.image"
                        :src="`${apiURL}uploads/${answerQuestion1._id}-${answerQuestion1.image}`" class="image"
                        :class="display" />
                </div>
                <div class="commentContainer" :class="display">
                    <span class="comment" :class="display"> {{ answerQuestion1.comment }}</span>
                </div>
            </div>
        </div>
        <div class="questionContainer" :class="display">
            <h3 v-if="display == 'list'">« Par quel objet se souviendra-t-on de toi après ta mort ? »</h3>
            <div class="answerContainer" :class="`${display} ${getCategory(answerQuestion2[display])}`"
                :id="answerQuestion2._id" v-for="(answerQuestion2) in answersQuestion2">
                <div class="photoContainer" :class="display">
                    <span class="answer" :class="display">{{ answerQuestion2.answer }}</span>
                    <img v-if="answerQuestion2.image"
                        :src="`${apiURL}uploads/${answerQuestion2._id}-${answerQuestion2.image}`" class="image"
                        :class="display" />
                </div>
                <div class="commentContainer" :class="display">
                    <span class="comment" :class="display"> {{ answerQuestion2.comment }}</span>
                </div>
            </div>
        </div>
        <mental-space-template v-if="display !== 'list'" :display="display" :themes="allThemes"
            @finish-loading="setPositionOfAnswers"></mental-space-template>
    </section>
</template>

<style scoped>
.results-page {
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
    position: static;
    justify-content: space-between;
    font-size: 9pt;
    border: 1pt solid rgba(0, 0, 0, .3);
    background-color: rgba(0, 0, 0, .1);
    color: rgba(0, 0, 0, .3);
    border-radius: 1pt;
    padding: 5px 10px;
    z-index: -1;
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

.commentContainer:not(.list) {
    display: none;
}

/* -------------------------------------------Different displays------------------------------------------------------------------------------------- */
/* ---- EspaceMental ----- */
.answerContainer:not(.list),
.photoContainer:not(.list) {
    background-color: transparent;
    border: none;
}

.questionContainer:not(.list) {
    overflow-y: hidden;
    height: 0;
}

img:not(.list),
.answer:not(.list) {
    position: absolute;
    transition: 0.5s ease-in-out;
    top: 50%;
    left: 50%;
    max-height: 100px;
    max-width: 100px;
    width: auto !important;
    height: auto !important;
    transform: translate(-50%, -50%);
}

.answer:not(.list) {
    border: 1pt solid rgba(0, 0, 0, .3);
    background-color: rgba(0, 0, 0, .1);
    padding: 5px;
}
</style>
