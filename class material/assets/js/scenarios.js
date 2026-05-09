// Scenario-Based Questions extracted from DOCX files
// These cover: AES/RSA, Firewalls, Malware, PGP/GPG

const scenarioQuestions = [
    // ===== AES / RSA / Cryptography =====
    {
        id: "s-aes-1",
        topic: "AES & RSA Cryptography",
        title: "Secure Data Storage Using AES",
        context: "A healthcare organization stores sensitive patient records in a database. Currently, the system uses AES encryption to protect data at rest, but a breach reveals that encryption keys were stored on the same server as the data.",
        questions: [
            "Explain how AES provides confidentiality for stored data.",
            "Identify and explain three security weaknesses in this setup.",
            "Describe how an attacker could exploit poor key management.",
            "Propose a secure key management strategy.",
            "Evaluate the strengths and limitations of AES in this scenario."
        ]
    },
    {
        id: "s-aes-2",
        topic: "AES & RSA Cryptography",
        title: "RSA Key Exchange in Secure Communication",
        context: "A company uses RSA encryption to exchange keys between a client and server before establishing a secure session.",
        questions: [
            "Explain how RSA works (public key, private key, encryption/decryption).",
            "Describe how RSA is used in secure key exchange.",
            "Identify two limitations of RSA in modern systems.",
            "Explain why RSA is combined with symmetric encryption.",
            "Suggest improvements to enhance security and performance."
        ]
    },
    {
        id: "s-aes-3",
        topic: "AES & RSA Cryptography",
        title: "Symmetric vs Asymmetric Encryption in Messaging System",
        context: "A messaging platform is being designed to provide secure communication between users. The team must decide between symmetric encryption, asymmetric encryption, or a hybrid approach.",
        questions: [
            "Compare symmetric and asymmetric encryption (performance, key management, security).",
            "Propose a hybrid encryption model.",
            "Explain how session keys are generated and used.",
            "Identify potential vulnerabilities in this design.",
            "Evaluate trade-offs between efficiency and security."
        ]
    },
    {
        id: "s-aes-4",
        topic: "AES & RSA Cryptography",
        title: "AES Implementation Vulnerability (ECB Mode)",
        context: "An application uses AES in ECB (Electronic Codebook) mode to encrypt sensitive files. A security audit reveals that patterns in the encrypted output match patterns in the original data.",
        questions: [
            "Explain how AES works at a high level.",
            "Describe why ECB mode is insecure.",
            "Identify patterns that may leak through ECB encryption.",
            "Recommend a more secure mode (CBC, GCM) and justify your choice.",
            "Explain how initialization vectors (IVs) improve security."
        ]
    },
    {
        id: "s-aes-5",
        topic: "AES & RSA Cryptography",
        title: "RSA Key Management Failure",
        context: "An organization uses RSA for secure communication but: private keys are stored without protection, key sizes are outdated (1024-bit), and no key rotation policy exists.",
        questions: [
            "Identify and explain three security risks in this setup.",
            "Explain how weak key sizes affect security.",
            "Describe how an attacker could exploit poor key protection.",
            "Propose a secure key management policy.",
            "Evaluate importance of key rotation and secure storage."
        ]
    },
    {
        id: "s-aes-6",
        topic: "AES & RSA Cryptography",
        title: "Hybrid Encryption in Web Security",
        context: "A web application uses RSA for key exchange and AES for encrypting data during transmission. This is similar to how TLS/SSL works in practice.",
        questions: [
            "Explain how hybrid encryption works.",
            "Describe the respective roles of AES and RSA.",
            "Explain the performance benefits of hybrid encryption.",
            "Identify possible attack vectors.",
            "Recommend improvements to strengthen security."
        ]
    },

    // ===== FIREWALLS =====
    {
        id: "s-fw-1",
        topic: "Firewalls & Network Security",
        title: "Misconfigured Perimeter Firewall",
        context: "A company deploys a perimeter firewall to protect its internal network. However, after a security incident, it is discovered that: all outbound traffic is allowed, several inbound ports are open unnecessarily, and no logging or monitoring is enabled.",
        questions: [
            "Identify and explain three security weaknesses in this configuration.",
            "Describe how an attacker could exploit overly permissive rules.",
            "Propose a secure firewall rule set based on the principle of least privilege.",
            "Explain the importance of logging and monitoring on firewalls.",
            "Evaluate the risks of unrestricted outbound traffic."
        ]
    },
    {
        id: "s-fw-2",
        topic: "Firewalls & Network Security",
        title: "Firewall Architecture Design (DMZ)",
        context: "A web application must be accessible from the internet while protecting internal databases. The organization needs to design a secure network architecture.",
        questions: [
            "Design a firewall architecture using a DMZ (Demilitarised Zone).",
            "Explain the traffic flow between internet, web server, and database.",
            "Identify three security benefits of a DMZ.",
            "Discuss weaknesses in a poor DMZ implementation.",
            "Recommend additional controls to strengthen the architecture."
        ]
    },
    {
        id: "s-fw-3",
        topic: "Firewalls & Network Security",
        title: "Stateful vs Stateless Firewall Selection",
        context: "An organization is choosing between stateless and stateful firewalls for their enterprise network. They need to understand the trade-offs.",
        questions: [
            "Compare stateless vs stateful firewalls.",
            "Explain how stateful firewalls track connections using state tables.",
            "Identify use cases where stateless firewalls are appropriate.",
            "Evaluate performance vs security trade-offs.",
            "Recommend the best option for enterprise use and justify."
        ]
    },
    {
        id: "s-fw-4",
        topic: "Firewalls & Network Security",
        title: "Application Layer Firewall (Proxy)",
        context: "A company deploys a proxy (application-layer) firewall to protect its web services from sophisticated attacks that packet-filtering firewalls cannot detect.",
        questions: [
            "Explain how an application-layer firewall works.",
            "Compare with packet filtering and stateful firewalls.",
            "Identify advantages in detecting application-layer attacks (e.g., SQL injection, XSS).",
            "Discuss limitations such as performance overhead.",
            "Evaluate when proxy firewalls are most appropriate."
        ]
    },
    {
        id: "s-fw-5",
        topic: "Firewalls & Network Security",
        title: "Firewall Bypass & Insider Threat",
        context: "An employee bypasses firewall restrictions using unauthorized tools (such as a personal VPN or SSH tunnel) to access blocked websites from the corporate network.",
        questions: [
            "Explain common firewall bypass techniques.",
            "Identify weaknesses in firewall enforcement.",
            "Propose methods to prevent firewall bypass.",
            "Discuss the role of Deep Packet Inspection (DPI) and monitoring.",
            "Evaluate the risks posed by insider threats in this context."
        ]
    },
    {
        id: "s-fw-6",
        topic: "Firewalls & Network Security",
        title: "Multi-Layer Firewall Architecture",
        context: "A financial organization uses multiple firewall layers as part of a defense-in-depth strategy. Different firewall types are deployed at different points in the network.",
        questions: [
            "Explain the concept of defense-in-depth using firewalls.",
            "Describe the roles of each firewall layer (perimeter, internal, host-based).",
            "Identify advantages of a layered firewall architecture.",
            "Discuss the management challenges of multiple firewall layers.",
            "Recommend best practices for maintaining this architecture."
        ]
    },

    // ===== MALWARE =====
    {
        id: "s-mal-1",
        topic: "Malware & Detection",
        title: "Antivirus Failure in Malware Detection",
        context: "A company relies on signature-based antivirus software. A new malware strain infects several systems without being detected by the antivirus.",
        questions: [
            "Explain how signature-based antivirus works.",
            "Identify two limitations of signature-based detection.",
            "Describe how modern malware evades antivirus systems.",
            "Propose advanced detection techniques (heuristic, behavioral analysis).",
            "Evaluate the effectiveness of antivirus alone in modern cybersecurity."
        ]
    },
    {
        id: "s-mal-2",
        topic: "Malware & Detection",
        title: "Trojan Infection via Email Attachment",
        context: "An employee downloads an email attachment disguised as an invoice. Shortly after, the system starts sending sensitive data to an external server without the user's knowledge.",
        questions: [
            "Explain what a Trojan horse is and how it differs from viruses.",
            "Describe how the Trojan gained access to the system.",
            "Identify the potential impact of this attack on the organization.",
            "Propose preventive measures (email filtering, security awareness training).",
            "Suggest detection and removal methods."
        ]
    },
    {
        id: "s-mal-3",
        topic: "Malware & Detection",
        title: "Rootkit Installation and Persistence",
        context: "A system shows abnormal behavior (slow performance, unusual network traffic), but antivirus scans detect nothing. A deeper investigation reveals a kernel-level rootkit has been installed.",
        questions: [
            "Explain what a rootkit is and the different types (user-level, kernel-level).",
            "Describe why rootkits are particularly hard to detect.",
            "Explain how rootkits achieve persistence and stealth on a system.",
            "Propose detection techniques for rootkits.",
            "Evaluate the best approach for removing a kernel-level rootkit."
        ]
    },
    {
        id: "s-mal-4",
        topic: "Malware & Detection",
        title: "Combined Multi-Stage Malware Attack",
        context: "A Trojan initially gains access to a corporate system via a phishing email. Once inside, it downloads and installs a rootkit to maintain long-term, undetected access to the network.",
        questions: [
            "Explain how multi-stage malware attacks work.",
            "Describe the respective roles of the Trojan and the rootkit.",
            "Identify the challenges in detecting multi-stage attacks.",
            "Propose a defense-in-depth strategy against these attacks.",
            "Evaluate the risks if this type of attack goes undetected."
        ]
    },
    {
        id: "s-mal-5",
        topic: "Malware & Detection",
        title: "Antivirus Evasion Techniques",
        context: "A piece of malware avoids detection by using code obfuscation, encrypted payloads, and by changing its signature with each infection (polymorphic behavior).",
        questions: [
            "Explain common antivirus evasion techniques used by malware.",
            "Describe the difference between polymorphic and metamorphic malware.",
            "Explain why traditional signature-based antivirus struggles against these threats.",
            "Propose modern detection solutions (sandboxing, EDR, AI-based).",
            "Discuss the trade-offs between detection accuracy and system performance."
        ]
    },
    {
        id: "s-mal-6",
        topic: "Malware & Detection",
        title: "Enterprise Malware Defense Strategy",
        context: "An organization wants comprehensive protection against trojans, rootkits, and Advanced Persistent Threats (APTs). They need to design a full malware defense strategy.",
        questions: [
            "Design a comprehensive malware defense strategy.",
            "Explain the role of antivirus vs EDR (Endpoint Detection & Response).",
            "Identify three common attack vectors that need to be addressed.",
            "Recommend preventive controls for each attack vector.",
            "Evaluate the importance of continuous monitoring and incident response."
        ]
    },

    // ===== PGP / GPG =====
    {
        id: "s-pgp-1",
        topic: "PGP & GPG",
        title: "Secure Email Communication Using PGP/GPG",
        context: "A company uses PGP (implemented via GPG) to secure email communication. A user accidentally encrypts a message using the wrong public key, meaning the intended recipient cannot decrypt it.",
        questions: [
            "Explain how PGP/GPG encryption works (symmetric key + public key hybrid).",
            "Identify the mistake and explain its impact.",
            "Explain how key verification (fingerprint checking) prevents this issue.",
            "Propose procedures to ensure correct key usage in an organization.",
            "Evaluate the strengths and limitations of PGP for email security."
        ]
    },
    {
        id: "s-pgp-2",
        topic: "PGP & GPG",
        title: "Gpg4win Deployment Issues",
        context: "An organization deploys Gpg4win for secure file encryption. After an audit, several issues are found: users are sharing private keys, no passphrase protection is set, and public keys are not verified before use.",
        questions: [
            "Explain the purpose of Gpg4win and how it implements OpenPGP.",
            "Identify and explain three security issues found in this deployment.",
            "Describe the risks of sharing private keys.",
            "Recommend a secure key management policy for the organization.",
            "Explain the importance of user training in cryptographic tool deployment."
        ]
    },
    {
        id: "s-pgp-3",
        topic: "PGP & GPG",
        title: "Keyring Management Failure",
        context: "A developer mismanages multiple keys in their GPG keyring. Old keys are not revoked, expired keys are still being used, and the keyring contains unverified public keys from unknown sources.",
        questions: [
            "Explain what a keyring is in the context of GPG.",
            "Describe the components of a keyring (public keyring, private keyring).",
            "Explain the risks of poor key management.",
            "Propose best practices for keyring management.",
            "Evaluate the importance of proper key organization for security."
        ]
    },
    {
        id: "s-pgp-4",
        topic: "PGP & GPG",
        title: "Public Key Trust and Verification (Web of Trust)",
        context: "A user imports an unverified public key from the internet and uses it to encrypt sensitive data. Later, it is discovered that the key belonged to an attacker, not the intended recipient.",
        questions: [
            "Explain the PGP Web of Trust model.",
            "Describe how fingerprint verification works.",
            "Identify the risks of using unverified keys.",
            "Explain how an attacker could exploit this scenario (man-in-the-middle).",
            "Recommend methods for establishing trust in public keys."
        ]
    },
    {
        id: "s-pgp-5",
        topic: "PGP & GPG",
        title: "Digital Signatures Using GPG",
        context: "A company uses GPG to digitally sign its software releases. Users verify the signature before installing. The company is concerned about what happens if the signing private key is compromised.",
        questions: [
            "Explain how GPG digital signatures work.",
            "Describe the signature verification process.",
            "Identify the benefits (integrity, authenticity, non-repudiation).",
            "Explain the risks if the private signing key is compromised.",
            "Propose mitigation strategies (key revocation, sub-keys, HSMs)."
        ]
    },
    {
        id: "s-pgp-6",
        topic: "PGP & GPG",
        title: "Hybrid Encryption in PGP",
        context: "PGP uses a combination of symmetric and asymmetric encryption. A new team member asks why PGP doesn't just use RSA for everything.",
        questions: [
            "Explain how PGP's hybrid encryption works.",
            "Describe the role of the session key vs the public key.",
            "Explain why symmetric encryption is used for the message body (performance).",
            "Identify potential vulnerabilities in the hybrid approach.",
            "Evaluate the performance vs security trade-offs."
        ]
    }
];

window.scenarioQuestions = scenarioQuestions;
