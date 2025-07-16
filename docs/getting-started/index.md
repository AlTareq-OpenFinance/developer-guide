---
next:
  text: 'API Discovery'
  link: '/getting-started/api-discovery/'
---



🕒 **5 minute read**


# Getting Started - Introduction

This guide will walk you through everything you need to know to get started with integrating the **Open Finance APIs**. If you’re a **Third Party Provider (TPP)**  registered with the [Al Tareq Trust Framework](../trust-framework/) looking to securely access financial data from UAE banks and financial institutions, you’re in the right place.


## Who This Is For

This guide is for **developers, fintech teams, and integrators** building applications that leverage Open Finance APIs. Whether you're offering personal finance management tools, digital lending services, or anything in between, this is your launchpad.


## What You'll Learn

By the end of this guide, you will understand how to:

- Programmatically discover the resources published by Licensed Financial Institutions (LFIs) that are available for your use

- Register with an LFI

- Authenticate and generate the access tokens required to access available resources

- Retrieve and create Open Finance resources such as single instant payments, confirmation of payee, balances, transactions, insurance quotes, and more


## Prerequisites

Before you begin, make sure you have:

- An approved TPP registered within the **Al Tareq Trust Framework**
- Understanding of the various organizations within the [Al Tareq Trust Framework](../trust-framework/) and their respective roles in enabling Open Finance.
- Basic familiarity with RESTful APIs - [Rest API Beginners Guide | Moesif](https://www.moesif.com/blog/technical/api-development/Rest-API-Tutorial-A-Complete-Beginners-Guide/)
- Basic familiarity with OAuth 2.0 - [OAuth 2.0 Simplified | OAuth.com](https://www.oauth.com/)
- Basic understanding of Mutual TLS (mTLS) & Digital Certificates - [mTLS & Digital Certificates | Cloudflare](https://www.oauth.com/)
- Basic familiarity of JWTs & Key Management (Public/Private Keys) - [JWTs & Key Management | jwt.io](https://jwt.io/introduction)


## What Are Open Finance Resources?

Open Finance APIs allow regulated third parties to access customer-permissioned financial data. These APIs adhere to UAE’s regulatory standards for privacy, security, and interoperability.

Some of the key **resources** available include:

- **Payment Initiation**: Initiate domestic single instant payments, future dated payments, variable and fixed recurring payments. 
- **Accounts and Balances**: Access accounts, real-time balances, beneficiaries and more
- **Transactions**: Generate comprehensive insight through historical transaction data 
- **Customer Identity**: Access assured and verified customer identity information
- **Insurance (future)**: Access insurance quotation and data across Home, Motor, Health, Travel, Renters, Life & Employment.
- **International Payments (future)**: Initiate secure and seamless cross-border payments



All data access is **consent-driven**, ensuring users are always in control. See a more detailed view of the [Open Finance Roadmap](https://openfinanceuae.atlassian.net/wiki/spaces/OF/pages/6259008/Roadmap)

