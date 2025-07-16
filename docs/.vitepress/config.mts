import Unocss from 'unocss/vite'
import { defineConfig } from 'vitepress'
import { useSidebar } from 'vitepress-openapi'
import spec from '../public/swagger/bank-data-sharing/uae-account-information-openapi.json' with { type: 'json' }

const sidebar = useSidebar({ spec })


export default defineConfig({
  base: `/developer-guide`,
  description: 'A space that provides technical guidance for Third-Party Providers integrating the UAE’s Open Finance capabilities.',
  markdown: {
    headers: {
      level: [0, 0],
    },
  },
  themeConfig: {
    logo: {
      light: '/images/AlTareq.png',
      dark: '/images/AlTareq-light.png'
    },
    siteTitle: false,  // Hide the text next to the logo

    footer: {
      message: 'AlTareq Open Finance Developer Guide',
      copyright: 'Copyright © 2025 Nebras Open Finance - All rights reserved',
    },
    search: {
      provider: 'local',
    },
    nav: nav(),
    sidebar: {
      '/platform/': sidebarDocuments(),
      '/trust-framework/': sidebarDocuments(),
      '/model-bank/': sidebarDocuments(),

      '/getting-started/': sidebarGuide(),

      '/implementation-guides/': sidebarGuide(),

      // resources
      '/bank-service-initiation/': sidebarGuide(),
      '/bank-data-sharing/': sidebarGuide(),
      '/confirmation-of-payee/': sidebarGuide(),
      '/banking-products/': sidebarGuide(),
      '/insurance/': sidebarGuide(),

      '/developer-tools/': sidebarGuide(),

    },
  },
  title: 'AlTareq Developer Guide',
  head: [
    ['link', { rel: 'icon', href: 'images/fav.ico' }]
  ],
  vite: {
    plugins: [
      Unocss({
        configFile: '../../unocss.config.ts',
      }),
    ],
  },
})

function nav() {
  return [
    {
      text: 'Resources',
      items: [
        { text: 'Platform Overview', link: '/platform/' },
        { text: 'AlTareq Trust Framework', link: '/trust-framework/' },
        { text: 'Model Bank (Sandbox)', link: '/model-bank/' },
      ],
    },
    {
      text: 'Guides',
      items: [
        { text: 'Getting Started', link: '/getting-started/' },
        {
          text: 'Implementation Guides',
          link: '/implementation-guides/',
        },
        {
          text: 'Open Finance Resources',
          link: '/bank-data-sharing/',
        },
        { text: 'Developer Tools', link: '/developer-tools/' },
      ],
    },
    { text: 'Standards', link: 'https://openfinanceuae.atlassian.net/wiki/spaces/standardsv2dot0final/overview' },
    {
      text: 'Useful Links',
      items: [
        {
          text: 'RESTful APIs',
          link: 'https://www.moesif.com/blog/technical/api-development/Rest-API-Tutorial-A-Complete-Beginners-Guide/',
        },
        {
          text: 'OAuth 2.0',
          link: 'https://www.oauth.com/',
        },
        {
          text: 'Mutual TLS (mTLS) & Digital Certificates',
          link: 'https://www.cloudflare.com/learning/access-management/what-is-mutual-tls/',
        },
        {
          text: 'JWTs & Key Management',
          link: 'https://jwt.io/introduction',
        },
        {
          text: 'AlTareq Knowledge Hub',
          link: 'https://openfinanceuae.atlassian.net/wiki/spaces/KB/overview',
        },
      ],
    },
  ]
}

function sidebarGuide() {
  return [
    {
      text: 'Getting Started',
      collapsible: true,
      link: '/getting-started/',
      items: [
        {
          text: 'API Discovery', link: '/getting-started/api-discovery',
          collapsed: true,
          items: [
            { text: 'The Participants Endpoint', link: '/getting-started/api-discovery#the-participants-endpoint' },
            { text: 'The .well-known Endpoint', link: 'getting-started/api-discovery#openid-discovery-the-well-known-endpoint' },
          ]
        },
        {
          text: 'Register your Application', link: '/getting-started/tpp-onboarding/',
          collapsed: true,
          items: [
            { text: '1. Creating an Application', link: '/getting-started/tpp-onboarding/#step-1-creating-an-application' },
            { text: '2. Generate Transport Certificates', link: '/getting-started/tpp-onboarding/#step-2-generate-transport-certificates' },
            {
              text: `
    <span style="padding-left: 0px; padding-right: 0px;" class="OASidebarItem group/oaSidebarItem">
      <span style="padding-right: 2px;">3.</span>
      <span class="OASidebarItem-badge OAMethodBadge--post">POST</span>
      <span class="OASidebarItem-text text">/tpp-registration</span>
    </span>
  `, link: '/getting-started/tpp-onboarding/#step-3-post-tpp-registration'
            },


          ]
        },
        {
          text: 'Authentication', link: '/getting-started/authentication/',
          collapsed: true,
          items: [
            {
              text: 'Consent',
              items: [
                { text: 'Creating Consent', link: '/getting-started/create-consent/' },
                { text: 'Consent Management', link: '/getting-started/consent-management/' },
              ]

            },

            {
              text: 'Authorization',
              items: [

                {
                  text: 'Authorization Request', link: '/getting-started/authorization-request/',
                  // collapsed: true,

                  // items: [
                  //   { text: '1. Generate Signing Certificates', link: '/getting-started/authorization-request/#step-1-generate-signing-certificates' },
                  //   { text: '2. Preparing client_assertion', link: '/getting-started/authorization-request/#step-2-preparing-a-client-assertion' },
                  //   { text: '3. Encrypt PII (Payments Only)', link: '/getting-started/authorization-request/#step-3-encrypt-pii-payments-only' },
                  //   { text: '4. Preparing request JWT', link: '/getting-started/authorization-request/#step-4-encrypt-request-jwt' },
                  // ]

                },
                { text: 'Authorization Callback', link: '/getting-started/authorization-callback/' },
                { text: 'Multi-User Authorization', link: '/getting-started/multi-auth/' },
              ]

            },

            {
              text: 'Access Tokens',
              items: [
                {
                  text: 'authorization_code', link: '/getting-started/authorization-code/',
                },
                { text: 'refresh_token', link: '/getting-started/refresh-token/' },
                { text: 'client_credentials', link: '/getting-started/client-credentials/' },
              ]
            },


          ]


        }
      ],
    },

    {
      text: 'Implementation Guides',

      items: [
        { text: 'Constructing auth_details', link: '/implementation-guides/authorization-details/' },
        {
          text: 'O3 Utils',
          collapsed: true,
          items: [
            { text: 'Preparing Client Assertion', link: '/implementation-guides/client-assertion/' },
            { text: 'Preparing Request JWT', link: '/implementation-guides/request-jwt/' },
            { text: 'Encrypting PII', link: '/implementation-guides/encrypting-pii/' },
          ]
        },
        { text: 'Caching | Public APIs', link: '/implementation-guides/caching-public/' },
        { text: 'Webhooks', link: '/implementation-guides/webhooks/' }
      ]
    },

    {
      text: 'Open Finance Resources',
      items: [
        {
          text: 'Bank Service Initiation',
          link: '/bank-service-initiation/'
        },
        {
          text: 'Bank Data Sharing',
          // collapsed: true,
          link: '/bank-data-sharing/',
          // items: [
          //   { text: 'Account Access', link: '/bank-data-sharing/account-access' },
          //   { text: 'Accounts', link: '/bank-data-sharing/accounts' },
          //   { text: 'Balances', link: '/bank-data-sharing/balances' },
          //   { text: 'Beneficiaries', link: '/bank-data-sharing/beneficiaries' },
          //   { text: 'Direct Debits', link: '/bank-data-sharing/direct-debits' },
          //   { text: 'Parties', link: '/bank-data-sharing/parties' },
          //   { text: 'Product', link: '/bank-data-sharing/product' },
          //   { text: 'Scheduled Payments', link: '/bank-data-sharing/scheduled-payments' },
          //   { text: 'Standing Orders', link: '/bank-data-sharing/standing-orders' },
          //   { text: 'Transactions', link: '/bank-data-sharing/transactions' },
          // ]
        },

        {
          text: 'Confirmation of Payee',
          link: '/confirmation-of-payee/'
        },

        {
          text: 'Banking Product Data',
          link: '/banking-products/'
        },

        {
          text: 'Insurance',
          link: '/insurance/'
        },
      ]
    },


    {
      text: 'Developer Tools', items: [



        {
          text: 'UI Toolkit',
          link: '/developer-tools/ux-toolkit/',
          collapsed: true,
          items: [
            { text: 'New Dirham Symbol', link: '/developer-tools/new-dirham/' },
          ]
        },
        { text: 'Postman Collection', link: '/developer-tools/postman/' },
        { text: 'AlTareq SDK (coming soon)' },
      ]
    },
  ]
}

function sidebarDocuments() {
  return [
    {
      text: 'Platform Overview', link: '/platform/'
    },
        {
      text: 'Consented Data Flow', link: '/platform/consent-data/'
    },
    {
      text: 'AlTareq Trust Framework', link: '/trust-framework/',
      items: [
        { text: 'Onboarding', link: '/trust-framework/onboarding/' },
        { text: 'Roles in the Trust Framework', link: '/trust-framework/roles/' },
        { text: 'API Discovery', link: '/trust-framework/api-discovery/' },
        {
          text: 'Creating an Application',
          collapsed: true,
          link: '/trust-framework/application',
          items: [
            { text: 'Handling Redirect URIs', link: '/trust-framework/redirect-uri/' },
            { text: 'Certificates', link: '/trust-framework/certificates/' },
          ]
        },

      ]
    },

    { text: 'Sandbox | Model Bank ', link: '/model-bank/' },
  ]
}

