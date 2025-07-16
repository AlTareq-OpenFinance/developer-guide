
🕒 **3 minute read**

# Grant Type - `client_credentials` 

The `client_credentials` grant type is used for machine-to-machine (M2M) communication, where **no customer consent is involved**. It’s used for system-level access, like calling non-user-specific APIs an example of this is for the Products Data within Bank Data Sharing.

To generate a `client_credentials` access token,  send the following request to the target LFI:


## <Post/> `/token`

#### Example Request

```bash
curl <token-endpoint> \
  --request POST \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --cert path/to/your-cert.pem \
  --key path/to/your-key.key \
  --data 'grant_type=client_credentials&scope=accounts payments products&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&client_assertion=<your-signed-JWT>'"
```

#### Endpoint

`token_endpoint` — discovered through the `.well-known` endpoint

#### Certificate & Key

This endpoint uses **mutual TLS (mTLS)** with transport-level certificates.

- `--cert`: Path to your **transport** client certificate (`.pem`)
- `--key`: Path to your **transport** private key (`.key`)


#### Form Parameters

These fields must be sent in the body as `application/x-www-form-urlencoded` key-value pairs.

| Field                 | Description                                                                                   | Example                                                        |
|----------------------|-----------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| `grant_type`          | The OAuth 2.0 grant type. For this flow, it must be `client_credentials`.                    | `client_credentials`                                           |
| `scope`               | Space-separated scopes your application is requesting. Defines access permissions.           | `openid payments`                                              |
| `client_assertion_type` | A fixed value indicating that the client is authenticating using a JWT.                     | `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`       |
| `client_assertion`    | A signed JWT created by your app using its private key. Proves your app’s identity securely. | `<your-signed-JWT>`                                            |

[How to prepare your `client_assertion`](../implementation-guides/client-assertion)




#### Response Body

| Field         | Description                                                                 | Example                                      |
|--------------|-----------------------------------------------------------------------------|----------------------------------------------|
| `access_token` | The access token issued by the authorization server. Used to authenticate API requests. | `f6892840-307f-49f7-ace9-5435eb600e65`       |
| `token_type`   | The type of token issued. For most OAuth flows, this is `Bearer`.          | `Bearer`                                     |
| `expires_in`   | The lifetime of the access token in seconds.                              | `600`                                        |
| `scope`        | The scopes granted by the token, indicating what resources it can access. | `payments`                 |


#### Example Response

```json
{
  "access_token": "81b0acbf-fe28-4542-8400-c38269b7d2xx",
  "expires_in": 600,
  "token_type": "Bearer",
  "scope": "payments",
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