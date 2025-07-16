# Platform Overview

Welcome to the UAE Open Finance Developer Hub. This space provides a technical overview of the AlTareq Open Finance platform, helping you understand the components, integration flow, and tools you'll need to launch financial solutions in the UAE.

## What is the UAE Open Finance Platform?

Our platform provides a unified API layer that enables secure, consent-driven access to banking, insurance and FX data and services across the UAE, in compliance with local regulations issued by the Central Bank of the UAE.

Built for developers, our platform simplifies the complexity of diverse Licensed Financial Institution's (LFI) APIs by unifying them into a single, standardized interface—enabling quick integration across the UAE, letting you focus on building innovative financial products and experiences.
<!-- 
## Core Capabilities

Our platform supports a wide range of Open Finance use cases, giving you standardized access to banking and insurance data, as well as secure service initiation capabilities.


**Personal Financial Management** - Access balance and transaction data for budgeting and financial insights.
**Business Financial Management** - Enable real-time cash flow views and automate accounting tasks for SMEs.
**Confirmation of Payee** - Verify recipient details to reduce fraud and ensure accurate payments.
**Banking Metadata** - Access detailed account data like overdrafts and direct debits for transparency.
**Corporate Treasury Data** - Aggregate treasury data for improved liquidity and cash management.
**Payments (Single, Future, International)** - Initiate direct, scheduled, and cross-border payments.
**Recurring Payments** - Enable fixed/variable recurring payments with user consent.
**Bulk Payments** - Support real-time, high-volume payments for corporates.
**Insurance Data Access** - Retrieve insurance policies and claims data for streamlined onboarding.
**Insurance Quote Requests** - Request personalized insurance quotes using customer profile data. -->


All capabilities are powered by a single API layer—built with developer efficiency, security, and compliance at the core.


## Platform Architecture

At the core of the system is the **Directory**, known as the [AlTareq Trust Framework](../trust-framework/). It acts as the **single source of truth** for all authorized participants, defining their roles and scopes of access within the ecosystem. All API Discovery and Certificate issuance and validation is done through the Trust Framwork.

Additionally, taking a step further than many global models, the UAE has introduced a Centralized API Hub at the core of its Open Finance infrastructure. Your application will communicate directly with this API Hub, which in turn will handle interactions with the relevant Licensed Financial Institutions (LFIs). This centralized approach ensures consistency across key areas:

- Digital user consent and consent management
- Access and refresh token management
- Enforced API schemas for resource endpoints


#### Architecture Diagram

```txt
+======================================================================+
|                  AlTareq Trust Framework (Directory)                 |
|----------------------------------------------------------------------|
|                                                                      |
|                      +-------------------------+                     |
|                      |    Your Application     |                     |
|                      +------------+------------+                     |
|                                   |                                  |
|                 +-----------------+-----------------+                |
|                 |                 |                 |                |
|             +---v---+         +---v---+         +---v---+            |
|             |API Hub|         |API Hub|   ...   |API Hub|            |
|             +-------+         +-------+         +-------+            |
|                 |                 |                 |                |
|                 |                 |                 |                |
|             +---v---+         +---v---+         +---v---+            |
|             | LFI 1 |         | LFI 2 |   ...   | LFI N |            |
|             +-------+         +-------+         +-------+            |
|                                                                      |
|                                                                      |
+======================================================================+
```

