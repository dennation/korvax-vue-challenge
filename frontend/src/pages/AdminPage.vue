<script lang="ts" setup>
import { ref } from "vue"
import DynamicCard from "../components/DynamicCard.vue"

const version = ref(1)
const template = ref("")
const style = ref("")

const fetchTemplateData = () => {
    fetch("http://localhost:3000/template-data")
        .then((response) => response.json())
        .then((templateData) => {
            template.value = templateData.template
            style.value = templateData.style
        })
}

const saveChanges = () => {
    fetch("http://localhost:3000/template-data", {
        method: "POST",
        body: JSON.stringify({
            template: template.value,
            style: style.value,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }).then(() => {
        version.value = version.value + 1
    })
}

fetchTemplateData()
</script>

<template>
    <div class="admin-page">
        <div class="left-side">
            <div :style="{ display: 'flex', flex: 1, flexDirection: 'column' }">
                <h2 :style="{ color: '#cccccc', fontWeight: 'normal', margin: '30px 0 20px 25px' }">
                    Template
                </h2>
                <vue-monaco-editor
                    v-model:value="template"
                    theme="vs-dark"
                    language="html"
                    :options="{
                        automaticLayout: true,
                        formatOnType: true,
                        formatOnPaste: true,
                    }"
                />
            </div>
            <div :style="{ display: 'flex', flex: 1, flexDirection: 'column' }">
                <h2 :style="{ color: '#cccccc', fontWeight: 'normal', margin: '30px 0 20px 25px' }">Style</h2>
                <vue-monaco-editor
                    v-model:value="style"
                    theme="vs-dark"
                    language="css"
                    :options="{
                        automaticLayout: true,
                        formatOnType: true,
                        formatOnPaste: true,
                    }"
                />
            </div>
            <div class="footer">
                <button class="submit-button" @click="saveChanges">Save changes</button>
            </div>
        </div>
        <div class="right-side">
            <div class="component-wrapper">
                <DynamicCard :key="version" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.admin-page {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100vh;
}
.left-side {
    display: flex;
    flex-direction: column;
    box-shadow: 10px 0 30px -15px rgba(0, 0, 0, 0.2);
    background-color: #1e1e1e;
}
.right-side {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(90, 90, 90);
}
.component-wrapper {
    max-width: 350px;
}
.footer {
    padding: 25px;
}
.submit-button {
    height: 42px;
    font-weight: 400;
    padding: 0 15px 0 15px;
    font-size: 16px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    border: none;
    color: white;
    background-color: rgba(99, 154, 5, 0.768);
    cursor: pointer;
}
.submit-button:hover {
    background-color: rgba(99, 154, 5, 0.853);
}
</style>
