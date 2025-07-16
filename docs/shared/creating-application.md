
Within the **Al Tareq Trust Framework**, applications—also known as software statements—represent the technical identity of systems integrating with the Open Finance ecosystem. These applications include essential data needed to establish connections with other organizations. Each software statement is a unique and verifiable declaration of what the system can do and what it intends to do.


Each application must include the following details:

| Feature                            | Description                                                                                         | Example                                      |
|------------------------------------|-----------------------------------------------------------------------------------------------------|----------------------------------------------|
| **Roles**                          | Functional roles assigned to the application, inherited from the parent organisation's registered roles. | `BSIP`, `BDSP`     |
| **Client Name**                    | The public-facing name of the application as registered in the Trust Framework.                    | `FinTechApp Pro`                              |
| **Version**                        | The current version of the application or software statement.                                       | `1.0.3`                                       |
| **Federation Entity Management Type** | Specifies how the application's entity is managed within the federation (e.g., self-managed or delegated). | `self-managed`                                |
| **Logo**                           | A PNG or JPEG image uploaded to represent the application. Used in portals and consent screens.    | `logo.png` or `logo.jpeg`                     |
| **Redirect URI**                   | Must be a valid HTTPS URI that complies with FAPI standards for redirection after authentication.   | `https://app.example.com/callback`           |

More information on Mobile app [Redirect URIs](../trust-framework/redirect-uri)


## Walkthrough - Creating an Application 


  <ClientOnly>
    <Carousel :images="images1" />
  </ClientOnly>


<script setup>

const images1 = [
  {
    src: new URL('/images/raidiam/add-application/click-org.png', import.meta.url).href,
    alt: 'Step 1',
    title: 'Click into your organisation'
  },
  {
    src: new URL('/images/raidiam/add-application/click-app.png', import.meta.url).href,
    alt: 'Step 2',
    title: 'Click into applications'
  },
  {
    src: new URL('/images/raidiam/add-application/new-app.png', import.meta.url).href,
    alt: 'Step 3',
    title: 'Click + New Application'
  },
  {
    src: new URL('/images/raidiam/add-application/role.png', import.meta.url).href,
    alt: 'Step 4',
    title: 'Select the roles of the Application',
    tagline: 'Note roles for an Application are inherited from the organisation.'
  },
  {
    src: new URL('/images/raidiam/add-application/client.png', import.meta.url).href,
    alt: 'Step 5',
    title: 'Provide the details of the client',
    tagline: 'Client Name, Client Logo & Federation Entity Management Type'
  },
  {
    src: new URL('/images/raidiam/add-application/auth.png', import.meta.url).href,
    alt: 'Step 6',
    title: 'Provide user authentication details',
    tagline: `More information on <a href="../trust-framework/redirect-uri/">Redirect URIs</a>`
  },
    {
    src: new URL('/images/raidiam/add-application/done.png', import.meta.url).href,
    alt: 'Step 8',
    title: 'Your application is now ready to use',
    tagline: 'Note the Client ID, as it will be required for all requests made by this client.'
  },
]

</script>