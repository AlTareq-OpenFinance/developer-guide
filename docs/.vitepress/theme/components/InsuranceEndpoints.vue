<!-- .vitepress/components/ShowSelected.vue -->
<template>
   <div>
    <ul v-if="globalState.version === '1.2.0'">
      <li><code>https:rs1.[LFICode].apihub.openfinance.ae/open-finance/insurance/[Version]/motor-insurance-policies/{InsurancePolicyId}</code></li>
      <li><code>https:rs1.[LFICode].apihub.openfinance.ae/open-finance/insurance/[Version]/motor-insurance-policies</code></li>
    </ul>
    <ul v-else>
      <li><code>https:rs1.[LFICode].apihub.openfinance.ae/open-finance/insurance/[Version]/employment-insurance-quotes</code></li>
      <li><code>https:rs1.[LFICode].apihub.openfinance.ae/open-finance/insurance/[Version]/health-insurance-policies/{InsurancePolicyId}</code></li>
      <li><code>https:rs1.[LFICode].apihub.openfinance.ae/open-finance/insurance/[Version]/motor-insurance-policies</code></li>
      <li><code>https:rs1.[LFICode].apihub.openfinance.ae/open-finance/insurance/[Version]/travel-insurance-quotes</code></li>
      <br />
      <span style="font-size: small; font-style: italic;">Note for V2.0 insurance quotes use client_credentials while Data Sharing use authorization_code, refresh_token</span>
    </ul>
  </div>
</template>

<script setup>
import { globalState } from '../../stores/globalState'
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