🕒 **5 minute read**


# AlTareq Trust Framework - Certificates

To operate securely, your application must use three separate certificates, each serving a distinct security function:

### 1. Transport Certificate

Used for **mutual TLS (mTLS)** to authenticate your server when making API requests.

- **Purpose**: Secure transport and client authentication
- **Usage**: mTLS handshake for all API calls
- **Presented to**: API providers during connection

### 2. Signing Certificate

Used to **digitally sign JWTs** your application sends—such as client assertions, request objects, and tokens.

- **Purpose**: Proving integrity and authenticity of signed payloads
- **Usage**: Signing the contents of JWTs

### 3. Encryption Certificate

Used to **encrypt data** such as PII within payment  tokens or consent artefacts.

- **Purpose**: Ensuring only your application can read sensitive data
- **Usage**: Decrypting encrypted responses

Each certificate plays a critical role in securing communication, asserting identity, and protecting user data in transit.


## Generating a Certificate


  <ClientOnly>
    <Carousel :images="images" />
  </ClientOnly>

Within the Trust Framework there are both client and server certificates under the naming convention opf_uae_[certificate_type]_. As a TPP, you will use client certificates to identify your application.
  

<script setup>
const images =  [
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
    title: 'Select Signing Certificate'
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