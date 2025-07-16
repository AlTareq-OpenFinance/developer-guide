---
aside: false
outline: false


prev:
  text: 'API Discovery'
  link: '/getting-started/api-discovery/'

next:
  text: 'Access Tokens'
  link: '/getting-started/access-tokens/'
---



🕒 **10 minute read**



# Getting Started - Registering your Application

TPPs dynamically register their applications with LFIs by submitting a registration request to the bank’s `registration_endpoint`, which is discovered via the `.well-known` endpoint. This request includes the TPP application's transport certificate and corresponding private key to establish a secure and trusted connection.

## Prerequisites

Before you begin, make sure you have:

- An approved TPP registration within the **Al Tareq Trust Framework**
- Used [API Discovery](/getting-started/api-discovery) to locate the `registration_endpoint` of the LFI you intend to register with
- Basic understanding of Mutual TLS (mTLS) & Digital Certificates - [mTLS & Digital Certificates | Cloudflare](https://www.oauth.com/)
-  [OpenSSL](https://slproweb.com/products/Win32OpenSSL.html) is installed on your system and properly added to your environment variables



## Step 1: Creating an Application

<SectionCreatingAnApplication />

Now you have an application in place, you are almost ready to initiate dynamic client registration, and begin exchanging data in a secure and trusted manner.


## Step 2: Generate Transport Certificates

Within the Al Tareq Trust Framework, certificates are issued and bound to a specific software statement. These certificate play a vital role in ensuring that data is exchanged safely and only between trusted systems. Each different types of certificates serves a distinct purposes

**Transport Certificates** are used to establish secure TLS (HTTPS) connections between systems. They authenticate the identity of the connecting party and encrypt data in transit, ensuring that communication channels are both private and tamper-proof.


#### Walkthrough - Generate a Transport Certificate and Key Pair

  <ClientOnly>
    <Carousel :images="images2" />
  </ClientOnly>


Now your software statement/application has a Transport Certificate and key pair, it is ready to be registered with a Licensed Financial Institution (LFI). All that's left is to send the following request to the registration endpoint:


## Step 3: <Post/> `/tpp-registration`


#### Example Request


```bash
curl <registration_endpoint> \
  --request POST \
  --header 'Content-Type: application/json' \
  --cert path/to/your-cert.pem \
  --key path/to/your-key.key \
  --data '{}'
```

#### Endpoint

`registration_endpoint` — discovered through the `.well-known` endpoint


**Model Bank `registration_endpoint`:** 'https://rs1.altareq1.sandbox.apihub.openfinance.ae/tpp-registration'


#### Certificate & Key

This endpoint uses **mutual TLS (mTLS)** with transport-level certificates.

- `--cert`: Path to your **transport** client certificate (`.pem`)
- `--key`: Path to your **transport** private key (`.key`)





<!-- 
<details>
<summary> /tpp-registration - NodeJs (Axios)</summary>

```js
const axios = require('axios');
const https = require('https');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const agent = new https.Agent({
  cert: fs.readFileSync('path/to/your-cert.pem'),
  key: fs.readFileSync('path/to/your-key.key'),
  rejectUnauthorized: false
});

const URL = 'https://rs1.altareq1.sandbox.apihub.openfinance.ae/tpp-registration';
const interactionId = uuidv4();

const config = {
  method: 'post',
  maxBodyLength: Infinity,
  httpsAgent: agent,
  url: URL,
  headers: {
    'x-fapi-interaction-id': interactionId
  }
};

axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.error(error);
  });

```

</details>
<details>
<summary> /tpp-registration - Python (requests)</summary>

```python
import requests
import uuid

url = "https://rs1.altareq1.sandbox.apihub.openfinance.ae/tpp-registration"
interaction_id = str(uuid.uuid4())

cert = ('path/to/your-cert.pem', 'path/to/your-key.key')

headers = {
    "x-fapi-interaction-id": interaction_id
}

response = requests.post(url, headers=headers, cert=cert, verify=False)
print(response.json())

```
</details> -->


<br>

Once the registration is successful, you will receive a **200 OK**, **201 Created**, or **204 No Content** response. Now that your software statement is registered, you're ready to start communicating with the LFI and begin the process of authentication.


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
  title: TPP Registration API
  description: API for TPP registration with mutual TLS and interaction ID header.
  version: 1.0.0

servers:
  - url: {LFIs URL}

paths:
  /tpp-registration:
    post:
      summary: Register a Third-Party Provider (TPP)
      operationId: registerTPP
      tags:
        - TPP
      security:
        - mutualTLS: []
      parameters:
        - in: header
          name: x-fapi-interaction-id
          required: false
          schema:
            type: string
            format: uuid
          description: Unique ID for end-to-end interaction.
      requestBody:
        description: Optional payload (if applicable)
        required: false
        content:
          application/json:
            schema:
              type: object
              example: {}
      responses:
        '200':
          description: Successful registration
          content:
            application/json:
              schema:
                type: object
        '400':
          description: Bad Request
        '401':
          description: Unauthorized
        '500':
          description: Internal Server Error

components:
  securitySchemes:
    mutualTLS:
      type: mutualTLS`


const images1 = [
  {
    src: new URL('/images/raidiam/add-application/click-org.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Click into your organisation'
  },
  {
    src: new URL('/images/raidiam/add-application/click-app.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Click into applications'
  },
  {
    src: new URL('/images/raidiam/add-application/new-app.png', import.meta.url).href,
    alt: 'Step 3',
    title: 'Click + New Application'
  },
  {
    src: new URL('/images/raidiam/add-application/role.png', import.meta.url).href,
    alt: 'Step 4',
    title: 'Select the roles of the Application',
    tagline: 'Note roles for an Application are inherited from the organisation.'
  },
  {
    src: new URL('/images/raidiam/add-application/client.png', import.meta.url).href,
    alt: 'Step 5',
    title: 'Provide the details of the client',
    tagline: 'Client Name, Client Logo & Federation Entity Management Type'
  },
  {
    src: new URL('/images/raidiam/add-application/auth.png', import.meta.url).href,
    alt: 'Step 6',
    title: 'Provide user authentication details',
    tagline: `More information on <a href="../trust-framework/redirect-uri/">Redirect URIs</a>`
  },
    {
    src: new URL('/images/raidiam/add-application/done.png', import.meta.url).href,
    alt: 'Step 8',
    title: 'Your application is now ready to use',
    tagline: 'Note the Client ID, as it will be required for all requests made by this client.'
  },
]


const images2 = [
  {
    src: new URL('/images/raidiam/generate-transport-certificate/1.PNG', import.meta.url).href,
    alt: 'Step 1',
    title: 'Within your application click App Certificates'
  },
    {
    src: new URL('/images/raidiam/generate-transport-certificate/2.PNG', import.meta.url).href,
    alt: 'Step 2',
    title: 'Click +New Certificate'
  },
    {
    src: new URL('/images/raidiam/generate-transport-certificate/3.PNG', import.meta.url).href,
    alt: 'Step 3',
    title: 'Select Transport Certificate'
  },
    {
    src: new URL('/images/raidiam/generate-transport-certificate/4.PNG', import.meta.url).href,
    alt: 'Step 4',
    title: 'Copy the CSR generating script',
  
  },
    {
    src: new URL('/images/raidiam/generate-transport-certificate/5.PNG', import.meta.url).href,
    alt: 'Step 5',
    title: 'Generate you CSR',
    tagline: `Recommended to use a Hardware Security Module (HSM) or a Key Management Service (KMS)`
  },
    {
    src: new URL('/images/raidiam/generate-transport-certificate/6.PNG', import.meta.url).href,
    alt: 'Step 6',
    title: 'CSR Generated'
  },
    {
    src: new URL('/images/raidiam/generate-transport-certificate/7.PNG', import.meta.url).href,
    alt: 'Step 7',
    title: 'Upload your CSR'
  },
      {
    src: new URL('/images/raidiam/generate-transport-certificate/8.PNG', import.meta.url).href,
    alt: 'Step 8',
    title: 'Upload the .CSR file'
  },
        {
    src: new URL('/images/raidiam/generate-transport-certificate/9.PNG', import.meta.url).href,
    alt: 'Step 9',
    title: 'Your certificate is generated and ready to be downloaded'
  },
  
  {
    src: new URL('/images/raidiam/generate-transport-certificate/10.PNG', import.meta.url).href,
    alt: 'Step 10',
    title: 'You now have the certificate (.PEM) and Key (.Key) pair',
  },
]
</script>