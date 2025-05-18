<script setup>
const props = defineProps({
    id: {
        type: String
    },
    backgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, .1)"
    },
    borderColor: {
        type: String,
        default: "rgba(0, 0, 0, .3)"
    }
})

const emit = defineEmits(['update:modelValue'])
console.log(props.backgroundColor)
</script>

<template>
    <button :id="props.id" :style="{backgroundColor: `${props.backgroundColor}`, border: `1pt solid ${props.borderColor}`}">
        <slot />
    </button>
</template>

<style scoped>
button {
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