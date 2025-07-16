---
prev:
  text: 'Register your Application'
  link: '/getting-started/tpp-onboarding/'

next:
  text: 'Authorization Request'
  link: '/getting-started/authorization-request/'
---

🕒 **12 minute read**

# Getting Started - Authentication

This guide walks you through the key concepts and requirements for obtaining access and interacting with the data sharing and service initiation resources. By the end, you should understand how to request access tokens using the appropriate OAuth 2.0 grant types, and access the API resources.

For consented data, you will be using the **`refresh_token`** and **`authorization_code`** grant types. It’s important to note that you need both a valid **access token** and the **consent to be in a `authorized` state** in order to access the resources.

As a TPP, it is not only a legal obligation to maintain an up-to-date record of the consent object, reflecting the permissions the user has granted to your app, but it is also crucial for ensuring uninterrupted access to resources without errors.



## Prerequisites

Before you begin, make sure you have:

- Basic familiarity with RESTful APIs - [Rest API Beginners Guide | Moesif](https://www.moesif.com/blog/technical/api-development/Rest-API-Tutorial-A-Complete-Beginners-Guide/)
- Basic familiarity with OAuth 2.0 - [OAuth 2.0 Simplified | OAuth.com](https://www.oauth.com/)


## Authentication Flow Diagram

```txt
+======================================================================+
|                    Authentication Flow (Happy Path)                  |
|----------------------------------------------------------------------|
|                                                                      |
|                      +-----------TPP-----------+                     |
|                      |     Capture Consent     |                     |
|                      +------------+------------+                     |
|                                   |                                  |
|                                   v                                  |
|                      +-----------TPP-----------+                     |
|                      |   Create Authorization  |                     |
|                      |         Request         |                     |
|                      +------------+------------+                     |
|                                   |                                  |
|                   Redirect User to LFI Auth Code URL                 |
|                                   v                                  |
|                      +-----------LFI-----------+                     |
|                      |    Authenticates User   |                     |
|                      |          (SCA)          |                     |
|                      +------------+------------+                     |
|                                   |                                  |
|                                   v                                  |
|                      +-----------LFI-----------+                     |
|                      |      Collects User      |                     |
|                      |      Authorization      |                     |
|                      +------------+------------+                     |
|                                   |                                  |
|                    Redirect User to TPP Redirect URL                 |
|                                   v                                  |
|                      +-----------TPP-----------+                     |
|                      |       Handles the       |                     |
|                      |      Auth Callback      |                     |
|                      +------------+------------+                     |
|                                   |                                  |
|                                   v                                  |
|                      +-----------TPP-----------+                     |
|                      |     Requests Tokens     |                     |
|                      +------------+------------+                     |
|                                                                      |
+======================================================================+
```


## Consent
Consent is central to Open Finance. It refers to the explicit permission given by the user for your application to access data or initiate services on their behalf. 

#### Capturing and Digitizing Consent
Before initiating any authorization, your application mpresent the user with a clear and compliant UI that captures their consent. This screen must be designed in line with the User Experience Principles, which are tightly managed to ensure clarity, trust, and transparency. 

Once user consent is captured, that consent must be turned into a structured JSON object so it can be securely processed by the LFI. This structured object is the **`authorization_details`** claim.

#### Maintaining the Consent Object
After the consent has been sent to the LFI for authorization, it is the TPP’s responsibility to ensure that the consent object they retain accurately reflects the user’s real-time consent. This includes tracking any status updates (e.g. authorized, revoked, expired) and syncing any user-driven changes with the Open Finance platform.

Note: Access to resources requires both a valid access token and a Consent object in the authorized state.


## Authorization

Once consent has been captured and digitized, the next step is to initiate the authorization flow. This converts the user’s intent into a technical authorization flow.

#### Creating the Authorization Request
To begin authorization:

- **Construct a request JWT** that includes the `authorization_details` aswell as other the paramters such as your Client Id and Redirect URI.
- Send the request to the LFI’s `PAR` (Pushed Authorization Request) endpoint
- Receive a `request_uri` which you use to build the authorization URL

#### Handling the Authorization Callback

After the user approves or denies access, the LFI redirects them back to your application using the `redirect_uri` you provided. This redirect includes:

- The `state` value for validation and correlation.

- The `iss` (issuer) to identify the responding LFI.

Either an authorization code (if successful) or error details (if the request was denied or failed).

## Access Tokens

An access token is a critical element in the authentication and authorization process. It serves as a digital key, allowing your application to securely access the resources and services within the ecosystem.

Access tokens are issued by the Authorization Server after successful registration and authentication. These tokens are time-limited and represent the permissions granted to your application, specifying what actions it can perform and which resources it can access.


#### An Example Resource

As you explore the Open Finance standards, you’ll notice that every endpoint requires a valid access token to be included in the Authorization header of each request.

<img src="/images/standards/get-accounts.png" />

Access tokens are obtained using standardized OAuth 2.0 grant types, each tailored to specific use cases—ranging from system-to-system communication to user-authorized actions and seamless token renewal. The three primary grant types supported are: `client_credentials`, `authorization_code`, and `refresh_token`. By this point, you should know from [API Discovery](/getting-started/api-discovery) which grant type is required for each endpoint.

#### [`client_credentials`](./client-credentials)

The `client_credentials` grant is suited for server-to-server communication where no user interaction is involved. It’s typically used for accessing non-user-specific or system-level APIs, such as retrieving product or service metadata.

#### [`authorization_code`](./authorization-code)

The `authorization_code` grant requires user authentication and explicit consent, making it appropriate for accessing or performing actions on behalf of a user—such as viewing account balances or initiating a payment.

#### [`refresh_token`](./refresh-token)

The `refresh_token` grant allows applications to request a new access token without requiring the user to re-authenticate. It’s commonly used in scenarios involving long-lived user consent, such as recurring payments or continuous data access.


