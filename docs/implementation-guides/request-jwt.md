---
prev: 
  text: 'Constructing authorization_details'
  link: '/implementation-guides/authorization-details/'

next:
  text: 'Encrypting PII'
  link: '/implementation-guides/encrypting-pii/'
---

🕒 **7 minute read**

# Preparing the Request JWT

To initiate an OAuth authorization request, your application must  first create and sign a Request JWT. This JWT includes key authorization parameters (like scopes, redirect URI, and consent details), and is sent to the Pushed Authorization Request (PAR) endpoint.

## Step 1: Create the JSON Structure

Start by creating a JSON object that includes a header, body (claims), and your signing key in PEM format. Here's the template:

```json

  "header": {
    "alg": "PS256",
    "kid": {{kid-local}}
  }

  "body": {
    "aud": {{issuer}},
    "exp": {{exp}},
    "iss": {{clientId}},
    "client_id": {{clientId}},
    "redirect_uri": {{redirectUrl}},
    "scope": "payments openid", // 'accounts openid'
    "state": {{$guid}},
    "nonce": {{$guid}},
    "response_type": "code",
    "nbf": {{nbf}},
    "code_challenge": {{code-challenge}},
    "code_challenge_method": "S256",
    "max_age": 3600,
    "authorization_details": {{authorization_details}}
  }

  "signingKeyPEM": {{pem-local}}
```

#### JWT Body:


| Claim                  | Description                                                                                     | Example                     |
|------------------------|-------------------------------------------------------------------------------------------------|-----------------------------|
| `aud`                  | The audience the JWT is intended for - the `issuer` located from the `.well-known` endpoint during [API Discovery](/getting-started/api-discovery)                                                   | `https://auth1.[LFICode].apihub.openfinance.ae` |
| `exp`                  | Expiry time of the JWT (as a UNIX timestamp). Should be shortly after `nbf` (e.g. 5 minutes).                                                        | `1713196423`                |
| `iss`                  | Your application's Client Id from the **AlTareq trust framework**.                                                    | `your-client-id`            |
| `client_id`            | Your application's Client Id from the **AlTareq trust framework**.                                                      | `your-client-id`            |
| `redirect_uri`         | Callback URI where the user redirects o after auth at the LFI                                                        | `https://yourapp.com/callback`    |
| `scope`                | Space-separated scopes for the request                                                          | `payments openid`           |
| `state` / `nonce`      | GUIDs to prevent replay and CSRF attacks                                                        | `a1b2c3...`                  |
| `response_type`        | Expected response from the AS                                                                   | `code`                      |
| `code_challenge`       | PKCE challenge                                                                                  | `xyz123abc...`              |
| `code_challenge_method`| PKCE method used (only `S256` supported)                                                        | `S256`                      |
| `max_age`              | Max age for the user's authentication session (in seconds) **capped at 3600**                                      | `3600`                      |
| `authorization_details`| Object describing exactly what the user has consented to.                          | `[{...}]`                     |




#### JWT header:


| Field   | Description                                                                                       | Example                                   |
|---------|---------------------------------------------------------------------------------------------------|-------------------------------------------|
| `alg`   | The algorithm used to sign the JWT.                                                               | `PS256`                                   |
| `kid`   | The key ID corresponding to the **signing key** (found within the **AlTareq trust framework**) used to verify the JWT signature.                      | `123e4567-e89b-12d3-a456-426614174000`     |


#### Signing the JWT:

| Field             | Description                                                                                      | Example                                  |
|------------------|--------------------------------------------------------------------------------------------------|------------------------------------------|
| `signingKeyPEM`  | The **signing key** (in PEM format) used to cryptographically sign the JWT.                      | `-----BEGIN PRIVATE KEY-----\nMIIEvQ...` |


**Ensure all white space including linebreaks have been removed from the `signingKeyPEM`**  



## Step 2: Convert to a Signed JWT
Once the structure is prepared, use a JWT library in your preferred language to sign the token.

Example using Node.js and jose

```js
import { SignJWT } from 'jose';
import { importPKCS8 } from 'jose';
import { v4 as uuidv4 } from 'uuid';

const alg = 'PS256';
const clientId = '{{_clientId}}';
const issuer = '{{issuer}}';
const now = Math.floor(Date.now() / 1000);
const privateKeyPEM = `{{pem-local}}`;


const codeVerifier = uuidv4() + uuidv4();

const hashedCodeVerifier = CryptoJS.SHA256(codeVerifier);
let codeChallenge = CryptoJS.enc.Base64.stringify(hashedCodeVerifier);


codeChallenge = codeChallenge.replaceAll('+', '-');
codeChallenge = codeChallenge.replaceAll('/', '_');
if (codeChallenge.endsWith('=')) { codeChallenge = codeChallenge.substring(0, codeChallenge.length - 1) }


const key = await importPKCS8(privateKeyPEM, alg);

const jwt = await new SignJWT({
  nbf: now,
  scope: 'payments openid', // 'accounts openid'
  redirect_uri: '{{redirectUrl}}',
  client_id: CONFIG.CLIENT_ID,
  nonce: uuidv4(),
  state: uuidv4(),
  response_type: 'code',
  code_challenge_method: 'S256',
  code_challenge: codeChallenge,
  max_age: 3600,
  authorization_details: [{
      // add consent data here
    }
  ],
})
.setProtectedHeader({ alg, kid: '{{kid-local}}' })
.setIssuer(clientId)
.setAudience(issuer)
.setExpirationTime(now + 300)
.sign(key);

console.log(jwt);
```
