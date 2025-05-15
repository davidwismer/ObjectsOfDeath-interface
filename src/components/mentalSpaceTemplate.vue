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
    setTimeout(() => emit('finishLoading', sortableThemes.value), 100)
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
    height: calc(100dvh - 150px);
    top: 150px;
    right: 0;
}

.group-container {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: black;
    border: 1px red solid;
    text-align: center;
}

.group-container:first-child {
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.group-container:nth-child(2) {
    top: 0%;
    left: 20px;
}

.group-container:nth-child(3) {
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
}

.group-container:nth-child(4) {
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
}

.group-container:nth-child(5) {
    top: 0%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.group-container:nth-child(6) {
    top: 0%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>