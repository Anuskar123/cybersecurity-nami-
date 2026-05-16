// ============================================================================
// CSY3023 — Cyber Security and Cryptography
// Mock Test Assignment — May 2025  (Short & Simple Edition)
// University of Northampton, BSc Computing
// ============================================================================
// Each sub-question has:
//   - q      : the exam sub-question
//   - a      : a short, plain-English answer (2-4 sentences)
//   - exp    : a one-line example or extra hint
//   - points : 3-5 quick bullet revision points
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
                a: "It is a Trojan Horse (a fake-AV / rogueware Trojan). The user is tricked into running it because it looks like real antivirus software. Once installed, it secretly drops a keylogger and a banking infostealer that capture login details and send them to the attacker, who then logs into customer accounts and moves money.",
                exp: "Imagine a stranger dressed as a delivery person who knocks at your door. You let them in because they look official, but once inside they secretly copy your house keys and bank papers. That's exactly what a Trojan does to a computer.",
                points: [
                    "Type = Trojan Horse (fake antivirus / rogueware).",
                    "Spreads by social engineering, not self-replication.",
                    "Drops keylogger + credential stealer + backdoor.",
                    "Stolen logins are sent to a Command-and-Control (C2) server.",
                    "Attacker uses them for Account Take-Over fraud."
                ]
            },
            {
                q: "(b) What are indicators of malware infection the IT team should monitor?",
                a: "The team should watch for unusual host and network behaviour: high CPU when the PC is idle, unknown processes, disabled antivirus, new auto-start entries, and strange outbound traffic. On the bank side, watch for fraudulent transactions, logins from new countries and impossible-travel events.",
                exp: "Think of it like noticing things at home that don't add up: lights turning on by themselves at night, your alarm mysteriously switched off, and bank statements showing things you never bought. Each clue alone could be normal — together they mean someone is inside.",
                points: [
                    "Host: high CPU at idle, unknown processes, disabled AV, new startup entries.",
                    "Network: beaconing, unusual DNS, large outbound transfers.",
                    "Banking: unauthorised transfers, foreign logins, password-reset spam.",
                    "User experience: pop-ups, browser redirects, slow PC.",
                    "Centralise alerts in a SIEM and follow the IR plan."
                ]
            },
            {
                q: "(c) Describe how Rootkits and Trojans differ and how each can be detected and removed.",
                a: "A Trojan tricks the user and runs at user level — easy to spot and usually removed by AV. A Rootkit hides deep in the OS kernel or boot sector to stay invisible, so normal AV often misses it. In a bank, Trojans are cleaned with EDR/AV, but rootkit-infected machines should be wiped and rebuilt from a clean image and all credentials rotated.",
                exp: "A Trojan is like a thief who walks in wearing a fake uniform — easy to catch once you notice. A rootkit is like a thief who has built a secret room inside your house and rewired the cameras so you never see them. The only safe fix for a rootkit is to demolish the room and rebuild it.",
                points: [
                    "Trojan = user-level, deception-based, easy to detect.",
                    "Rootkit = kernel/boot-level, hides itself, very hard to detect.",
                    "Detect Trojans with AV/EDR + Autoruns.",
                    "Detect Rootkits with offline scans (GMER, chkrootkit, Volatility).",
                    "Rootkit fix = wipe & re-image, then rotate credentials."
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
                a: "Symmetric encryption uses one shared key to lock and unlock data — it's fast but both parties must somehow share that key safely (like one safe key both people own). Asymmetric encryption uses a key pair: a public key everyone can have and a private key kept secret (like a postbox — anyone can drop letters in, only you can open it).",
                exp: "Symmetric is like one house key that both you and your friend have copies of — same key opens and locks the door. Asymmetric is like a letterbox at your front door — anyone in the world can post a letter through the slot, but only you have the special key that opens the box and reads what's inside.",
                points: [
                    "Symmetric = one shared key (AES, 3DES). Fast.",
                    "Asymmetric = public + private key pair (RSA, ECC). Solves key sharing.",
                    "Symmetric analogy = safe key. Asymmetric = postbox.",
                    "Real systems combine both = hybrid encryption.",
                    "Example: HTTPS uses RSA to share an AES session key."
                ]
            },
            {
                q: "(b) Compare AES and RSA in terms of performance, use cases, and security.",
                a: "AES is symmetric and very fast, so it's used for bulk data like disk encryption and database encryption. RSA is asymmetric and roughly 1000× slower, so it's only used for small jobs like key exchange and digital signatures. Both are secure today, but AES-256 is much more quantum-resistant than RSA.",
                exp: "AES is like a quick door lock you use a hundred times a day — easy and fast. RSA is like a heavy bank vault — extremely strong, but takes ages to open and close, so you only use it once at the start of the day to safely hand over the door key.",
                points: [
                    "AES = symmetric, 128/192/256-bit keys, very fast.",
                    "RSA = asymmetric, 2048+ bit keys, very slow.",
                    "AES used for files, disks, databases.",
                    "RSA used for key exchange and digital signatures.",
                    "AES is more quantum-resistant than RSA."
                ]
            },
            {
                q: "(c) Evaluate when to use symmetric vs asymmetric encryption in a banking system.",
                a: "Use symmetric (AES) for big data — laptop full-disk encryption, customer database, backups and VPN traffic. Use asymmetric (RSA / ECC) for identity and trust — TLS website certificates, signing emails, and exchanging session keys. The best practice is hybrid: RSA to safely share an AES key, then AES for the heavy work.",
                exp: "Imagine sending a friend a locked treasure chest. You put the treasure inside a strong fast lock (AES), but how do you give them the key safely? You drop the small key into their letterbox (RSA). Now only they can open the box. Every time you visit a website starting with HTTPS, this exact thing happens behind the scenes.",
                points: [
                    "Symmetric (AES) → bulk data: disks, DBs, backups, VPN payload.",
                    "Asymmetric (RSA/ECC) → identity, signatures, key exchange.",
                    "Always combine the two = hybrid encryption.",
                    "Rule: encrypt data with symmetric, encrypt the key with asymmetric.",
                    "Store master keys in an HSM, not on the same server as the data."
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
                q: "(a) Compare Packet Filtering, Stateful, and Next-Generation Firewalls with examples.",
                a: "A Packet Filter checks each packet alone using IP and port rules — fast but can be tricked. A Stateful Firewall tracks the whole connection in a state table, so it knows which return packets are valid. A Next-Generation Firewall (NGFW) does all that plus deep packet inspection, IPS, app awareness, user identity and TLS inspection.",
                exp: "Think of three security guards at a building. Guard 1 (Packet Filter) only checks the ID card of each person passing — fast but easy to fool. Guard 2 (Stateful) remembers who came in earlier and matches them when they leave. Guard 3 (NGFW) checks the ID, recognises the face, scans the bag for weapons, and even checks if the person is allowed to be on that floor.",
                points: [
                    "Packet Filter = stateless, L3/L4, fast but weak.",
                    "Stateful = tracks connections, blocks unsolicited traffic.",
                    "NGFW = stateful + DPI + IPS + app + identity awareness.",
                    "PF example = router ACL. Stateful = ASA. NGFW = Palo Alto.",
                    "Cost & power: PF < Stateful < NGFW."
                ]
            },
            {
                q: "(b) Recommend a firewall architecture for internal banking systems and public web services.",
                a: "Use a Screened Subnet (DMZ) design with two NGFWs in HA pairs. The outer NGFW protects the public web and email servers in the DMZ; the inner NGFW separates the DMZ from the internal core banking network. ATMs connect over IPsec VPN, and remote staff use SSL VPN with MFA.",
                exp: "Picture a hotel. The lobby is open to anyone (that's the DMZ where the public website lives). To reach the bedrooms upstairs (core banking systems) you need a second keycard from reception. Even if a thief sneaks into the lobby, they still cannot enter any guest room.",
                points: [
                    "Two NGFWs in HA pairs (different vendors if possible).",
                    "Outer NGFW + DMZ for web/email/public APIs.",
                    "Inner NGFW protects core banking systems.",
                    "ATMs → site-to-site IPsec VPN.",
                    "Remote staff → SSL VPN with certificates + MFA."
                ]
            },
            {
                q: "(c) Limitations of firewalls and how a Distributed Firewall Architecture helps.",
                a: "Firewalls only guard the network edge — once an attacker is inside (via phishing, USB, insider) they can move freely. They also can't easily inspect encrypted traffic. A Distributed Firewall puts a small enforcement point on every server, laptop and VM with one central policy, so attackers can't move sideways even after a breach.",
                exp: "A normal firewall is like having one big lock on the front gate of your house — once someone gets inside, every room is open. A distributed firewall is like having a separate lock on every single room. Even if a burglar gets in the front door, they still can't reach the safe in the bedroom.",
                points: [
                    "Firewalls don't stop insider threats or phishing.",
                    "Limited visibility into encrypted and east-west traffic.",
                    "Distributed FW = enforcement on every host/VM, central policy.",
                    "Stops lateral movement after a breach.",
                    "Tools: Windows Defender Firewall + GPO, NSX, Illumio, AWS/Azure security groups."
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
        title: "Q4 — SSL VPN, X.509 Certificates and Trust Errors",
        context: "Bank staff working remotely are required to connect securely to the central server. A few employees report seeing 'certificate not trusted' errors during login.",
        questions: [
            {
                q: "(a) Explain how an SSL VPN works with X.509 certificates.",
                a: "An SSL VPN builds an encrypted TLS tunnel over port 443 between the user and the bank's gateway. The gateway has an X.509 certificate signed by a trusted CA, which proves the gateway's identity. After the client checks the certificate, both sides agree on a symmetric AES session key and all VPN traffic is encrypted with it.",
                exp: "Imagine a secret underground tunnel between your home and your office. People walking on the street above can see the road, but they cannot see what is happening inside the tunnel. The certificate is like the office showing you a government-stamped ID before you enter — it proves you're really at the right office and not a fake one.",
                points: [
                    "SSL VPN = TLS tunnel on TCP/443 (firewall-friendly).",
                    "Trust comes from an X.509 cert signed by a CA.",
                    "TLS handshake → exchange keys → derive AES session key.",
                    "Mutual TLS proves both server AND client identity.",
                    "Bulk traffic encrypted with AES-GCM."
                ]
            },
            {
                q: "(b) Describe how a client verifies a server certificate (and why users see 'certificate not trusted').",
                a: "The client checks: (1) the cert chain leads to a CA in its trust store, (2) the signature is valid, (3) the cert is not expired, (4) the hostname matches, and (5) the cert isn't revoked (CRL/OCSP). If any check fails the user sees 'certificate not trusted'. The most common bank cause is the internal root CA not being installed on the laptop.",
                exp: "Think of an airport passport check. The officer asks: Is this passport real? Was it issued by a country we trust? Has it expired? Is the photo really this person? Has it been reported stolen? If any answer is No, you're stopped — that's exactly what 'certificate not trusted' means.",
                points: [
                    "Checks: chain of trust, signature, dates, hostname, revocation.",
                    "Trust root must exist on the client.",
                    "Common error causes: missing root CA, expired cert, wrong clock, wrong hostname.",
                    "Use ECDHE for forward secrecy.",
                    "Fix = deploy internal root CA to laptops via GPO."
                ]
            },
            {
                q: "(c) Compare SSL VPN, OpenVPN, and L2TP/IPsec VPN.",
                a: "SSL VPN (e.g. Cisco AnyConnect) uses TLS on port 443, so it works through almost any firewall and is easy for staff. OpenVPN is open-source TLS VPN that runs on UDP or TCP — strong, flexible and fast. L2TP/IPsec is built into most operating systems but uses uncommon ports (UDP 500/4500) that hotels often block.",
                exp: "Imagine three ways into your office. SSL VPN is a hotel-style keycard that works at every door, every airport, every coffee shop. OpenVPN is like a custom keycard you bring yourself — works almost everywhere and very secure. L2TP/IPsec is like an old metal key that's already on every keyring, but many hotels have changed their locks so it doesn't fit any more.",
                points: [
                    "SSL VPN: TCP/443, easy through firewalls, vendor clients.",
                    "OpenVPN: open-source TLS, very flexible, fast over UDP.",
                    "L2TP/IPsec: built-in on Windows/macOS/iOS, often blocked on public Wi-Fi.",
                    "All three are secure if configured properly.",
                    "Best for travelling staff = SSL VPN or OpenVPN over 443."
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
                q: "(a) How does GPG4WIN / GPG (Mac) manage public-private key pairs?",
                a: "GPG creates an asymmetric key pair (e.g. RSA-4096 or Ed25519) made of a public key (shared with others) and a private key (kept secret and protected by a passphrase). To encrypt, GPG uses the recipient's public key on a random AES session key (hybrid). To sign, GPG hashes the message and encrypts the hash with the sender's private key. Kleopatra is the GUI used to manage all of this.",
                exp: "Picture giving all your friends an open padlock with your name on it. Anyone can grab a padlock, lock a box and send it to you — only your private key opens that padlock. Signing is the opposite: you stamp the box with a wax seal of your unique ring, so anyone seeing the seal knows the box really came from you.",
                points: [
                    "Key pair = primary key + capability subkeys (sign / encrypt).",
                    "Private key encrypted with passphrase, stored locally.",
                    "Encryption is hybrid: AES session key + recipient's public key.",
                    "Signing = hash + encrypt with sender's private key.",
                    "Always generate and back up a Revocation Certificate."
                ]
            },
            {
                q: "(b) Key components of a PGP keyring and their use in secure communication.",
                a: "A keyring stores all the keys a user works with. It has a public keyring (other people's public keys) and a private keyring (the user's own secret keys). Each entry contains a primary key, subkeys, user IDs, signatures, a fingerprint and a trust level. Fingerprints should be checked out-of-band before trusting a key.",
                exp: "Think of your phone's contact list — but instead of phone numbers, it stores everyone's special padlocks (public keys) and your own secret key. The 'fingerprint' is like a unique ID number for each padlock, so before you trust a friend's padlock you ring them up and read out the number to make sure nobody swapped it.",
                points: [
                    "Public keyring + private keyring.",
                    "Components: primary key, subkeys, UIDs, signatures, fingerprint, trust DB.",
                    "Subkeys split capabilities (sign vs encrypt).",
                    "Trust = Web of Trust or internal CA-style signing.",
                    "Verify the full fingerprint out-of-band before trusting a key."
                ]
            },
            {
                q: "(c) Risks of no key management policy + best practices for key lifecycle in banks.",
                a: "Without a policy the bank risks lost keys (data unrecoverable), stolen keys (data leaked), impersonation, and compliance failures (GDPR, PCI-DSS). The fix is a full key lifecycle: Generate → Distribute → Store → Use → Rotate → Revoke → Archive → Destroy. Use HSMs / hardware tokens, escrow encryption keys (never signing keys) and revoke immediately on staff exit.",
                exp: "It's just like managing house keys. You make a new key, give copies only to trusted people, keep the master in a safe, change the locks if someone loses theirs, take the key back when a tenant moves out, and when you finally sell the house you melt the keys so nobody can use them again.",
                points: [
                    "Risks: data loss, leaks, impersonation, compliance fines.",
                    "Lifecycle: G-D-S-U-R-R-A-D.",
                    "Store private keys in HSM or hardware tokens (YubiKey).",
                    "Escrow encryption keys, NEVER signing keys.",
                    "Rotate on schedule, revoke instantly on staff departure."
                ]
            }
        ]
    }
];

window.mockTestQuestions = mockTestQuestions;
