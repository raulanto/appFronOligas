<script setup lang="ts">
const props = defineProps<{
    country_code_alpha3: string
}>();

const config = useRuntimeConfig();

const {
    data: chartdata,
    status
} = await useFetch(`${config.public.apiBase}oligas/production-gas-petroleo/?country_code_alpha3=${props.country_code_alpha3}`, {
    key: 'typicode-oil-petroeloGasPetrChart',
})

watch(() => props.country_code_alpha3, async (newCode) => {
    if (newCode) {
        const {data} = await useFetch(`${config.public.apiBase}oligas/production-gas-petroleo/?country_code_alpha3=${newCode}`, {
            key: `typicode-oil-petroeloGasPetrChart-${newCode}`,
        });
        chartdata.value = data.value;
    }
});



</script>

<template>
    <div>
    <ChartProduccionGasPetroleo :data="chartdata?.results"/>

    </div>
</template>