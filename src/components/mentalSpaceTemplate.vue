<script setup>
import { watchEffect, ref, computed, onMounted } from 'vue';

const props = defineProps({
    display: {
        type: String
    },
    themes: {
        type: Object
    }
})


const emit = defineEmits(["finishLoading"])

function getWidth(theme) {
    let totalAnswers = 0
    for (const [key, value] of Object.entries(props.themes[props.display])) {
        totalAnswers += value
    }
    const percent = theme / totalAnswers
    const widthScreen = window.innerWidth
    return parseInt(percent * (widthScreen * 1 / 3)) + 50
}

function getPositions() {
    let counter = 1
    let topPos = ""
    let leftPos = ""
    document.querySelectorAll(".group-container").forEach(group => {
        console.log(group)
        switch (counter) {
            case 1:
                topPos = "50%"
                leftPos = "50%"
                break;
            case 2:
                topPos = "25%"
                leftPos = "25%"
                break;
            case 3:
                topPos = "22%"
                leftPos = "75%"
                break;
            case 4:
                topPos = "80%"
                leftPos = "33%"
                break;
            case 5:
                topPos = "70%"
                leftPos = "75%"
                break;
            case 6:
                topPos = "53%"
                leftPos = "10%"
                break;
            default:
                group.style.display = "none"
                break;
        }
        group.style.top = topPos
        group.style.left = leftPos

        counter++
        topPos = ""
        leftPos = ""
    })
}

let sortableThemes = computed(() => {
    let tab = []
    for (let theme in props.themes[props.display]) {
        tab.push([theme, props.themes[props.display][theme]]);
    }
    tab.sort(function (a, b) {
        return b[1] - a[1];
    })
    return tab
})

watchEffect(() => {
    setTimeout(() => {
        getPositions()
        emit('finishLoading', sortableThemes.value)
    }, 100)
    props.display
})

</script>

<template>
    <div class="template-container">
        <div v-for="(theme) of sortableThemes" class="group-container"
            :id="theme[0].indexOf(' ') >= 0 ? theme[0].split(' ').join('') : theme[0]" :style="{
                width: `${getWidth(theme[1])}px`,
                height: `${getWidth(theme[1])}px`
            }">
            <span class="text-container">{{ theme[0].toUpperCase() }}</span>
        </div>
    </div>
</template>

<style scoped>
.text-container {
    border-radius: 20px;
    padding: 5px;
    background-color: rgba(255, 255, 255, .6);
}

.template-container {
    position: absolute;
    width: calc(100vw - 250px);
    height: calc(100dvh - 100px);
    top: 100px;
    right: 0;
    pointer-events: none;
}

.group-container {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: black;
    text-align: center;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>