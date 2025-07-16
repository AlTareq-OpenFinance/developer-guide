🕒 **4 minute read**

# AlTareq Trust Framework

The Trust Framework facilitates secure data sharing between Licensed Financial Institutions (LFIs) and Third-Party Providers (TPPs) by delivering key services such as API discovery, client onboarding, and client authentication.

The **Sandbox Trust Framework** can be accessed at the following link: 

- Web Application : https://web.sandbox.directory.openfinance.ae/  
- OIDC Discovery API : https://auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration

The **Production Trust Framework** can be accessed at the following link: 

- Web Application : https://web.directory.openfinance.ae/
- OIDC Discovery API :https://auth.directory.openfinance.ae/.well-known/openid-configuration

## Core Functions of the Trust Framework:

**Trust Anchors**
Maintain a registry of authorized participants, defining their roles and scopes of access within the ecosystem.

**API Portal for Discovery**
Serve as a centralized directory of all servers, clients, and APIs participating in the ecosystem.

**Keystore**
Manage a registry of active cryptographic keys for each participant. These keys are used to validate identities, enabling mutual trust—an essential foundation for secure data sharing.

**Public Key Infrastructure (PKI)**
Issue and manage TLS, signature, and encryption certificates. The PKI also provides mechanisms for verifying certificates generated within the platform.