<!-- .vitepress/components/ShowSelected.vue -->
<template>
  <span>
    {{ globalState.version }}
  </span>
</template>

<script setup>
import { globalState } from '../../stores/globalState'
</script>