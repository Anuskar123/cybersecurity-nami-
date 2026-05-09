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
    },
    {
        id: "s-ids-1",
        topic: "Intrusion Detection Systems",
        title: "IDS Alert Fatigue and Tuning",
        context: "A Security Operations Center (SOC) recently deployed a signature-based Network Intrusion Detection System (NIDS). After a week, the analysts are overwhelmed by thousands of alerts per day, most of which are false positives, causing them to miss a real data exfiltration event.",
        questions: [
            {
                q: "Explain the difference between a false positive and a false negative in an IDS.",
                a: "A false positive occurs when the IDS incorrectly flags legitimate, benign traffic as malicious. A false negative occurs when the IDS fails to detect actual malicious traffic, allowing an attack to go unnoticed."
            },
            {
                q: "Describe the concept of 'alert fatigue' and its impact on the SOC.",
                a: "Alert fatigue happens when analysts are bombarded with so many false or low-priority alerts that they become desensitized. The impact is that they start ignoring or quickly closing alerts without proper investigation, which ultimately leads to missing critical, real attacks (like the data exfiltration event)."
            },
            {
                q: "Explain the difference between an IDS and an IPS.",
                a: "An Intrusion Detection System (IDS) is passive; it monitors traffic and generates alerts but does not stop the attack. An Intrusion Prevention System (IPS) is active; it sits inline with traffic and can automatically drop malicious packets or block IP addresses."
            },
            {
                q: "Identify a reason why the signature-based NIDS generated so many false positives.",
                a: "The NIDS might be using default, out-of-the-box rule sets that are not tailored to the organization's specific network environment. For example, a rule might flag standard internal administrative scripts as 'suspicious network scanning'."
            },
            {
                q: "Propose a strategy to optimize the IDS and reduce alert fatigue.",
                a: "The SOC needs to perform 'tuning.' This involves analyzing the false positives, disabling irrelevant signatures, creating custom rules for the specific network, and adjusting alert thresholds. Additionally, correlating IDS logs with other sources via a SIEM can help prioritize truly critical alerts."
            }
        ]
    },
    {
        id: "s-web-1",
        topic: "Web Security",
        title: "SQL Injection in a Customer Portal",
        context: "An e-commerce website uses a backend database to authenticate users. An attacker enters `' OR 1=1 --` into the username field of the login page and successfully gains administrative access without knowing a valid password.",
        questions: [
            {
                q: "Explain the mechanism of a SQL Injection (SQLi) attack.",
                a: "SQLi occurs when a web application takes user input and passes it directly into a backend database query without sanitization. The attacker crafts malicious input that alters the structure of the SQL query, forcing the database to execute unintended commands."
            },
            {
                q: "Analyze how the payload `' OR 1=1 --` bypassed the authentication.",
                a: "The payload alters the backend query (e.g., `SELECT * FROM users WHERE username = '' OR 1=1 --' AND password = '...'`). The `1=1` statement is always true. The `--` comments out the rest of the query (like the password check). Thus, the database returns a valid user record, granting access."
            },
            {
                q: "Identify the primary coding flaw that enables this vulnerability.",
                a: "The primary flaw is the lack of input validation and the use of dynamic string concatenation to build SQL queries, rather than treating user input strictly as data."
            },
            {
                q: "Propose the most effective programmatic defense against SQL injection.",
                a: "The most effective defense is the use of Parameterized Queries (or Prepared Statements). This approach separates the SQL code from the user-provided data, ensuring the database treats the input strictly as a literal value, not as executable SQL commands."
            },
            {
                q: "Evaluate the role of a Web Application Firewall (WAF) in this scenario.",
                a: "A WAF can inspect incoming HTTP traffic and block common SQLi payloads (like `' OR 1=1`) before they reach the web server. While highly effective as a compensating control, it does not fix the underlying vulnerable code, so it should be used in conjunction with secure coding practices."
            }
        ]
    },
    {
        id: "s-vpn-1",
        topic: "VPN & Network Security",
        title: "Securing Remote Access with VPNs",
        context: "Due to a sudden shift to remote work, employees are accessing sensitive corporate file shares from public coffee shop Wi-Fi networks without any encryption, leading to credentials being compromised.",
        questions: [
            {
                q: "Explain the risk of using public Wi-Fi without encryption.",
                a: "Public Wi-Fi networks are often unsecured. Attackers on the same network can use packet sniffers (like Wireshark) to capture unencrypted traffic. If employees transmit passwords or sensitive files in plain text, the attacker can easily read and steal this information in a Man-in-the-Middle (MitM) attack."
            },
            {
                q: "Describe how a Virtual Private Network (VPN) mitigates this risk.",
                a: "A VPN establishes a secure, encrypted 'tunnel' between the employee's device and the corporate network over the public internet. Even if an attacker intercepts the traffic on the public Wi-Fi, they will only see unreadable ciphertext, preserving confidentiality and integrity."
            },
            {
                q: "Compare IPsec VPNs and SSL/TLS VPNs.",
                a: "IPsec VPNs operate at the Network Layer (Layer 3), typically requiring dedicated client software, and are often used for site-to-site or full-device tunneling. SSL/TLS VPNs operate at the Application/Transport Layer, can often be accessed simply via a web browser without special software, and provide more granular, application-level access."
            },
            {
                q: "Identify a critical vulnerability if the VPN only requires a username and password.",
                a: "If the VPN relies only on a username and password, it is highly vulnerable to credential theft (e.g., via phishing, brute force, or credential stuffing). If an attacker gets the password, the VPN provides direct access to the internal network."
            },
            {
                q: "Recommend a control to strengthen VPN authentication.",
                a: "The organization must implement Multi-Factor Authentication (MFA). By requiring a second factor (like a time-based code from an authenticator app or a hardware token), an attacker cannot access the VPN even if they successfully steal the user's password."
            }
        ]
    },
    {
        id: "s-ir-1",
        topic: "Policy & Incident Response",
        title: "Ransomware Outbreak and Response",
        context: "An employee clicks on a phishing email attachment, triggering a ransomware attack that encrypts the company's main file server. The IT team immediately unplugs the server from the network and prepares to pay the ransom.",
        questions: [
            {
                q: "Identify the phase of the Incident Response lifecycle that failed initially.",
                a: "The Preparation/Prevention phase failed, specifically regarding user awareness training (the employee fell for phishing) and technical controls (email filtering failed to block the malicious attachment)."
            },
            {
                q: "Evaluate the IT team's decision to immediately unplug the server.",
                a: "Unplugging the server from the network (Containment) is a good immediate step to prevent the ransomware from spreading laterally to other systems. However, completely powering it off might destroy volatile memory (RAM) evidence needed for forensics and potentially corrupt files."
            },
            {
                q: "Analyze the risks of paying the ransom.",
                a: "Paying the ransom provides no guarantee the attackers will actually provide the decryption key. It also encourages further criminal behavior, marks the organization as a willing payer (inviting future attacks), and may violate government sanctions depending on the threat actor."
            },
            {
                q: "Propose the correct recovery strategy instead of paying the ransom.",
                a: "The organization should utilize offline, immutable backups to restore the data. The affected systems should be completely wiped and rebuilt from clean images. The vulnerability (phishing susceptibility) must be addressed before reconnecting the restored systems."
            },
            {
                q: "Explain the importance of the 'Lessons Learned' phase after this incident.",
                a: "The 'Lessons Learned' (or Post-Incident Activity) phase is crucial for analyzing what went wrong and how the response can be improved. The organization must update their policies, implement better email filtering, and improve employee training to prevent a similar attack from occurring again."
            }
        ]
    }
];

window.scenarioQuestions = scenarioQuestions;
