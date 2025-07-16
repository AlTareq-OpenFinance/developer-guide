---
aside: false
outline: false

prev:
  text: 'Preparing Request JWT'
  link: '/implementation-guides/request-jwt/'

next: false
---

🕒 **15 minute read**

# Encrypting Personal Identifiable Information

You may have noticed that within the `authorization_details` of a payment consent — whether for a Single Payment or a Multi Payment — of type urn:openfinanceuae:service-initiation-consent:v1.2, there is a field called consent.PersonalIdentifiableInformation. This field contains a JWE (JSON Web Encryption) token that securely encapsulates the personal and account details of both the creditor (payee) and the debtor (payer). It is within this field that the TPP (Third Party Provider) specifies the account information.
This page outlines how to construct the JWE for various use cases.

**Note:** The encryption of the PII object into a JWE is required not only during the creation of the payment consent, but also when submitting the post-payment request.

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
    "iat": {{nbf}},
    "Initiation": {...},
    "Risk": {...}
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
 `Initiation`     | Initiation is used to define the debtor account and the creditor account. |  `{...}`  |
 | `Risk`     | The Risk object is used to specify additional details for risk/fraud scoring regarding Payments.  |  `{...}`  |


 ## Initation object 

The `initiation` object consists of two nested components:

- **`DebtorAccount`**  
  An object representing the payer's account. This is specified when account selection occurs on the TPP side and is then passed into the LFI.

- **`Creditor`**  
  An array of objects that define the payee(s)—i.e., the possible recipients of the payment.


#### Requirements on `DebtorAccount`

The `DebtorAccount` object is **optional** for the TPP to provide. It is used when account selection is performed on the TPP side, and the TPP wants to explicitly specify the account to be used for the payment—i.e., no account selection should occur on the LFI side.

The `DebtorAccount` object is **only used when setting up the payment consent (`POST /par`)** and is **not used at the time of creating the payment (`POST /payments`)**.

**Example:**

```json
 "DebtorAccount": {
     "SchemeName": "IBAN",
     "Identification": "10000109010102",
     "Name": {
         "en": "Luigi International"
     }
 },
```

**Description:**

| Field   | Type                                                                                       | Example                                   |
|---------|---------------------------------------------------------------------------------------------------|-------------------------------------------|
| `SchemeName*`   | `enum`                                                               | Allowed:   IBAN                                  |
| `Identification*`   | `string`                      | `10000109010102`     |
| `Name.en`   | `string`                      | `Omar Ali`     |
| `Name.ar`   | `string`                      | `عمر علي`     |


#### Requirements on `Creditor`

  Unlike the debtor, the requirements for the `Creditor` vary depending on the use case of the underlying payment consent. Each object within the `Creditor` array contains the following components:
    - `CreditorAccount`: 
Unambiguous identification of the creditor's account that will receive the credit entry.
  - `Creditor`: Provides details of the entity to which the payment will be credited (e.g. Name, Address).
  - `CreditorAgent`: 
Identifies the financial institution of the creditor. This field is populated when necessary to ensure proper payment routing.

  The `Creditor` array is **used both when setting up the payment consent (`POST /par`)** and **at the time of creating the payment (`POST /payments`)**.

  **Requirements at the time of setting up the payment consent**

| Use Case   | Creditor Array Length                                                                                       | CreditorAccount                                   | Creditor | CreditorAgent |
|------------|-----------------------------------------------------------------------------------------------------------|---------------------------------------------|------------------|----------------|
| Single Payment (SIP , SFP)  | 1                                                                                    | SchemeName*, Identification* (IBAN) and Name are required                              | Name is required         | Optional required for payment to be routed correctly.         |
| Multi-Payments *Single Payee*  | 1                                                                                             | SchemeName*, Identification* (IBAN) and Name are required                              | Name is required         | Optional required for payment to be routed correctly.         |
| Multi-Payments *Defined Payees* (IAVDB)  | Between 1 - 50 objects                                                                          | SchemeName*, Identification* (IBAN) and Name are required for each Creditor object                              | Name is required for each Creditor object             | Optional required for payment to be routed correctly for each Creditor object         |
| Multi-Payments *Variable Payees* (EAVB)  | Must **NOT** be included                                                                                                        | Must **NOT** be included                                          | Must **NOT** be included                  | Must **NOT** be included                |

<details>
<summary>Single Payment (SIP , SFP) && Multi-Payments *Single Payee*</summary>

```json
"Creditor": [
              {
                "Creditor": {
                  "Name": "Mario International"
                },
                "CreditorAccount": {
                  "SchemeName": "IBAN",
                  "Identification": "AE070331234567890123456",
                  "Name": {
                    "en": "Mario International"
                  }
                },
                "CreditorAgent": {
                  "SchemeName": "BIC",
                  "Identification": "EBILAEAD"
                }
              }
            ]
```
</details>


<details>
<summary>Multi-Payments *Defined Payees* (IAVDB)</summary>

```json
"Creditor": [
              {
                "Creditor": {
                  "Name": "Mario International"
                },
                "CreditorAccount": {
                  "SchemeName": "IBAN",
                  "Identification": "AE070331234567890123456",
                  "Name": {
                    "en": "Mario International"
                  }
                },
                "CreditorAgent": {
                  "SchemeName": "BIC",
                  "Identification": "EBILAEAD"
                }
              },
              {
                "Creditor": {
                  "Name": "Luigi Exports Ltd."
                },
                "CreditorAccount": {
                  "SchemeName": "IBAN",
                  "Identification": "AE080260000001234567890",
                  "Name": {
                    "en": "Luigi Exports Ltd."
                  }
                },
                "CreditorAgent": {
                  "SchemeName": "BIC",
                  "Identification": "NBADAEAAXXX"
                }
              }
            ]
```
</details>


<details>
<summary>Multi-Payments *Variable Payees* (EAVB)</summary>

```json
// "Creditor": []
```
</details>

In the Multi-Payments – Variable Payees scenario using Delegated SCA (EAVB), if you are not specifying a debtor, you must still include the Initiation object — even if it is empty ({}).


When creating the Encrypted Personally Identifiable Information (JWE) for a `POST /payments` request, ensure that the Creditor array contains **only one object**—representing the creditor receiving that specific payment.

If you're NOT using Variable Payees (i.e. payees were defined during consent creation), this same `Creditor` object must also be present in the Creditor array at the time of payment consent (`POST /par`).

**Example for `POST /payments`:**
```json
"Creditor": [
              {
                "Creditor": {
                  "Name": "Mario International"
                },
                "CreditorAccount": {
                  "SchemeName": "IBAN",
                  "Identification": "AE070331234567890123456",
                  "Name": {
                    "en": "Mario International"
                  }
                },
                "CreditorAgent": {
                  "SchemeName": "BIC",
                  "Identification": "EBILAEAD"
                }
              }
            ]
```


 ## Risk object 


The `Risk` object is provided by TPPs to LFIs at the point of **payment consent (`POST /par`)** and **payment creation (`POST /payments`)**. Its purpose is to enable LFIs to perform **risk analysis** on the payment transaction and make informed decisions regarding the authorization of the payment.

While all properties of the `Risk` object are optional, and their presence depends on the type of interaction between the TPP and the customer making the payment, **we expect TPPs to populate as much of this object as possible** to support effective risk evaluation.

```json
"Risk": {
          "DebtorIndicators ": {...}, // Indicators of the debtor (such as authentication details, GeoLocation, DeviceInformation, ... )
          "DestinationDeliveryAddress": {...}, // address of the destination (Individual/Corporate, Recipient Name, Address)
          "TransactionIndicators": {...}, // Indicators of the transaction (such as Channel, Payment Process)
          "CreditorIndicators":  //  Indicators of the creditor  (Additional Account Holder Identifiers, Merchant Details)
        }
```

<!-- NEEDS DOING -->


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

const jwt = await new SignJWT({
  Initiation: {
    // add DebtorAccount & Creditor data here 
  },
  Risk: {
    // add risk object here 
  }
})
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

## Step 3: Encrypt the Signed JWT into a JWE

Once the JWT has been signed, it must be encrypted to ensure confidentiality. This step involves wrapping the signed JWT in a JWE (JSON Web Encryption) format using the recipient LFI's public encryption key. The resulting JWE ensures that only the intended recipient (LFI) can decrypt and access the signed payload.

#### Locate the LFI's Public Encryption Key

-  **Discover the JWKS URI**:  
 You can find the `jwks_uri` by performing [API Discovery] via the `.well-known` endpoint. The format is typically:
 `https://keystore.directory.openfinance.ae/[UUID]/application.jwks`

 - **Select the Encryption Key**
Within the JWKS, identify a key where the `"use"` property is set to `"enc"`. This indicates it is intended for encryption, not signing.

**Example:**

```json
{
  "kty": "RSA",
  "use": "enc",
  "x5c": [
    "MIIF7TCCBNWgAwIBAgIUHmtuHfK3lmd/L4K/PCTRin4Qia4wDQYJKoZIhvcNAQELBQAwgZExCzAJBgNVBAYTAkFFMSQwIgYDVQQKExtOZWJyYXMgT3BlbiBGaW5hbmNlIENvbXBhbnkxITAfBgNVBAsTGEFsIFRhcmVxIFRydXN0IEZyYW1ld29yazE5MDcGA1UEAxMwQWwgVGFyZXEgU2FuZGJveCBUcnVzdCBGcmFtZXdvcmsgSXNzdWluZyBDQSAtIEcxMB4XDTI0MTExMzA3NTAwMFoXDTI1MTIxMzA3NTAwMFowVjELMAkGA1UEBhMCQUUxGDAWBgNVBAoTD01BU0hSRVFCQU5LIFBTQzEtMCsGA1UECxMkNDc2Nzc4NmYtYWIyOC00ZDVjLThmZGItMGYyN2UxYzRlYjljMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz0gtRfUg24gtrhME8LZL8wl+LsN+Sv+t8DMqXrl2u10j7eaPI4Tj9Ai5WPlxJIIvUnuoHs8MWp+ZpTvThZkvfIrnh4QEjUbkmNK5z/7ZqmomGijVDC+pPLaDsqOmeifSUpMj5rul5b8v5fO86oeB3meUKFTbn/C/RZo8wUQ+DIuzWgbfu7vr2YfAtIVwF/rsOeYo2BM2MfREuG9hkDX6cVs2nssQGGbWn2wlGgyxwIT9N764qhmnzCRMAcJCFQWZSdJZWo37T9JYVoYyhGSkxjnC+GLEEovFTn2VMWZAEIzgZnRrGtjaegvyzIuZxz8Ehle7P9qlZsAsTHyZrKOGNQIDAQABo4ICdTCCAnEwDgYDVR0PAQH/BAQDAgQwMAwGA1UdEwEB/wQCMAAwHQYDVR0OBBYEFIk1yfJLLedXG6R9EM/lJgLbku91MB8GA1UdIwQYMBaAFMfMvIdWJ8Mbk0qFZTIAlOjPOuxNMEIGCCsGAQUFBwEBBDYwNDAyBggrBgEFBQcwAYYmaHR0cDovL29jc3Auc2FuZGJveC5wa2kub3BlbmZpbmFuY2UuYWUwQQYDVR0fBDowODA2oDSgMoYwaHR0cDovL2NybC5zYW5kYm94LnBraS5vcGVuZmluYW5jZS5hZS9pc3N1ZXIuY3JsMIIBiAYDVR0gBIIBfzCCAXswggF3BgsrBgEEAYO6L3IBAjCCAWYwggEfBggrBgEFBQcCAjCCAREMggENVGhpcyBDZXJ0aWZpY2F0ZSBpcyBzb2xlbHkgZm9yIHVzZSB3aXRoIEFsIFRhcmVxIGFuZCBvdGhlciBwYXJ0aWNpcGF0aW5nIG9yZ2FuaXNhdGlvbnMgdXNpbmcgTmVicmFzIE9wZW4gRmluYW5jZSBDb21wYW55IFNlcnZpY2VzLiBJdHMgcmVjZWlwdCwgcG9zc2Vzc2lvbiBvciB1c2UgY29uc3RpdHV0ZXMgYWNjZXB0YW5jZSBvZiB0aGUgTmVicmFzIE9wZW4gRmluYW5jZSBDb21wYW55IENlcnRpZmljYXRlIFBvbGljeSBhbmQgcmVsYXRlZCBkb2N1bWVudHMgdGhlcmVpbi4wQQYIKwYBBQUHAgEWNWh0dHA6Ly9yZXBvc2l0b3J5LnNhbmRib3gucGtpLm9wZW5maW5hbmNlLmFlL3BvbGljaWVzMA0GCSqGSIb3DQEBCwUAA4IBAQANRxwKQl5M9LkPCE2FWwJO7fOJY1YbzpJEezjd3r2A4NCYEAkYoBH8b9ihEQfHJBHotdKIciXb6Uaqq2oOixjv0p96i3JnWzs7sEkrB30MdphfLJwNNbZsah4592PMLWhqQ9vx9WMcN99/N4C1qalQNTZ5guuOudBRd2Fd1U+9iwAyEhYW4TPDl9O9a+UIctlFs7Tc80tbTY/x50S2QPrS8IHbK8SQ76ncN0O2U+MUU4GwiuyLVkhAoDOC4PV5cVKnxqBTVjfoKFVOvwBar8ZH8pvjxLhms3zS7yEmXpuv0ZK4LmYkHDlAykTfGscXkg+vVOCq61gSrjhSAuIri/GA"
  ],
  "n": "z0gtRfUg24gtrhME8LZL8wl-LsN-Sv-t8DMqXrl2u10j7eaPI4Tj9Ai5WPlxJIIvUnuoHs8MWp-ZpTvThZkvfIrnh4QEjUbkmNK5z_7ZqmomGijVDC-pPLaDsqOmeifSUpMj5rul5b8v5fO86oeB3meUKFTbn_C_RZo8wUQ-DIuzWgbfu7vr2YfAtIVwF_rsOeYo2BM2MfREuG9hkDX6cVs2nssQGGbWn2wlGgyxwIT9N764qhmnzCRMAcJCFQWZSdJZWo37T9JYVoYyhGSkxjnC-GLEEovFTn2VMWZAEIzgZnRrGtjaegvyzIuZxz8Ehle7P9qlZsAsTHyZrKOGNQ",
  "e": "AQAB",
  "kid": "s7Pq6bhvd7YWZLMwsny5_iHWW82hfCEUZjNr9MGNLDs",
  "x5u": "https://keystore.sandbox.directory.openfinance.ae/4767786f-ab28-4d5c-8fdb-0f27e1c4eb9c/s7Pq6bhvd7YWZLMwsny5_iHWW82hfCEUZjNr9MGNLDs.pem",
  "x5t#S256": "s7Pq6bhvd7YWZLMwsny5_iHWW82hfCEUZjNr9MGNLDs",
  "x5dn": "OU=4767786f-ab28-4d5c-8fdb-0f27e1c4eb9c,O=MASHREQBANK PSC,C=AE"
}
```

#### Encryption Algorithms
Use the following algorithms for constructing the JWE:

- Key Management Algorithm: `RSA-OAEP`
Used to encrypt the Content Encryption Key (CEK) with the LFI’s public key.

- Content Encryption Algorithm: `A256GCM`
Used to encrypt the actual signed JWT.

Code example using Node.js and jose

```js
import { CompactEncrypt, importJWK } from 'jose';

// 1. Your existing signed JWT
const signedJWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.ey...'; // replace with your signed JWT generated above

// 2. LFI's public key for encryption
const rsaPublicJwk = {
  "kty": "RSA",
  "use": "enc",
  "x5c": [
    "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"
  ],
  "n": "z0gtRfUg24gtrhME8LZL8wl-LsN-Sv-t8DMqXrl2u10j7eaPI4Tj9Ai5WPlxJIIvUnuoHs8MWp-ZpTvThZkvfIrnh4QEjUbkmNK5z_7ZqmomGijVDC-pPLaDsqOmeifSUpMj5rul5b8v5fO86oeB3meUKFTbn_C_RZo8wUQ-DIuzWgbfu7vr2YfAtIVwF_rsOeYo2BM2MfREuG9hkDX6cVs2nssQGGbWn2wlGgyxwIT9N764qhmnzCRMAcJCFQWZSdJZWo37T9JYVoYyhGSkxjnC-GLEEovFTn2VMWZAEIzgZnRrGtjaegvyzIuZxz8Ehle7P9qlZsAsTHyZrKOGNQ",
  "e": "AQAB",
  "kid": "s7Pq6bhvd7YWZLMwsny5_iHWW82hfCEUZjNr9MGNLDs",
  "x5u": "https://keystore.sandbox.directory.openfinance.ae/4767786f-ab28-4d5c-8fdb-0f27e1c4eb9c/s7Pq6bhvd7YWZLMwsny5_iHWW82hfCEUZjNr9MGNLDs.pem",
  "x5t#S256": "s7Pq6bhvd7YWZLMwsny5_iHWW82hfCEUZjNr9MGNLDs",
  "x5dn": "OU=4767786f-ab28-4d5c-8fdb-0f27e1c4eb9c,O=MASHREQBANK PSC,C=AE"
}
 // replace with the key from the LFI's jwks_uri


// 3. Import the public key
const publicKey = await importJWK(rsaPublicJwk, 'RSA-OAEP');

// 4. Encrypt the signed JWT into a JWE
const encoder = new TextEncoder();
const jwe = await new CompactEncrypt(encoder.encode(signedJWT))
  .setProtectedHeader({ alg: 'RSA-OAEP', enc: 'A256GCM', kid: rsaPublicJwk.kid })
  .encrypt(publicKey);

console.log('Encrypted JWE:', jwe);
```

The LFI will use its private key to decrypt the JWE, verify the JWT signature inside, and proceed with processing the request.