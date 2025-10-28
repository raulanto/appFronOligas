<script setup lang="ts">
import { VisXYContainer, VisLine, VisAxis, VisTooltip, VisCrosshair, VisArea } from '@unovis/vue'
import { Line } from '@unovis/ts'
import type { OilPriceDataPoint } from "~/types"

interface Props {
    data: OilPriceDataPoint[]
}

const props = defineProps<Props>()

const x = (d: OilPriceDataPoint) => d.year
const y = (d: OilPriceDataPoint) => d.oil_price_2000

// Template para el tooltip
const tooltipTemplate = (d: OilPriceDataPoint) => [
    [`Año`, d.year],
    [`Precio`, `$${d.oil_price_2000.toFixed(2)}`]
]
</script>

<template>
    <client-only>
        <VisXYContainer :height="300" :padding="{ top: 40 }">
            <VisArea
                :data="props.data"
                :x="x"
                :y="y"
                color="var(--ui-primary)"
                :opacity="0.1"
            />
            <VisLine
                :data="props.data"
                :x="x"
                :y="y"
            />

            <VisAxis type="x" label="Años"/>
            <VisAxis type="y" label="Precio del Petróleo"/>
            <VisCrosshair color="var(--ui-primary)"/>
            <VisTooltip
                :triggers="{
                    [Line.selectors.line]: (d: OilPriceDataPoint) => `
                        <strong>Año:</strong> ${d.year}<br/>
                        <strong>Precio:</strong> $${d.oil_price_2000.toFixed(2)}
                    `
                }"
            />
        </VisXYContainer>
    </client-only>
</template>