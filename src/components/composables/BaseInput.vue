<script setup>
const props = defineProps({
    id: {
        type: String
    },
    modelValue: {
        type: String
    },
    maxlength: {
        type: Number,
        default: 100
    }
})

const emit = defineEmits(['update:modelValue'])

</script>

<template>
    <textarea :id="props.id" :value="props.modelValue" :maxlength="props.maxlength" rows="4" @input="emit('update:modelValue', $event.target.value)">
    <slot />
    </textarea>
</template>

<style scoped>
textarea {
    border: 1pt solid rgba(0, 0, 0, .3);
    background-color: rgba(0, 0, 0, .1);
    color: rgba(0, 0, 0, .3);
    border-radius: 1pt;
    font-size: 15pt;
    font-family: "MNKYKoko-regular";
    resize: none;
    padding: 3px 6px;
}
</style>