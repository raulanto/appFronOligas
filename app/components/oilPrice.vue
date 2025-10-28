<script setup lang="ts">

const props = defineProps<{
    country_code_alpha3: string
}>();
const config = useRuntimeConfig();

const {
    data: oilgas,
    status
} = await useFetch(`${config.public.apiBase}oligas/oil-price/?country_code_alpha3=${props.ountry_code_alpha3}`, {
    key: 'typicode-oil-price',

})

watch(() => props.country_code_alpha3, async (newCode) => {
    if (newCode) {
        const {data} = await useFetch(`${config.public.apiBase}oligas/oil-price/?country_code_alpha3=${newCode}`, {
            key: `typicode-oil-price-${newCode}`,

        });
        oilgas.value = data.value;
    }
});

</script>

<template>
    <OilChart :data="oilgas.results"/>
    <UTable
        :data="oilgas.results"
        :loading="status === 'pending'"
        class="shrink-0"
        :ui="{
          base: 'table-fixed border-separate border-spacing-0',
          thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
          tbody: '[&>tr]:last:[&>td]:border-b-0',
          th: 'first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
          td: 'border-b border-default'
        }"
    />
</template>
