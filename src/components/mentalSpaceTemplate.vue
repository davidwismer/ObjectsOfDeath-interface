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

function selectSpecificGroup(theme, value) {
    let selectedGroup = document.getElementById(theme.split(' ').join(''))
    document.querySelectorAll(".group-container").forEach(group => {
        if (group.id !== theme.split(' ').join('') && selectedGroup.classList.contains("selected")) {
            group.style.display = "flex"
        } else if (group.id !== theme.split(' ').join('') && !selectedGroup.classList.contains("selected")) {
            group.style.display = "none"
        }
    })
    if (selectedGroup.classList.contains("selected")) {
        selectedGroup.classList.remove("selected")
        getPositions()
        selectedGroup.style.width = `${getWidth(value)}px`
        selectedGroup.style.height = `${getWidth(value)}px`
    } else {
        selectedGroup.classList.add("selected")
        selectedGroup.style.top = "50%"
        selectedGroup.style.left = "50%"
        selectedGroup.style.width = "calc(100dvh - 200px)"
        selectedGroup.style.height = "calc(100dvh - 200px)"
    }
    emit('finishLoading', sortableThemes.value)
}

function deselectGroupFocus() {
    let selectedGroup = document.querySelector(".selected")
    if (selectedGroup) selectedGroup.classList.remove("selected")
    document.querySelectorAll(".group-container").forEach(group => {
        group.style.display = "flex"
    })
}

function appearAllAnswers() {
    document.querySelectorAll(`.answer, .image`).forEach(answer => {
        answer.style.display = "block"
    })
}

watchEffect(() => {
    setTimeout(() => {
        appearAllAnswers()
        deselectGroupFocus()
        getPositions()
        emit('finishLoading', sortableThemes.value)
    }, 50)
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
            <span class="text-container" @click="selectSpecificGroup(theme[0], theme[1])">{{
                theme[0].toUpperCase() }}</span>
        </div>
    </div>
</template>

<style scoped>
.text-container {
    border-radius: 20px;
    padding: 5px;
    background-color: rgba(255, 255, 255, .6);
    cursor: pointer;
}

.template-container {
    position: absolute;
    width: calc(100vw - 250px);
    height: calc(100dvh - 100px);
    top: 100px;
    right: 0;
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