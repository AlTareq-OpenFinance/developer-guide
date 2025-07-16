
#### `authorization_details` Structure


| Field                               | Type         | Description                                                                                                                                                                                                                                                                                                                                                                                                                      | Example                                           |
|------------------------------------|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------|
| type*                              | `enum`         | Consent type identifier.                                                                                                                                                                                                                                                                                                                                                                                                        | `urn:openfinanceuae:insurance-consent:v1.2`      |
| consent.ConsentId*                 | `string`       | Unique ID assigned by the TPP for this consent. (1 to 128 chars)                                                                                                                                                                                                                                                                                                                                                                | `INS-123456`                                     |
| consent.BaseConsentId              | `string`       | Original ConsentId assigned by the TPP. Used for updating/renewing long-lived consents. (1 to 128 chars)                                                                                                                                                                                                                                                                                                                         | `INS-BASE-001`                                   |
| consent.Permissions*               | `array<enum>`  | Specifies the insurance policy data types requested for access. Includes data clusters like policy details, customer info, payment details, etc.                                                                                                                                                                                                                                                                                | `ReadMotorInsurancePolicies`, `ReadMotorInsuranceCustomerDetail` |
| consent.ExpirationDateTime*        | `date-time`    | Expiry date/time for consent permissions. Must include timezone.                                                                                                                                                                                                                                                                                                                                                                 | `2026-05-04T10:43:07+00:00`                      |
| consent.OpenFinanceBilling.Purpose* | `enum`        | Reason for data sharing. Allowed: `AccountAggregation`, `RiskAssessment`, `PremiumHistory`, `ClaimHistory`, `Onboarding`, `Verification`, `QuoteComparison`, `FinancialAdvice`                                                                                                                                                                                                                                                  | `PremiumHistory`                                 |
| consent.OnBehalfOf.TradingName     | `string`       | Trading name if the consent is given on behalf of another party.                                                                                                                                                                                                                                                                                                                                                                 | `Ozone Insurance`                                |
| consent.OnBehalfOf.LegalName       | `string`       | Legal name if acting on behalf.                                                                                                                                                                                                                                                                                                                                                                                                   | `Ozone Holdings Ltd`                             |
| consent.OnBehalfOf.IdentifierType  | `enum`         | Identifier type. Allowed: `Other`                                                                                                                                                                                                                                                                                                                                                                                                | `Other`                                          |
| consent.OnBehalfOf.Identifier      | `string`       | Identifier value.                                                                                                                                                                                                                                                                                                                                                                                                                | `9876543210`                                     |
| subscription.Webhook.Url*          | `string`       | Callback URL for the LFI to send Webhook notifications to. HTTPS preferred.                                                                                                                                                                                                                                                                                                                                                      | `https://tpp.example.com/insurance-webhook`      |
| subscription.Webhook.IsActive*     | `boolean`      | Indicates whether the LFI should send webhook notifications.                                                                                                                                                                                                                                                                                                                                                                     | `true`                                           |


#### Example

```json
"authorization_details": [
  {
    "type": "urn:openfinanceuae:insurance-consent:v1.2",
    "consent": {
      "ConsentId": "INS-123456", // Unique ID assigned by the TPP
      "ExpirationDateTime": "2026-05-04T10:43:07.000Z", // ISO 8601 format with timezone

      // Optional: BaseConsentId for renewals/updates of long-lived consents
      // "BaseConsentId": "INS-BASE-001",

      "Permissions": [
        "ReadMotorInsurancePolicies",
        "ReadMotorInsuranceCustomerBasic",
        "ReadMotorInsuranceCustomerDetail",
        "ReadMotorInsuranceCustomerPaymentDetails",
        "ReadMotorInsuranceProduct",
        "ReadMotorInsuranceTransactions"
      ],

      "OpenFinanceBilling": {
        "Purpose": "PremiumHistory" // e.g., AccountAggregation, RiskAssessment, ClaimHistory, etc.
      },

      // Optional: use if acting on behalf of another legal entity
      // "OnBehalfOf": {
      //   "TradingName": "Ozone Insurance",
      //   "LegalName": "Ozone Holdings Ltd",
      //   "IdentifierType": "Other", // Only 'Other' currently allowed
      //   "Identifier": "9876543210"
      // }
    },

    // Optional: enable webhook for notification delivery
    // "subscription": {
    //   "Webhook": {
    //     "Url": "https://tpp.example.com/insurance-webhook",
    //     "IsActive": true
    //   }
    // }
  }
]
```