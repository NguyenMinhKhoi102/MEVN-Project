<template>
    <AppHeader />
    <router-view v-slot="{ Component }">
        <component :is="Component"></component>
    </router-view>
    <AppFooter />
</template>

<script>

import { defineComponent } from 'vue';
// import Home from "@/components/customer/Home.vue"
import AppHeader from "@/components/customer/AppHeader.vue"
import AppFooter from "@/components/customer/AppFooter.vue"

export default defineComponent({
    components: {
        // Home,
        AppHeader,
        AppFooter,
    },
});

</script>