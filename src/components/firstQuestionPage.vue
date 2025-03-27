<script setup>
import baseInput from "./composables/BaseInput.vue"
import baseButton from "./composables/BaseButton.vue"
import { ref, watchEffect } from "vue"

const props = defineProps({
    lang: {
        type: String,
        default: "fr"
    },
    apiURL: {
        type: String
    }
})

const answer = ref("")
const image = ref({})
const comment = ref("")

const questionNumber = 1

const emit = defineEmits(["changePage"])

function fileHandler(e) {
    image.value = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (event) => {

        console.log(event.target.result)
        image.value = {
            base64: event.target.result,
            name: image.value.name,
            size: image.value.size,
            type: image.value.type,
        }
    };
    reader.readAsDataURL(image.value);

}

const deactivateButton = ref(false)
async function changePage() {
    if (answer.value !== "") {
        deactivateButton.value = true
        const answerParams = {
            questionNumber: questionNumber,
            answer: answer.value,
            comment: comment.value,
            image: image.value
        }
        try {
            await fetch(`${props.apiURL}answers`,
                {
                    method: "POST",
                    body: JSON
                        .stringify(answerParams),
                    headers: {
                        "Content-type": "application/json",
                    },
                })
                .then((response) => response.json())
                .then(async (json) => {
                    emit('changePage')
                });
        } catch (error) {
            return console.log(error)
        }
        deactivateButton.value = false
    }
}

const showQuestionBox = ref(false)
function togglePopUp(){
    showQuestionBox.value = !showQuestionBox.value
}
</script>

<template>
    <div v-if="props.lang == 'fr'" class="contentContainer">
        <div class="questionContainer">
            <div :class="!showQuestionBox ? 'hidden' : ''" class="questionPopUp" :style="'width:235px;'">En supposant qu’il y a quelque chose
                après la vie, et que tu ne peux y apporter
                qu’une chose que tu possèdes déjà,
                qu’est-ce que ça serait ?</div>
        </div>
        <h3>« Quel objet apporterai-tu dans la mort ? » <span @click="togglePopUp()" class="infoCircle">i</span></h3>
        <div class="fieldsContainer">
            <div class="fieldContainer">
                <span class="fieldLabel">Réponse * :</span>
                <baseInput :modelValue="answer" @update:modelValue="$event => (answer = $event)"></baseInput>
            </div>
            <div class="fieldContainer">
                <span class="fieldLabel">Photo et/ou image et/ou illustration :</span>
                <div class="uploadContainer">
                    <div class="fileName">
                        {{ image.name }}
                    </div>
                    <div>
                        <label class="uploadLabel" for="file-upload"><img class="button-img-up"
                                src="../assets/fleche.png" />importer</label>
                        <input id="file-upload" type="file" accept="image/*" @input="fileHandler($event)" />
                    </div>
                </div>
            </div>
            <div class="fieldContainer">
                <span class="fieldLabel">Commentaire :</span>
                <baseInput :maxlength="500" :modelValue="comment" @update:modelValue="$event => (comment = $event)">
                </baseInput>
            </div>
        </div>
        <div class="requiredContainer">
            <span class="required">* Obligatoire</span>
        </div>
        <div class="buttonContainer">
            <base-button :disabled="deactivateButton" @click="changePage()"><img class="button-img"
                    src="../assets/fleche.png" />Suivant</base-button>
        </div>
    </div>
    <div v-else-if="props.lang == 'en'" class="contentContainer">
        <div class="questionContainer">
            <div :class="!showQuestionBox ? 'hidden' : ''" class="questionPopUp" :style="'width:180px;'">Assuming there’s something
                after life, and you can only
                bring one thing you already
                have, what would it be?</div>
        </div>
        <h3>“What object would you bring into death?” <span @click="togglePopUp()" class="infoCircle">i</span></h3>
        <div class="fieldsContainer">
            <div class="fieldContainer">
                <span class="fieldLabel">Answer*:</span>
                <baseInput :modelValue="answer" @update:modelValue="$event => (answer = $event)"></baseInput>
            </div>
            <div class="fieldContainer">
                <span class="fieldLabel">Photo and/or image and/or illustration:</span>
                <div class="uploadContainer">
                    <div class="fileName">
                        {{ image.name }}
                    </div>
                    <div>
                        <label class="uploadLabel" for="file-upload"><img class="button-img-up"
                                src="../assets/fleche.png" />import</label>
                        <input id="file-upload" type="file" accept="image/*" @input="fileHandler($event)" />
                    </div>
                </div>
            </div>
            <div class="fieldContainer">
                <span class="fieldLabel">Comment:</span>
                <baseInput :maxlength="500" :modelValue="comment" @update:modelValue="$event => (comment = $event)">
                </baseInput>
            </div>
        </div>
        <div class="requiredContainer">
            <span class="required">* Required</span>
        </div>
        <div class="buttonContainer">
            <base-button :disabled="deactivateButton" @click="changePage()"><img class="button-img"
                    src="../assets/fleche.png" />Next</base-button>
        </div>
    </div>
</template>

<style scoped>
input[type="file"] {
    display: none;
}

h3 {
    font-family: "MNKYKoko-medium";
    font-size: 15pt;
    margin-bottom: 30px;
}

span {
    font-size: 15pt;
}

.button-img {
    transform: rotate(90deg);
    height: 5mm;
}

.button-img-up {
    height: 5mm;
}

.requiredContainer {
    display: flex;
    justify-content: end;
    margin-top: 30px;
}

.required {
    font-size: 9pt;
}


.buttonContainer {
    display: flex;
    justify-content: end;
    margin-top: 50px;
}

.fieldContainer {
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
}

.fieldLabel {
    margin-bottom: 5px;
}

.uploadContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.uploadLabel {
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
    padding: 1px 6px;
}

.fileName {
    color: rgba(0, 0, 0, .3);
    font-size: 12pt;
    width: 60%;
    overflow-wrap: break-word;
}

.questionPopUp {
    border: 1pt solid rgba(0, 0, 0, .3);
    background-color: rgba(0, 0, 0, .1);
    border-radius: 1pt;
    font-size: 9pt;
    font-family: "MNKYKoko-Regular";
    margin-bottom: 5px;
    text-align: justify;
    padding: 3px;
}

.hidden {
    visibility: hidden;
}

.questionContainer {
    display: flex;
    justify-content: end;
}

.infoCircle {
    display: inline-flex;
    justify-content: center;
    margin-left: 10px;
    border: 1pt solid rgba(0, 0, 0, .3);
    background-color: rgba(0, 0, 0, .1);
    color: rgba(0, 0, 0, .3);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    text-align: center;
}
</style>