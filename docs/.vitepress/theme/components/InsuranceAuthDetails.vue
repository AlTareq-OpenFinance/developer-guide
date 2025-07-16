<template>
    <Content12 v-if="globalState.version === '1.2.0'" />
    <Content20 v-if="globalState.version === '2.0.0'" />
</template>

<script setup>
import { globalState } from '../../stores/globalState'
import Content12 from '../../../shared/insurance-data-schema-v1.2.md' // adjust the path as needed
import Content20 from '../../../shared/insurance-data-schema-v2.0.md' // adjust the path as needed
</script>