<script setup lang="ts">
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
            <home-oil-producction/>
        </template>
    </UDashboardPanel>

</template>

<style scoped>

</style>