<script setup lang="ts">
import type {ApiResponse} from '~/types'

const config = useRuntimeConfig();
const {data: cty, status} = await useFetch(`${config.public.apiBase}oligas/country-energy/`, {
    key: 'typicode-cty',
    transform: (data: ApiResponse) => {
        return data?.results.map(country => ({
            label: country.cty_name,
            code: country.country_code_alpha3
        }));
    },
    lazy: true
})

const cty_name = useState('global-cty', () => '');

</script>

<template>
    <USelectMenu
        v-model="cty_name"
        :items="cty"
        value-key="code"
        :loading="status === 'pending'"
        icon="i-lucide-globe"
        virtualize
        placeholder="Seleccionar País"
        class="w-48"
    >

    </USelectMenu>


</template>

