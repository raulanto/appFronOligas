<script setup lang="ts">
const cty_name = useState('global-cty');

const items = [
    {
        label: 'Evolución de la Producción',
        icon: 'i-lucide-chart-column-big',
        slot: 'produccion'
    },
    {
        label: 'Precio Real',
        icon: 'i-lucide-chart-no-axes-combined',
        slot: 'password'
    }
]


</script>

<template>
    <StatsOil :country_code_alpha3="cty_name"/>

    <UTabs :items="items">
        <template #produccion>
            <ProduccionGasPetrChart :country_code_alpha3="cty_name"/>

        </template>

        <template #password>
            <real-valor-precio :country_code_alpha3="cty_name"/>
        </template>
    </UTabs>



</template>

<style scoped>

</style>