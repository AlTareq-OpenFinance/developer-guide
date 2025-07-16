🕒 **10 minute read**

# Consent Management
As a TPP operating in Open Finance, you are legally and operationally required to manage user consent with precision and transparency. This guide outlines your responsibilities, the consent lifecycle, and the tools available to help you stay compliant and synchronized with the Open Finance Platform (OFP).


## Consent Types
Users can grant two types of consent:

#### Single-Use Consent
Purpose: One-time access for immediate Data Sharing or Service Initiation. Use Cases:

- Single Instant Payments
- Future Dated Payments
- One-off Data requests


#### Long-Lived Consent
Purpose: Ongoing access for repeated Data Sharing or future Service Initiations. Use Cases:

- Multi-Payments
- Recurring Data access


## Consent Lifecycle & States
A Consent object transitions through several states:

`AwaitingAuthorization`: Consent is pending user authorization via the LFI.

`Authorized`: Consent is active and usable.

`Rejected`: User or LFI has denied the consent request.

`Suspended`: Temporarily disabled by the LFI (e.g., due to suspected fraud).

`Consumed`: Consent has been fully utilized (applicable only to Service Initiation Consents).

`Expired`: Consent has reached its validity period.

`Revoked`: User has withdrawn consent.

<br>

<img src="/images/demo/consent-states.png" alt="consent-states" />


*Note: Data Sharing Consents (both Single-Use and Long-Lived) cannot transition to Consumed.*

## TPP Obligations
As a TPP, you must:

**Accurately Represent Your Identity**: Clearly display your trading/brand name and, if different, the name of the user-facing entity in all user interactions and consent interfaces.

**Ensure User Understanding**: Present consent requests in a clear and understandable manner, detailing the data being accessed, the purpose, and the duration.

**Maintain Up-to-Date Consent Records**: Regularly check the consent state via the OFP and ensure your systems reflect the most current status.

**Notify OFP of Revocations**: If a user revokes consent through your platform, promptly inform the OFP to update the consent status.

**Inform Users About Data Processing Locations**: If user data will be processed or stored outside the UAE, disclose the specific locations and obtain explicit user agreement before proceeding.

## Tools for Consent Management
To manage and monitor consents effectively, utilize the following OFP API endpoints:

#### Account Access Consents

- <GET/> `/account-access-consents`: Retrieve a list of account bank data consents.

- <GET/> `/account-access-consents/{ConsentId}`: Retrieve details of a specific consent.

#### Payment Consents

- <GET/> `/payment-consents`: Retrieve a list of payment consents.

- <GET/> `/payment-consents/{ConsentId}`: Retrieve details of a specific consent.

####  Insurance Consents

- <GET/> `/insurance-consents`: Retrieve a list of insurance consents.


- <GET/> `/insurance-consents/{ConsentId}`: Retrieve details of a specific consent.

These endpoints all use the `client_credentials` grant type allowing you to programmatically check consent statuses and ensure your records are synchronized with the OFP.

### Consent Updates via Event Subscriptions
Subscribe to event notifications, by including your event catching URL within `subscription` object of the `authorization_request` payload.

```json
"authorization_details": [
      {
        "type": "urn:openfinanceuae:account-access-consent:v1.2",
        "consent": {
          ...
        },
        "subscription": {
          "Webhook": {
            "Url": <URL>, // enter the URL you use to catch events 
            "IsActive": true
          }
        }
      }
    ]
```

**Benefit**: Receive real-time updates when a consent state changes (e.g., state changes from Authorized to Revoked).