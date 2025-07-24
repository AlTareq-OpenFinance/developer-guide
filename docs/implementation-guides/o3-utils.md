---
prev: false

next:
  text: 'Constructing authorization_details'
  link: '/implementation-guides/authorization-details/'
---

🕒 **2 minute read**

# O3 Utils

Throughout the [Postman](../developer-tools/postman) collections, you will find several requests labeled "O3 Utils." These endpoints are designed to assist with early-stage implementation by performing tasks such as signing a JWT with your private key.

<img src="/images/demo/o3-spotlight-postman.png" alt="O3 Utils Postman" width="300" />

Please note that these utility endpoints are intended for development and guidance purposes only—they will not be available in a fully live production environment. Their primary goal is to demonstrate the functionality you will need to implement within your own production systems.

Important: Never transmit your private key over the public internet. In production, all cryptographic operations involving private keys must be handled securely on your own infrastructure.
