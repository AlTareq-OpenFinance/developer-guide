
```json
"authorization_details": [
  {
    "type": "urn:openfinanceuae:account-access-consent:v1.2",
    "consent": {
      "ConsentId": "{{unique-guid}}", // Unique ID assigned by the TPP
      "ExpirationDateTime": "2026-05-03T15:46:00.000Z", // Max 1 year from today (ISO 8601 format with timezone)

      // Optional: specify start of transaction period (inclusive)
      // "TransactionFromDateTime": "2024-05-03T00:00:00.000Z",

      // Optional: specify end of transaction period (inclusive)
      // "TransactionToDateTime": "2025-05-03T00:00:00.000Z",

      "Permissions": [
        "ReadAccountsBasic",
        "ReadBalances",
        "ReadTransactionsBasic",
        "ReadTransactionsCredits",
        "ReadTransactionsDetail",
        "ReadDirectDebits",
        "ReadBeneficiariesBasic",
        "ReadBeneficiariesDetail",
        "ReadScheduledPaymentsBasic",
        "ReadScheduledPaymentsDetail",
        "ReadStandingOrdersBasic",
        "ReadStandingOrdersDetail",
        "ReadParty",
        "ReadPartyUserIdentity",
        "ReadProduct"
      ],

      "OpenFinanceBilling": {
        "UserType": "Retail", // Options: Retail, SME, Corporate
        "Purpose": "AccountAggregation" // Purpose of data sharing (e.g., RiskAssessment, BudgetingAnalysis)
      },

      // Optional: to link to other ConsentId e.g. when renewing long-lived consents
      // "BaseConsentId": "existing-consent-id",

      // Optional: for consent on behalf of another legal entity
      // "OnBehalfOf": {
      //   "TradingName": "Ozone",
      //   "LegalName": "Ozone-CBUAE",
      //   "IdentifierType": "Other", // Only 'Other' allowed for now
      //   "Identifier": "1234567890"
      // },

      // Optional: filter by account types
      // "AccountType": [
      //   "Retail", // Options: Retail, SME, Corporate
      //   "SME"
      // ],

      // Optional: filter by account subtypes
      // "AccountSubType": [
      //   "CurrentAccount", // Options: CurrentAccount, Savings
      //   "Savings"
      // ]
    },

    // Optional: to receive webhook notifications from LFI
    // "subscription": {
    //   "Webhook": {
    //     "Url": "https://tpp.example.com/webhook", // Must be a reachable HTTPS endpoint
    //     "IsActive": true
    //   }
    // }
  }
]
```