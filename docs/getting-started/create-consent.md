---
prev:
  text: 'Register your Application'
  link: '/getting-started/tpp-onboarding/'

next:
  text: 'Authorization Request'
  link: '/getting-started/authorization-request/'
---

🕒 **10 minute read**

# Capturing and Digitizing User Consent

In Open Banking, consent is the explicit permission a user gives to a Third Party Provider (TPP) to access their financial data or initiate actions—such as payments—on their behalf. This consent is a legal and technical requirement, ensuring that users remain in control of their data and how it's used.

As a TPP, you must first capture consent through a user-facing experience that clearly explains what access is being requested. This must align with regulatory standards. Once captured, this consent is digitized into a structured JSON object and submitted to the user’s bank (or LFI) as part of the authorization flow.

## User Interface Requirements

Before making any technical calls, TPPs must first present the user with a clear and compliant UI that captures their consent. This screen must be designed in line with the User Experience Principles, which are tightly managed to ensure clarity, trust, and transparency. As part of these principles:



The screen must include the following key elements:

- **Purpose Clarity** Clearly state why data or actions are being requested (e.g., account aggregation, initiating a payment).

- **Granular Permissions** Present a detailed view of the specific access scopes being requested (e.g., balances, transactions, scheduled payments), allowing users to make informed decisions.

- **On-Behalf-Of Disclosures** The trading/brand name and logo must be clearly visible on the Consent screen.

- **Duration of Access** Let users know how long their consent will remain valid.

- **Withdrawal Notice** Clearly inform users that they can revoke access at any time.


#### Example

<img style="max-width: 300px; margin: 20px;" src="/images/standards/bds-consent.png" alt="Bank Data Consent Capture" />

For additional use cases and examples of the Consent screen, please <ConfluenceLinks group='general' />

## Digitizing User Consent

Once user consent is captured, that consent must be turned into a structured JSON object so it can be securely processed by the LFI. This structured object is the **`authorization_details`** claim.


 `authorization_details` is a JSON object defined by the [OAuth 2.0 Rich Authorization Requests (RAR)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rar) specification. `authorization_details` defines the precise permissions your application is requesting—matching exactly what the user has consented to. 



<details>
<summary>Example Single Instant Payment</summary>

<JSONSIPAuthDetails />
</details>


<details>
<summary>Example Bank Data Sharing</summary>
  <JSONBankDataAuthDetails />
</details>


<details>
<summary>Example Single Future Date Payment</summary>
  <JSONSFPAuthDetails />
</details>

<details>
<summary>Example Multi Payment - Variable On Demand</summary>
 <JSONVarONDemandAuthDetails />
</details>

<details>
<summary>Example Multi Payment - Delegated SCA</summary>
  <JSONDDScaAuthDetails />
</details>

Once this is constructed, it’s inserted into the Request JWT, signed using your private key, and sent to the PAR endpoint to initiate the OAuth authorization flow.

[Constructing `authorization_details` for Your Use Case](../implementation-guides/authorization-details)