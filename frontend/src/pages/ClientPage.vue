<script lang="ts" setup>
import DynamicCard from "../components/DynamicCard.vue"
</script>

<template>
    <div class="container">
        <div class="cards">
            <DynamicCard />
            <DynamicCard />
            <DynamicCard />
        </div>
    </div>
</template>

<style>
.cards {
    display: flex;
    gap: 20px;
}
.container {
    max-width: 900px;
    margin: 0 auto;
    padding: 15px 0;
}
</style>
