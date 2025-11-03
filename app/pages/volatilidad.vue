<script setup lang="ts">
import HomeVolatilidadRiesgo from "~/components/HomeVolatilidadRiesgo.vue";

const cty_name = useState('global-cty');


definePageMeta({
    layout: 'board'

})
</script>

<template>

    <UDashboardPanel id="home">
        <template #header>
            <UDashboardNavbar title="Home" :ui="{ right: 'gap-3' }">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>

                <template #right>

                </template>
            </UDashboardNavbar>

            <UDashboardToolbar>
                <template #left>
                    <SelectCty></SelectCty>
                </template>
            </UDashboardToolbar>
        </template>

        <template #body>
        <HomeVolatilidadRiesgo></HomeVolatilidadRiesgo>
        </template>
    </UDashboardPanel>

</template>

<style scoped>

</style>