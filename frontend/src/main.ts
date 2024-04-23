import { createApp } from "vue"
import "./style.css"
import ClientPage from "./pages/ClientPage.vue"
import AdminPage from "./pages/AdminPage.vue"
import HomePage from "./pages/HomePage.vue"
import { RouterView, createRouter, createWebHistory } from "vue-router"
import { install as VueMonacoEditorPlugin } from "@guolao/vue-monaco-editor"

const routes = [
    { path: "/", component: HomePage },
    { path: "/client", component: ClientPage },
    { path: "/admin", component: AdminPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(RouterView)
    .use(router)
    .use(VueMonacoEditorPlugin, {
        paths: {
            vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs",
        },
    })
    .mount("#app")
