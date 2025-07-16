---
prev: false

next: false
---

🕒 **7 minute read**


# Sandbox | Model Bank

To support onboarding and early development, a Model Bank has been deployed within the sandbox environment. This simulated Licensed Financial Institution mirrors the structure and behavior of a real LFI, providing TPPs with a safe, compliant space to test their end-to-end integration flows.

The Model Bank is registered in the Trust Framework and exposes Authorization Servers, discovery endpoints, and Open Finance APIs — just like any production LFI. TPPs can use it to:

- Explore API discovery via the .well-known endpoint
- Test dynamic registration with real (sandbox) software statements
- Validate certificate-based authentication and mutual TLS setups
- Simulate account access, payment initiation, and consent flows

By integrating with the Model Bank first, TPPs can confidently build and validate their implementations before engaging with live LFIs in production.


## Model Bank Discovery

Unlike the `.well-known` endpoint of LFI's Authorization Servers the current implementation of the Model Bank discovery endpoint requires a transport certificate to be used in the request.

#### Example Request

```bash
curl 'https://rs1.altareq1.sandbox.apihub.openfinance.ae/o3/v1.0/postman/environment?client_id=<ClientId>' \
  --cert path/to/your-cert.pem \
  --key path/to/your-key.key \
```

#### Certificate & Key

This endpoint uses **mutual TLS (mTLS)** with transport-level certificates.

- `--cert`: Path to your **transport** client certificate (`.pem`)
- `--key`: Path to your **transport** private key (`.key`)


#### Example Response


| Variable Name                 | Value |
|------------------------------|-------|
| `rs` resource server      | `https://rs1.altareq1.sandbox.apihub.openfinance.ae` |
| `issuer`  | `https://auth1.altareq1.sandbox.apihub.openfinance.ae` |
| `auth-endpoint`    | `https://auth1.altareq1.sandbox.apihub.openfinance.ae/auth` |
| `par-endpoint`     | `https://as1.altareq1.sandbox.apihub.openfinance.ae/par` |
| `token-endpoint`   | `https://as1.altareq1.sandbox.apihub.openfinance.ae/token` |
| `jwks-uri`         | `https://keystore.sandbox.directory.openfinance.ae/233bcd1d-4216-4b3c-a362-9e4a9282bba7/application.jwks` |

<br>

```json
    {
      "enabled": true,
      "key": "rs",
      "value": "https://rs1.altareq1.sandbox.apihub.openfinance.ae",
      "type": "text"
    },
    ....
    {
      "enabled": true,
      "key": "issuer",
      "value": "https://auth1.altareq1.sandbox.apihub.openfinance.ae",
      "type": "text"
    },
    {
      "enabled": true,
      "key": "tokenEndpoint",
      "value": "https://as1.altareq1.sandbox.apihub.openfinance.ae/token",
      "type": "text"
    },
    {
      "enabled": true,
      "key": "authEndpoint",
      "value": "https://auth1.altareq1.sandbox.apihub.openfinance.ae/auth",
      "type": "text"
    },
```

<!-- <OAOperation :spec="spec" operationId="getEnvironmentConfiguration" /> -->

## Model Bank Credentials

The model bank includes two pre-configured users, each with varyied accounts. You can log in as either user to explore the various Open Banking capabilities.

**Model Bank Users**

| **User**               | **Password**   |
|------------------------|----------------|
| `mits`                 | `mits`         |
| `rora`                 | `rora`         |

<br>

**Mits Accounts:**

| AccountId                 | SchemeName    | Identification   | AccountType | Name                |
|---------------------------|---------------|------------------|-------------|---------------------|
| 100004000000000000000002 | AccountNumber | 10000109010102   | Corporate   | Luigi International |
| 100004000000000000000003 | AccountNumber | 10000109010103   | Retail      | Mario International |
| 100004000000000000000005 | IBAN          | 10000109010105   | Retail      | Spectrum            |

<br>

**Rora Accounts:**

| AccountId                 | SchemeName    | Identification   | AccountType | Name                |
|---------------------------|---------------|------------------|-------------|---------------------|
| 100004000000000000000001 | IBAN          | 10000109010101   | Retail      | Mario Current       |
| 100004000000000000000004 | AccountNumber | 10000109010104   | Corporate   | Luigi PrePaid Card  |
| 100004000000000000000006 | AccountNumber | 10000109010106   | Corporate   | Peach Charge Card   |
| 100004000000000000000007 | IBAN          | 10000109010107   | Retail      | Bowser Other        |
| 100004000000000000000008 | IBAN          | 10000109010108   | Corporate   | Toadstool Current   |
| 100004000000000000000009 | AccountNumber | 10000109010109   | Retail      | Yoshi Savings       |
| 100004000000000000000010 | IBAN          | 10000109010110   | Corporate   | Koopa Credit Card   |
| 100004000000000000000011 | IBAN          | 10000109010111   | Retail      | Daisy PrePaid Card  |



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

  // Inject the cert/key lines before --data
  const updatedStr = requestStr + '\n  ' + certLine
    

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
  title: Open Finance Environment API
  version: 1.0.0
  description: Retrieves environment details for a given Open Banking client.

servers:
  - url: https://rs1.altareq1.sandbox.apihub.openfinance.ae/o3/v1.0

paths:
  /postman/environment:
    get:
      summary: Get Environment Configuration
      description: Retrieves environment configuration details for a specified client ID.
      operationId: getEnvironmentConfiguration
      parameters:
        - name: client_id
          in: query
          required: true
          description: The encoded client ID URL registered in the Open Finance directory.
          schema:
            type: string
            example: https://rp.sandbox.directory.openfinance.ae/openid_relying_party/42f134c9-3743-4a6d-baa7-b73415d83943
      responses:
        '200':
          description: Successful response with environment details
          content:
            application/json:
              schema:
                type: object
                example:
                  environment: Sandbox
                  provider: Altareq
                  client_id: "https://rp.sandbox.directory.openfinance.ae/openid_relying_party/42f134c9-3743-4a6d-baa7-b73415d83943"
        '400':
          description: Bad request (missing or invalid parameters)
        '401':
          description: Unauthorized or invalid credentials
        '500':
          description: Internal server error`
</script>