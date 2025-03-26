<script setup>
const props = defineProps({
    id: {
        type: String
    },
})

const emit = defineEmits(['update:modelValue'])

</script>

<template>
    <button :id="props.id">
        <slot />
    </button>
</template>

<style scoped>
button {
    border: 1pt solid rgba(0, 0, 0, .3);
    background-color: rgba(0, 0, 0, .1);
    color: rgba(0, 0, 0, .3);
    border-radius: 1pt;
    font-size: 15pt;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
    font-family: "MNKYKoko-Regular";
}
</style>