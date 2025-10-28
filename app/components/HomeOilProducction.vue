<script setup lang="ts">
const cty_name = useState('global-cty');
</script>

<template>
    <StatsOil :country_code_alpha3="cty_name"/>
    <ProduccionGasPetrChart :country_code_alpha3="cty_name"/>
</template>

<style scoped>

</style>