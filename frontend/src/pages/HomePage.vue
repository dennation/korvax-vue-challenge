<script lang="ts" setup>
import { RouterLink } from "vue-router"
</script>

<template>
    <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }">
        <div>
            <RouterLink to="/client">Open Client Page</RouterLink><br />
            <RouterLink to="/admin">Open Admin Page</RouterLink>
        </div>
    </div>
</template>
