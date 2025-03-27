<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue';

import firstQuestionPageVue from './components/firstQuestionPage.vue';
import secondQuestionPageVue from './components/secondQuestionPage.vue';
import thanksPageVue from './components/thanksPage.vue';
import welcomePageVue from './components/welcomePage.vue';

const apiURL = "https://objectsofdeath-api2.onrender.com/"
const apiURL2 = "https://objectsofdeath-api3.onrender.com/"
const apiURL3 = "https://objectsofdeath-api4.onrender.com/"
//const apiURL = 'http://localhost:3000/'

const actualPage = ref(1)
const language = ref("fr")

function toggleLanguage(target) {
  language.value = target
}

function manageButton() {
  window.scrollTo({ top: 0, behavior: "smooth" })
  actualPage.value++
}

window.onbeforeunload = function(){
    return "Vous perdrez vos réponses si vous rechargez la page";
}
</script>

<template>
  <main>
    <div class="langagePicker">
      <span :class="language == 'fr' ? 'selected' : ''" id="fr" @click="toggleLanguage('fr')">Fr</span>
      <span :class="language == 'en' ? 'selected' : ''" id="en" @click="toggleLanguage('en')">En</span>
    </div>
    <div v-if="actualPage <= 3 && actualPage > 1" class="pageNumber">
      <span class="actualPage number">{{ actualPage - 1 }}</span> /
      <span class="maxPage number">2</span>
    </div>
    <welcomePageVue v-if="actualPage == 1" :lang="language" @change-page="manageButton()"></welcomePageVue>
    <firstQuestionPageVue v-if="actualPage == 2" :lang="language" :apiURL="apiURL" :apiURL2="apiURL2" :apiURL3="apiURL3" @change-page="manageButton()"></firstQuestionPageVue>
    <secondQuestionPageVue v-if="actualPage == 3" :lang="language" :apiURL="apiURL" :apiURL2="apiURL2" :apiURL3="apiURL3" @change-page="manageButton()">
    </secondQuestionPageVue>
    <thanksPageVue v-if="actualPage == 4" :lang="language"></thanksPageVue>
  </main>
</template>

<style scoped>
.langagePicker {
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 10px;
  font-size: 15pt;
  margin-bottom: 30px;

  &>* {
    border: 1pt solid transparent;
    border-radius: 1pt;
    padding: 0 2px 0 2px;
    cursor: pointer;
  }
}

.selected {
  border: 1pt solid rgba(0, 0, 0, .3);
  background-color: rgba(0, 0, 0, .1);
  color: rgba(0, 0, 0, .3);
}

.pageNumber {
  font-size: 9pt;
  margin-bottom: 30px;
}

main {
  position: relative;
  overflow-x: hidden;
}
</style>
