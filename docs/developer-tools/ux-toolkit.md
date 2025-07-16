---
prev: false

next:
  text: 'New Dirham Symbol'
  link: '/developer-tools/new-dirham/'
---

# UI Toolkit

This page aims to provide tools to help you design and build user interfaces that align with Altareq's User Experience principles and standards. Below, you'll find brand guidelines, code examples, a demo site, and access to our open-source UI components.

## Brand Guidelines

Before building your user interfact please ensure you carefully read the brand guidelines


<a href="/developer-guide/pdfs/brandGuidelines.pdf" target="_blank">
  <img src="/images/links/brandGuidelines.png" alt="Brand Guidelines" width="300" />
</a>

## Demo site

See the UI in action.


<a href="https://ob-testing.onrender.com/" target="_blank">
  <img src="/images/links/sip.png" alt="Brand Guidelines" width="100%" />
</a>


## Our Open Repository

Browse and clone the open-source UI library used in our platform.

[View on GitHub](https://github.com/AlTareq-OpenFinance/AlTareq){ target="_blank" }

```bash
# Clone the UI toolkit
git clone https://github.com/AlTareq-OpenFinance/AlTareq.git
cd AlTareq
npm install
npm run dev
```

## Component Examples

#### Progress Bar

<br>

  <img src="/images/demo/progressBar.png" alt="Progress Bar" width="300" />

<br>

```vue
<template>
  <div class="progress-bar-container">
    <div class="progress-bar-line"></div>
    <div class="progress-group">
      <div :class="progressCircle('consent')">
        <div class="progress-number">
          <span v-if="consentStage">1</span>
          <img v-else class="tick-icon" src="../assets/icons/tick.svg" alt="tick" />
        </div>
      </div>
      <div class="progress-section-heading">
        Consent
      </div>
    </div>
    <div class="progress-group">
      <div :class="progressCircle('authorize')">
        <div class="progress-number">
          <span v-if="consentStage">2</span>
          <img v-else class="tick-icon" src="../assets/icons/tick.svg" alt="tick" />
        </div>
      </div>
      <div class="progress-section-heading">
        Authorize
      </div>
    </div>
    <div class="progress-group">
      <div :class="progressCircle('complete')">
        <div class="progress-number">
          <span v-if="consentStage">3</span>
          <img v-else class="tick-icon" src="../assets/icons/tick.svg" alt="tick" />
        </div>
      </div>
      <div class="progress-section-heading">
        Complete
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    route() {
      return this.$route.name
    },
    consentStage() {
      if(this.route === 'consent-setup' || this.route === 'sip-permissions' || this.route === 'vrp-permissions' || this.route === 'data-permissions') {
        return true
      }
      return false
    },
  },
  methods: {
    progressCircle(val) {
      if (val === 'consent') {
        return 'progress-circle-active'
      }
      else if (val = 'authorize' && (this.route === 'callback' || this.route === 'success')) {
        return 'progress-circle-active'
      }
      else if (val = 'complete' && (this.route === 'bank-data-requests' || this.route === 'vrp-requests'    || this.route === 'vrp-success' || this.route === 'sip-success'   || this.route === 'success')) {
        return 'progress-circle-active'
      }
      else {
        return 'progress-circle'
      }
    }
  }
}
</script>

<style scoped>

.progress-bar-container {
  margin-top: 40px;
  margin-bottom: 40px;
  max-width: 550px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  position:relative;
}

.progress-bar-line {
 width: 70%;
 z-index: -1;
 position: absolute;
 height: 1px;
 background-color: #B2B2B2;
 top: 12px;
 left: 50%;
 transform: translateX(-50%);
}

.progress-group {
  width: 33%;
}

.progress-circle {
  margin-left: auto;
  margin-right: auto;
  width: 22px;
  height: 22px;
  border-style: solid;
  border-color: #B2B2B2;
  border-radius: 100%;
  background-color: #F4F8FB;
}

.progress-circle-active {
  margin-left: auto;
  margin-right: auto;  
  padding-left: auto;
  margin-right: auto;
  width: 22px;
  height: 22px;
  border-style: solid;
  border-color: #00C8AF;
  border-radius: 100%;
  background-color: #00C8AF;
  color: white
}

.progress-number {
  position: relative;
  text-align: center;
  top: 50%;
  bottom: 50%;
  left: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
}

.progress-section-heading {
  margin-top: 4px;
  font-size: 15px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
</style>
```