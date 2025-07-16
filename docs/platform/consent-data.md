# Consented Data

A central principle of Open Finance is explicit customer consent — data sharing and service initation occurs after a customer has provided consent. This document provides a high-level technical overview of how consented data sharing operates within the Open Banking ecosystem.

#### Architecture Diagram

<!-- NEEDS DOING -->


```txt
+======================================================================+
|                        Open Finance Consent Flow                     |
|----------------------------------------------------------------------|
|                                                                      |
|                   +-------TPP User Interface------+                  |
|                   |        Consent Capture        |                  |
|                   +---------------+---------------+                  |
|                                   |                                  |
|                                   V                                  |
|                   +-----Authorization Request-----+                  |
|                   |          /par endpoint        |                  |
|                   +---------------+---------------+                  |
|                                   |                                  |
|                            Redirect to LFI                           |
|                                   V                                  |
|                   +-------LFI User Interface------+                  |
|                   |      Authentication (SCA)     |                  |
|                   +---------------+---------------+                  |
|                                   |                                  |
|                                   V                                  |
|                   +-------LFI User Interface------+                  |
|                   |     Consent Authorization     |                  |
|                   |    Account/Policy selection   |                  |
|                   +---------------+---------------+                  |
|                                   |                                  |
|                            Redirect to TPP                           |
|                                   V                                  |
|                   +------TPP Callback Handler-----+                  |
|                   |       Receives callback       |                  |
|                   |     (Code, State, Issuer)     |                  |
|                   +---------------+---------------+                  |
|                                   |                                  |
|                                   V                                  |
|                   +--------Token Endpoint---------+                  |
|                   |     Receives token + RAR      |                  |
|                   +---------------+---------------+                  |
|                                   |                                  |
|                                   V                                  |
|                   +--------Resource Request-------+                  |
|                   |     Receives token + RAR      |                  |
|                   +---------------+---------------+                  |
|                                                                      |
+======================================================================+
```

