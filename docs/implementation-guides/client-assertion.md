---
prev: false

next:
  text: 'Constructing authorization_details'
  link: '/implementation-guides/authorization-details/'
---

🕒 **7 minute read**

# Preparing Your Client Assertion

A client assertion is a structured JSON object that is transformed into a signed **signed JWT (JSON Web Token)** using your **private signing key**.

## Step 1: Create the JSON Structure

Start by creating a JSON object that includes a header, body (claims), and your signing key in PEM format. Here's the template:

```json
{
  "header": {
    "alg": "PS256",
    "kid": {{kid-local}}
  },
  "body": {
    "aud": {{issuer}},
    "exp": {{exp}},
    "iss": {{clientId}},
    "sub": {{clientId}},
    "jti": {{$guid}},
    "iat": {{nbf}}
  },
  "signingKeyPEM": {{pem-local}}
}
```



#### JWT Body:

| Claim     | Description                                                                                      | Example                                   |
|-----------|--------------------------------------------------------------------------------------------------|-------------------------------------------|
| `aud`     | The audience the JWT is intended for - the `issuer` located from the `.well-known` endpoint during [API Discovery](/getting-started/api-discovery)            | `https://auth1.[LFICode].apihub.openfinance.ae`         |
| `exp`     | Expiry time of the JWT (as a UNIX timestamp). Should be shortly after `iat` (e.g. 5 minutes).     | `1713196423`                              |
| `iss`     | Your application's Client Id from the **AlTareq trust framework**. `client_id`.              | `your-client-id`                          |
| `sub`     | Your application's Client Id from the **AlTareq trust framework**. `client_id`.  `iss`.                                              | `your-client-id`                          |
| `jti`     | A unique identifier for this JWT. Used to prevent replay attacks.                                | `a7b2c190-ef13-4c1b-9d1e-2c7d79e89f54`     |
| `iat`     | Time the JWT was issued (as UNIX timestamp).                                                     | `1713196123`                              |


Where to find your Client Id:
<img src="../public/images/demo/client-id.png" alt="Client Id" />




#### JWT header:


| Field   | Description                                                                                       | Example                                   |
|---------|---------------------------------------------------------------------------------------------------|-------------------------------------------|
| `alg`   | The algorithm used to sign the JWT.                                                               | `PS256`                                   |
| `kid`   | The key ID corresponding to the **signing key** (found within the **AlTareq trust framework**) used to verify the JWT signature.                      | `123e4567-e89b-12d3-a456-426614174000`     |


Where to find your Key Id:
<img src="../public/images/demo/client-id.png" alt="Client Id" />


#### Signing the JWT:

| Field             | Description                                                                                      | Example                                  |
|------------------|--------------------------------------------------------------------------------------------------|------------------------------------------|
| `signingKeyPEM`  | The **signing key** (in PEM format) used to cryptographically sign the JWT.                      | `-----BEGIN PRIVATE KEY-----\nMIIEvQ...` |


**Ensure all white space including linebreaks have been removed from the `signingKeyPEM`**  

How to download your Signing Key:
<img src="../public/images/demo/signing-key.png" alt="Client Id" />



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
const jwtId = uuidv4();
const privateKeyPEM = `{{pem-local}}`;

const key = await importPKCS8(privateKeyPEM, alg);

const jwt = await new SignJWT({})
  .setProtectedHeader({ alg, kid: '{{kid-local}}' })
  .setIssuer(clientId)
  .setSubject(clientId)
  .setAudience(issuer)
  .setIssuedAt(now)
  .setExpirationTime(now + 300) // 5 minutes
  .setJti(jwtId)
  .sign(key);

console.log(jwt);
```
