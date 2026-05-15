// ============================================================================
// CSY3023 — Cyber Security and Cryptography
// Mock Test Assignment — May 2025
// University of Northampton, BSc Computing
// ============================================================================
// Each scenario maps directly to one of the 5 questions in the paper.
// For every sub-question we provide:
//   - q      : the exam sub-question
//   - a      : a detailed long-form answer (own-words, viva-ready)
//   - points : bullet-point key takeaways (quick revision)
//   - exp    : extra explanation / reasoning / examples
// ============================================================================

const mockTestQuestions = [
    // =====================================================================
    // QUESTION 1 — Malware: Fake Antivirus / Banking Fraud
    // =====================================================================
    {
        id: "mt-q1",
        number: "Q1",
        topic: "Malware & Detection",
        title: "Q1 — Fake Antivirus at the Bank",
        context: "A bank employee unknowingly installs a fake antivirus software. Soon after, customer accounts begin to show unauthorized access and fraudulent transactions.",
        questions: [
            {
                q: "(a) Identify the type of malware involved and explain how it works.",
                a: "The malware involved is a Trojan Horse — specifically a category known as 'Rogueware' or 'Scareware', often delivered as a fake Antivirus (FakeAV). The malicious payload is disguised as a legitimate security application, which is why the employee voluntarily installed it. Once executed with the user's privileges, the Trojan drops additional components such as a keylogger, a banking infostealer (e.g. Zeus / TrickBot family) and frequently a backdoor / remote-access component. The keylogger captures credentials typed into the internal banking portal, while the infostealer harvests browser cookies, saved passwords and form data, and intercepts session tokens. The captured data is exfiltrated to a Command-and-Control (C2) server controlled by the attacker, who then logs into customer accounts and authorises fraudulent transfers. Because it relies on social engineering (deception) rather than self-replication, it is classified as a Trojan, not a virus or worm.",
                exp: "The attack chain is: (1) Social engineering — a pop-up or email convinces the staff member to run 'AV_Setup.exe'. (2) Installation — the program elevates privileges and disables real security tools. (3) Payload delivery — banking Trojan and keylogger are dropped. (4) Persistence — registry Run keys / scheduled tasks survive reboots. (5) Exfiltration — credentials are sent over HTTPS to the C2. (6) Monetisation — the criminal uses stolen credentials to perform Account Take-Over (ATO) and wire money out.",
                points: [
                    "Classification: Trojan Horse (Rogue/Fake-AV variant), often bundled with a banking infostealer.",
                    "Propagation = social engineering, NOT self-replication (so it is not a virus or worm).",
                    "Typical payloads: keylogger, credential harvester, backdoor, screen-grabber.",
                    "Stolen data is exfiltrated to a C2 server, enabling Account Take-Over fraud.",
                    "Frequently disables Windows Defender / real AV to remain persistent."
                ]
            },
            {
                q: "(b) What are indicators of malware infection the IT team should monitor?",
                a: "Indicators of Compromise (IoCs) fall into host-based and network-based categories. Host indicators include sudden CPU/RAM spikes when the user is idle, unexpected processes (e.g. svch0st.exe with a zero instead of an 'o'), new auto-run registry entries, disabled Windows Defender / Firewall, unknown scheduled tasks, new local admin accounts, recently modified hosts file, and unusual outbound traffic from non-browser binaries. Network indicators include connections to known-bad IP/domain reputation lists, beaconing patterns (regular small DNS or HTTPS callouts every X seconds), data exfil bursts at odd hours, sudden lateral SMB/RDP traffic between workstations, and credential-stuffing alerts on the banking portal. User-experience indicators include browser redirects, fake pop-up alerts, slowed machines, unexpected password resets and customer complaints about transactions they did not authorise. The SOC should correlate these via a SIEM and respond per the incident-response plan.",
                exp: "Bank-specific red flags: transactions outside business hours, transfers to never-before-seen beneficiaries, multiple low-value transactions just under reporting thresholds (smurfing), logins from foreign geo-IPs, and impossible-travel events (login from London and Lagos within 5 minutes).",
                points: [
                    "Host IoCs: high CPU when idle, new auto-start entries, disabled AV, suspicious processes.",
                    "Network IoCs: beaconing to C2, unusual DNS queries, large outbound transfers, port 4444/8080 traffic.",
                    "Banking-specific: fraudulent transactions, impossible-travel logins, transfers to new payees.",
                    "Behavioural: pop-ups, browser redirects, password-reset emails the user did not request.",
                    "Centralise alerts in a SIEM and trigger the Incident Response plan when thresholds are breached."
                ]
            },
            {
                q: "(c) Describe how Rootkits and Trojans differ and how each can be detected and removed in a banking system.",
                a: "A Trojan is malware that disguises itself as a legitimate program to trick the user into running it; it operates at user level (or at most local-admin level), is comparatively easy to spot once its process is identified, and can usually be removed by a reputable AV/EDR product or by deleting its files and persistence keys. A Rootkit, in contrast, is designed for stealth: it embeds itself deep in the operating system — at the kernel or even the firmware/bootkit layer — and actively hides its own files, processes and registry entries from the OS APIs that AV products rely on. Because of this, rootkits are far harder to detect: they often require offline scanning (booting the machine from a clean Linux/WinPE USB), memory forensics (Volatility), integrity checkers (Tripwire, sigcheck), or specialised tools such as GMER, chkrootkit and rkhunter. Detection of Trojans can usually be done with signature + heuristic AV, EDR behavioural analytics, and review of Autoruns / Sysinternals data. Removal of a Trojan is usually a clean-up exercise (quarantine + delete + remove persistence). Removal of a kernel rootkit, however, should not be attempted in-place — the only safe approach in a banking environment is to isolate the host, image it for forensics, and then completely wipe and re-image the machine from a known-good gold image, followed by credential rotation for any accounts that were used on that host.",
                exp: "Why this matters in a bank: rootkits compromise the integrity of every log entry that comes off the affected machine, which destroys the chain of custody required for fraud investigations. Hence the strict 'wipe and rebuild' policy.",
                points: [
                    "Trojan = user-level deception malware; Rootkit = kernel/firmware-level stealth malware.",
                    "Trojans can be detected by AV/EDR + Autoruns; Rootkits need offline scans (GMER, chkrootkit, Volatility).",
                    "Trojan removal: AV quarantine + remove persistence keys.",
                    "Rootkit removal: isolate, image for forensics, then WIPE and re-image — never trust in-place clean-up.",
                    "Rotate every credential used on the compromised host and review banking transaction logs."
                ]
            }
        ]
    },

    // =====================================================================
    // QUESTION 2 — Symmetric vs Asymmetric Encryption (AES vs RSA)
    // =====================================================================
    {
        id: "mt-q2",
        number: "Q2",
        topic: "Cryptography (AES & RSA)",
        title: "Q2 — Encryption for Email & Laptop Data-at-Rest",
        context: "The bank wants to implement encryption for both secure email communication and securing data at rest on laptops.",
        questions: [
            {
                q: "(a) Explain the difference between symmetric and asymmetric encryption with real-life examples.",
                a: "Symmetric encryption uses a single shared secret key for both encryption and decryption. The same key that locks the data is the key that unlocks it, so both sender and receiver must somehow agree on, and protect, that key. It is extremely fast and well-suited to bulk data — examples include AES, 3DES, ChaCha20 and Blowfish. A real-life analogy is a physical safe: anyone who has a copy of the safe key can both lock and unlock it. In the bank, symmetric encryption is used to encrypt the laptop hard-drive (BitLocker / FileVault use AES-128/256), the database (TDE), and the body of an encrypted email after a session key is established. Asymmetric (public-key) encryption uses a mathematically linked key pair: a Public Key that can be shared with anyone and a Private Key that must remain secret. Data encrypted with the public key can only be decrypted with the corresponding private key, and a signature created with the private key can be verified with the public key. Examples include RSA, ECC, ElGamal and Diffie-Hellman. A real-life analogy is a mailbox with a slot: anyone can drop a letter in (encrypt with public key), but only the owner with the mailbox key (private key) can take letters out. In the bank, asymmetric crypto is used for TLS/SSL certificates, digital signing of software updates, PGP email signing, and to safely exchange the symmetric session key between two parties who have never met.",
                exp: "The two systems are almost always combined in modern protocols (hybrid encryption): asymmetric solves key distribution; symmetric provides speed and is then used to encrypt the actual payload. This is exactly how HTTPS, SSL VPNs and PGP all work internally.",
                points: [
                    "Symmetric = one shared key (e.g. AES). Fast, but key-exchange problem.",
                    "Asymmetric = key pair (public + private, e.g. RSA, ECC). Solves key distribution.",
                    "Symmetric analogy = a single safe key; Asymmetric analogy = letterbox with public slot + private key.",
                    "Bank usage: symmetric for disk/DB encryption, asymmetric for TLS certs, email signing, key exchange.",
                    "Real systems use HYBRID encryption — asymmetric to exchange a symmetric key, then symmetric for bulk data."
                ]
            },
            {
                q: "(b) Compare AES and RSA in terms of performance, use cases, and security.",
                a: "AES (Advanced Encryption Standard) is a symmetric block cipher operating on 128-bit blocks with key sizes of 128, 192 or 256 bits. It is extremely fast in both software and hardware (most modern CPUs have AES-NI instructions), making it suitable for bulk encryption such as full-disk encryption, encrypting database tables, encrypting backups, and securing the data portion of TLS/IPsec sessions. Its security comes from substitution-permutation network rounds (10/12/14 rounds depending on key length) and, with a 256-bit key, it is considered secure even against foreseeable quantum attacks (because Grover's algorithm only halves the effective key strength). RSA, by contrast, is an asymmetric algorithm whose security rests on the difficulty of factoring the product of two large primes. RSA is roughly 1000× slower than AES for the same amount of data, so it is never used to encrypt bulk content — instead it encrypts a small symmetric key, a hash for a signature, or a session secret. Recommended modern RSA key sizes are 2048 or 3072 bits (4096 for long-term use); a 2048-bit RSA key gives roughly the same security as a 112-bit symmetric key, while AES-256 gives 256-bit security. RSA is also vulnerable to future quantum attacks via Shor's algorithm, whereas AES is far more quantum-resistant. In short: AES = fast, symmetric, used for data confidentiality; RSA = slow, asymmetric, used for key exchange and digital signatures.",
                exp: "Concrete numbers: AES-256 can encrypt several gigabytes per second per CPU core; RSA-2048 can sign perhaps a few thousand operations per second on the same hardware. That gap is exactly why hybrid encryption exists.",
                points: [
                    "AES = symmetric block cipher, 128-bit block, 128/192/256-bit keys, 10/12/14 rounds.",
                    "RSA = asymmetric, security based on integer factorisation, typical key 2048–4096 bits.",
                    "Performance: AES is ~1000× faster — use it for bulk data.",
                    "Use cases: AES for disk/DB/file encryption; RSA for key exchange & digital signatures.",
                    "Security: AES-256 is quantum-resistant-ish (Grover); RSA is broken by future quantum (Shor)."
                ]
            },
            {
                q: "(c) Evaluate when to use symmetric encryption vs asymmetric encryption in a banking system.",
                a: "Use symmetric encryption (AES) wherever large volumes of data must be encrypted and where both parties either share a key already or have a secure way to derive one. Specific bank examples are: full-disk encryption on employee laptops (BitLocker/FileVault using AES-XTS), Transparent Database Encryption on customer-account tables, encryption of nightly backups before they leave the data centre, encryption of payloads on internal Kafka / message buses, and the bulk-data phase of any TLS or VPN session. Use asymmetric encryption (RSA / ECC) wherever the two parties do not already share a secret, where you need authentication or non-repudiation, or where you need to distribute trust at scale. Specific bank examples are: the TLS certificate on the public banking website that proves the server's identity to customers, the X.509 certificates on staff laptops used for SSL-VPN client authentication, PGP/GPG signing of internal policy documents, digital signing of software updates pushed to ATM machines, and the RSA-encrypted session-key exchange at the start of every HTTPS session. In practice the bank should NOT pick one over the other but rather adopt a hybrid model: asymmetric crypto to establish trust and exchange keys, symmetric crypto (AES) to do the heavy encryption work. Decision rule: if the data being encrypted is bigger than the key, use symmetric — otherwise it is almost always a key-exchange/signature use-case and you want asymmetric.",
                exp: "An important caveat: keys for symmetric encryption must themselves be protected. The bank should keep AES master keys in a Hardware Security Module (HSM) such as Thales Luna or AWS KMS-CloudHSM, never on the same server as the data.",
                points: [
                    "Symmetric (AES) — bulk data: full-disk encryption, DB encryption, backups, VPN payloads.",
                    "Asymmetric (RSA/ECC) — identity, signing, and key exchange: TLS certs, VPN client certs, PGP signing.",
                    "Always combine the two = HYBRID encryption (real-world standard).",
                    "Decision rule: encrypt data with symmetric; encrypt symmetric keys with asymmetric.",
                    "Store master/symmetric keys in an HSM — never on the same host as the encrypted data."
                ]
            }
        ]
    },

    // =====================================================================
    // QUESTION 3 — Firewalls (PF, Stateful, NGFW, Distributed)
    // =====================================================================
    {
        id: "mt-q3",
        number: "Q3",
        topic: "Firewalls & Network Security",
        title: "Q3 — Firewall Strategy for HQ, ATMs and Web Servers",
        context: "The bank's IT manager is confused about which firewall technology to deploy across its headquarters, remote ATMs, and web servers.",
        questions: [
            {
                q: "(a) Compare and contrast Packet Filtering, Stateful, and Next-Generation Firewalls with examples.",
                a: "A Packet Filtering Firewall (stateless) operates at Layers 3 and 4 of the OSI model. It examines each packet in isolation against a static Access Control List based on source/destination IP, source/destination port and protocol, and either allows or drops it. It is extremely fast, has no memory overhead, but is also easily bypassed by forged packets, fragmented attacks or any protocol that requires state — for example, it cannot tell whether an inbound TCP segment is part of an established conversation or an unsolicited probe. Classic example: Cisco IOS extended ACLs on a router, or iptables in pure -j ACCEPT/DROP mode. A Stateful Firewall (Stateful Packet Inspection / SPI) goes one step further: it keeps a connection-state table in memory. When an internal host opens a TCP connection outward, the firewall records the 5-tuple and automatically allows the return traffic that matches an established flow. It blocks unsolicited inbound packets that don't belong to any tracked session, and it can validate the TCP handshake order, sequence numbers and flag combinations. Classic examples: Check Point FW-1, Cisco ASA, iptables with conntrack. A Next-Generation Firewall (NGFW) combines stateful filtering with deep packet inspection, application identification (App-ID), TLS/SSL inspection, integrated IPS, user identity awareness (Active Directory integration), URL filtering, and sandboxing of unknown files. It can therefore enforce policies such as 'Allow Facebook for Marketing users but block Facebook-chat for everyone' — something impossible at L3/L4. Examples: Palo Alto PA-series, Fortinet FortiGate, Cisco Firepower.",
                exp: "Generational evolution: 1st gen = packet filter, 2nd gen = stateful, 3rd gen = application/proxy, 4th gen = NGFW with IPS + identity + TLS inspection.",
                points: [
                    "Packet-Filter FW = stateless, L3/L4, fast but weak; e.g. router ACLs.",
                    "Stateful FW = tracks connections in a state table; blocks unsolicited inbound; e.g. Cisco ASA.",
                    "NGFW = stateful + DPI + IPS + App-ID + user identity + TLS inspection; e.g. Palo Alto, FortiGate.",
                    "NGFWs enable application-layer policies impossible at L3/L4.",
                    "Performance/cost climbs from PF → Stateful → NGFW; choose based on placement and risk."
                ]
            },
            {
                q: "(b) Recommend a firewall architecture suitable for protecting both the internal banking systems and public web services. Justify your answer.",
                a: "The recommended architecture is a Screened Subnet (DMZ) design built around redundant Next-Generation Firewalls in a high-availability pair. From the public internet, traffic first hits a perimeter NGFW that does TLS-inspection, IPS and DDoS mitigation. Public services (web banking, public API gateway, reverse proxy, email gateway) sit inside a DMZ subnet that is reachable only on the specific ports needed (443, 25, etc.). A second internal NGFW separates the DMZ from the trusted core network (core banking, AD, database, internal staff LAN). This 'two-tier sandwich' means that compromising a web server in the DMZ does NOT give the attacker direct access to the core banking systems — they must defeat a second firewall, ideally from a different vendor (defence in diversity). Remote ATMs connect back through site-to-site IPsec VPN tunnels terminated on the perimeter NGFW, after which their traffic is restricted by the inner firewall to only the specific ATM-switch services they need. Remote staff use an SSL VPN with certificate-based MFA into a dedicated VPN concentrator behind the perimeter NGFW. All firewalls are managed centrally, log to a SIEM, and apply the principle of least privilege (implicit deny with explicit allow rules). This design is justified because it (i) provides defence in depth, (ii) isolates public-facing assets from the crown jewels, (iii) satisfies PCI-DSS / regulatory segmentation requirements, and (iv) scales cleanly to add new ATMs, branches or cloud zones.",
                exp: "Optional enhancements: add a Web Application Firewall (WAF) in front of the public banking website to protect against OWASP Top-10 attacks; deploy an internal Zero-Trust segmentation layer (e.g. micro-segmentation with VMware NSX or Illumio) so that even inside the core network, services can only talk to the specific services they need.",
                points: [
                    "Recommend: Screened-Subnet (DMZ) with TWO NGFWs in HA pairs (preferably different vendors).",
                    "Outer NGFW = internet edge (IPS, TLS inspection, DDoS, WAF in front of web servers).",
                    "Inner NGFW = separates DMZ from core banking network (strict L7 rules).",
                    "ATMs → site-to-site IPsec VPN on perimeter; remote staff → SSL VPN with cert + MFA.",
                    "Justified by defence-in-depth, PCI-DSS segmentation, and breach-containment."
                ]
            },
            {
                q: "(c) Discuss limitations of firewalls and how a Distributed Firewall Architecture can enhance the bank's cybersecurity posture.",
                a: "Traditional perimeter firewalls have several well-known limitations. First, they only enforce policy at the network edge: once an attacker is inside (via phishing, a compromised laptop, or a malicious insider) they have no friction moving laterally. Second, they cannot inspect encrypted traffic at scale without expensive TLS-inspection appliances, and most modern malware uses HTTPS for C2. Third, they have no visibility into east-west (server-to-server) traffic within a flat data-centre LAN. Fourth, they can be bypassed by tunnelling (DNS exfiltration, ICMP tunnels) or by misconfiguration drift over time. Fifth, they are a single point of failure / single point of policy decision. A Distributed Firewall Architecture addresses these by enforcing firewall policy on every endpoint and every workload (host-based firewall agents on laptops/servers, hypervisor-level firewalls on virtual machines, and identity-aware policies on cloud workloads) while keeping a single central policy plane. Each asset enforces its own rules, so even if one host is compromised the attacker still meets a firewall when trying to reach the next host — this is the core idea behind Zero Trust / micro-segmentation. For the bank this means: an infected branch laptop cannot freely SMB-scan the corporate LAN; a compromised DMZ web-server cannot pivot directly to the database server; ATMs only ever speak to the ATM-switch and nothing else. Distributed firewalls also give granular logging at every workload, which dramatically improves detection and forensic capabilities, and they scale linearly with the environment (each new VM brings its own enforcement point). Combined with a central NGFW perimeter, this layered model gives the bank true defence in depth.",
                exp: "Implementation options for the bank: Windows Defender Firewall with Advanced Security managed via Group Policy, Linux iptables/nftables managed via Ansible, VMware NSX micro-segmentation in the data centre, Illumio or Cisco Tetration for identity-based segmentation, and Azure/AWS security groups in cloud.",
                points: [
                    "Firewall limitations: no protection against insider threats, encrypted-payload blind spots, east-west blindness, perimeter only.",
                    "Cannot stop attacks that come through legitimate channels (phishing, malicious VPN logins).",
                    "Distributed Firewall = enforcement on every host/VM/cloud workload with central policy.",
                    "Enables micro-segmentation and Zero-Trust → contains lateral movement after a breach.",
                    "Implementations: host firewalls + GPO, NSX, Illumio, AWS/Azure security groups."
                ]
            }
        ]
    },

    // =====================================================================
    // QUESTION 4 — SSL VPN, X.509 Certificates, VPN Protocol Comparison
    // =====================================================================
    {
        id: "mt-q4",
        number: "Q4",
        topic: "VPN & PKI",
        title: "Q4 — SSL VPN, X.509 Certificates and 'Certificate Not Trusted' Errors",
        context: "Bank staff working remotely are required to connect securely to the central server. A few employees report seeing 'certificate not trusted' errors during login.",
        questions: [
            {
                q: "(a) Explain how an SSL VPN works with the use of X.509 certificates.",
                a: "An SSL VPN creates a secure encrypted tunnel between a remote client and the corporate network using the TLS protocol (the modern successor of SSL) over TCP port 443, which means it works through almost any firewall or proxy. The trust foundation of the tunnel is the X.509 certificate. The bank operates (or uses) a Public Key Infrastructure (PKI) with a trusted Certificate Authority. The VPN gateway is issued an X.509 server certificate that binds its DNS name (e.g. vpn.bank.com) to its public key and is signed by the CA. When a remote employee launches the VPN client, the client connects to the gateway, the gateway sends its certificate, and the client verifies (i) that the certificate is signed by a CA the client trusts, (ii) that it has not expired, (iii) that the hostname matches, and (iv) that it has not been revoked (via CRL or OCSP). The client then generates a pre-master secret, encrypts it with the gateway's public key, and sends it back. From the pre-master both sides derive symmetric session keys (typically AES-GCM) which are used to encrypt the actual tunnelled traffic. Many banking deployments add mutual TLS: the client also presents an X.509 client certificate stored on the laptop (or on a smart card / YubiKey), so the gateway can cryptographically prove that the connecting device is a bank-issued asset, not just any device with valid credentials.",
                exp: "Key cryptographic moments in the handshake: ClientHello → ServerHello + Certificate → key exchange (RSA or ECDHE for forward secrecy) → Finished. After that, all traffic is symmetrically encrypted, typically with AES-256-GCM.",
                points: [
                    "SSL VPN = TLS tunnel over TCP/443 — firewall-friendly.",
                    "Trust anchored in X.509 certificate issued by a trusted Certificate Authority.",
                    "Handshake: server cert sent → client validates → key exchange (RSA / ECDHE) → symmetric session keys derived.",
                    "Best practice = mutual TLS (mTLS): both server AND client present certificates.",
                    "Symmetric AES-GCM then encrypts the actual VPN traffic."
                ]
            },
            {
                q: "(b) Describe how a client system verifies a server certificate and establishes a secure channel. (Why do users see 'certificate not trusted'?)",
                a: "When the VPN client receives the server's X.509 certificate it performs a chain-of-trust validation. (1) It extracts the Issuer field and looks up the issuing CA's certificate; it repeats this process until it reaches a Root CA whose certificate is in the operating-system or browser trust store. (2) For every certificate in the chain it verifies the digital signature using the issuer's public key. (3) It checks the validity period (NotBefore / NotAfter dates) against the system clock. (4) It checks that the Subject / Subject-Alternative-Name matches the hostname being connected to. (5) It checks the revocation status using CRL (Certificate Revocation List) or OCSP (Online Certificate Status Protocol). (6) It validates Key Usage and Extended Key Usage extensions (the certificate must be marked for 'Server Authentication'). Only if every step succeeds does the client proceed with the TLS handshake: it generates a random pre-master secret, encrypts it with the server's public key (or performs an ECDHE exchange for forward secrecy), and both sides derive symmetric session keys. A 'certificate not trusted' error is raised when any of those checks fails: the most common causes are (i) the issuing CA is not in the client's trust store (typical for an internal/private CA whose root has not been pushed to the laptops), (ii) the certificate has expired or the laptop's clock is wrong, (iii) the hostname does not match the certificate, (iv) the certificate has been revoked, or (v) the certificate chain on the server is incomplete (intermediates missing). For the bank the most likely cause is (i): the internal root CA certificate has not been deployed to the remote laptops via GPO/MDM. Fix: push the root CA certificate to the staff devices.",
                exp: "Hostname matching uses the Subject-Alternative-Name extension (SAN). A certificate issued for vpn.bank.com will fail validation if the user connects to 10.20.30.40, because the IP does not match the SAN. Wildcard certs (*.bank.com) match one label only.",
                points: [
                    "Validation checks: chain-of-trust, signature, validity dates, hostname/SAN, revocation (CRL/OCSP), key-usage.",
                    "Trust root must be present in the OS/browser trust store.",
                    "After validation, key exchange happens (RSA or ECDHE — ECDHE gives forward secrecy).",
                    "Symmetric session keys then encrypt the channel (AES-GCM, ChaCha20-Poly1305).",
                    "'Cert not trusted' = root CA missing, expired cert, wrong hostname, revoked cert, or wrong system clock."
                ]
            },
            {
                q: "(c) Compare SSL VPN, OpenVPN, and L2TP/IPSec VPN protocols in terms of security, ease of use, and performance.",
                a: "SSL VPN (as found in commercial appliances like Cisco AnyConnect, Pulse Secure, F5 BIG-IP) runs TLS over TCP/443 and integrates tightly with X.509 PKI and identity providers. Security is strong (TLS 1.2/1.3 with AES-GCM, certificate-based auth, often MFA), ease of use is high because port 443 traverses virtually any firewall and the client is typically a small endpoint app or even just a browser, and performance is good for most office workloads though TCP-over-TCP can suffer slightly under packet loss. OpenVPN is an open-source SSL/TLS VPN that uses the same TLS foundation but is more flexible — it can run over either UDP (faster, no TCP-over-TCP problem) or TCP, supports both certificate and password authentication, and is highly auditable thanks to its open-source code. Security is excellent (effectively TLS-grade), ease of use is moderate (config files, separate client app), performance over UDP is very good. L2TP/IPsec runs L2TP for tunnelling and IPsec (ESP/AH) for encryption and authentication, typically over UDP 500/4500 and ESP/IP protocol 50. Security is good — IPsec is a mature standard with AES and SHA-2 — but L2TP itself has historically been associated with weaker pre-shared-key deployments and is double-encapsulated which adds overhead. Ease of use is high on operating systems that have a native client (Windows, macOS, iOS, Android all have it built in) so no extra software is needed, but it is frequently blocked by hotel / mobile-carrier NAT firewalls because UDP 500/4500 are non-standard, which reduces real-world usability for travelling staff. Performance suffers from the double encapsulation overhead. Summary: for a bank with travelling staff connecting from arbitrary networks, SSL VPN or OpenVPN over UDP/443 is normally the best choice — TCP/443 traverses every firewall, certificate auth gives strong identity, and AES-GCM gives both speed and security. L2TP/IPsec remains useful for built-in client compatibility on mobile devices.",
                exp: "A useful table: SSL VPN — TCP/443, client-based, easy through firewalls, strong; OpenVPN — UDP or TCP, open-source, very flexible, strong; L2TP/IPsec — UDP 500/4500 + ESP, built-in clients, double-encapsulation overhead, often blocked.",
                points: [
                    "SSL VPN: TLS over TCP/443, easy through firewalls, cert-based, vendor-specific (AnyConnect, GlobalProtect).",
                    "OpenVPN: open-source TLS VPN, UDP or TCP, very flexible and auditable, very good performance over UDP.",
                    "L2TP/IPsec: standard, built-in clients on most OSes, but often blocked by NAT and has double-encap overhead.",
                    "Security: all three can be strong; weakness usually comes from configuration (PSK, weak ciphers).",
                    "Best for travelling bank staff: SSL VPN or OpenVPN over 443; L2TP/IPsec as a fallback."
                ]
            }
        ]
    },

    // =====================================================================
    // QUESTION 5 — PGP / GPG Key Management
    // =====================================================================
    {
        id: "mt-q5",
        number: "Q5",
        topic: "PGP / GPG & Key Management",
        title: "Q5 — Lost PGP Keys at the Bank",
        context: "The bank uses PGP/GPG for signing emails and encrypting sensitive documents. After 6 months, staff complain they're unable to decrypt files due to lost keys.",
        questions: [
            {
                q: "(a) Explain how GPG4WIN (or GPG on Mac) manages public-private key pairs for encryption and signing.",
                a: "GPG4WIN on Windows (and the GPG suite / built-in gpg binary on macOS / Linux) is an implementation of the OpenPGP standard. When a user runs 'gpg --full-generate-key' or uses the Kleopatra GUI, GPG generates an asymmetric key pair — usually an RSA-4096 or Curve25519 (Ed25519/Cv25519) primary key plus one or more subkeys, each tied to a specific capability (sign, encrypt, certify, authenticate). The private key is encrypted with a passphrase using a symmetric cipher (typically AES) and stored in the user's local GnuPG home directory (on Windows: %APPDATA%\\gnupg, on macOS: ~/.gnupg). The corresponding public key is stored alongside it and can be exported (gpg --export --armor) and shared with others or uploaded to a keyserver. To encrypt a file or email, the sender selects the recipient's public key from the local keyring; GPG generates a random symmetric session key, encrypts the data with that session key (hybrid encryption), and then encrypts the session key with the recipient's public key. The recipient uses their private key — after unlocking it with their passphrase — to recover the session key and then decrypt the data. To sign a message, GPG hashes the message with SHA-256/512 and then encrypts the hash with the sender's private key; anyone with the sender's public key can verify the signature. Kleopatra provides a GUI to do all of this — generate, import, export, sign, verify, encrypt, decrypt, and back up keys. Best practice is to also generate a Revocation Certificate at the same time as the key pair, so that if the private key is ever lost the user can publish the revocation certificate to mark the public key as no longer valid.",
                exp: "The 'subkey' structure is important: the master/certify key can be kept offline (on a USB stick in a safe) while only the day-to-day sign/encrypt subkeys live on the working laptop. This way, if the laptop is compromised, only the subkeys need to be revoked — the master identity is preserved.",
                points: [
                    "GPG generates a primary key + capability subkeys (sign, encrypt, certify, authenticate).",
                    "Private key encrypted with passphrase, stored in ~/.gnupg or %APPDATA%\\gnupg.",
                    "Public key exported (ASCII-armored) and shared, or uploaded to a keyserver.",
                    "Encryption is hybrid: random AES session key → encrypted with recipient public key.",
                    "Always generate a Revocation Certificate at key creation and back it up offline."
                ]
            },
            {
                q: "(b) What are the key components of a PGP keyring and how are they used in secure communication?",
                a: "A PGP keyring is the local store that GPG uses to manage cryptographic identities. It has two primary files: the public keyring (pubring.kbx in modern GPG) which holds the public keys of every contact the user wants to communicate with, and the private keyring (which in modern GPG is broken out into individual files under private-keys-v1.d/) which holds the user's own secret keys, each encrypted with its passphrase. Each key entry contains several components: (1) the Primary Key — the long-lived identity key, used to certify subkeys and other people's keys; (2) one or more Subkeys, each bound to the primary and dedicated to a single purpose (encryption subkey, signing subkey, authentication subkey); (3) one or more User IDs (UIDs) — typically 'Name <email>' strings — each of which can be self-signed and optionally signed by other people, forming the Web of Trust; (4) Signatures — both self-signatures binding UIDs/subkeys to the primary and third-party signatures attesting that someone has verified the key holder's identity; (5) the Key Fingerprint, a SHA-1/256 hash of the key material used for out-of-band verification (the short Key ID is just the last 64 bits of the fingerprint and is NOT safe for trust decisions); (6) Trust values that the local user has assigned (ultimate, full, marginal, none); and optionally (7) a Revocation Certificate. In secure communication these components combine like this: to encrypt to Alice, GPG looks Alice up in the public keyring, finds her encryption subkey, checks her trust level (and the chain of signatures back to a trusted introducer if Web-of-Trust is used), and encrypts the message to that subkey. To verify a signature from Bob, GPG looks up Bob's signing subkey in the public keyring, checks the signature, and reports both 'good signature' (cryptographic validity) and 'trust' (whether the user has decided Bob's key is genuinely his). Fingerprints should always be verified out-of-band (phone call, in person) before assigning trust.",
                exp: "Common pitfall: trusting short Key IDs. Short IDs (8 hex chars) have been demonstrably forgeable in seconds. Always compare full 40-hex-character fingerprints.",
                points: [
                    "Public keyring (pubring.kbx) + private keys (private-keys-v1.d/).",
                    "Components: primary key, subkeys, UIDs, signatures, fingerprint, trust DB, revocation certs.",
                    "Subkeys isolate capabilities — signing key separate from encryption key.",
                    "Trust model = Web of Trust (decentralised) or internal CA-style signing (centralised).",
                    "Always verify FULL fingerprint out-of-band before importing/trusting a public key."
                ]
            },
            {
                q: "(c) Discuss the risks of not having a proper key management policy. Suggest best practices for key lifecycle management in banks.",
                a: "Without a key-management policy the bank exposes itself to several severe risks. (1) Data loss / unavailability — exactly the scenario in this question: staff lose their private keys and the encrypted documents become permanently unreadable, which can also be a regulatory record-keeping breach. (2) Loss of confidentiality — if a private key is stolen and there is no revocation procedure, an attacker can read every encrypted message addressed to that key, possibly for years. (3) Loss of integrity / impersonation — without revocation, a stolen signing key lets an attacker sign emails or documents in the staff member's name. (4) Audit and compliance failure — regulators (PCI-DSS, GDPR, FCA, ISO 27001) require demonstrable key control. (5) Operational chaos — keys with no defined owner, no rotation, no naming convention. Best practices for the full Key Lifecycle (Generate → Distribute → Store → Use → Rotate → Revoke → Archive → Destroy) in a banking environment are: generate keys on hardened workstations or in HSMs and choose modern algorithms (RSA-4096 or Ed25519/Cv25519); always create a Revocation Certificate at the same time and store it offline in a safe; distribute public keys via an internal trusted key server signed by the bank's internal CA (don't rely on the public Web of Trust); store private keys encrypted with a strong passphrase, ideally on a hardware token (YubiKey, smart card) or in an HSM, never on shared drives; enforce key escrow / corporate recovery for encryption keys so that lost-key scenarios do not destroy business data, while NEVER escrowing signing keys (escrowing them would break non-repudiation); rotate keys on a defined schedule (e.g. annually for signing keys, longer for archive keys) with clear overlap so old encrypted data can still be decrypted; revoke keys immediately upon staff departure, suspected compromise, or device loss, and publish the revocation to the keyserver; archive expired keys securely for as long as regulation requires you to be able to decrypt old data; and finally destroy keys securely (HSM-level zeroisation) once their retention period ends. The bank should also maintain a Key Management Policy document, train staff regularly, log every key operation in a SIEM, and conduct annual key-management audits. In the current scenario the immediate fix is to (a) recover from key escrow where possible, (b) re-issue keys to affected staff, (c) deploy hardware tokens, and (d) write and publish a formal Key Management Policy with mandatory revocation-certificate generation.",
                exp: "Mnemonic for the lifecycle: G-D-S-U-R-R-A-D = Generate, Distribute, Store, Use, Rotate, Revoke, Archive, Destroy.",
                points: [
                    "Risks without a policy: permanent data loss, leaked confidentiality, impersonation, compliance failures.",
                    "Key Lifecycle: Generate → Distribute → Store → Use → Rotate → Revoke → Archive → Destroy.",
                    "Use HSMs / hardware tokens (YubiKey, smart card) for private keys.",
                    "Always generate a Revocation Certificate and store it offline.",
                    "Escrow ENCRYPTION keys (for recovery) but NEVER escrow SIGNING keys (would break non-repudiation).",
                    "Rotate on schedule, revoke immediately on staff departure or compromise, log everything in SIEM."
                ]
            }
        ]
    }
];

window.mockTestQuestions = mockTestQuestions;
