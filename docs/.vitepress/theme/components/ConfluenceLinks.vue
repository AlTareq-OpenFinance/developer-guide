<!-- .vitepress/components/ShowSelected.vue -->
<template>
  <span v-for="item in links">
    <span v-if="item.version === globalState.version && item.type === group">
      <a :href="item.link">Go to Confluence</a>
    </span>
  </span>
</template>

<script setup>
import { globalState } from '../../stores/globalState'

const props = defineProps({
  group: {
    type: String,
    required: true
  }
})


const links = [
{
    link: 'https://openfinanceuae.atlassian.net/wiki/spaces/standardsv1dot2final/overview',
    type: 'general',
    version: '1.2.0'
  },
  {
    link: 'https://openfinanceuae.atlassian.net/wiki/spaces/standardsv2dot0final/overview',
    type: 'general',
    version: '2.0.0'
  },


  {
    link: 'https://openfinanceuae.atlassian.net/wiki/spaces/standardsv1dot2final/pages/277942118/Bank+Data+Sharing',
    type: 'bank-data',
    version: '1.2.0'
  },
  {
    link: 'https://openfinanceuae.atlassian.net/wiki/spaces/standardsv2dot0final/pages/361961098/Bank+Data+Sharing',
    type: 'bank-data',
    version: '2.0.0'
  },

  {
    link: 'https://openfinanceuae.atlassian.net/wiki/spaces/standardsv1dot2final/pages/277939839/Bank+Service+Initiation',
    type: 'bank-service',
    version: '1.2.0'
  },

  {
    link: 'https://openfinanceuae.atlassian.net/wiki/spaces/standardsv2dot0final/pages/361957274/Bank+Service+Initiation',
    type: 'bank-service',
    version: '2.0.0'
  },

  {
    link: 'https://openfinanceuae.atlassian.net/wiki/spaces/standardsv1dot2final/pages/277941334/Confirmation+of+Payee',
    type: 'cop',
    version: '1.2.0'
  },

  {
    link: 'https://openfinanceuae.atlassian.net/wiki/spaces/standardsv2dot0final/pages/361959594/Confirmation+of+Payee',
    type: 'cop',
    version: '2.0.0'
  },

  
  {
    link: 'https://openfinanceuae.atlassian.net/wiki/spaces/standardsv1dot2final/pages/277942403/Products+Data',
    type: 'product',
    version: '1.2.0'
  },

  {
    link: 'https://openfinanceuae.atlassian.net/wiki/spaces/standardsv2dot0final/pages/361961449/Products+Data',
    type: 'product',
    version: '2.0.0'
  },

  {
    link: 'https://openfinanceuae.atlassian.net/wiki/spaces/standardsv1dot2final/pages/277942609/Insurance',
    type: 'insurance',
    version: '1.2.0'
  },

  {
    link: 'https://openfinanceuae.atlassian.net/wiki/spaces/standardsv2dot0final/pages/361961793/Insurance',
    type: 'insurance',
    version: '2.0.0'
  },


]

</script>


<style scoped>
code {
  border-radius: 4px;
  padding: 3px 6px;
  background-color: var(--vp-code-bg);
  transition: color 0.25s, background-color 0.5s;
  font-size: var(--vp-code-font-size);
  color: var(--vp-code-color);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
  font-feature-settings: normal;
  font-variation-settings: normal;
}

ul {
  padding-left: 20px; /* Standard indentation for lists */
  list-style-type: disc; /* Default bullet point style */
}

li {
  font-size: 16px;
  line-height: 1.5;
}
</style>