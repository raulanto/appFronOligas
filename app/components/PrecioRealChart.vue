<script setup lang="ts">
import { computed } from "vue";
import { VueUiXy } from "vue-data-ui/vue-ui-xy";
import "vue-data-ui/style.css";
const configApi = useRuntimeConfig();
const props = defineProps<{
    country_code_alpha3: string
}>();
const {
    data: chartdata,
    status
} = await useFetch(`${configApi.public.apiBase}oligas/per-capita/${props.country_code_alpha3}/`, {
    key: 'typicode-oil-per-capital',
})

watch(() => props.country_code_alpha3, async (newCode) => {
    if (newCode) {
        const {data} = await useFetch(`${configApi.public.apiBase}oligas/per-capita/${props.country_code_alpha3}/`, {
            key: `typicode-oil-per-capital-${newCode}`,
        });
        chartdata.value = data.value;
    }
});

const hoveredInfo = ref(null);

const lastDataPoint = computed(() => {
    if (!chartdata.value || chartdata.value.length === 0) {
        return null;
    }
    return chartdata.value[chartdata.value.length - 1];
});

function onDatapointEnter(payload) {

    hoveredInfo.value = payload;
}

function onDatapointLeave(payload) {
    hoveredInfo.value = null;
}

const yearData = computed(() => {

    // Si hoveredInfo.value NO es null (es decir, el ratón está sobre un punto)
    if (hoveredInfo.value) {
        // Devuelve el 'label' de ese punto, que en tu caso es el AÑO
        return chartdata.value[hoveredInfo.value.seriesIndex].year;
    }

    // Si hoveredInfo.value ES null (el ratón está fuera de la gráfica)
    // devuelve el año del último punto de la serie como valor por defecto.
    return lastDataPoint.value?.year || null;
});
const config = computed(() => {
    const lastIndex = (dataset.value.labels?.length || 0) - 1;
    return {
        debug: false,
        theme: '',
        responsive: true,
        loading: false,
        events: {
            datapointEnter: onDatapointEnter, // <--- ASÍ
            datapointLeave: onDatapointLeave, // <--- ASÍ
            datapointClick: null
        },
        responsiveProportionalSizing: true,
        customPalette: [],
        useCssAnimation: false,
        downsample: {
            threshold: 500
        },
        chart: {
            fontFamily: 'Public Sans',
            backgroundColor: 'rgba(255,255,255,0)',
            color: '#1A1A1Aff',
            height: 700,
            width: 400,
            annotations: [
                {
                    show: true,
                    yAxis: {
                        yTop: 40,

                        label: {
                            text: 'mhvhj',
                            textAnchor: 'start',
                            position: 'start',
                            offsetX: 2,
                            offsetY: 0,
                            padding: {
                                top: 12,
                                right: 12,
                                bottom: 12,
                                left: 12
                            },
                            border: {
                                stroke: '#FFFFFF',
                                strokeWidth: 1,
                                rx: 0,
                                ry: 0
                            },
                            fontSize: 14,
                            color: '#2D353C',
                            backgroundColor: '#e1e5e8'
                        },
                        line: {
                            stroke: '#2D353C',
                            strokeWidth: 1,
                            strokeDasharray: 0
                        },

                    }
                }
            ],
            zoom: {
                show: true,
                color: '#CCCCCCff',
                highlightColor: '#4A4A4A',
                fontSize: 14,
                useResetSlot: false,
                startIndex: null,
                endIndex: null,
                enableRangeHandles: true,
                enableSelectionDrag: true,
                focusOnDrag: false,
                focusRangeRatio: 0.2,
                minimap: {
                    show: true,
                    selectedColor: '#1F77B4',
                    selectedColorOpacity: 0.2,
                    indicatorColor: '#023131',
                    verticalHandles: true,
                    compact: true,
                    frameColor: '#A1A1A1',
                    smooth: true,
                    lineColor: '#1A1A1A',
                    selectionRadius: 2,
                    merged: false
                },
                preview: {
                    enable: true,
                    fill: '#CCCCCC50',
                    stroke: 'rgba(35,34,35,0.96)',
                    strokeWidth: 1,
                    strokeDasharray: 0
                },
                useDefaultFormat: true,
                timeFormat: 'yyyy-MM-dd HH:mm:ss',
                customFormat: null
            },
            padding: {
                top: 12,
                right: 12,
                bottom: 6,
                left: 6
            },
            highlighter: {
                color: '#1A1A1Aff',
                opacity: 5,
                useLine: false,
                lineDasharray: 2,
                lineWidth: 1
            },
            highlightArea: {
                show: false,
                from: 0,
                to: 0,
                color: '#CCCCCCff',
                opacity: 20,
                caption: {
                    text: 'Caption',
                    fontSize: 20,
                    color: '#1A1A1Aff',
                    bold: false,
                    offsetY: 0,
                    width: 'auto',
                    padding: 3,
                    textAlign: 'center'
                }
            },
            timeTag: {
                show: true,
                index: 82,
                backgroundColor: '#e1e5e8ff',
                color: '#1A1A1Aff',
                fontSize: 12,
                circleMarker: {
                    radius: 3,
                    color: '#1A1A1Aff'
                },
                useDefaultFormat: true,
                timeFormat: 'yyyy-MM-dd HH:mm:ss',
                customFormat: null
            },
            grid: {
                stroke: '#e1e5e8ff',
                showVerticalLines: false,
                showHorizontalLines: false,
                position: 'middle',
                frame: {
                    show: false,
                    stroke: '#E1E5E8ff',
                    strokeWidth: 2,
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeDasharray: 0
                },
                labels: {
                    show: true,
                    color: '#1A1A1Aff',
                    fontSize: 10,
                    axis: {
                        yLabel: '',
                        yLabelOffsetX: 0,
                        xLabel: '',
                        xLabelOffsetY: 0,
                        fontSize: 12
                    },
                    zeroLine: {
                        show: true
                    },
                    xAxis: {
                        showBaseline: true,
                        showCrosshairs: true,
                        crosshairsAlwaysAtZero: false,
                        crosshairSize: 6
                    },
                    yAxis: {
                        position: 'left',
                        showBaseline: true,
                        showCrosshairs: false,
                        crosshairSize: 6,
                        commonScaleSteps: 10,
                        useIndividualScale: true,
                        useNiceScale: true,
                        stacked: false,
                        gap: 12,
                        labelWidth: 40,
                        formatter: null,
                        scaleMin: 4,
                        scaleMax: 9,
                        groupColor: '#1A1A1A',
                        scaleLabelOffsetX: 0,
                        scaleValueOffsetX: 0,
                        rounding: 1,
                        serieNameFormatter: null
                    },
                    xAxisLabels: {
                        color: '#1A1A1Aff',
                        show: true,
                        values: chartdata.value.map(item => item.year || 0),
                        datetimeFormatter: {
                            enable: false,
                            locale: 'en',
                            useUTC: false,
                            januaryAsYear: false,
                            options: {
                                year: 'yyyy',
                                month: 'MMM \'yy',
                                day: 'dd MMM',
                                hour: 'HH:mm',
                                minute: 'HH:mm:ss',
                                second: 'HH:mm:ss'
                            }
                        },
                        fontSize: 8,
                        showOnlyFirstAndLast: false,
                        showOnlyAtModulo: true,
                        modulo: 12,
                        yOffset: 8,
                        rotation: 0,
                        autoRotate: {
                            enable: true,
                            angle: -30
                        }
                    }
                }
            },
            comments: {
                show: true,
                showInTooltip: true,
                width: 200,
                offsetX: 0,
                offsetY: 0
            },
            labels: {
                fontSize: 0,
                prefix: '',
                suffix: ''
            },
            legend: {
                color: 'text-primary-900',
                show: true,
                fontSize: 10,
                position: 'top'
            },
            title: {
                text: 'Evolución de la Producción',
                color: '#1A1A1Aff',
                fontSize: 20,
                bold: true,
                textAlign: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                subtitle: {
                    color: '#CCCCCCff',
                    text: '',
                    fontSize: 16,
                    bold: false
                },
                show: false
            },
            tooltip: {
                show: false,
                color: '#1A1A1Aff',
                backgroundColor: 'rgba(255,255,255,0.65)',
                fontSize: 10,
                customFormat: null,
                borderRadius: 4,
                borderColor: '#e1e5e8',
                borderWidth: 0.5,
                backgroundOpacity: 15,
                position: 'center',

                smooth: true,
                backdropFilter: true,
                smoothForce: 0.18,
                smoothSnapThreshold: 0.25,
                showTimeLabel: true,
                showValue: true,
                showPercentage: false,
                roundingValue: 7,
                roundingPercentage: 0,
                useDefaultTimeFormat: true,
                timeFormat: 'yyyy-MM-dd HH:mm:ss',
                offsetX: 50,
                offsetY: 10
            },
            userOptions: {
                show: true,
                showOnChartHover: true,
                keepStateOnChartLeave: true,
                position: 'right',
                buttons: {
                    tooltip: true,
                    pdf: true,
                    csv: true,
                    img: true,
                    table: true,
                    labels: true,
                    fullscreen: true,
                    sort: true,
                    stack: true,
                    animation: false,
                    annotator: true,
                    svg: true
                },
                callbacks: {
                    animation: null,
                    annotator: null,
                    csv: null,
                    fullscreen: null,
                    img: null,
                    labels: null,
                    pdf: null,
                    sort: null,
                    stack: null,
                    table: null,
                    tooltip: null,
                    svg: null
                },
                buttonTitles: {
                    open: 'Open options',
                    close: 'Close options',
                    tooltip: 'Toggle tooltip',
                    pdf: 'Download PDF',
                    csv: 'Download CSV',
                    img: 'Download PNG',
                    table: 'Toggle table',
                    labels: 'Toggle labels',
                    fullscreen: 'Toggle fullscreen',
                    stack: 'Toggle stack mode',
                    annotator: 'Toggle annotator',
                    svg: 'Download SVG'
                },
                print: {
                    scale: 2,
                    orientation: 'auto',
                    overflowTolerance: 0.2
                }
            }
        },
        line: {
            showTransition: false,
            transitionDurationMs: 300,
            radius: 0,
            useGradient: false,
            strokeWidth: 3,
            cutNullValues: false,
            dot: {
                hideAboveMaxSerieLength: 100,
                useSerieColor: false,
                fill: '#FFFFFF',
                strokeWidth: 2
            },
            labels: {
                show: true,
            },
            area: {
                useGradient: true,
                opacity: 10
            },
        },

        table: {
            useDialog: false,
            responsiveBreakpoint: 400,
            rounding: 7,
            sparkline: true,
            showSum: true,
            columnNames: {
                period: 'Period',
                total: 'Total'
            },
            th: {
                backgroundColor: '#FAFAFAff',
                color: '#1A1A1Aff',
                outline: ''
            },
            td: {
                backgroundColor: '#FAFAFAff',
                color: '#1A1A1Aff',
                outline: ''
            },
            useDefaultTimeFormat: true,
            timeFormat: 'yyyy-MM-dd HH:mm:ss'
        },
        showTable: false
    } });

const dataset = computed(() => {
    return [
        {
            name: 'Precio global del petróleo',
            series: chartdata.value.map(item => item.oil_price_2000 || 0),
            color: '#d81d39',
            type: 'line',
            shape: 'none',
            useArea: true,
            useProgression: true,
            dataLabels: false,
            smooth: true,
            dashed: false,
            useTag: 'Petroleo',
            showSerieName: 'start'
        },
        {
            name: 'Valor real per cápita',
            series: chartdata.value.map(item => item.oil_gas_valuePOP_2000 || 0),
            color: '#5abe45',
            type: 'bar',
            shape: 'none',
            useArea: false,
            useProgression: false,
            dataLabels: false,
            smooth: true,
            dashed: false,
            useTag: 'Gas',

        }
    ];
});

</script>


<template>
<stats-precio-per-capital :data="hoveredInfo" :lastDataPoint="lastDataPoint" :year="yearData"/>
    <UCard :ui="{ root: 'overflow-visible', body: '!px-0 !pt-0 !pb-3' }">
        <template #header>
            Riqueza Per Cápita
        </template>

        <client-only>
            <div :style="{ width: '100%' , height: '500px' }">

                <VueUiXy
                    :config="config"
                    :dataset="dataset"
                >


                </VueUiXy>
            </div>
        </client-only>


    </UCard>


</template>