---
prev: false

next: false
---

# Postman

This postman collection supports operations covering some of the key functionality of AlTareq Open Finance.

## Download Postman Collection

You can download and import the full Postman collection here:

<a href="/developer-guide/json/AlTareq-bank-postman.json" download class="button">Download Postman Collection</a>

## Important Notes

In order to get the most from this postman file it is important you understand the following:

- **Model Bank** - If you're using this Postman collection for the first time, ensure you are building with the Model Bank as your LFI.
To learn how to configure environment variables and authenticate using one of the pre-configured test users, please refer to the [Model Bank documentation](../../model-bank/).


- **API Discovery** - Several requests use environment variables, which differ depending on the LFI you're interacting with. At a minimum, you will need to obtain the following values via API Discovery:
`{rs} - resource sever`, `{issuer}`, `{parEndpoint}`, `{tokenEndpoint}`, `{authEndpoint}`, and `{jwksURI}`.


- **JWT generation** - The collection includes utility requests (prefixed with `O3 Util`) that demonstrate how to generate JWTs for consent requests, client assertions, encrypt PII, etc. These are examples of functionality you MUST build - in production, they will not exist and you MUST NOT send your private signing key over the internet. You must implement this JWT generation securely on your own systems.

- **Pre Scripts and Post scripts** - Many requests include pre- and post-request scripts. These scripts dynamically generate important values such as UUIDs (e.g., `consentId`) and timestamps (e.g., expiry times set to 10 minutes in the future). It’s important to review and understand these scripts to see how the variables are constructed and used.

## How to Use

1. Download the Postman collection above.
2. Open **Postman** and click **Import**.
3. Select the downloaded `AlTareq-bank-postman.json` file.

##  Included API Functionality

### TPP Onboarding 
- <Post /> `/tpp-registration`

### Bank Data Sharing
- <Post /> `/par`
- <Post /> `/token`
- <GET /> `/balances`, `/transactions`, `/parties`
- <GET /> `/account-access-consents`

### Single Instant Payment
- <Post /> `/par`
- <Post /> `/token`
- <Post /> `/payments`
- <GET /> `/payments`

### Multi Payments
- <Post /> `/par`
- <Post /> `/token`
- <Post /> `/payments`
- <GET /> `/payments`

### Confirmation of Payee
- <Post /> `/token`
- <Post /> `/discovery`
- <Post /> `/confirmation`







