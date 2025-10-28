<script setup lang="ts">
import type {ProduccionGasPetroleoDataPoint} from "~/types"
import {VisXYContainer, VisLine, VisAxis, VisTooltip, VisBulletLegend, VisArea, VisCrosshair} from '@unovis/vue'

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

// Computed para acceso seguro a los datos
const chartResults = computed(() => chartdata.value?.results || []);

const x = (d: ProduccionGasPetroleoDataPoint) => d.year
// const y = [
//     (d: ProduccionGasPetroleoDataPoint) => d.oil_prod32_14,  // ← Cambio aquí
//     (d: ProduccionGasPetroleoDataPoint) => d.gas_prod55_14   // ← Cambio aquí
// ]
const y= (d: ProduccionGasPetroleoDataPoint) => d.oil_prod32_14
const y2= (d: ProduccionGasPetroleoDataPoint) => d.gas_prod55_14
const items = [
    { name: 'Petróleo', color: 'var(--ui-primary)' },
    { name: 'Gas', color: 'var(--ui-success)' }
]

</script>

<template>
    <div>

        <client-only>
            <VisBulletLegend :items="items"/>
            <VisXYContainer :height="300" :padding="{ top: 40 }">
                <VisLine
                    :data="chartResults"
                    :x="x"
                    :y="y"
                    color="var(--ui-primary)"
                />

                <VisAxis type="x" label="Años"/>
                <VisAxis type="y" label="Producción"/>
                <VisCrosshair color="var(--ui-primary)"/>
                <VisTooltip/>
            </VisXYContainer>

            <VisXYContainer :height="300" :padding="{ top: 40 }">
                <VisLine
                    :data="chartResults"
                    :x="x"
                    :y="y2"
                    color="var(--ui-success)"
                />

                <VisAxis type="x" label="Años"/>
                <VisAxis type="y" label="Producción"/>
                <VisCrosshair color="var(--ui-primary)"/>
                <VisTooltip/>
            </VisXYContainer>
        </client-only>

        <UTable

            :data="chartResults"
            :loading="status === 'pending'"
            class="shrink-0 mt-4"
            :ui="{
                base: 'table-fixed border-separate border-spacing-0',
                thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
                tbody: '[&>tr]:last:[&>td]:border-b-0',
                th: 'first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
                td: 'border-b border-default'
            }"
        >
            <template #oil_production-data="{ row }">
                <span class="font-semibold text-primary">
                    {{ row.oil_production?.toFixed(2) || '0.00' }}
                </span>
            </template>
            <template #gas_production-data="{ row }">
                <span class="font-semibold text-success">
                    {{ row.gas_production?.toFixed(2) || '0.00' }}
                </span>
            </template>
        </UTable>
    </div>
</template>