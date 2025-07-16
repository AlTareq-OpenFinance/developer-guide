---
prev:
  text: 'Authorization Request'
  link: '/getting-started/authorization-request/'

next: false
---


🕒 **6 minute read**

# Getting Started - Authorization Callback

An authorization callback is a crucial step in the OAuth 2.0 flow, occurring after the user grants or denies access through their LFI (Local Financial Institution). The user is redirected back to your application, and the callback URL contains important parameters necessary for continuing the authentication process.

The callback URL includes:

- `iss` (issuer): The LFI from which the user was redirected.

- `state`: The value passed in the original request, helping you associate the callback with the corresponding authorization request.

- `code`: Returned when the user successfully authorizes, which can be exchanged for an access token.

- Error information: Returned if the user cancels the authorization or an error occurs during the process.


**Example of a successful callback:**

https://yourapp.com/callback?code=fbe03604-baf2-4220-b7dd-05b14de19e5c&state=d2fe5e2c-77cd-4788-b0ef-7cf0fc8a3e54&iss=https://auth1.altareq1.sandbox.apihub.openfinance.ae


**Example of a failed callback:**

https://yourapp.com/callback?error=access_denied&error_description=The%20user%20cancelled%20the%20transaction%20or%20failed%20to%20login&state=c3f5c85e-83a7-4478-bab2-ec789311d48c&iss=https://auth1.altareq1.sandbox.apihub.openfinance.ae



## Good Practices for handling Authorization Callbacks

#### Always Validate the `state` Parameter
Confirm that the state value returned in the callback matches the one you originally sent. This helps protect against CSRF (Cross-Site Request Forgery) attacks.

#### Verify the `iss` (Issuer)
Check that the iss value matches the expected LFI. This ensures the response comes from a trusted source.

#### Time-Limit Callback Validity
Don’t accept stale or replayed callbacks — ensure codes are exchanged quickly and are used only once.

#### Keep Callback Logic Minimal
When handling the callback, execute only the minimum necessary logic—such as exchanging the code for a token or showing an error to the user. Avoid performing complex business logic or initiating other sensitive operations at this stage.


## Exchanging the Authorization Code for Tokens

Once the authorization code is received, it can be exchanged for an access token (and a refresh token for long-lived consents) by making a request to the token endpoint using the [ `authorization_code` grant type ](./authorization-code.md).

If the request is successful, you will receive:
- An access token
- A refresh token (for long-lived consent)
- An ID token
- The consent details that were used in the [ Authorization Request ](/getting-started/authorization-request)


<<SectionAuthCodeRequest />