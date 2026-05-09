// Scenario-Based Questions extracted from DOCX files
// These cover: AES/RSA, Firewalls, Malware, PGP/GPG
// Updated to include detailed answers and explanations

const scenarioQuestions = [
    // ===== AES / RSA / Cryptography =====
    {
        id: "s-aes-1",
        topic: "AES & RSA Cryptography",
        title: "Secure Data Storage Using AES",
        context: "A healthcare organization stores sensitive patient records in a database. Currently, the system uses AES encryption to protect data at rest, but a breach reveals that encryption keys were stored on the same server as the data.",
        questions: [
            {
                q: "Explain how AES provides confidentiality for stored data.",
                a: "AES (Advanced Encryption Standard) is a symmetric block cipher. It takes plaintext patient data and encrypts it using a secret key, converting it into unreadable ciphertext. Without the specific secret key, unauthorized users (or attackers) cannot reverse the process, ensuring the data remains confidential even if the database is accessed."
            },
            {
                q: "Identify and explain three security weaknesses in this setup.",
                a: "1) Storing the key with the data: The attacker gains both the locked data and the key to unlock it simultaneously. 2) Lack of separation of duties: The database administrator likely has access to both data and keys. 3) Single point of failure: Compromising one server compromises the entire security architecture."
            },
            {
                q: "Describe how an attacker could exploit poor key management.",
                a: "An attacker could use an SQL injection or a server-side vulnerability to access the file system. Once they find the plaintext key stored on the server, they can simply write a script to decrypt the entire database of patient records, completely bypassing the AES encryption."
            },
            {
                q: "Propose a secure key management strategy.",
                a: "The organization should use a dedicated Hardware Security Module (HSM) or a secure Key Management Service (KMS) separated from the database. The database should only send data to the KMS to be encrypted/decrypted, and the key itself should never reside on the database server."
            },
            {
                q: "Evaluate the strengths and limitations of AES in this scenario.",
                a: "Strength: AES is mathematically highly secure and very fast, making it ideal for encrypting large databases (data at rest). Limitation: AES is a symmetric cipher, meaning key management and distribution are extremely difficult. If the single key is lost or stolen, the encryption is rendered useless."
            }
        ]
    },
    {
        id: "s-aes-2",
        topic: "AES & RSA Cryptography",
        title: "RSA Key Exchange in Secure Communication",
        context: "A company uses RSA encryption to exchange keys between a client and server before establishing a secure session.",
        questions: [
            {
                q: "Explain how RSA works (public key, private key, encryption/decryption).",
                a: "RSA uses an asymmetric key pair mathematically linked by large prime numbers. The Public Key is shared openly and is used by the sender to encrypt data. The Private Key is kept secret by the receiver and is the only key capable of decrypting the data encrypted by the corresponding public key."
            },
            {
                q: "Describe how RSA is used in secure key exchange.",
                a: "The client generates a random symmetric 'session key' (e.g., for AES). The client encrypts this session key using the server's public RSA key. The client sends the encrypted session key to the server. The server uses its private RSA key to decrypt it. Now both share a secure symmetric key."
            },
            {
                q: "Identify two limitations of RSA in modern systems.",
                a: "1) Performance: RSA involves complex mathematics (exponentiation) making it very slow and CPU-intensive compared to symmetric algorithms. 2) Key Size: To remain secure against modern computing power, RSA requires very large key sizes (e.g., 2048 or 4096 bits), which consumes more bandwidth."
            },
            {
                q: "Explain why RSA is combined with symmetric encryption.",
                a: "This creates a 'Hybrid Encryption' system. RSA (asymmetric) is slow but solves the key distribution problem. AES (symmetric) is fast but struggles with key distribution. By using RSA just to securely share the AES key, the system gets the security of RSA and the speed of AES for bulk data."
            },
            {
                q: "Suggest improvements to enhance security and performance.",
                a: "The company should transition from RSA to Elliptic Curve Cryptography (ECC) for key exchange (e.g., ECDHE). ECC provides the same level of security as RSA but with much smaller key sizes, resulting in faster computations, less bandwidth usage, and Forward Secrecy."
            }
        ]
    },
    {
        id: "s-fw-1",
        topic: "Firewalls & Network Security",
        title: "Misconfigured Perimeter Firewall",
        context: "A company deploys a perimeter firewall to protect its internal network. However, after a security incident, it is discovered that: all outbound traffic is allowed, several inbound ports are open unnecessarily, and no logging or monitoring is enabled.",
        questions: [
            {
                q: "Identify and explain three security weaknesses in this configuration.",
                a: "1) Unrestricted outbound traffic: Allows malware to easily communicate with Command & Control (C2) servers or exfiltrate data. 2) Unnecessary open inbound ports: Increases the attack surface by exposing internal services to the public internet. 3) No logging: Prevents security teams from detecting active attacks, investigating breaches, or conducting forensics."
            },
            {
                q: "Describe how an attacker could exploit overly permissive rules.",
                a: "An attacker could scan the unnecessary open inbound ports to find a vulnerable service (e.g., an unpatched RDP server). Once exploited, they can establish a reverse shell. Because all outbound traffic is allowed, the firewall will not block the reverse shell connecting back to the attacker's machine."
            },
            {
                q: "Propose a secure firewall rule set based on the principle of least privilege.",
                a: "Implement an 'Implicit Deny' rule at the bottom of the ACL (Deny All Inbound, Deny All Outbound). Then, explicitly allow only absolutely necessary traffic above it (e.g., Allow Inbound Port 443 to Web Server; Allow Outbound Port 53 for DNS to specific servers only)."
            },
            {
                q: "Explain the importance of logging and monitoring on firewalls.",
                a: "Logging captures the metadata of traffic flows (IPs, ports, action taken). Monitoring these logs (often via a SIEM) allows analysts to spot anomalies, detect unauthorized access attempts, and fulfill compliance requirements regarding incident response."
            },
            {
                q: "Evaluate the risks of unrestricted outbound traffic.",
                a: "Unrestricted outbound traffic (egress) is a massive risk. It allows compromised internal machines to freely participate in botnets, download secondary malware payloads, or quietly exfiltrate gigabytes of sensitive corporate data to external attacker-controlled servers without triggering any firewall blocks."
            }
        ]
    },
    {
        id: "s-fw-2",
        topic: "Firewalls & Network Security",
        title: "Stateful vs Stateless Firewall Selection",
        context: "An organization is choosing between stateless and stateful firewalls for their enterprise network. They need to understand the trade-offs.",
        questions: [
            {
                q: "Compare stateless vs stateful firewalls.",
                a: "Stateless firewalls (packet filters) inspect each packet individually against a set of static rules (ACLs), looking only at headers (IP, Port). Stateful firewalls inspect packets but also track the 'state' of the entire connection (e.g., TCP handshake), understanding the context of the traffic stream."
            },
            {
                q: "Explain how stateful firewalls track connections using state tables.",
                a: "A stateful firewall maintains a dynamic 'state table' in memory. When an internal user initiates an outbound connection (e.g., a web request), the firewall records the source/destination IPs and ports. When the return traffic arrives, the firewall checks the state table and automatically allows it because it's part of an established, valid session."
            },
            {
                q: "Identify use cases where stateless firewalls are appropriate.",
                a: "Stateless firewalls are very fast because they don't consume memory tracking connections. They are appropriate for internal network segmentation where traffic volume is extremely high, or at the very edge of a network to quickly drop obvious junk traffic (like basic DDoS mitigation) before it hits the stateful firewall."
            },
            {
                q: "Evaluate performance vs security trade-offs.",
                a: "Stateless firewalls offer high performance and low latency but low security (they can be easily bypassed by forged packets). Stateful firewalls offer high security (they understand connection context and prevent spoofing) but require more memory, CPU power, and can be vulnerable to state-exhaustion DDoS attacks."
            },
            {
                q: "Recommend the best option for enterprise use and justify.",
                a: "For the primary enterprise perimeter, a Stateful Firewall (specifically a Next-Generation Firewall) is absolutely required. Modern attacks easily bypass stateless filters. The stateful capabilities are necessary to track complex application sessions, while Next-Gen features add deep packet inspection for malware."
            }
        ]
    },
    {
        id: "s-mal-1",
        topic: "Malware & Detection",
        title: "Antivirus Failure in Malware Detection",
        context: "A company relies on signature-based antivirus software. A new malware strain infects several systems without being detected by the antivirus.",
        questions: [
            {
                q: "Explain how signature-based antivirus works.",
                a: "Signature-based AV works like a digital fingerprint scanner. It maintains a database of known malware 'signatures' (hashes or byte sequences). When a file is scanned, its signature is compared to the database. If there's a match, it's flagged as malware."
            },
            {
                q: "Identify two limitations of signature-based detection.",
                a: "1) It is entirely useless against 'Zero-Day' malware (brand new threats that don't have a signature in the database yet). 2) It can be easily bypassed by attackers slightly modifying the malware code to change its hash, rendering the existing signature obsolete."
            },
            {
                q: "Describe how modern malware evades antivirus systems.",
                a: "Modern malware uses 'Polymorphism' or 'Metamorphism'. Polymorphic malware encrypts its payload differently every time it infects a system, meaning the file hash constantly changes. This ensures a signature-based AV never sees the exact same file twice."
            },
            {
                q: "Propose advanced detection techniques (heuristic, behavioral analysis).",
                a: "Instead of looking at what the file *is* (signature), heuristic and behavioral analysis look at what the file *does*. If a totally unknown program suddenly tries to delete shadow copies and encrypt the 'Documents' folder, behavioral analysis flags it as malicious based on its actions."
            },
            {
                q: "Evaluate the effectiveness of antivirus alone in modern cybersecurity.",
                a: "Traditional AV alone is highly ineffective against modern, sophisticated threats. It is considered a baseline, legacy control. Organizations must move towards Endpoint Detection and Response (EDR) platforms that utilize AI, machine learning, and continuous behavioral monitoring to stop unknown threats."
            }
        ]
    },
    {
        id: "s-pgp-1",
        topic: "PGP & GPG",
        title: "Secure Email Communication Using PGP/GPG",
        context: "A company uses PGP (implemented via GPG) to secure email communication. A user accidentally encrypts a message using the wrong public key, meaning the intended recipient cannot decrypt it.",
        questions: [
            {
                q: "Explain how PGP/GPG encryption works (symmetric key + public key hybrid).",
                a: "PGP generates a random symmetric session key to quickly encrypt the message body. It then uses the recipient's public asymmetric key to encrypt that symmetric session key. Both the encrypted message and encrypted session key are sent to the recipient, who uses their private key to decrypt the session key, and then decrypts the message."
            },
            {
                q: "Identify the mistake and explain its impact.",
                a: "The user selected the wrong public key from their keyring when encrypting. The impact is a loss of availability/communication failure. The intended recipient does not possess the matching private key for the public key that was used, so they cannot decrypt the session key, making the message permanently unreadable to them."
            },
            {
                q: "Explain how key verification (fingerprint checking) prevents this issue.",
                a: "Before trusting or using a public key, users should verify its 'fingerprint' (a short cryptographic hash of the key) through an out-of-band method (like a phone call). This ensures they have the correct, authentic key belonging to the intended recipient, preventing accidental encryption to the wrong person or an attacker."
            },
            {
                q: "Propose procedures to ensure correct key usage in an organization.",
                a: "The organization should implement a strict key management policy: all public keys must be signed by a trusted internal authority, users must verify fingerprints before importing keys, and email clients should be integrated with a managed key directory so correct keys are selected automatically."
            },
            {
                q: "Evaluate the strengths and limitations of PGP for email security.",
                a: "Strength: PGP provides excellent end-to-end encryption, ensuring privacy even if the email server is compromised. Limitation: PGP is notoriously difficult for average users to manage (keyrings, trust levels), lacks forward secrecy, and does not encrypt email metadata (subject lines, sender/receiver addresses)."
            }
        ]
    }
];

window.scenarioQuestions = scenarioQuestions;
