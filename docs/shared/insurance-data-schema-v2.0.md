
#### `authorization_details` Structure

| Field                                     | Type            | Description                                                                                                                                                                                         | Example                                               |
|------------------------------------------|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| type*                                    | `enum`            | Consent type identifier.                                                                                                                                                                            | `urn:openfinanceuae:insurance-consent:v2.0`          |
| consent.ConsentId*                       | `string`          | Unique ID assigned by the TPP to identify the consent resource. (1–128 chars)                                                                                                                       | `INS-456789`                                          |
| consent.BaseConsentId                    | `string`          | Original ConsentId for updates/renewals of long-lived consents. (1–128 chars)                                                                                                                       | `INS-BASE-002`                                        |
| consent.ExpirationDateTime*              | `date-time`       | Expiration date/time for this consent. Must include timezone (ISO 8601 format).                                                                                                                     | `2026-05-04T10:43:07+00:00`                           |
| consent.Permissions*                     | `array<object>`   | Array of permission groups, each qualified by an `InsuranceType`.                                                                                                                                   | See individual permissions below                      |
| └─ InsuranceType*                        | `enum`            | Type of insurance. Allowed: `Employment`, `Health`, `Home`, `Life`, `Motor`, `Renters`, `Travel`                                                                                                   | `Motor`                                               |
| └─ Permissions*                          | `array<enum>`     | Data clusters requested. Allowed: `ReadInsurancePolicies`, `ReadCustomerBasic`, `ReadCustomerDetail`, `ReadCustomerPaymentDetails`, `ReadInsuranceProduct`, `ReadCustomerClaims`, `ReadInsurancePremium` | `ReadInsurancePolicies`, `ReadCustomerClaims`         |
| consent.OpenFinanceBilling.Purpose*      | `enum`            | Purpose of the data sharing.                                                                                                                                                                        | `ClaimHistory`                                       |
| consent.OnBehalfOf.TradingName           | `string`          | (Optional) Trading name of the organization the TPP acts on behalf of.                                                                                                                              | `Example Agency`                                      |
| consent.OnBehalfOf.LegalName             | `string`          | (Optional) Legal name of the organization.                                                                                                                                                          | `Example Holdings Ltd.`                               |
| consent.OnBehalfOf.IdentifierType        | `enum`            | (Optional) Identifier type. Allowed: `Other`                                                                                                                                                        | `Other`                                               |
| consent.OnBehalfOf.Identifier            | `string`          | (Optional) Identifier value.                                                                                                                                                                        | `1234567890`                                          |
| subscription.Webhook.Url*                | `string`          | Webhook callback URL for notifications.                                                                                                                                                             | `https://tpp.example.com/insurance-webhook`           |
| subscription.Webhook.IsActive*           | `boolean`         | Indicates whether to enable (true) or disable (false) Webhook delivery.                                                                                                                             | `true`                                                |



#### Example

```json
"authorization_details": [
  {
    "type": "urn:openfinanceuae:insurance-consent:v2.0",
    "consent": {
      "ConsentId": "INS-456789",
      "ExpirationDateTime": "2026-05-04T10:43:07.000Z",

      // Optional: Include if updating/renewing long-lived consents
      // "BaseConsentId": "INS-BASE-002",

      "Permissions": [
        {
          "InsuranceType": "Motor",
          "Permissions": [
            "ReadInsurancePolicies",
            "ReadCustomerBasic",
            "ReadCustomerClaims",
          ]
        },
        {
          "InsuranceType": "Health",
          "Permissions": [
            "ReadCustomerDetail",
            "ReadInsuranceProduct",
            "ReadInsurancePremium"
          ]
        }
      ],

      "OpenFinanceBilling": {
        "Purpose": "ClaimHistory"
      },

      // Optional: Acting on behalf of another entity
      // "OnBehalfOf": {
      //   "TradingName": "Example Agency",
      //   "LegalName": "Example Holdings Ltd.",
      //   "IdentifierType": "Other",
      //   "Identifier": "1234567890"
      // }
    },

    // Optional: Webhook subscription
    // "subscription": {
    //   "Webhook": {
    //     "Url": "https://tpp.example.com/insurance-webhook",
    //     "IsActive": true
    //   }
    // }
  }
]
```