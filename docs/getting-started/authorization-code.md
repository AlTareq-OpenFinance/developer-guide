---
prev:
  text: 'Register your Application'
  link: '/getting-started/tpp-onboarding/'

next:
  text: 'Authorization Request'
  link: '/getting-started/authorization-request/'
---

🕒 **4 minute read**

# Grant Type - `authorization_code` 

The `authorization_code` grant type is used when a user must authenticate and explicitly consent to allow a Third-Party Provider (TPP) to access their data or act on their behalf. Common use cases include retrieving banking/insurance data—such as accounts/policies, or initiating a payment after the user has authorized the action through their Licensed Financial Institution (LFI).

## Prerequiusts
Before you begin, make sure you have:

- An understanding of how to capture consent and create an Open Finance [Digital Consent Object](./create-consent)
- An understanding of how to initiate an [Authorization Request](./authorization-request)
- An understanding of how to handle an [Authorization Callback](./authorization-callback)

## When it's used

This request is made after the user successfully authenticates and authorizes access through the OAuth flow. Once the TPP receives the authorization code via the redirect URI (OAuth callback), it exchanges that code to obtain an access token by sending the following request to the target LFI:

<SectionAuthCodeRequest />