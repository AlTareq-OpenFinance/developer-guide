
🕒 **5 minute read**

# Getting Started - Authorization Request

An **authorization request** is the first step in obtaining user consented access to protected resources. It initiates the OAuth 2.0 flow by directing the user to authenticate with their LFI and approve the permissions your application is requesting.

The request must be carefully assembled and securely signed, including details such as the requested scopes, consent parameters, and redirect URI. This payload is then submitted to the Authorization Server via the Pushed Authorization Request - `PAR endpoint`. If successful, the server responds with a unique redirect URL, which your application uses to guide the user to the authorization screens.


## Prerequisites

Before you begin, make sure you have:

- Generated client signing certificates - [AlTareq TrustFramework Certificates](../trust-framework/certificates)
- Prepared your `client_assertion` JWT - [How to - Prepare your `client_assertion`](../implementation-guides/client-assertion)
- Correctly constructed `authorization_details` - [How to - Construct `authorization_details` for your use case](../implementation-guides/authorization-details)
- Prepared the Request JWT containing the `authorization_details` - [How to - Prepare request JWT](../implementation-guides/request-jwt)



## Submit to PAR Endpoint

With the prerequisites complete, you should now have two signed JWTs ready for use:

`client_assertion`: Authenticates your client to the Authorization Server

`request`: Contains the full authorization request payload, including redirect URI, scope, state, and `authorization_details`

These two JWTs are now used to initiate the authorization flow via the `pushed_authorization_request_endpoint` (PAR) endpoint provided by the LFI. This is done with the following request:


## <Post /> `/par`

```bash
curl <par-endpoint> \
  --request POST \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --cert path/to/your-cert.pem \
  --key path/to/your-key.key \
  --data 'client_id=<your-client-id>&request=<request-JWT>&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&client_assertion=<client-assertion-JWT>'
```

#### Endpoint

`pushed_authorization_request_endpoint` — discovered through the `.well-known` endpoint

#### Certificate & Key

This endpoint uses **mutual TLS (mTLS)** with transport-level certificates.

- `--cert`: Path to your **transport** client certificate (`.pem`)
- `--key`: Path to your **transport** private key (`.key`)


#### Form Parameters

These fields must be sent in the body as `application/x-www-form-urlencoded` key-value pairs.


| Field                   | Description                                                                                   | Example                                                        |
|------------------------|-----------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| `client_id`             | Your application's Client Id from the **AlTareq trust framework**.                                                                    | `client_id`                                                 |
| `request`               | The signed request object (a JWT containing authorization parameters).                        | `<request-JWT>`                                        |
| `client_assertion_type` | A fixed value for JWT-based client authentication.                                            | `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`       |
| `client_assertion`      | The signed JWT used to authenticate the client.                                               | `<client-assertion-JWT>`                                            |


#### Response Body

| Field         | Description                                                                                       | Example                                                               |
|---------------|---------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| `request_uri` | A unique identifier representing the pushed authorization request. Used in the `/authorize` call. | `urn:ietf:params:oauth:request_uri:27c11b2e-2095-498a-96da-11f62f351f6f` |
| `expires_in`  | Lifetime in seconds for which the `request_uri` is valid. Typically 600 (10 minutes).             | `600`                                                                 |

#### Example Response

```json
{
  "request_uri": "urn:ietf:params:oauth:request_uri:27c11b2e-2095-498a-96da-11f62f351f6f",
  "expires_in": 600
}
```

## Constructing the Auth Url

Once you receive a successful response from the PAR endpoint, you will be provided with a `request_uri`. This `request_uri` is a reference to the request payload you submitted and must now be included in the URL used to initiate the authorization flow at the LFI.

You construct the Authorization URL as follows:

```js
const authCodeUrl = `<authorization_endpoint>?client_id=<client_id>&response_type=code&scope=openid&request_uri=<par-response.request_uri>`;
```

#### authorization_endpoint

`authorization_endpoint` — discovered through the `.well-known` endpoint

#### Parameters

| Parameter       | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `client_id`     | Your registered client ID with the LFI.                                     |
| `response_type` | Set to `code` to indicate you're using the Authorization Code flow.         |
| `scope`         | At a minimum, must include `openid`. Additional scopes may be required.     |
| `request_uri`   | The value received from the PAR response — a reference to your request JWT. |

All that remains is to **redirect the user to the constructed Authorization URL**. Once redirected:

- The user will authenticate with the LFI (e.g., completing Stong Customer Authentication to log into their account).
- They will review and approve the permissions defined in `authorization_details`.
- Upon approval, the LFI will redirect the user back to your registered `redirect_uri`, with an `authorization-code` — authorization callback.