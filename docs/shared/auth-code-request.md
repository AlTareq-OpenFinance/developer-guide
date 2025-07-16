
## <Post/> `/token`

#### Example Request

```bash
curl <token-endpoint> \
  --request POST \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --cert path/to/your-cert.pem \
  --key path/to/your-key.key \
  --data 'grant_type=authorization_code&code=<auth-code>&redirect_uri=<your-redirect-uri>&code_verifier=<your-code-verifier>&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&client_assertion=<your-signed-JWT>'
```

#### Endpoint
`token_endpoint` — discovered through the `.well-known` endpoint

#### Certificate & Key

This endpoint uses **mutual TLS (mTLS)** with transport-level certificates.

- `--cert`: Path to your **transport** client certificate (`.pem`)
- `--key`: Path to your **transport** private key (`.key`)



#### Form Parameters
These fields must be sent in the body as `application/x-www-form-urlencoded` key-value pairs.

| Field                  | Description                                                                                      | Example                                                        |
|-----------------------|--------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| `grant_type`          | The OAuth 2.0 grant type. For this flow, it must be `authorization_code`.                        | `authorization_code`                                           |
| `code`                | The authorization code received from the authorization server after user consent.               | `<auth-code>`                                                  |
| `redirect_uri`        | The redirect URI used in the original authorization request. Must match exactly.                 | `https://your.app/callback`                                    |
| `code_verifier`       | The original `code_verifier` used in the PKCE challenge during the authorization request.        | `<your-code-verifier>`                                         |
| `client_assertion_type` | A fixed value indicating that the client is authenticating using a JWT.                         | `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`       |
| `client_assertion`    | A signed JWT created by your app using its private key. Proves your app’s identity securely.     | `<your-signed-JWT>`                                            |


[How to prepare your `client_assertion`](../implementation-guides/client-assertion)


#### Response Body

| Field                   | Description                                                                                          | Example                                       |
|------------------------|------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| `access_token`         | The access token issued by the authorization server. Used to authenticate API requests.              | `7c60a2ec-256a-4a82-8e26-12e6a0bd4cab`         |
| `token_type`           | The type of token issued. For most OAuth flows, this is `Bearer`.                                    | `Bearer`                                      |
| `expires_in`           | The lifetime of the access token in seconds.                                                         | `600`                                         |
| `scope`                | The scopes granted by the token, indicating what resources it can access.                            | `accounts openid`                             |
| `state`                | An opaque value that was originally passed when creating the consent. Used to correlate requests.     | `72e9e0cc-8e34-4d30-93da-fa8e43627c99`         |
| `authorization_details`| An array of objects describing specific permissions and parameters of the consent.                    | *(see below)*                                 |
| `id_token`             | A signed JWT containing user identity claims, typically used in OpenID Connect flows.                | `<your-ID-token-JWT>`                         |
| `refresh_token`        | A token used to obtain a new access token without requiring user re-authentication.                   <br>**Only issued for long-lived consents.**   | `f0bbaf4f-f415-4998-b3a7-50b6b8bd7d37`         |


*The `authorization_details` field follows the [OAuth 2.0 Rich Authorization Requests (RAR)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rar) specification. It returns structured information about the consented access — including the permissions and constraints consented to the TPP by the user.*

#### Example Response

```json
{
  "access_token": "81b0acbf-fe28-4542-8400-c38269b7d2xx",
  "expires_in": 600,
  "token_type": "Bearer",
  "scope": "accounts openid",
  "state": "6808d82b-53c1-4ce6-9b64-df6a99a355zz",
  "authorization_details": [
    {...}
  ],
  "refresh_token": "f0bbaf4f-f415-4998-b3a7-50b6b8bd7dxx",
  "id_token": "eyJhbGciOiJQUzI1NiIsImtpZCI6IkxTUXhZc0thR2RzMk9lZS1pR01jYmVLd3c0SXplNXo4bG10YWhJMDRHLTQi...REDACTED...ZTg="
}
```