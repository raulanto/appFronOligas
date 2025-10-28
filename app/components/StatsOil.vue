<script setup lang="ts">
const props = defineProps<{
    country_code_alpha3: string
}>();
const config = useRuntimeConfig();

const {
    data: kpioil,
    status
} = await useFetch(`${config.public.apiBase}oligas/kpi-resumen/?country_code_alpha3=${props.country_code_alpha3}`, {
    key: 'typicode-oil-kpi',
})

watch(() => props.country_code_alpha3, async (newCode) => {
    if (newCode) {
        const {data} = await useFetch(`${config.public.apiBase}oligas/kpi-resumen/?country_code_alpha3=${newCode}`, {
            key: `typicode-oil-kpi-${newCode}`,
        });
        kpioil.value = data.value;
    }
});

// Computed para acceso seguro a los datos
const kpiData = computed(() => kpioil.value?.results?.[0] || null);
</script>

<template>
    <UPageGrid class="lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-px">
        <UPageCard
            title="Produccion Total real"
            variant="subtle"
            :ui="{
                container: 'gap-y-1.5',
                wrapper: 'items-start',
                leading: 'p-2.5 rounded-full bg-primary/10 ring ring-inset ring-primary/25 flex-col',
                title: 'font-normal text-muted text-xs uppercase'
            }"
            class="lg:rounded-none first:rounded-l-lg last:rounded-r-lg hover:z-1"
        >
            <div class="flex items-center gap-2">
                <span class="text-2xl font-semibold text-highlighted">
                    {{ kpiData?.oil_gas_value_2014?.toFixed(2) || '0.00' }}
                </span>

                <UBadge
                    v-if="kpiData?.oil_gas_value_change !== null && kpiData?.oil_gas_value_change !== undefined"
                    :color="kpiData.oil_gas_value_change >= 0 ? 'success' : 'error'"
                    variant="subtle"
                    class="text-xs"
                >
                    {{ kpiData.oil_gas_value_change >= 0 ? '+' : '' }}{{ kpiData.oil_gas_value_change.toFixed(2) }}%
                </UBadge>
            </div>
        </UPageCard>
        <UPageCard
            title="Total Per Cápita"
            variant="subtle"
            :ui="{
                container: 'gap-y-1.5',
                wrapper: 'items-start',
                leading: 'p-2.5 rounded-full bg-primary/10 ring ring-inset ring-primary/25 flex-col',
                title: 'font-normal text-muted text-xs uppercase'
            }"
            class="lg:rounded-none first:rounded-l-lg last:rounded-r-lg hover:z-1"
        >
            <div class="flex items-center gap-2">
                <span class="text-2xl font-semibold text-highlighted">
                    {{ kpiData?.oil_gas_valuePOP_2014?.toFixed(2) || '0.00' }}
                </span>

                <UBadge
                    v-if="kpiData?.oil_gas_valuePOP_change !== null && kpiData?.oil_gas_valuePOP_change !== undefined"
                    :color="kpiData.oil_gas_valuePOP_change >= 0 ? 'success' : 'error'"
                    variant="subtle"
                    class="text-xs"
                >
                    {{ kpiData.oil_gas_valuePOP_change >= 0 ? '+' : '' }}{{ kpiData.oil_gas_valuePOP_change.toFixed(2) }}%
                </UBadge>
            </div>
        </UPageCard>
        <UPageCard
            title="Producción de Petróleo"
            variant="subtle"
            :ui="{
                container: 'gap-y-1.5',
                wrapper: 'items-start',
                leading: 'p-2.5 rounded-full bg-primary/10 ring ring-inset ring-primary/25 flex-col',
                title: 'font-normal text-muted text-xs uppercase'
            }"
            class="lg:rounded-none first:rounded-l-lg last:rounded-r-lg hover:z-1"
        >
            <div class="flex items-center gap-2">
                <span class="text-2xl font-semibold text-highlighted">
                    {{ kpiData?.oil_prod32_14?.toFixed(2) || '0.00' }}
                </span>

                <UBadge
                    v-if="kpiData?.oil_prod_change !== null && kpiData?.oil_prod_change !== undefined"
                    :color="kpiData.oil_prod_change >= 0 ? 'success' : 'error'"
                    variant="subtle"
                    class="text-xs"
                >
                    {{ kpiData.oil_prod_change >= 0 ? '+' : '' }}{{ kpiData.oil_prod_change.toFixed(2) }}%
                </UBadge>
            </div>
        </UPageCard>
        <UPageCard
            title="Producción de Gas"
            variant="subtle"
            :ui="{
                container: 'gap-y-1.5',
                wrapper: 'items-start',
                leading: 'p-2.5 rounded-full bg-primary/10 ring ring-inset ring-primary/25 flex-col',
                title: 'font-normal text-muted text-xs uppercase'
            }"
            class="lg:rounded-none first:rounded-l-lg last:rounded-r-lg hover:z-1"
        >
            <div class="flex items-center gap-2">
                <span class="text-2xl font-semibold text-highlighted">
                    {{ kpiData?.gas_prod55_14?.toFixed(2) || '0.00' }}
                </span>

                <UBadge
                    v-if="kpiData?.gas_prod_change !== null && kpiData?.gas_prod_change !== undefined"
                    :color="kpiData.gas_prod_change >= 0 ? 'success' : 'error'"
                    variant="subtle"
                    class="text-xs"
                >
                    {{ kpiData.gas_prod_change >= 0 ? '+' : '' }}{{ kpiData.gas_prod_change.toFixed(2) }}%
                </UBadge>
            </div>
        </UPageCard>
    </UPageGrid>
</template>