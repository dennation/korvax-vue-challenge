<script lang="ts">
import { h } from "vue"
import { Card, TemplateData } from "../types"

const defaultTemplate = `
<div class="card">
    <img class="card-picture" :src="card.picture"/>
    <div class="card-body">
        <h3 class="card-title">{{card.title}}</h3>
        <p>{{card.description}}</p>
    </div>
</div>`

const defaultStyle = `
.card {
    text-align: left;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    color: black;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 10px 25px -8px rgba(0,0,0,.1);
}
.card-title {
    text-transform: uppercase;
    font-size: 24px;
    font-weight: 500;
    margin: 0 0 16px 0;
}
.card-picture {
    aspect-ratio: 3/2;
    object-fit: cover;
    width: 100%;
}
.card-body {
    padding: 15px;
}
`

export default {
    data() {
        return {
            templateData: null as TemplateData | null,
            loading: true,
            componentData: {
                card: null as Card | null,
            },
        }
    },
    computed: {
        template() {
            return this.templateData?.template || defaultTemplate
        },
        style() {
            return this.templateData?.style || defaultStyle
        },
    },
    mounted() {
        Promise.all([
            /** Fetching data */
            fetch("http://localhost:3000/data")
                .then((response) => response.json())
                .then((card) => {
                    this.componentData.card = card
                }),
            /** Fetching template and styles */
            fetch("http://localhost:3000/template-data")
                .then((response) => response.json())
                .then((templateData) => {
                    this.templateData = templateData
                }),
        ]).finally(() => (this.loading = false))
    },
    render() {
        if (this.loading) {
            return h("div", "Loading...")
        }

        return [
            h("style", [this.style]),
            h(
                {
                    template: this.template,
                    props: Object.keys(this.$props || {}),
                    data: () => this.componentData,
                    components: this.$options.components,
                },
                { ...this.$props }
            ),
        ]
    },
}
</script>
