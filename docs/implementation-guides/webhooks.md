---
prev: false

next: false
---

🕒 **10 minute read**

# Webhooks


## Subscribing to Webhooks

Within the `authorization_details` object of every `/par` (Pushed Authorization Request) request, TPPs can specify a `subscription` object to configure webhook behavior. The `subscription` object follows this format:

```json
"subscription": {
  "Webhook": {
    "Url": "http://localhost:4700/mock-event-receiver",
    "IsActive": true
  }
}
```

This is where, as a TPP, you define how and where webhook events should be delivered.

## Webhooks serve two primary purposes in the ecosystem:

1) Consent Updates
Triggered whenever there is a change to a consent object.

2) Payment Status Changes
Triggered whenever there is an update to the status of a payment.

By including a subscription object in your `/par` request, you indicate that you wish to receive webhook notifications for both types of events. 

Note: For multi-payment consents, subscribing to webhooks means you will receive notifications:
- For any changes to the consent status
- For any status updates to any individual payment linked to the consent ID



## Receiving a Webhook
When you receive a webhook, it will arrive as a *JWE (JSON Web Encryption)*. This JWE is encrypted using a **opf_uae_client_encryption** certificate’s *public key* from the application you used to create the consent request.

The encryption process that happens here is the same as the encryption of PII done by the TPP using the LFI's encryption key before initiating a payment consent request.


## Decrypting the Webhook JWE

To decrypt the JWE, follow the steps below:

#### 1) Split the JWE into 5 parts

The compact serialization of a JWE looks like this:

`<protected header>.<encrypted key>.<initialization vector>.<ciphertext>.<authentication tag>`

Each part is Base64URL-encoded.

#### 2) Base64URL decode the parts

Decode each component using Base64URL decoding:

 - Protected Header → JSON object (metadata)
 - Encrypted Key → bytes (symmetric key encrypted with recipient’s public key)
 - Initialization Vector (IV) → bytes
 - Ciphertext → bytes (the actual encrypted payload)
 - Authentication Tag → bytes (used to verify authenticity/integrity)

#### 3) The header will look like:

```json
{
  "alg": "RSA-OAEP-256",     // Algorithm used to encrypt the CEK (Content Encryption Key)
  "enc": "A256GCM",          // Content encryption algorithm
  "kid": "yjDqOhJLX9FaT6....A2sGXcsj8", // Key ID of a opf_uae_client_encryption
  "cty": "JWT"               // Content type (e.g., a nested JWT)
}
```

The `kid` specified in the header is the private key you need to use in order to decrypt the JWE and receive the JWT.

Once you have identified the Key Id and corresponding Private Key you should be able to decode the JWE.

#### 4) Decrypt the JWE to receive the signed JWT.

Once you have identified the Key Id and corresponding Private Key you should use the Private Key to decode the JWE.


### Example Using Node.Js and jose

```js
const keyStore = {
  'key-key-1': `
  -----BEGIN PRIVATE KEY-----
  MIIEvgIBADANBgkqhkiG9w0BAQEFAASC...
  -----END PRIVATE KEY-----
  `,

  'key-key-2': `
  -----BEGIN PRIVATE KEY-----
  MIIEvAIBADANBgkqhkiG9w0BAQEFAASC...
  -----END PRIVATE KEY-----
  `
};


const jweCompact = 'eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJraWQiOiJkey1rZXktMSIsImVuYyI6IkEyNTZHQ00ifQ...'; // shortened


import { decodeProtectedHeader, importPKCS8, jwtDecrypt } from 'jose';

// 1. Decode the protected header to extract 'kid'
const protectedHeader = decodeProtectedHeader(jweCompact);
console.log('Decoded Header:', protectedHeader);

const { kid, alg } = protectedHeader;

if (!kid || !alg) {
  throw new Error('Missing `kid` or `alg` in JWE header');
}

// 2. Lookup the private key using `kid`
const privateKeyPEM = keyStore[kid];
if (!privateKeyPEM) {
  throw new Error(`No private key found for kid: ${kid}`);
}

// 3. Import the private key
const privateKey = await importPKCS8(privateKeyPEM, alg);

// 4. Decrypt the JWE
const { plaintext, protectedHeader: finalHeader } = await jwtDecrypt(
  jweCompact,
  privateKey
);

// 5. Output results
console.log('Decrypted Payload:', new TextDecoder().decode(plaintext));
console.log('Final Protected Header:', finalHeader);
```


## After Decryption: JWT Payload Structure

Once the JWE is successfully decrypted, the resulting payload is a Signed JWT (JSON Web Token). This JWT contains an event payload structured in JSON format, such as a Payment or Consent webhook notification.

Below are two example payloads:


#### Payment Webhook Example

The payload describes a payment resource update event:

```json
{
  "Data": {
    "PaymentId": "27fef503-0635-4cf3-8d97-f26697394f04",
    "ConsentId": "bedad63d-b0b3-45d9-a3f7-6d5d7571c4cc",
    "Status": "Rejected",
    "StatusUpdateDateTime": "2019-08-24T14:15:15Z",
    "CreationDateTime": "2019-08-24T14:15:00Z",
    "Instruction": {
      "Amount": {
        "Amount": "100.00",
        "Currency": "AED"
      }
    },
    "PaymentPurposeCode": "MIS",
    "PaymentTransactionId": "3ca24bcb-27f5-4442-af2a-e40245a33ed3",
    "RejectReasonCode": {
      "Code": "AANI.UCRD",
      "Message": "CreditorAccount is not known"
    }
  },
  "Meta": {
    "EventDateTime": "2019-08-24T14:15:22Z",
    "EventResource": "/payments/27fef503-0635-4cf3-8d97-f26697394f04",
    "EventType": "Resource.Updated",
    "ConsentId": "bedad63d-b0b3-45d9-a3f7-6d5d7571c4cc"
  }
}
```

#### Consent Webhook Example

The payload describes a consent resource update event:

```json
{
    "Data": {
      "ConsentId": "aac-69255d98-ab0e-4758-92a7-cacbf3073efa",
      "BaseConsentId": "abc-19877d98-ab0e-4758-92a7-vvffr1234abv",
      "IsSingleAuthorization": true,
      "AuthorizationExpirationDateTime": "2019-08-24T14:15:22Z",
      "Permissions": [
        "ReadAccountsBasic"
      ],
      "ExpirationDateTime": "2019-08-24T14:15:22Z",
      "Status": "Consumed",
      "RevokedBy": "LFI",
      "CreationDateTime": "2019-08-24T14:15:22Z",
      "StatusUpdateDateTime": "2019-08-24T14:15:22Z",
      "ControlParameters": {
        "IsDelegatedAuthentication": true,
        "ConsentSchedule": {
          "SinglePayment": {
            "Type": "SingleInstantPayment",
            "Amount": {
              "Amount": "100.00",
              "Currency": "AED"
            }
          }
        }
      },
      "CreditorReference": "TPP=5dcda752-76cb-4c53-a780-26c8ed4a544d,BIC=EBILAEADBSQ,Example Payment Reference",
      "PaymentPurposeCode": "COM",
      "SponsoredTPPInformation": {
        "Name": "string",
        "Identification": "string"
      },
      "OpenFinanceBilling": {
        "IsLargeCorporate": true
      }
    },
    "Meta": {
      "EventDateTime": "2019-08-24T14:15:22Z",
      "EventResource": "/payment-consents/42ff2e43-e95b-4f0b-a5be-b0799074338f",
      "EventType": "Resource.Created",
      "ConsentId": "string"
    }
  }
  ```