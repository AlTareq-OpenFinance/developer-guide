import type { App } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { theme, useOpenapi, useTheme } from 'vitepress-openapi/client'
import 'vitepress-openapi/dist/style.css'

import spec from '../..//public/swagger/bank-data-sharing/uae-account-information-openapi.json' with { type: 'json' }

import Layout from './Layout.vue'
// pages
import ApiDiscoveryPage from './components/ApiDiscoveryPage.vue' 

// sections
import SectionCreatingAnApplication from './components/SectionCreatingAnApplication.vue' 
import SectionAuthCodeRequest from './components/AuthCodeRequest.vue' 

import JSONBankDataAuthDetails from './components/JSONBankDataAuthDetails.vue' 
import JSONSIPAuthDetails from './components/JSONSIPAuthDetails.vue' 
import JSONSFPAuthDetails from './components/JSONSFPAuthDetails.vue' 
import JSONVarONDemandAuthDetails from './components/JSONVarONDemandAuthDetails.vue'
import JSONDDScaAuthDetails from './components/JSONDDScaAuthDetails.vue' 
import InsuranceAuthDetails from './components/InsuranceAuthDetails.vue'

// components
import GETRequest from './components/GETRequest.vue' 
import Post from './components/Post.vue' 
import Carousel from './components/Carousel.vue' 
import InsuranceEndpoints from './components/InsuranceEndpoints.vue'
import ConfluenceLinks from './components/ConfluenceLinks.vue' 
import Version from './components/Version.vue' 
import 'uno.css'
import './styles.css'




export default {
  ...DefaultTheme,
  Layout,
  async enhanceApp({ app }: { app: App }) {
    // Call the base theme's enhanceApp if needed
    if (theme.enhanceApp) {
      await theme.enhanceApp({ app })
    }

      // Set the OpenAPI specification.
      useOpenapi({ 
        spec, 
    }) 

        // Set available code sample languages
    useTheme({
      codeSamples: {
        availableLanguages: [
          {
            lang: 'curl',
            label: 'cURL',
            highlighter: 'shell',
          },
          {
            lang: 'python',
            label: 'Python',
            highlighter: 'python',
          },
          // optionally extend with dynamic languages if needed
          // ...useTheme().getCodeSamplesAvailableLanguages(),
        ],
      },
    })
    app.component('ApiDiscoveryPage', ApiDiscoveryPage)
    app.component('SectionCreatingAnApplication', SectionCreatingAnApplication)
    app.component('SectionAuthCodeRequest', SectionAuthCodeRequest)

    app.component('JSONBankDataAuthDetails', JSONBankDataAuthDetails)
    app.component('JSONSIPAuthDetails', JSONSIPAuthDetails)
    app.component('JSONSFPAuthDetails', JSONSFPAuthDetails)
    app.component('JSONVarONDemandAuthDetails', JSONVarONDemandAuthDetails)
    app.component('JSONDDScaAuthDetails', JSONDDScaAuthDetails)
    app.component('InsuranceAuthDetails', InsuranceAuthDetails)

    app.component('Post', Post)
    app.component('GET', GETRequest)
    app.component('Carousel', Carousel)
    app.component('InsuranceEndpoints', InsuranceEndpoints)
    app.component('ConfluenceLinks', ConfluenceLinks)
    app.component('Version', Version)
  },
}

