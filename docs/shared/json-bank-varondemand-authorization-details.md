
```json
"authorization_details":  
[
  {
    "type": "urn:openfinanceuae:service-initiation-consent:v1.2",
    "consent": {
      "ConsentId": "{{$guid}}",
      // "BaseConsentId": "{{$guid}}",
      // "IsSingleAuthorization": false, // set to false to allow multi-auth payment flows
      "ExpirationDateTime": "2025-11-03T15:46:00.000Z", // maximum 1 year from today
      // "Permissions": [
      //   "ReadAccountsBasic", 
      //   "ReadAccountsDetail", 
      //   "ReadBalances", 
      //   "ReadRefundAccount"
      //   ]
      "PersonalIdentifiableInformation": "{{encryptedPII}}",
      "ControlParameters": {
        "IsDelegatedAuthentication": false,
        "ConsentSchedule": {
          "MultiPayment": {
          //     // "MaximumCumulativeNumberOfPayments": 2,
          //     // "MaximumCumulativeValueOfPayments": {
          //     //     "Amount": "500.00",
          //     //     "Currency": "AED"
          //     // },
              "PeriodicSchedule": {
                  "Type": "VariableOnDemand",
                  "PeriodType": "Day",
                  "PeriodStartDate": "2025-07-13",
                  "Controls": {
                      "MaximumIndividualAmount": {
                          "Amount": "125.00",
                          "Currency": "AED"
                      },
                      // "MaximumCumulativeNumberOfPaymentsPerPeriod": 2,
                      // "MaximumCumulativeValueOfPaymentsPerPeriod": {
                      //     "Amount": "200.00",
                      //     "Currency": "AED"
                      // }
                  }
              }
          }
        }
      },
      // "DebtorReferences": "REFERENCE (purchase)",
      // "CreditorReference": "REFERENCE (sale)",
      "PaymentPurposeCode": "ACM" // must conform to the published AANI payment purpose codes
    },
    // "subscription": {
    //   "Webhook": {
    //     "Url": "http://localhost:4700/mock-event-receiver",
    //     "IsActive": true
    //   }
    // }
  }
]
```