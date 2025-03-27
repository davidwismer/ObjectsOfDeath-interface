import './assets/main.css'

import { ref } from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import AppResults from './AppResults.vue'

const routes = {
    '/': App,
    '/results': AppResults
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash
})


if (currentPath.value === "#results") {
    createApp(AppResults).mount('#app')
} else {
    createApp(App).mount('#app')
}

