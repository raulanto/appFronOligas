<script setup lang="ts">
const props=defineProps<{
    data:any,
    lastDataPoint:any,
    year:number
}>();
</script>

<template>

    <UPageGrid class="lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-px">
        <UPageCard
            title="Precio global del petróleo"
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
                <span v-if="data" class="text-2xl font-semibold text-highlighted">

                     {{data?.datapoint[0].value || '0.00'}}
                </span>
                <span v-else class="text-2xl font-semibold text-highlighted">
                     {{lastDataPoint?.oil_price_2000 || '0.00'}}
                </span>
                <UBadge

                    variant="subtle"
                    class="text-xs"
                >
                    {{ year||"N/A"}}
                </UBadge>
            </div>
        </UPageCard>
        <UPageCard
            title="Valor real Per Cápita"
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
                <span v-if="data" class="text-2xl font-semibold text-highlighted">
                     {{data?.datapoint[1].value || '0.00'}}
                </span>
                <span v-else class="text-2xl font-semibold text-highlighted">
                     {{lastDataPoint?.oil_gas_valuePOP_2000 || '0.00'}}
                </span>
                <UBadge

                    variant="subtle"
                    class="text-xs"
                >
                    {{ year||"N/A"}}
                </UBadge>
            </div>
        </UPageCard>
    </UPageGrid>
</template>