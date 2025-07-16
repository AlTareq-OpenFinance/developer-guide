---
prev: 
  text: 'Constructing authorization_details'
  link: '/implementation-guides/authorization-details/'

next:
  text: 'Encrypting PII'
  link: '/implementation-guides/encrypting-pii/'
---

🕒 **7 minute read**

# Caching Guidance for public TF APIs

To ensure optimal performance within the ecosystem, TPPs should cache data retrieved from the public APIs provided through the Trust Framework:

- `/participants` endpoint
- `.well-known` endpoint
- `.well-known` endpoint

These endpoints are designed to be consumed in a way that respects standard HTTP `Cache-Control` headers and **should not be queried on every request**.


## <GET /> `/participants`

As covered in [API Discovery](/getting-started/api-discovery) the `/participants` endpoint returns a list of LFI's associated Authorization Servers and the API resources exposed by each server. Since this information changes infrequently, it should be cached to reduce unnecessary network calls and improve performance.

#### Endpoint

**Sandbox:** https://data.sandbox.directory.openfinance.ae/
**Production:** https://data.directory.openfinance.ae/participants 

- **Cache Duration:** `15 minutes`
- **Cache-Control Header:** `max-age=900`


## <GET /> `/.well-known/openid-configuration`

As covered in [API Discovery](/getting-started/api-discovery) the `.well-known` endpoint returns the configuration details of a specific Authorization Server. Since this information changes infrequently, it should be cached to reduce unnecessary network calls and improve performance.

#### Endpoint

**Format:** `https://<authorization-server>/.well-known/openid-configuration`

- **Cache Duration:** `15 minutes`
- **Cache-Control Header:** `max-age=900`


## <GET /> `jwks_uri`

As covered in [API Discovery](/getting-started/api-discovery), the `jwks_uri` is used to retrieve the JSON Web Key Set (JWKS) for an LFI. This key material is used to validate signed tokens and encrypt data. Since the JWKS content changes infrequently, responses from this URI should be cached to reduce network overhead and improve performance.


#### Endpoint

**Format:** `https://keystore.directory.openfinance.ae/[UUID]/application.jwks`

- **Cache Duration:** `5 minutes`
- **Cache-Control Header:** `max-age=300`



## More Information

For more details around caching recommendations when using the Trust Framework, refer to the [Raidiam Connect Documentation – Cache Control](https://www.raidiam.com/developers/docs/apis#public-apis).
