
🕒 **3 minute read**

# Grant Type - `refresh_token`  

The `refresh_token` grant type is used to obtain a new access token without requiring the user to re-authenticate. It’s typically used after an initial `authorization_code` flow where user consent is long-lived such as for ongoing data sharing or recurring payments. In contrast, for one-off or short-lived consents (e.g. single instant payments), refresh tokens are not issued and therefore cannot be used.

To generate an access token using a `refresh_token`, send the following request to the target LFI:


## <Post/> `/token`


#### Example Request

```bash
curl <token-endpoint> \
  --request POST \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --cert path/to/your-cert.pem \
  --key path/to/your-key.key \
  --data 'grant_type=refresh_token&refresh_token=95c6f05e-a7fc-4cfd-9c52-e091ce24efd7&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&client_assertion=<your-signed-JWT>'
```

#### Endpoint

`token_endpoint` — discovered through the `.well-known` endpoint

#### Certificate & Key

This endpoint uses **mutual TLS (mTLS)** with transport-level certificates.

- `--cert`: Path to your **transport** client certificate (`.pem`)
- `--key`: Path to your **transport** private key (`.key`)

#### Form Parameters

These fields must be sent in the body as `application/x-www-form-urlencoded` key-value pairs.

| Field                   | Description                                                                                   | Example                                                        |
|------------------------|-----------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| `grant_type`            | The type of grant being used. For this flow, it must be `refresh_token`.                     | `refresh_token`                                                |
| `refresh_token`         | The refresh token previously issued to the client.                                           | `95c6f05e-a7fc-4cfd-9c52-e091ce24efd7`                         |
| `client_assertion_type` | A fixed value indicating that the client is authenticating using a JWT.                      | `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`       |
| `client_assertion`      | A signed JWT used to authenticate the client.                                                | `<your-signed-JWT>`                                            |
                               |


[How to prepare your `client_assertion`](../implementation-guides/client-assertion)


#### Response Body

| Field                  | Description                                                                                          | Example                                       |
|------------------------|------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| `access_token`         | The access token issued by the authorization server. Used to authenticate API requests.              | `7c60a2ec-256a-4a82-8e26-12e6a0bd4cab`         |
| `token_type`           | The type of token issued. For most OAuth flows, this is `Bearer`.                                    | `Bearer`                                      |
| `expires_in`           | The lifetime of the access token in seconds.                                                         | `600`                                         |
| `scope`                | The scopes granted by the token, indicating what resources it can access.                            | `accounts openid`                             |
| `state`                |  An opaque value that was originally passed when creating the consent. Used to correlate requests. | `72e9e0cc-8e34-4d30-93da-fa8e43627c99`         |
| `authorization_details`| An array of objects describing specific permissions and parameters of the consent.                                  | *(see below)*                                 |
| `id_token`             | A signed JWT containing user identity claims, typically used in OpenID Connect flows.                | `<your-ID-token-JWT>`                         |

*The `authorization_details` field follows the [OAuth 2.0 Rich Authorization Requests (RAR)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rar) specification. It returns structured information about the consented access — including the permissions and constraints consented to the TPP by the user.*


#### Example Response

```json
{
  "access_token": "81b0acbf-fe28-4542-8400-c38269b7d2xx",
  "expires_in": 600,
  "token_type": "Bearer",
  "scope": "payments openid",
  "state": "6808d82b-53c1-4ce6-9b64-df6a99a355zz",
  "authorization_details": [
    {...}
  ],
  "id_token": "eyJhbGciOiJQUzI1NiIsImtpZCI6IkxTUXhZc0thR2RzMk9lZS1pR01jYmVLd3c0SXplNXo4bG10YWhJMDRHLTQi...REDACTED...ZTg="
}
```
<!-- 
<br>



<OAOperation :spec="spec" operationId="getTokenClientCredentials" />

<br><br>



<script setup  lang="ts">

import { onBeforeMount, onBeforeUnmount } from 'vue'
import { useTheme, generateCodeSample } from 'vitepress-openapi/client'

onBeforeMount(() => {
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
                // ...useTheme().getCodeSamplesAvailableLanguages(),
            ],
            generator: async (lang, request) => {
                if (lang === 'curl') {
                    return editCurlRequest(await generateCodeSample(lang, request))
                }
                else if (lang === 'python') {
                    return editPythonRequest(await generateCodeSample(lang, request))
                }
            },
        },
    })
})

onBeforeUnmount(() => {
    useTheme().reset()
})


function editCurlRequest(requestStr) {
 const certLine = `--cert  path/to/your-cert.pem \  \\\n  --key path/to/your-key.key \ \\`;
  
  // Find the line before --data (we'll insert above that)
  const insertBefore = requestStr.indexOf('--data');

  if (insertBefore === -1) {
    throw new Error('Could not find --data in the curl string');
  }

  // Inject the cert/key lines before --data
  const updatedStr = requestStr.slice(0, insertBefore) +
    certLine + '\n  ' +
    requestStr.slice(insertBefore);

  return updatedStr;
}

function editPythonRequest(requestStr) {
 const insertBefore = requestStr.lastIndexOf(')');

  // Insert the cert argument before the last parenthesis, after a comma
  const certLine = "    cert=('path/to/your-cert.pem', 'path/to/your-key.key')\n";

  // If there's already a trailing comma, just append
  const updatedStr = requestStr.slice(0, insertBefore) +
    certLine +
    requestStr.slice(insertBefore);

  return updatedStr;
}


const spec = `openapi: 3.0.3
info:
  title: OAuth 2.0 Token Endpoint
  version: 1.0.0

paths:
  /token:
    post:
      summary: Get token via Client Credentials Grant
      operationId: getTokenClientCredentials
      requestBody:
        required: true
        content:
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/ClientCredentialsGrant'
      responses:
        '200':
          description: Access token response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TokenResponse'
components:
  schemas:
    ClientCredentialsGrant:
      type: object
      required:
        - grant_type
        - scope
        - client_assertion_type
        - client_assertion
      properties:
        grant_type:
          type: string
          enum: [client_credentials]
          example: client_credentials
        scope:
          type: string
        client_assertion_type:
          type: string
          enum: [urn:ietf:params:oauth:client-assertion-type:jwt-bearer]
          example: urn:ietf:params:oauth:client-assertion-type:jwt-bearer
        client_assertion:
          type: string

    TokenResponse:
      type: object
      properties:
        access_token:
          type: string
        token_type:
          type: string
        expires_in:
          type: integer
        refresh_token:
          type: string
`

</script> -->