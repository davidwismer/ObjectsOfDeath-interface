<script setup>

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
    </div>
    <div v-if="props.lang == 'en'" class="contentContainer">
        <div>Thanks for your reply, which has been saved!</div>
        <div>Have a nice and long life †</div>
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
    gap: 30px;
}
</style>