
🕒 **5 minute read**

# Multi User Authorization

For certain payment use cases—such as corporate payments that require multiple sign-offs—authorization may be needed from more than one user before a payment can be approved.

These flows are supported by Open Finance. However, it’s important to note that standard OAuth 2.0 does not natively support multi-user authorization.

## Detecting Multi-User Authorization

When the first user authenticates and authorizes, you’ll receive the standard authorization callback with an authorization code (as described in [Authorization Callback](./authorization-callback)). Upon exchanging this code for a token, the response will include a consent status:

```json
"status": "AwaitingAuthorization"
```
This indicates that the consent is not yet fully authorized, and additional users must complete the authorization before access to resources is granted.

#### Example Token Response

```json
{
  "access_token": "81b0acbf-fe28-4542-8400-c38269b7d2xx",
  "expires_in": 600,
  "token_type": "Bearer",
  "scope": "accounts openid",
  "state": "6808d82b-53c1-4ce6-9b64-df6a99a355zz",
  "status": "AwaitingAuthorization",
  "authorization_details": [
    {...}
  ],
  "refresh_token": "f0bbaf4f-f415-4998-b3a7-50b6b8bd7dxx",
  "id_token": "eyJhbGciOiJQUzI1NiIsImtpZCI6IkxTUXhZc0thR2RzMk9lZS1pR01jYmVLd3c0SXplNXo4bG10YWhJMDRHLTQi...REDACTED...ZTg="
}
```


## Monitoring Authorization Progress

Within the consent object, you will find information about the additional users required to authorize the payment. The way each bank handles subsequent authorizations may vary, but you can track the state of each required authorization via the consent details.

- If any required authorization is rejected, the consent status will change to `Rejected`.

- Once all required authorizations are granted, the consent will be marked as `Authorized`.

Subsequent authorizers must complete their approvals before the consent expires. You can track the consent status using standard [Consent Management](./consent-management) tools.