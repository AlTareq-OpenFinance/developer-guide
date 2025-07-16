---
aside: false
outline: false
---


<OAOperation :spec="spec"  operationId="InsuranceConsents_create" />

<script setup  lang="ts">
const spec = `openapi: 3.0.0
tags:
  - name: Pushed Authorization Requests
    description: >-
      Pushed Authorization Request endpoints is used by the TPP to submit a Rich Authorization Request (RAR) to the LFI for authorization.
servers: 
  - url: /open-finance/auth/v2.0-draft4
security: []
paths:
  /par:
    post:
      tags:
        - Pushed Authorization Requests
      operationId: InsuranceConsents_create
      summary: Pushed Authorization Request endpoint
      description: Submit a Rich Authorization Request (RAR) to the Pushed Authorization Request (PAR) Endpoint
      parameters: []
      responses:
        '201':
          description: >-
            The request has succeeded and a new resource has been created as a
            result.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PushedAuthorizationResponseBody'
        '400':
          description: The server could not understand the request due to invalid syntax.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OAuthBadRequestErrorResponse'
        '405':
          description: Method Not Allowed
        '413':
          description: Content Too Large
        '429':
          description: Too Many Requests
          headers:
            retry-after:
              required: true
              description: Number in seconds to wait
              schema:
                type: integer
                format: int64
      requestBody:
        required: true
        content:
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/PushedAuthorizationRequest'
components:
  schemas:
    IsSingleAuthorization:
      description: |
        Specifies to the LFI that the consent authorization must be completed in a single authorization Step 
        with the LFI
      type: "boolean"
    AEAccountAccessAuthorizationDetailConsentProperties:
      type: object
      required:
        - ConsentId
        - Permissions
        - ExpirationDateTime
        - OpenFinanceBilling
      properties:
        BaseConsentId:
          $ref: '#/components/schemas/AEBaseConsentId'
        ConsentId:
          $ref: '#/components/schemas/AEConsentId'
        Permissions:
          type: array
          items:
            $ref: '#/components/schemas/AEAccountAccesssConsentPermissionCodes'
          minItems: 1
        ExpirationDateTime:
          type: string
          format: date-time
          description: >-
            Specified date and time the permissions will expire.

            All date-time fields in responses must include the timezone. An
            example is below:

            2017-04-05T10:43:07+00:00
        TransactionFromDateTime:
          type: string
          format: date-time
          description: |
                Specified start date and time for the transaction query period.

                If this is not populated, the start date will be open ended, and
                data will be returned from the earliest available
                transaction.All dates in the JSON payloads are represented in
                ISO 8601 date-time format. 

                All date-time fields in responses must include the timezone. An
                example is below:

                2017-04-05T10:43:07+00:00
        TransactionToDateTime:
          type: string
          format: date-time
          description: |
                Specified end date and time for the transaction query period.

                If this is not populated, the end date will be open ended, and
                data will be returned to the latest available transaction.All
                dates in the JSON payloads are represented in ISO 8601 date-time
                format. 

                All date-time fields in responses must include the timezone. An
                example is below:

                2017-04-05T10:43:07+00:00
        AccountType:
          type: array
          items:
            $ref: '#/components/schemas/AEAccountTypeCode'
        AccountSubType:
          type: array
          items:
            $ref: '#/components/schemas/AEAccountSubTypeCode'
        OnBehalfOf:
          $ref: '#/components/schemas/AEOnBehalfOf'
        OpenFinanceBilling:
          $ref: '#/components/schemas/AEAccountAccessOpenFinanceBilling'
      additionalProperties: false
    AEAccountAccessOpenFinanceBilling:
      type: object
      required:
        - UserType
        - Purpose
      properties:
        UserType:
          description: Type of User
          type: string
          enum:
            - Retail
            - SME
            - Corporate
        Purpose:
          description: Purpose of data sharing request
          type: string
          enum:
            - AccountAggregation
            - RiskAssessment
            - TaxFiling
            - Onboarding
            - Verification
            - QuoteComparison
            - BudgetingAnalysis
            - FinancialAdvice
            - AuditReconciliation
      description: Billing parameters specified by the TPP
      additionalProperties: false
    AEAccountAccessAuthorizationDetailsConsent:
      type: object
      required:
        - type
        - consent
      properties:
        type:
          type: string
          enum:
            - urn:openfinanceuae:account-access-consent:v2.0
        consent:
          $ref: >-
            #/components/schemas/AEAccountAccessAuthorizationDetailConsentProperties
        subscription:
          $ref: '#/components/schemas/EventNotification'
      description: >-
        Properties for creating a consent object for the first time a User
        consents to TPP access to account information data
      additionalProperties: false
    AEAccountAccesssConsentPermissionCodes:
      type: string
      enum:
        - ReadAccountsBasic
        - ReadAccountsDetail
        - ReadBalances
        - ReadBeneficiariesBasic
        - ReadBeneficiariesDetail
        - ReadFXTransactionsBasic
        - ReadFXTransactionsDetail
        - ReadFXProducts
        - ReadTransactionsBasic
        - ReadTransactionsDetail
        - ReadProduct
        - ReadScheduledPaymentsBasic
        - ReadScheduledPaymentsDetail
        - ReadDirectDebits
        - ReadStandingOrdersBasic
        - ReadStandingOrdersDetail
        - ReadConsents
        - ReadPartyUser
        - ReadPartyUserIdentity
        - ReadParty
      description: >-
        Specifies the permitted account access policy data types. 

        This is a list of the data groups being consented by the User, and
        requested for authorization with the LFI.
    AEAccountSubTypeCode:
      type: string
      enum:
        - CurrentAccount
        - Savings
      description: Specifies the sub type of account (product family group)
    AEAccountTypeCode:
      type: string
      enum:
        - Retail
        - SME
        - Corporate
      description: Specifies the type of account (Retail, SME or Corporate).
    AEAmountAndCurrency:
      description: The Currency and Amount relating to the Payment
      type: object
      required:
        - Currency
        - Amount
      properties:
        Currency:
          $ref: '#/components/schemas/AEActiveOrHistoricCurrencyCode'
        Amount:
          $ref: '#/components/schemas/AEActiveOrHistoricAmount'
      additionalProperties: false
    AEBaseConsentId:
      type: string
      minLength: 1
      maxLength: 128
      description: >-
        The original ConsentId assigned by the TPP.


        It is used by the TPP for updating/renewing parameters associated with
        long-lived consents.

        It must be provided when long-lived consent parameters are
        updated/renewed for a current consent that has not yet finished.
    AEChargeBearerType1Code:
      type: string
      enum:
        - BorneByCreditor
        - BorneByDebtor
        - Shared
      description: >-
        Specifies which party/parties will bear the charges associated with the
        processing of the payment transaction.
    AEConsentId:
      type: string
      minLength: 1
      maxLength: 128
      description: >-
        Unique identification assigned by the TPP to identify the consent
        resource.
    AECurrencyRequest:
      type: object
      required:
        - ExtendedPurpose
        - CurrencyOfTransfer
      properties:
        InstructionPriority:
          allOf:
            - $ref: '#/components/schemas/AEInstructionPriority'
          description: >-
            Indicator of the urgency or order of importance that the instructing
            party would like the instructed party to apply to the processing of
            the instruction.
        ExtendedPurpose:
          type: string
          minLength: 1
          maxLength: 140
          description: >-
            Specifies the purpose of an international payment.
        ChargeBearer:
          $ref: '#/components/schemas/AEChargeBearerType1Code'
        CurrencyOfTransfer:
          type: string
          pattern: ^[A-Z]{3,3}$
          description: >-
            Specifies the currency of the to be transferred amount, which is
            different from the currency of the debtor's account.
        DestinationCountryCode:
          type: string
          pattern: '[A-Z]{2,2}'
          description: >-
            Country in which Credit Account is domiciled. Code to identify a
            country, a dependency, or another area of particular geopolitical
            interest, on the basis of country names obtained from the United
        ExchangeRateInformation:
          $ref: '#/components/schemas/AEExchangeRateInformation'
        FxQuoteId:
          description: Required where the consent or payment initiation request relates to a previously
            quoted FX trade. The TPP must provide the QuoteId value where the payment type is a 
            single instant payment, or omit an provide in the payment initiation request where a
            long-lived consent exists.
          type: string
          minLength: 1
          maxLength: 128
      description: >-
        The details of the non-local currency or FX request that has been agreed
        between the User and the TPP.

        The requested ChargeBearer and ExchangeRateInformation are included in
        this object may be overwritten by the LFI in the returned Consent
        object.
      additionalProperties: false
    AEExchangeRateInformation:
      type: object
      required:
        - UnitCurrency
        - RateType
      properties:
        UnitCurrency:
          type: string
          pattern: ^[A-Z]{3,3}$
          description: >-
            Currency in which the rate of exchange is expressed in a currency
            exchange. In the example 1GBP = xxxCUR, the unit currency is GBP.
        ExchangeRate:
          type: number
          description: >-
            The factor used for conversion of an amount from one currency to
            another. This reflects the price at which one currency was bought
            with another currency.
        RateType:
          $ref: '#/components/schemas/AERateType'
        ContractIdentification:
          type: string
          minLength: 1
          maxLength: 256
          description: >-
            Unique and unambiguous reference to the foreign exchange contract
            agreed between the initiating party/creditor and the debtor agent.
      description: Provides details on the currency exchange rate and contract.
      additionalProperties: false
    AEInstructionPriority:
      type: string
      enum:
        - Normal
        - Urgent
    AEInsuranceAuthorizationDetailsConsent:
      type: object
      required:
        - type
        - consent
      properties:
        type:
          type: string
          enum:
            - urn:openfinanceuae:insurance-consent:v2.0
        consent:
          $ref: '#/components/schemas/OBInsuranceAuthorizationDetailConsentProperties'
        subscription:
          $ref: '#/components/schemas/EventNotification'
      description: >-
        Properties for creating a consent object for the first time a User
        consents to TPP access to insurance data or services
      additionalProperties: false
    AEJWEPaymentPII:
      description: A JSON Web Encryption (JWE) object, which encapsulates a JWS. The value is a 
        compact serialization of a JWE, which is a string consisting of five 
        base64url-encoded parts joined by dots. It encapsulates encrypted content 
        using JSON data structures.

        The decrypted JWS content has the structure of the AEPaymentPII schema.
      type: string
    AEConfirmationOfPayeeResponse:
      description: The JSON Web Signature returned by the Payee Confirmation operation at the 
        Confirmation of Payee API. The value must be the full JWS string, including the 
        header and signature, without decoding to an object. If Confirmation of Payee is 
        not performed this property can be omitted
      type: string
      pattern: '^.+\..+\..+$'
    AEPaymentPII:
      type: "object"
      additionalProperties: false
      description: "Elements of Personal Identifiable Information data"
      properties:
        Initiation:
          type: "object"
          additionalProperties: false
          description: "The Initiation payload is sent by the initiating party to the LFI. It is used to request movement of funds from the debtor account to a creditor."
          properties:
            DebtorAccount:
              type: "object"
              additionalProperties: false
              required:
                - "SchemeName"
                - "Identification"
              description: "Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction."
              properties:
                SchemeName:
                  description: "Name of the identification scheme, in a coded form as published in an external list."
                  type: "string"
                  enum:
                    - "IBAN"
                Identification:
                  description: |
                    Identification for the account assigned by the LFI based on the Account Scheme Name. 
                    This identification is known by the User account owner.
                  type: "string"
                  minLength: 1
                Name:
                  type: "object"
                  description: |
                    The Account Holder Name is the name or names of the Account owner(s) represented at the account level
                  properties:
                    en:
                      type: "string"
                      description: "English value of the string"
                      maxLength: 70
                    ar:
                      type: "string"
                      description: "Arabic value of the string"
                      maxLength: 70
                  additionalProperties: false
            Creditor:
              description: |
                (Array) Identification elements for a Creditor associated with the consent
              type: "array"
              minItems: 1
              items:
                $ref: "#/components/schemas/AECreditor"
        Risk:
          $ref: "#/components/schemas/AERisk"
    AECreditor:
      additionalProperties: false
      type: object
      description: Identification elements for a Creditor.
      properties:
        CreditorAgent:
          description: |
            Refers to the Financial Institution.
          type: "object"
          required:
            - "SchemeName"
            - "Identification"
          properties:
            SchemeName:
              type: "string"
              description: |
                Refers to the Identification scheme for uniquely identifying the Agent.
                
                * BICFI: The BIC/SWIFT Code
                * Other: The ID; A Country Code followed by a Bank Code (4 character code). The full list of LFI names and 6 digits IDs are as follows:
              enum:
                - "BICFI"
                - "Other"
            Identification:
              description: |
                The Agent is the Country Code followed by a Bank Code"
              type: "string"
            Name:
              description: "Name by which an agent is known and which is usually used to identify that agent."
              type: "string"
              minLength: 1
              maxLength: 140
            PostalAddress:
              $ref: "#/components/schemas/AEAddress"
        Creditor:
          type: "object"
          additionalProperties: false
          description: "Party to which an amount of money is due."
          properties:
            Name:
              description: | 
                Name by which a party is known and which is usually used to identify that party.
                This may be used to identify the Creditor for international payments.
              type: "string"
              minLength: 1
              maxLength: 140
            PostalAddress:
              description: |
                (Array) Address information that locates and identifes a specific address, as defined by a national or international postal service."
              type: "array"
              minItems: 1
              items:
                type: "object"
                required:
                  - "AddressType"
                  - "Country"
                properties:
                  AddressType:
                    $ref: "#/components/schemas/AEAddressTypeCode"
                  ShortAddress:
                    $ref: "#/components/schemas/AEShortAddress"
                  UnitNumber:
                    $ref: "#/components/schemas/AEUnitNumber"
                  FloorNumber:
                    $ref: "#/components/schemas/AEFloorNumber"
                  BuildingNumber:
                    $ref: "#/components/schemas/AEBuildingNumber"
                  StreetName:
                    $ref: "#/components/schemas/AEStreetName"
                  SecondaryNumber:
                    $ref: "#/components/schemas/AESecondaryNumber"
                  District:
                    $ref: "#/components/schemas/AEDistrict"
                  PostalCode:
                    $ref: "#/components/schemas/AEPostalCode"
                  POBox:
                    $ref: "#/components/schemas/AEPOBox"
                  ZipCode:
                    $ref: "#/components/schemas/AEZipCode"
                  City:
                    $ref: "#/components/schemas/AECity"
                  Region:
                    $ref: "#/components/schemas/AERegion"
                  Country:
                    $ref: "#/components/schemas/AECountryCode"
                additionalProperties: false
        CreditorAccount:
          description: "Unambiguous identification of the account of the creditor to which a credit entry will be posted."
          type: "object"
          additionalProperties: false
          required:
            - "SchemeName"
            - "Identification"
            - "Name"
          properties:
            SchemeName:
              $ref: "#/components/schemas/AECreditorExternalAccountIdentificationCode"
            Identification:
              $ref: "#/components/schemas/AEIdentification"
            Name:
              $ref: "#/components/schemas/AEName"
            TradingName:
              $ref: "#/components/schemas/AETradingName"
        ConfirmationOfPayeeResponse:
          $ref: "#/components/schemas/AEConfirmationOfPayeeResponse"
    AERisk:
      additionalProperties: false
      description: |
        The Risk section is sent by the TPP to the LFI. It is used to specify additional details for risk/fraud scoring regarding Payments.
      type: "object"
      properties:
        DebtorIndicators:
          $ref: "#/components/schemas/AEDebtorIndicators"
        DestinationDeliveryAddress:
          type: "object"
          description: |
            Destination Delivery Address
          properties:
            RecipientType:
              type: "string"
              description: "The recipient of the goods whether an individual or a corporation."
              enum:
                - "Individual"
                - "Corporate"
            RecipientName:
              type: "object"
              description: "The name of the recipient of the goods, whether an individual or a corporation."
              properties:
                en:
                  type: "string"
                  description: "English value of the string"
                ar:
                  type: "string"
                  description: "Arabic value of the string"
            NationalAddress:
              $ref: "#/components/schemas/AEAddress"
        TransactionIndicators:
          $ref: "#/components/schemas/AETransactionIndicators"
        CreditorIndicators:
          $ref: "#/components/schemas/AECreditorIndicators"
    AEDebtorIndicators:
      type: "object"
      description: |
        Debtor (User) Indicators
      properties:
        Authentication:
          type: "object"
          description: "The authentication method used by the User to access their account with the TPP"
          properties:
            AuthenticationChannel:
              description: Channel on which the User was authenticated
              type: string
              enum:
                - App
                - Web
            PossessionFactor:
              type: "object"
              description: "The User's possession, that only the User possesses"
              properties:
                IsUsed:
                  type: "boolean"
                Type:
                  type: "string"
                  enum:
                    - FIDO2SecurityKey
                    - Passkey
                    - OTPDevice
                    - OTPApp
                    - SMSOTP
                    - EmailOTP
                    - PushNotification
                    - WebauthnToken
                    - SecureEnclaveKey
                    - HardwareOTPKey
                    - TrustedDevice
                    - Other
            KnowledgeFactor:
              type: "object"
              description: "The User's knowledge, that only the User knows"
              properties:
                IsUsed:
                  type: "boolean"
                Type:
                  type: "string"
                  enum:
                    - PIN
                    - Password
                    - SecurityQuestion
                    - SMSOTP
                    - EmailOTP
                    - OTPPush
                    - Other
            InherenceFactor:
              type: "object"
              description: "The User's inherance, that is unique to the User's physical characteristics"
              properties:
                IsUsed:
                  type: "boolean"
                Type:
                  type: "string"
                  enum:
                    - Biometric
                    - Fingerprint
                    - FaceRecognition
                    - IrisScan
                    - VoiceRecognition
                    - FIDOBiometric
                    - DeviceBiometrics
                    - Other
            ChallengeOutcome:
              type: "string"
              description: "The result of multi-factor authentication performed by the TPP, with NotPerformed indication the User was not required to authenticate before consenting to the requested payment"
              enum:
                - Pass
                - Fail
                - NotPerformed
            AuthenticationFlow:
              type: "string"
              enum:
                - MFA
                - Other
            AuthenticationValue:
              type: "string"
              description: "Cryptographic proof of authentication where supported by the device and protocol."
            ChallengeDateTime:
              type: "string"
              format: "date-time"
        UserName:
          type: "object"
          description: "The Name of the User initiating the Payment"
          properties:
            en:
              type: "string"
              description: "English value of the string"
            ar:
              type: "string"
              description: "Arabic value of the string"
        GeoLocation:
          type: "object"
          description: "GPS to identify and track the whereabouts of the connected electronic device."
          required:
            - Latitude
            - Longitude
          properties:
            Latitude:
              type: "string"
              description: "latitude"
            Longitude:
              type: "string"
              description: "longitude"
        DeviceInformation:
          type: "object"
          description: "Detailed device information"
          properties:
            DeviceId:
              type: "string"
              description: "IMEISV number of the connected electronic device"
            AlternativeDeviceId:
              type: "string"
              description: "Alternative identifier for the connected electronic device"
            DeviceOperatingSystem:
              type: "string"
              description: "Device operating system"
            DeviceOperatingSystemVersion:
              type: "string"
              description: "Device operating system version"
            DeviceBindingId:
              type: "string"
              description: "An identifier that associates a device uniquely with a specific application"
            LastBindingDateTime:
              type: "string"
              format: "date-time"
              description: "Date and time when the device was last bound to the application"
            BindingDuration:
              type: "string"
              format: "duration"
              description: "ISO 8601 duration since device was last bound (e.g., P30D for 30 days)"
            BindingStatus:
              type: "string"
              description: "Current status of the device binding"
              enum:
                - Active
                - Expired
                - Revoked
                - Suspended
            DeviceType:
              type: "string"
              description: "Type of device used"
              enum:
                - Mobile
                - Desktop
                - Tablet
                - Wearable
                - Other
            DeviceManufacturer:
              type: "object"
              properties:
                Model:
                  type: "string"
                  description: "Device model name"
                  maxLength: 50
                Manufacturer:
                  type: "string"
                  description: "Device manufacturer"
                  maxLength: 50
            DeviceLanguage:
              type: "string"
              description: "Device language"
            DeviceLocalDateTime:
              type: "string"
              description: "Device local time"
            ConnectionType:
              type: "string"
              description: "Type of connection to the internet"
              enum:
                - WiFi
                - Cellular
                - Other
            ScreenInformation:
              type: "object"
              properties:
                PixelDensity:
                  type: "number"
                  description: "Screen pixel density"
                Orientation:
                  type: "string"
                  enum:
                    - Portrait
                    - Landscape
            BatteryStatus:
              type: "object"
              properties:
                Level:
                  type: "number"
                  minimum: 0
                  maximum: 100
                IsCharging:
                  type: "boolean"
            TouchSupport:
              type: "object"
              properties:
                Supported:
                  type: "boolean"
                MaxTouchPoints:
                  type: "integer"
                  minimum: 0
            MotionSensors:
              type: "object"
              properties:
                Status:
                  type: "string"
                  enum:
                    - InMotion
                    - Stationary
                Accelerometer:
                  type: "boolean"
                Gyroscope:
                  type: "boolean"
            DeviceEnvironmentContext:
              type: "array"
              description: "List of device environment context"
              items:
                type: "string"
                enum:
                  - VPNDetected
                  - EmulatorDetected
        BiometricCapabilities:
          type: "object"
          description: "Device biometric capabilities"
          properties:
            SupportsBiometric:
              type: "boolean"
              description: "Whether device supports biometric authentication"
            BiometricTypes:
              type: "array"
              description: "Types of biometric authentication supported"
              items:
                type: "string"
                enum:
                  - Fingerprint
                  - FacialRecognition
                  - Iris
                  - VoicePrint
                  - Other
        AppInformation:
          type: "object"
          description: "Mobile application specific information"
          properties:
            AppVersion:
              type: "string"
              description: "Version of the mobile application"
            PackageName:
              type: "string"
              description: "Application package identifier"
            BuildNumber:
              type: "string"
              description: "Application build number"
        BrowserInformation:
          type: "object"
          description: "Browser-specific information"
          properties:
            UserAgent:
              type: "string"
              description: "Complete browser user agent string"
            IsCookiesEnabled:
              type: "boolean"
              description: "Whether cookies are enabled in the browser"
            AvailableFonts:
              type: "array"
              description: "List of available fonts"
              items:
                type: "string"
            Plugins:
              type: "array"
              description: "List of installed browser plugins"
              items:
                type: "string"
            PixelRatio:
              type: "number"
              description: "Device pixel ratio for scaling"
        UserBehavior:
          type: "object"
          description: "User behavior indicators"
          properties:
            ScrollBehavior:
              type: "object"
              properties:
                Direction:
                  type: "string"
                  enum:
                    - Up
                    - Down
                    - Both
                Speed:
                  type: "number"
                  description: "Average scroll speed in pixels per second"
                Frequency:
                  type: "number"
                  description: "Number of scroll events per minute"
        AccountRiskIndicators:
          type: "object"
          description: "Risk indicators related to the account"
          properties:
            UserOnboardingDateTime:
              type: "string"
              format: "date-time"
              description: "The exact date and time when the User account was activated with the TPP."
            LastAccountChangeDate:
              type: "string"
              format: "date"
              description: "Date that the User's account was last changed"
            LastPasswordChangeDate:
              type: "string"
              format: "date"
              description: "Date of the last password change by the User"
            SuspiciousActivity:
              type: "string"
              description: "Indicates any suspicious activity associated with the account"
              enum: 
                - NoSuspiciousActivity
                - SuspiciousActivityDetected
            TransactionHistory:
              type: "object"
              properties:
                LastDay:
                  type: "integer"
                  description: "Total transactions made by the account in the last 24 hours"
                  minimum: 0
                LastYear:
                  type: "integer"
                  description: "Total transactions made by the account in the past year"
                  minimum: 0
        SupplementaryData:
          type: "object"
          description: |
            Additional information that cannot be captured in the structured fields and/or any other specific block
            This may include information that is not available in the structured fields, such as a user's behavioural data
            like their typing speed and typing patterns.
          properties: {}
    AETransactionIndicators:
      type: "object"
      description: |
        Transaction Indicators
      properties:
        IsCustomerPresent:
          description: "This field differentiates between automatic and manual payment initiation."
          type: boolean
        IsContractPresent:
          description: "Indicates if the Creditor has a contractual relationship with the TPP."
          type: boolean
        Channel:
          description: "Where the payment has been initiated from."
          type: "string"
          enum:
            - Web
            - Mobile
        ChannelType:
          type: "string"
          description: "The channel through which the transaction is being conducted"
          enum:
            - ECommerce
            - InStore
            - InApp
            - Telephone
            - Mail
            - RecurringPayment
            - Other
        SubChannelType:
          type: "string"
          description: "More specific classification of the transaction channel"
          enum:
            - WebBrowser
            - MobileApp
            - SmartTV
            - WearableDevice
            - POSTerminal
            - ATM
            - KioskTerminal
            - Other
        PaymentProcess:
          type: "object"
          description: "Metrics related to the payment process duration and attempts"
          properties:
            TotalDuration:
              type: "integer"
              description: "Total time in seconds from payment initiation to completion"
              minimum: 0
            CurrentSessionAttempts:
              type: "integer"
              description: "Number of payment attempts in the current session"
              minimum: 1
            CurrentSessionFailedAttempts:
              type: "integer"
              description: "Number of failed payment attempts in the current session"
              minimum: 0
            Last24HourAttempts:
              type: "integer"
              description: "Number of payment attempts in the last 24 hours"
              minimum: 0
            Last24HourFailedAttempts:
              type: "integer"
              description: "Number of failed payment attempts in the last 24 hours"
              minimum: 0
        MerchantRisk:
          type: "object"
          description: "Risk indicator details provided by the merchant"
          properties:
            DeliveryTimeframe:
              type: "string"
              description: "Timeframe for the delivery of purchased items"
              enum: 
                - ElectronicDelivery
                - SameDayShipping
                - OvernightShipping
                - MoreThan1DayShipping
            ReorderItemsIndicator:
              type: "string"
              description: "Indicates if the transaction is a reorder"
              enum: 
                - FirstTimeOrder
                - Reorder
            PreOrderPurchaseIndicator:
              type: "string"
              description: "Indicates if this is a pre-ordered item"
              enum: 
                - MerchandiseAvailable
                - FutureAvailability
            IsGiftCardPurchase:
              type: "boolean"
              description: "Indicates if the transaction includes a gift card"
            IsDeliveryAddressMatchesBilling:
              type: "boolean"
              description: "Indicates if delivery address matches billing address"
            AddressMatchLevel:
              type: "string"
              description: "Level of match between delivery and billing addresses"
              enum:
                - FullMatch
                - PartialMatch
                - NoMatch
                - NotApplicable
        SupplementaryData:
          type: "object"
          description: |
            Additional information that cannot be captured in the structured fields and/or any other specific block
          properties: {}
    AECreditorIndicators:
      type: "object"
      description: |
        Creditor Indicators
      properties:
        AccountType:
          $ref: "#/components/schemas/AEAccountTypeCode"
        IsCreditorPrePopulated:
          $ref: "#/components/schemas/AEIsCreditorPrePopulated"
        TradingName:
          $ref: "#/components/schemas/AETradingName"
        IsVerifiedByTPP:
          $ref: "#/components/schemas/AEIsVerifiedbyTPP"
        AdditionalAccountHolderIdentifiers:
          $ref: "#/components/schemas/AEAdditionalAccountHolderIdentifiers"
        MerchantDetails:
          type: "object"
          description: |
            Details of the Merchant involved in the transaction.
            Merchant Details are specified only for those merchant categories that are generally expected to originate retail financial transactions
          properties:
            MerchantId:
              description: "MerchantId"
              type: "string"
              minLength: 8
              maxLength: 20
            MerchantName:
              description: "Name by which the merchant is known."
              type: "string"
              minLength: 1
              maxLength: 350
            MerchantSICCode:
              description: |
                SIC code stands for standard industrial classification (SIC) code.
                This four digit-number identifies a very specific short descriptor of the type of business a company is engaged in.
                SIC can be obtained from the Chamber of Commerce.
              type: "string"
              minLength: 3
              maxLength: 4
            MerchantCategoryCode:
              description: >
                Category code values are used to enable the classification of
                merchants into specific categories based on the type of business,
                trade or services supplied. 

                Category code conforms to ISO 18245, related to the type of services
                or goods the merchant provides for the transaction."
              type: string
              minLength: 3
              maxLength: 4
          additionalProperties: false
        IsCreditorConfirmed:
          description: Creditor account details have been confirmed successfully using Confirmation of Payee
          type: boolean
        ConfirmationOfPayeeResponse:
          $ref: "#/components/schemas/AEConfirmationOfPayeeResponse"
        SupplementaryData:
          type: "object"
          description: |
            Additional information that cannot be captured in the structured fields and/or any other specific block
          properties: {}
    AEIsCreditorPrePopulated:
      description: "Is Creditor populated"
      type: "boolean"
    AEIsVerifiedbyTPP:
      description: "The TPP has onboarded the Creditor"
      type: "boolean"
    AEAdditionalAccountHolderIdentifiers:
      type: "array"
      items:
        type: "object"
        description: "Provides the details to identify an account."
        required:
          - "SchemeName"
          - "Identification"
        properties:
          SchemeName:
            $ref: "#/components/schemas/AERiskExternalAccountIdentificationCode"
          Identification:
            $ref: "#/components/schemas/AEIdentification"
          Name:
            $ref: "#/components/schemas/AEName"
        additionalProperties: false
    AERiskExternalAccountIdentificationCode:
      description: "Name of the identification scheme, in a coded form as published in an external list."
      type: "string"
      enum:
        - "EmiratesID"
        - "TradeLicenceNumber"
    AEIdentification:
      description: |
        Identification for the account assigned by the LFI based on the Account Scheme Name. 
        This identification is known by the User account owner.
      type: "string"
      minLength: 1
    AEName:
      type: "object"
      description: |
        The Account Holder Name is the name or names of the Account owner(s) represented at the account level
      properties:
        en:
          type: "string"
          description: "English value of the string"
          maxLength: 70
        ar:
          type: "string"
          description: "Arabic value of the string"
          maxLength: 70
      additionalProperties: false
    AETradingName:
      type: "object"
      description: |
        The Trading Brand Name (if applicable) for the Creditor. 
        Applicable to Payments.
      properties:
        en:
          type: "string"
          description: "English value of the string"
          maxLength: 70
        ar:
          type: "string"
          description: "Arabic value of the string"
          maxLength: 70
      additionalProperties: false
    AEAddress:
      description: |
        (Array) Address information that locates and identifes a specific address, as defined by a national or international postal service."
      type: "array"
      minItems: 1
      items:
        type: "object"
        required:
          - "AddressType"
          - "Country"
        properties:
          AddressType:
            $ref: "#/components/schemas/AEAddressTypeCode"
          ShortAddress:
            $ref: "#/components/schemas/AEShortAddress"
          UnitNumber:
            $ref: "#/components/schemas/AEUnitNumber"
          FloorNumber:
            $ref: "#/components/schemas/AEFloorNumber"
          BuildingNumber:
            $ref: "#/components/schemas/AEBuildingNumber"
          StreetName:
            $ref: "#/components/schemas/AEStreetName"
          SecondaryNumber:
            $ref: "#/components/schemas/AESecondaryNumber"
          District:
            $ref: "#/components/schemas/AEDistrict"
          PostalCode:
            $ref: "#/components/schemas/AEPostalCode"
          POBox:
            $ref: "#/components/schemas/AEPOBox"
          ZipCode:
            $ref: "#/components/schemas/AEZipCode"
          City:
            $ref: "#/components/schemas/AECity"
          Region:
            $ref: "#/components/schemas/AERegion"
          Country:
            $ref: "#/components/schemas/AECountryCode"
        additionalProperties: false
    AEAddressTypeCode:
      description: "Specifies the nature of the Address."
      type: "string"
      enum:
        - "Business"
        - "Correspondence"
        - "Residential"
      example: "Residential"
    AEShortAddress:
      description: "A short address consists of four letters: region code, branch code, division code, unique code and a four-digit number for the building."
      type: "string"
      minLength: 1
      maxLength: 8
      example: "ABCD1234"
    AEUnitNumber:
      description: "Identifies the unit or apartment number."
      type: "string"
      minLength: 1
      maxLength: 10
      example: "6"
    AEFloorNumber:
      description: "Identifies the building floor number."
      type: "string"
      minLength: 1
      maxLength: 10
      example: "2"
    AEBuildingNumber:
      description: "Identifies the building number."
      type: "string"
      minLength: 1
      maxLength: 10
      example: "34"
    AEStreetName:
      description: "Identifies the street name or road."
      type: "string"
      minLength: 1
      maxLength: 70
      example: "Omar Bin Hassan Street"
    AEDistrict:
      description: "Identifies the district of a city."
      type: "string"
      minLength: 1
      maxLength: 35
      example: "Olaya Dist."
    AECountryCode:
      description: "Indicates the country code in which the address is located (References ISO 3166-1 alpha-2)."
      type: "string"
      pattern: "^[A-Z]{2,2}$"
      example: "SA"
    AEPostalCode:
      description: " Identifies the postal code; a unique code assigned to a specific geographic area for efficient mail sorting and delivery purposes."
      type: "string"
      minLength: 1
      maxLength: 10
      example: "12345"
    AEPOBox:
      description: " Identifies the POBox."
      type: "string"
      minLength: 1
      maxLength: 10
      example: "11562"
    AEZipCode:
      description: "Identifies the ZIP code; a unique code assigned to a specific geographic area for efficient mail sorting and delivery purposes."
      type: "string"
      minLength: 1
      maxLength: 10
      example: "12366"
    AESecondaryNumber:
      description: "4 numbers representing the accurate location coordinates of the address"
      type: "string"
      minLength: 4
      maxLength: 4
      example: "1233"
    AECity:
      description: "Identifies the name of the city or town where the address is situated."
      type: "string"
      minLength: 1
      maxLength: 35
      example: "Riyadh"
    AERegion:
      description: "Identifies the region."
      type: "string"
      minLength: 1
      maxLength: 35
      example: "North"
    AECreditorExternalAccountIdentificationCode:
      description: "Name of the identification scheme, in a coded form as published in an external list."
      type: "string"
      enum:
        - "IBAN"
        - "AccountNumber"
    AEOnBehalfOf:
      type: object
      properties:
        TradingName:
          type: string
          description: Trading Name
        LegalName:
          type: string
          description: Legal Name
        IdentifierType:
          allOf:
            - $ref: '#/components/schemas/AEOnBehalfOfIdentifierType'
          description: Identifier Type
        Identifier:
          type: string
          description: Identifier
      additionalProperties: false
    AEOnBehalfOfIdentifierType:
      type: string
      enum:
        - Other
    AEPeriodStartDate:
      type: string
      format: date
      description: |
            Specifies the start date of when a payment schedule begins.
    AEPeriodType:
      type: string
      enum:
        - Day
        - Week
        - Month
        - Year
      description: |
            |Period Type|Description| 
            |-----------|-----------| 
            |Day|A continuous period of time, consisting of 24 consecutive hours, starting from midnight (00:00:00) and finishing at 23:59:59 of the same day. |
            |Week|A continuous period of time, consisting of seven consecutive days, starting from midnight (00:00:00) and finishing at 23:59:59 of the 7th day. |
            |Month|A continuous period of time starting from midnight (00:00:00) of the first day of a month and finishing at 23:59:59 of the last day of that month.|
            |Year|A continuous period of time, consisting of 12 months.|
    AERateType:
      type: string
      enum:
        - Actual
        - Agreed
        - Indicative
      description: Specifies the type used to complete the currency exchange.
    AERequestedExecutionDate:
      type: string
      format: date
      description: |
            The date when the TPP expects the LFI to execute the payment.
            The date must be in the future and cannot be on the same day or a day in the past. 
            The maximum date in the future that can be specified is 1 year from the day of the consent of the User to the TPP. 
            All dates in the JSON payloads are represented in ISO 8601 date format.
    AEServiceInitiationAuthorizationDetailConsent:
      type: object
      required:
        - type
        - consent
      properties:
        type:
          type: string
          enum:
            - urn:openfinanceuae:service-initiation-consent:v2.0
        consent:
          $ref: >-
            #/components/schemas/AEServiceInitiationAuthorizationDetailProperties
        subscription:
          $ref: '#/components/schemas/EventNotification'
      description: >-
        Properties for creating a consent object for the first time a User
        consents to TPP access to service initiation APIs
      additionalProperties: false
    AEServiceInitiationAuthorizationDetailProperties:
      type: object
      required:
        - ConsentId
        - PersonalIdentifiableInformation
        - ExpirationDateTime
        - ControlParameters
        - PaymentPurposeCode
      properties:
        ConsentId:
          $ref: '#/components/schemas/AEConsentId'
        BaseConsentId:
          $ref: '#/components/schemas/AEBaseConsentId'
        IsSingleAuthorization:
          $ref: '#/components/schemas/IsSingleAuthorization'
        AuthorizationExpirationDateTime:
          description: The date and time by which a Consent (in AwaitingAuthorization status) must be Authorized by the User.
          type: string
          format: date-time
        ExpirationDateTime:
          allOf:
            - $ref: '#/components/schemas/ARConsentExpirationDateTime'
          description: |
                Specified date and time the consent will expire.

                All dates in the JSON payloads are represented in ISO 8601 date-time format.
                All date-time fields in responses must include the timezone. An example is :2023-04-05T10:43:07+00:00
        Permissions:
          type: array
          items:
            $ref: '#/components/schemas/AEServiceInitiationConsentPermissionCodes'
          description: |
              Specifies the permitted Account Access data types.
              This is a list of the data groups being consented by the User, and requested for authorization with the LFI.

              This allows a TPP to request a balance check permission.
        CurrencyRequest:
          $ref: '#/components/schemas/AECurrencyRequest'
        PersonalIdentifiableInformation:
          description: Personal Identifiable Information, represented in both encoded and decoded form 
            using a oneOf, to help implementers readily understand both the structure and 
            serialized form of the property.

            **Implementations MUST reflect the AEJWEPaymentPII Schema Object**
            **structure and the notes provided on implementing a JWS and JWE**
            **The decoded form AEPaymentPII is for guidance on content only**
          oneOf:
          - $ref: "#/components/schemas/AEJWEPaymentPII"
          - $ref: "#/components/schemas/AEPaymentPII"
        ControlParameters:
          $ref: '#/components/schemas/AEServiceInitiationConsentControlParameters'
        DebtorReference:
          $ref: '#/components/schemas/AEServiceInitiationStructuredDebtorReference'
        CreditorReference:
          $ref: '#/components/schemas/AEServiceInitiationStructuredCreditorReference'
        PaymentPurposeCode:
          $ref: '#/components/schemas/AEServiceInitiationPaymentPurposeCode'
        SponsoredTPPInformation:
          $ref: '#/components/schemas/AEServiceInitiationSponsoredTPPInformation'
      additionalProperties: false
    AEServiceInitiationConsentControlParameters:
      type: object
      properties:
        IsDelegatedAuthentication:
          type: boolean
          description: Indicates whether the all payment controls will be defined and managed by the TPP under the Payment with Delegated Authentication capability
        ConsentSchedule:
          $ref: '#/components/schemas/AEServiceInitiationConsentSchedule'
      description: Control Parameters set the overall rules for the Payment Schedule
      additionalProperties: false
    AEServiceInitiationConsentPermissionCodes:
      type: string
      enum:
        - ReadAccountsBasic
        - ReadAccountsDetail
        - ReadBalances
        - ReadRefundAccount
    AEServiceInitiationConsentSchedule:
      type: object
      properties:
        SinglePayment:
          $ref: '#/components/schemas/AEServiceInitiationSinglePayment'
        MultiPayment:
          $ref: '#/components/schemas/AEServiceInitiationLongLivedPaymentConsent'
        FilePayment:
          $ref: '#/components/schemas/AEServiceInitiationFilePaymentConsent'
      description: |
            The various payment types that can be initiated:
            * A Single Payment
            * A Multi-Payment
            * A Combined Payment (one SinglePayment and one MultiPayment)
      additionalProperties: false
    AEServiceInitiationFixedDefinedSchedule:
      type: object
      required:
        - Type
        - Schedule
      properties:
        Type:
          type: string
          enum:
            - FixedDefinedSchedule
          description: The Periodic Schedule Type
        Schedule:
          type: array
          items:
            $ref: '#/components/schemas/AEServiceInitiationFixedSchedule'
          minItems: 1
          maxItems: 53
      description: >-
        Payment Schedule denoting a list of pre-defined future dated payments
        all with fixed amounts and dates.
      additionalProperties: false
    AEServiceInitiationVariableDefinedSchedule:
      type: object
      required:
        - Type
        - Schedule
      properties:
        Type:
          type: string
          enum:
            - VariableDefinedSchedule
          description: The Periodic Schedule Type
        Schedule:
          type: array
          items:
            $ref: '#/components/schemas/AEServiceInitiationVariableSchedule'
          minItems: 1
          maxItems: 53
      description: >-
        Payment Schedule denoting a list of pre-defined future dated payments
        all with variable amounts and dates.
      additionalProperties: false
    AEServiceInitiationFilePaymentConsent:
      type: object
      required:
        - FileType
        - FileHash
        - NumberOfTransactions
        - ControlSum
      properties:
        FileType:
          type: string
          minLength: 1
          maxLength: 40
          description: Specifies the payment file type
        FileHash:
          type: string
          minLength: 1
          maxLength: 44
          description: A base64 encoding of a SHA256 hash of the file to be uploaded.
        FileReference:
          $ref: '#/components/schemas/AEServiceInitiationReference'
        NumberOfTransactions:
          type: integer
          description: >-
            Number of individual transactions contained in the payment
            information group.
        ControlSum:
          type: string
          pattern: ^\d{1,16}\.\d{2}$
          description: >-
            Total of all individual amounts included in the group, irrespective
            of currencies.
        RequestedExecutionDate:
          $ref: '#/components/schemas/AERequestedExecutionDate'
      description: A Consent definition for defining Bulk/Batch Payments
      additionalProperties: false
    AEServiceInitiationFixedPeriodicSchedule:
      type: object
      required:
        - Type
        - PeriodType
        - PeriodStartDate
        - Amount
      properties:
        Type:
          type: string
          enum:
            - FixedPeriodicSchedule
        PeriodType:
          $ref: '#/components/schemas/AEPeriodType'
        PeriodStartDate:
          $ref: '#/components/schemas/AEPeriodStartDate'
        Amount:
          $ref: '#/components/schemas/AEAmountAndCurrency'
      description: >-
        Payment Controls that apply to all payment instructions in a given
        period under this payment consent.
        The payments for this consent must be executed only on the PeriodStartDate, and
        dates recurring based on the PeriodType.
      additionalProperties: false
    AEServiceInitiationFixedOnDemand:
      type: object
      required:
        - Type
        - PeriodType
        - PeriodStartDate
        - Amount
        - Controls
      properties:
        Type:
          type: string
          enum:
            - FixedOnDemand
        PeriodType:
          $ref: '#/components/schemas/AEPeriodType'
        PeriodStartDate:
          $ref: '#/components/schemas/AEPeriodStartDate'
        Amount:
          $ref: '#/components/schemas/AEAmountAndCurrency'
        Controls:
          type: "object"
          minProperties: 1
          additionalProperties: false
          properties:
            MaximumCumulativeValueOfPaymentsPerPeriod:
              allOf:
                - $ref: '#/components/schemas/AEAmountAndCurrency'
              description: >-
                The maximum cumulative payment value of all payment initiations per
                Period Type.
            MaximumCumulativeNumberOfPaymentsPerPeriod:
              type: integer
              description: The maximum frequency of payment initiations per Period Type.
      description: >-
        Payment Controls that apply to all payment instructions in a given
        period under this payment consent.
        The payments for this consent may be executed on any date, as long as they are within the Controls for a PeriodType
      additionalProperties: false
    AEServiceInitiationFutureDatedPayment:
      type: object
      required:
        - Type
        - Amount
        - RequestedExecutionDate
      properties:
        Type:
          type: string
          enum:
            - SingleFutureDatedPayment
        Amount:
          $ref: '#/components/schemas/AEAmountAndCurrency'
        RequestedExecutionDate:
          $ref: '#/components/schemas/AERequestedExecutionDate'
      description: >-
        A single payment consent that MUST be used for a single payment executed by the LFI on a future date. 
        This payment consent will be authorized by the User during the payment journey, and the payment will be exectued by the TPP immediately.
      additionalProperties: false
    AEServiceInitiationLongLivedPaymentConsent:
      type: object
      required:
        - PeriodicSchedule
      properties:
        MaximumCumulativeValueOfPayments:
          allOf:
            - $ref: '#/components/schemas/AEAmountAndCurrency'
          description: |
                The maximum cumulative value of all successful payment rails executions under the Consent. 
                Each successful payment rails execution amount (related to the Consent) is added to the total cumulative value of the Consent which cannot exceed the maximum value agreed with the User at the point of consent.
        MaximumCumulativeNumberOfPayments:
          type: integer
          description: |
                The maximum cumulative number of all successful payment rails executions under the Consent. 
                Each successful payment rails execution (related to the Consent) is added to the total cumulative number of payments for the Consent which cannot exceed the maximum value agreed with the User at the point of consent.
        PeriodicSchedule:
          $ref: >-
            #/components/schemas/AEServiceInitiationLongLivedPaymentConsentPeriodicSchedule
      description: A Consent definition for defining Multi Payments
      additionalProperties: false
    AEServiceInitiationLongLivedPaymentConsentPeriodicSchedule:
      oneOf:
      - $ref: '#/components/schemas/AEServiceInitiationFixedDefinedSchedule'
      - $ref: '#/components/schemas/AEServiceInitiationVariableDefinedSchedule'
      - $ref: '#/components/schemas/AEServiceInitiationFixedPeriodicSchedule'
      - $ref: '#/components/schemas/AEServiceInitiationVariablePeriodicSchedule'
      - $ref: '#/components/schemas/AEServiceInitiationFixedOnDemand'
      - $ref: '#/components/schemas/AEServiceInitiationVariableOnDemand'
      discriminator:
        propertyName: Type
      description: The definition for a schedule
      additionalProperties: false
    AEServiceInitiationPaymentPurposeCode:
      type: string
      minLength: 1
      maxLength: 3
      pattern: ^[A-Z]{3}$
      description: A category code that relates to the type of services or goods that corresponds to the 
        underlying purpose of the payment. The code must conform to the published AANI 
        payment purpose code list.
    AEServiceInitiationReference:
      type: string
      minLength: 1
      maxLength: 120
      description: A reason or reference in relation to a payment.
    AEServiceInitiationStructuredCreditorReference:
      description: |
        A reason or reference in relation to a payment, set to facilitate a structured Creditor reference consisting of:

        * TPP ID and BIC for the Debtor Account, followed by freeform text to a maximum of 120 characters.

        The TPP ID value will match the organization ID value from the Trust Framework, and therefore will be a v4 UUID.

        A BIC is specific according to the standard format for ISO 20022, and can therefore be either 8 or 11 characters in length.

        If the value of the concatenated string exceeds 120 characters, the TPP must first omit or truncate the freeform element of the reference.
      type: "string"
      minLength: 1
      maxLength: 120
      pattern: "^TPP=[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12},BIC=[A-Z0-9]{4}[A-Z0-9]{2}[A-Z0-9]{2}([A-Z0-9]{3}){0,1}($|,.+$)"
    AEServiceInitiationStructuredDebtorReference:
      description: |
        A reason or reference in relation to a payment, set to facilitate a structured Debtor reference consisting of:

        * For payments to Merchants: TPP ID, Merchant ID, BIC for the Creditor Account, followed by freeform text to a maximum of 120 characters.

        * For other payments: TPP ID and BIC for the Creditor Account, followed by freeform text to a maximum of 120 characters.

        The TPP ID value will match the organization ID value from the Trust Framework, and therefore will be a v4 UUID.

        The Merchant ID wil be as per the existing Aani Core rules for the Merchant identification, and will incorporate the Trade License number for the Merchant.

        A BIC is specific according to the standard format for ISO 20022, and can therefore be either 8 or 11 characters in length.

        If the value of the concatenated string exceeds 120 characters, the TPP must omit or truncate the freeform element of the reference.
      type: "string"
      minLength: 1
      maxLength: 120
      pattern: "^TPP=[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12},(Merchant=[A-Z0-9]{3}-[A-Z]{4}-TL.+-[0-9]{4}|),BIC=[A-Z0-9]{4}[A-Z0-9]{2}[A-Z0-9]{2}([A-Z0-9]{3}){0,1}($|,.+$)"
    AEServiceInitiationFixedSchedule:
      type: object
      required:
        - PaymentExecutionDate
        - Amount
      properties:
        PaymentExecutionDate:
          type: string
          format: date
          description: |
                Used to specify the expected payment execution date/time.
                All dates in the JSON payloads are represented in ISO 8601 date format.
                An example is: 2023-04-05
        Amount:
          $ref: '#/components/schemas/AEAmountAndCurrency'
      additionalProperties: false
    AEServiceInitiationVariableSchedule:
      type: object
      required:
        - PaymentExecutionDate
        - MaximumIndividualAmount
      properties:
        PaymentExecutionDate:
          type: string
          format: date
          description: >-
            Used to specify the expected payment execution date/time.
            All dates in the JSON payloads are represented in ISO 8601 date format.
            An example is: 2023-04-05
        MaximumIndividualAmount:
          allOf:
            - $ref: '#/components/schemas/AEAmountAndCurrency'
          description: >-
            This is the Maximum amount a variable payment can take per period.
      additionalProperties: false
    AEServiceInitiationSingleInstantPayment:
      type: object
      required:
        - Type
        - Amount
      properties:
        Type:
          type: string
          enum:
            - SingleInstantPayment
          description: The Payment Type
        Amount:
          $ref: '#/components/schemas/AEAmountAndCurrency'
      description: >-
        A single immediate payment consent that MUST be used for a single
        payment which will be initiated immediately after User authorization at
        the LFI.
      additionalProperties: false
    AEServiceInitiationSinglePayment:
      anyOf:
        - $ref: '#/components/schemas/AEServiceInitiationSingleInstantPayment'
        - $ref: '#/components/schemas/AEServiceInitiationFutureDatedPayment'
      discriminator:
        propertyName: Type
        mapping:
          SingleInstantPayment: '#/components/schemas/AEServiceInitiationSingleInstantPayment'
          SingleFutureDatedPayment: '#/components/schemas/AEServiceInitiationFutureDatedPayment'
      description: A Consent definition for defining Single Payments
    AEServiceInitiationSponsoredTPPInformation:
      type: object
      required:
        - Name
        - Identification
      properties:
        Name:
          type: string
          minLength: 1
          maxLength: 50
          description: The Sponsored TPP Name
        Identification:
          type: string
          minLength: 1
          maxLength: 50
          description: The Sponsored TPP Identification
      description: |
            The Sponsored TPP is:
            * A TPP that itself has no direct Open Banking API integrations. 
            * A TPP that is using the integration of another TPP that does have direct Open Banking API integrations.
      additionalProperties: false
    AEServiceInitiationVariablePeriodicSchedule:
      type: object
      required:
        - Type
        - PeriodType
        - PeriodStartDate
        - MaximumIndividualAmount
      properties:
        Type:
          type: string
          enum:
            - VariablePeriodicSchedule
        PeriodType:
          $ref: '#/components/schemas/AEPeriodType'
        PeriodStartDate:
          $ref: '#/components/schemas/AEPeriodStartDate'
        MaximumIndividualAmount:
          allOf:
            - $ref: '#/components/schemas/AEAmountAndCurrency'
          description: >-
                This is the Maximum amount a variable payment can take per period.
      description: >-
        Payment Controls that apply to all payment instructions in a given
        period under this payment consent.
        The payments for this consent must be executed only on the PeriodStartDate, and
        dates recurring based on the PeriodType.
      additionalProperties: false
    AEServiceInitiationVariableOnDemand:
      type: object
      required:
        - Type
        - PeriodType
        - PeriodStartDate
        - Controls
      properties:
        Type:
          type: string
          enum:
            - VariableOnDemand
        PeriodType:
          $ref: '#/components/schemas/AEPeriodType'
        PeriodStartDate:
          $ref: '#/components/schemas/AEPeriodStartDate'
        Controls:
          type: "object"
          minProperties: 1
          additionalProperties: false
          properties:
            MaximumIndividualAmount:
              allOf:
                - $ref: '#/components/schemas/AEAmountAndCurrency'
              description: >-
                This is the Maximum amount a variable payment can take per period.
            MaximumCumulativeValueOfPaymentsPerPeriod:
              allOf:
                - $ref: '#/components/schemas/AEAmountAndCurrency'
              description: >-
                The maximum cumulative payment value of all payment initiations per
                Period Type.
            MaximumCumulativeNumberOfPaymentsPerPeriod:
              type: integer
              description: The maximum frequency of payment initiations per Period Type.
      description: >-
        Payment Controls that apply to all payment instructions in a given
        period under this payment consent.
        The payments for this consent may be executed on any date, as long as they are within the Controls for a PeriodType
      additionalProperties: false
    ARConsentExpirationDateTime:
      type: string
      format: date-time
    AEActiveOrHistoricAmount:
      description: "A number of monetary units specified in an active currency where the unit of currency is explicit and compliant with ISO 4217."
      type: "string"
      pattern: "^\\d{1,16}\\.\\d{2}$"
      example: "100.00"
    AEActiveOrHistoricCurrencyCode:
      description: "A 3 character alphabetic code allocated to a currency under an international currency identification scheme, as described in the latest edition of the international standard ISO 4217 'Codes for the representation of currencies and funds'."
      type: "string"
      pattern: "^[A-Z]{3,3}$"
      example: "AED"
    EventNotification:
      type: object
      required:
        - Webhook
      properties:
        Webhook:
          $ref: '#/components/schemas/OBWebhook'
      additionalProperties: false
    OAuthBadRequestErrorResponse:
      type: object
      allOf:
        - $ref: '#/components/schemas/OAuthErrorResponse'
      description: Bad Request
      additionalProperties: false
    OAuthErrorCodes:
      type: string
      enum:
        - invalid_request
        - invalid_client
        - invalid_grant
        - unauthorized_client
        - unsupported_grant_type
        - invalid_scope
      description: >-
        Status code corresponding to error condition to be returned to the
        client
    OAuthErrorResponse:
      type: object
      required:
        - error
      properties:
        error:
          $ref: '#/components/schemas/OAuthErrorCodes'
        error_description:
          type: string
          description: Description of the error providing additional information
        error_uri:
          type: string
          description: >-
            A URI identifying a human-readable web page with information about
            the error
      description: Error returned from endpoints compliant with security profile
      additionalProperties: false
    OBBaseConsentId:
      type: string
      minLength: 1
      maxLength: 128
      description: >-
        The original ConsentId assigned by the TPP.


        It is used by the TPP for updating/renewing parameters associated with
        long-lived consents.

        It must be provided when long-lived consent parameters are
        updated/renewed for a current consent that has not yet finished.
    OBConsentId:
      type: string
      minLength: 1
      maxLength: 128
      description: >-
        Unique identification assigned by the TPP to identify the consent
        resource.
    AEConsentPermissionCodes:
      type: string
      enum:
        - ReadInsurancePolicies
        - ReadCustomerBasic
        - ReadCustomerDetail
        - ReadCustomerPaymentDetails
        - ReadInsuranceProduct
        - ReadCustomerClaims
        - ReadInsurancePremium
    OBConsentPermissions:
      description: The permissions codes available to TPPs. Codes are qualified by insurance type
        which allows multiple sets of permissions to be selected in each consent.
      type: object
      required:
        - InsuranceType
        - Permissions
      properties:
        InsuranceType:
          type: string
          enum:
            - Employment
            - Health
            - Home
            - Life
            - Motor
            - Renters
            - Travel
          description: The insurance sector to which the permissions relate.
        Permissions:
          type: array
          items:
            $ref: '#/components/schemas/AEConsentPermissionCodes'
          minItems: 1
          description: The data clusters requested by the TPP, based on agreement with the User.
            Data will be returned based on the selected permissions.
      additionalProperties: false
    OBInsuranceAuthorizationDetailConsentProperties:
      type: object
      required:
        - ConsentId
        - Permissions
        - ExpirationDateTime
        - OpenFinanceBilling
      properties:
        ConsentId:
          $ref: '#/components/schemas/OBConsentId'
        BaseConsentId:
          $ref: '#/components/schemas/OBBaseConsentId'
        Permissions:
          type: array
          items:
            $ref: '#/components/schemas/OBConsentPermissions'
          minItems: 1
        OpenFinanceBilling:
          $ref: '#/components/schemas/AEInsuranceOpenFinanceBilling'
        ExpirationDateTime:
          type: string
          format: date-time
          description: >-
            Specified date and time the permissions will expire.

            All date-time fields in responses must include the timezone. An
            example is below:

            2017-04-05T10:43:07+00:00
        OnBehalfOf:
          $ref: '#/components/schemas/AEOnBehalfOf'
      additionalProperties: false
    AEInsuranceOpenFinanceBilling:
      type: object
      required:
        - Purpose
      properties:
        Purpose:
          description: Purpose of data sharing request
          type: string
          enum:
            - AccountAggregation
            - RiskAssessment
            - PremiumHistory
            - ClaimHistory
            - Onboarding
            - Verification
            - QuoteComparison
            - FinancialAdvice
      description: Billing parameters specified by the TPP
      additionalProperties: false
    OBWebhook:
      type: object
      required:
        - Url
        - IsActive
      properties:
        Url:
          type: string
          description: The TPP Callback URL being registered with the LFI
        IsActive:
          type: boolean
          description: >-
            The TPP specifying whether the LFI should send (IsActive true) or
            not send (IsActive false) Webhook Notifications to the TPP's Webhook
            URL
      description: A Webhook Subscription Schema
      additionalProperties: false
    AELoginHintJwePayload:
      description: Provides the structure of the payload for the JWE used in the login_hint parameter
      type: object
      required:
      - Type
      - Identification
      properties:
        Type:
          description: The identification type, which can either be EmiratesID or TradeLicenseNumber
          type: string
          enum:
            - EmiratesID
            - TradeLicenseNumber
        Identification:
          description: The identification number value
          type: string
      additionalProperties: false
    PushedAuthorizationRequest:
      type: object
      required:
        - client_assertion_type
        - client_assertion
        - request
      properties:
        client_assertion_type:
          type: string
          enum:
            - urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer
        client_assertion:
          type: string
          description: private_key_jwt client assertion
        request:
          allOf:
            - $ref: '#/components/schemas/RichAuthorizationJar'
          description: >-
            Rich Authorization Request (RAR) that defines the required JSON Web
            Token (JWT) payload. This **does not** represent a correctly
            serialized JWT, but provides a Schema Object that correctly defines
            the supported RARs.
      additionalProperties: false
    PushedAuthorizationResponseBody:
      type: object
      required:
        - request_uri
        - expires_in
      properties:
        request_uri:
          type: string
          description: The request URI corresponding to the authorization request posted
        expires_in:
          type: integer
          description: >-
            A JSON number that represents the lifetime of the request URI in
            seconds as a positive integer
      additionalProperties: false
    RichAuthorizationJar:
      type: object
      required:
        - iss
        - exp
        - nbf
        - client_id
        - response_type
        - redirect_uri
        - scope
        - code_challenge
        - code_challenge_method
        - authorization_details
      properties:
        iss:
          type: string
          description: The Issuer claim for the JWT, as described in [RFC 7519](https://tools.ietf.org/html/rfc7519#section-4.1.1)
        aud:
          description: The Audience claim for the JWT, as described in [RFC 7519](https://tools.ietf.org/html/rfc7519#section-4.1.3)
          oneOf:
            - type: string
            - type: array
              items:
                type: string
        exp:
          description: The Expiration Time claim for the JWT, as described in [RFC 7519](https://tools.ietf.org/html/rfc7519#section-4.1.4)
          type: number
        nbf:
          description: The Not Before claim for the JWT, as described in [RFC 7519](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.5) and expanded in the FAPI 2.0 Security Profile.
          type: number
        client_id:
          description: The OAuth 2.0 Client ID of the Client, as set in the Open Finance Trust Framework (OFTF).
          type: string
        response_type:
          description: The OAuth 2.0 response type requested by the Client. This defaults to 'code', as per the FAPI 2.0 Security Profile, as only Authorization Code Flow is supported.
          type: string
          enum:
            - code
        redirect_uri:
          description: The OAuth 2.0 redirect URI of the Client, as set in the Open Finance Trust Framework. This **MUST** match a redirect URI value registered at the OFTF.
          type: string
        scope:
          description: The OAuth 2.0 scope requested by the Client. This **MUST** match one-or-more scope values provided in the API descriptions for the Open Finance Standards.
          type: string
        state:
          description: The OAuth 2.0 state value requested by the Client, as described in [RFC 6749](https://tools.ietf.org/html/rfc6749#section-4.1.1).
          type: string
        nonce:
          description: Nonce value as described in [OpenID Connect Core](https://openid.net/specs/openid-connect-core-1_0.html) and expanded in the FAPI 2.0 Security Profile.
          type: string
        max_age:
          description: Maximum Authentication Age as described in [OpenID Connect Core](https://openid.net/specs/openid-connect-core-1_0.html).
          type: integer
        login_hint:
          description: |
            Optional parameter that can be used to send the User's Emirates ID or Trade 
            License Number as an encrypted JSON Web Token (JWE). This mechanism is 
            provided to allow LFIs to correlate the User identity, and therefore the 
            features of their account, prior to the User being redirected to the LFI's 
            authentication page.

            The value **MUST** be a JWE, encrypted with the target LFI's public key 
            with the User identifier set as the JWE. The payload MUST be a JSON object 
            created based on the Schema Object AELoginHintJwePayload. This JSON 
            object will form the basis of the data contained in the JWE, and should 
            be signed with the TPP signing key to create a JSON Web Signature.

            Please note that, as per OpenID Connect Core, login_hint is used for 
            discovery and is supported to provide hints to the LFI on the User 
            identity and therefore the data or services supported at the LFI. 
            login_hint **MUST NOT** be used to bypass authentication of the User, nor 
            should a request be rejected if login_hint is not provided.

            The type value of the login_hint property is shown as a string due 
            to the limitations of the OpenAPI specification in cross-referencing a 
            Schema Object that is also a JSON Web Token, as there is no deterministic 
            mechanism to display the underlying structure of the JWE payload.
            This property is therefore represented in both encoded and decoded 
            form in the API description using a oneOf, to help implementers readily 
            understand both the structure and serialized form of the property.

            **Please ensure your implementation reflects the AELoginHintJwePayload Schema**
            **Object structure and any notes provided on implementing a JWS and JWE**
          oneOf:
            - description: A JSON Web Encryption (JWE) object, which encapsulates a JWS. The value is a 
                compact serialization of a JWE, which is a string consisting of five 
                base64url-encoded parts joined by dots. It encapsulates encrypted content 
                using JSON data structures.

                The decrypted JWE content has the structure of the AELoginHintJwePayload 
                schema.
              type: string
            - $ref: "#/components/schemas/AELoginHintJwePayload"
        code_challenge:
          description: Code challenge as described in [RFC 7636](https://www.rfc-editor.org/rfc/rfc7636.html#section-4.3), which implements the Proof Key for Code Exchange (PKCE) extension to OAuth 2.0. PKCE is mandated by the FAPI 2.0 Security Profile.
          type: string
        code_challenge_method:
          description: Code challenge method as described in [RFC 7636](https://www.rfc-editor.org/rfc/rfc7636.html#section-4.3), which implements the Proof Key for Code Exchange (PKCE) extension to OAuth 2.0. PKCE is mandated by the FAPI 2.0 Security Profile, which prescribes the use of the S256 method.
          type: string
          enum:
            - S256
        authorization_details:
          description: The Rich Authorization Request (RAR), encoded as a JSON object, that describes the requested data access for the TPP agreed with the User. Multiple RARs can be included in the JWT, but only one RAR is supported in the current version of the Open Finance Standards.
          type: array
          items:
            $ref: '#/components/schemas/RichAuthorizationRequestObjects'
          minItems: 1
          maxItems: 1
      additionalProperties: false
    RichAuthorizationRequestObjects:
      oneOf:
        - $ref: '#/components/schemas/AEAccountAccessAuthorizationDetailsConsent'
        - $ref: '#/components/schemas/AEInsuranceAuthorizationDetailsConsent'
        - $ref: '#/components/schemas/AEServiceInitiationAuthorizationDetailConsent'
`

</script>
