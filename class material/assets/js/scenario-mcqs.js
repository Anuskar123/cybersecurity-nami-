// Scenario MCQs — TCA Level 6 (hard)
// 24 DOCX scenarios + CSY3023 Mock Test (May 2025) bank scenarios incl. network security & VPN

const scenarioMcqQuestions = [
    // ===== AES & RSA Cryptography =====
    {
        id: "smcq-cr-1a",
        scenarioTopic: "AES & RSA Cryptography",
        scenarioId: "cr-1-aes-db",
        scenarioTitle: "Secure Data Storage Using AES",
        difficulty: "hard",
        level: 6,
        question: "A healthcare provider encrypts patient records with AES-256 but stores the data encryption key on the same compromised database host. Which statement most accurately evaluates the residual risk?",
        options: [
            "Confidentiality fails because the symmetric algorithm is unsuitable for databases",
            "The cryptographic primitive remains sound but key governance voids the control",
            "Integrity is violated because AES does not support authenticated encryption modes",
            "Availability is impacted because envelope encryption increases query latency"
        ],
        correctAnswer: 1,
        explanation: "AES still provides confidentiality when keys are protected. Co-locating keys with ciphertext means a single host breach exposes both—the failure is operational key management, not the cipher."
    },
    {
        id: "smcq-cr-1b",
        scenarioTopic: "AES & RSA Cryptography",
        scenarioId: "cr-1-aes-db",
        scenarioTitle: "Secure Data Storage Using AES",
        difficulty: "hard",
        level: 6,
        question: "Which architecture best addresses envelope encryption for data at rest in this hospital scenario?",
        options: [
            "Derive the master key from the database administrator's login password",
            "Wrap data keys with a KMS/HSM master key off the database tier",
            "Rotate ciphertext weekly while retaining the same static AES key",
            "Publish the encrypted DEK alongside the ciphertext for transparency"
        ],
        correctAnswer: 1,
        explanation: "Envelope encryption stores encrypted data keys with records while the master key lives in a KMS/HSM. This separates duties, enables rotation, and keeps plaintext keys off the DB server."
    },
    {
        id: "smcq-cr-2a",
        scenarioTopic: "AES & RSA Cryptography",
        scenarioId: "cr-2-rsa-kex",
        scenarioTitle: "RSA Key Exchange",
        difficulty: "hard",
        level: 6,
        question: "During RSA-based key transport in a legacy TLS handshake, what limitation most motivates hybrid encryption for bulk session traffic?",
        options: [
            "RSA cannot encrypt values larger than the modulus without padding oracle risk",
            "RSA public keys cannot be distributed via X.509 certificate chains",
            "Symmetric keys cannot be derived from hash functions in TLS 1.3",
            "AES-GCM mandates elliptic curve keys instead of RSA moduli"
        ],
        correctAnswer: 0,
        explanation: "RSA encrypts small payloads only (e.g. a session key). Performance and block-size constraints make asymmetric encryption impractical for high-volume data—hence hybrid designs."
    },
    {
        id: "smcq-cr-2b",
        scenarioTopic: "AES & RSA Cryptography",
        scenarioId: "cr-2-rsa-kex",
        scenarioTitle: "RSA Key Exchange",
        difficulty: "hard",
        level: 6,
        question: "An auditor flags static RSA key transport without ephemeral Diffie-Hellman. What is the primary security concern?",
        options: [
            "Loss of forward secrecy if the long-term private key is later compromised",
            "Inability to negotiate AES-256 as the bulk encryption algorithm",
            "Mandatory downgrade to ECB mode for symmetric record protection",
            "Violation of ISO 27001 control A.8.24 on network segregation"
        ],
        correctAnswer: 0,
        explanation: "Static RSA key transport does not provide forward secrecy. Captured ciphertext could be decrypted later if the server's long-term private key is exposed—ECDHE addresses this in modern TLS."
    },
    {
        id: "smcq-cr-3a",
        scenarioTopic: "AES & RSA Cryptography",
        scenarioId: "cr-3-msg",
        scenarioTitle: "Symmetric vs Asymmetric in Messaging",
        difficulty: "hard",
        level: 6,
        question: "A stranger-to-stranger messaging platform must establish confidentiality without a pre-shared secret. Which design decision is most defensible at Level 6?",
        options: [
            "Distribute one organisational AES key embedded in the client installer",
            "Use asymmetric key agreement then derive session keys with a KDF",
            "Rely on transport TLS alone and store messages plaintext on servers",
            "Encrypt metadata with RSA and leave message bodies unencrypted"
        ],
        correctAnswer: 1,
        explanation: "Asymmetric agreement (RSA/ECDH) solves the key-distribution problem for strangers. A KDF derives session keys for efficient AEAD message encryption with rotation for forward secrecy."
    },
    {
        id: "smcq-cr-3b",
        scenarioTopic: "AES & RSA Cryptography",
        scenarioId: "cr-3-msg",
        scenarioTitle: "Symmetric vs Asymmetric in Messaging",
        difficulty: "hard",
        level: 6,
        question: "Which threat remains most plausible even when message bodies use AES-GCM with fresh nonces per message?",
        options: [
            "Brute-force exhaustion of a 128-bit AES key within one session",
            "Endpoint compromise or metadata correlation across ciphertext headers",
            "Automatic recovery of plaintext if the RSA modulus is 4096-bit",
            "Collision attacks against SHA-1 message authentication codes"
        ],
        correctAnswer: 1,
        explanation: "Strong algorithms do not protect compromised devices, social engineering, or traffic analysis on metadata. Defence in depth requires endpoint security and minimal metadata retention."
    },
    {
        id: "smcq-cr-4a",
        scenarioTopic: "AES & RSA Cryptography",
        scenarioId: "cr-4-ecb",
        scenarioTitle: "AES ECB Implementation Vulnerability",
        difficulty: "hard",
        level: 6,
        question: "An application encrypts medical imaging files with AES-128-ECB. Why does confidentiality remain weak despite a strong block cipher?",
        options: [
            "ECB requires transmission of the private key with each ciphertext block",
            "Deterministic encryption preserves structural patterns in the plaintext",
            "ECB mandates 56-bit effective key strength like legacy DES systems",
            "The mode prevents use of hardware AES-NI acceleration entirely"
        ],
        correctAnswer: 1,
        explanation: "ECB encrypts identical plaintext blocks to identical ciphertext blocks, leaking patterns (e.g. in bitmaps or fixed-field records). The AES core is fine; the mode of operation is flawed."
    },
    {
        id: "smcq-cr-4b",
        scenarioTopic: "AES & RSA Cryptography",
        scenarioId: "cr-4-ecb",
        scenarioTitle: "AES ECB Implementation Vulnerability",
        difficulty: "hard",
        level: 6,
        question: "Which migration path satisfies both confidentiality and integrity for large files with minimal operational risk?",
        options: [
            "AES-ECB with a random IV prepended once per entire file object",
            "AES-GCM with unique nonces and authentication tags per encryption",
            "Triple-DES in CBC mode without an HMAC over the ciphertext",
            "RSA-4096 direct encryption of each 128-bit file segment"
        ],
        correctAnswer: 1,
        explanation: "AES-GCM is an AEAD mode providing encryption and authentication. Unique nonces per object are mandatory—nonce reuse under the same key catastrophically breaks GCM."
    },
    {
        id: "smcq-cr-5a",
        scenarioTopic: "AES & RSA Cryptography",
        scenarioId: "cr-5-rsa-kmf",
        scenarioTitle: "RSA Key Management Failure",
        difficulty: "hard",
        level: 6,
        question: "An organisation deploys 1024-bit RSA signing keys in plaintext PEM files with no rotation policy. Which combined impact is most severe?",
        options: [
            "Only non-repudiation is affected; confidentiality remains unaffected",
            "Factoring risk, undetected forgery, and prolonged retrospective exposure",
            "Mandatory failure of TLS 1.3 cipher suite negotiation with clients",
            "Automatic invalidation of all AES data-encryption keys enterprise-wide"
        ],
        correctAnswer: 1,
        explanation: "Weak moduli may be factorable; stolen PEMs enable signing/decryption forgery; static keys extend blast radius of any past compromise—violating confidentiality, integrity, and authenticity."
    },
    {
        id: "smcq-cr-5b",
        scenarioTopic: "AES & RSA Cryptography",
        scenarioId: "cr-5-rsa-kmf",
        scenarioTitle: "RSA Key Management Failure",
        difficulty: "hard",
        level: 6,
        question: "Which control set best aligns with NIST key-management guidance for high-value RSA private keys?",
        options: [
            "Store keys in Git with AES-ECB protection and annual manual rotation",
            "HSM-backed storage, MFA, automated rotation, and audited revocation",
            "Email encrypted PEM files to security officers for offline archiving",
            "Share one corporate private key to simplify certificate renewal"
        ],
        correctAnswer: 1,
        explanation: "NIST SP 800-57 emphasises secure generation, storage in HSMs, access control, rotation, and revocation. Shared or repository-stored plaintext keys violate these principles."
    },
    {
        id: "smcq-cr-6a",
        scenarioTopic: "AES & RSA Cryptography",
        scenarioId: "cr-6-hybrid",
        scenarioTitle: "Hybrid Encryption in Web Security",
        difficulty: "hard",
        level: 6,
        question: "In a HTTPS transaction, which component is primarily responsible for bulk application data confidentiality after the handshake?",
        options: [
            "The server's RSA certificate public modulus encrypting each HTTP packet",
            "Symmetric record protection using negotiated AEAD ciphers like AES-GCM",
            "Base64 encoding of HTML resources within the X.509 certificate",
            "SHA-256 hashing of TLS handshake messages without encryption"
        ],
        correctAnswer: 1,
        explanation: "The handshake authenticates peers and establishes symmetric keys; record layer AEAD ciphers encrypt high-volume HTTP data efficiently—hybrid encryption in practice."
    },
    {
        id: "smcq-cr-6b",
        scenarioTopic: "AES & RSA Cryptography",
        scenarioId: "cr-6-hybrid",
        scenarioTitle: "Hybrid Encryption in Web Security",
        difficulty: "hard",
        level: 6,
        question: "TLS 1.3 removes static RSA key transport. What security property does mandatory (EC)DHE primarily strengthen?",
        options: [
            "Perfect forward secrecy for session keys independent of long-term keys",
            "Mandatory use of 3DES for backward compatibility with legacy clients",
            "Elimination of the need for certificate authority trust anchors",
            "Guaranteed resistance to all future quantum cryptanalysis attacks"
        ],
        correctAnswer: 0,
        explanation: "Ephemeral Diffie-Hellman provides forward secrecy: compromise of the certificate's private key does not decrypt previously captured sessions—a major TLS 1.3 improvement."
    },

    // ===== Malware Security =====
    {
        id: "smcq-ml-1a",
        scenarioTopic: "Malware Security",
        scenarioId: "ml-1-avsig",
        scenarioTitle: "Antivirus Failure",
        difficulty: "hard",
        level: 6,
        question: "Signature-only AV fails against a novel malware family. Which fundamental limitation of hash-based detection does this illustrate?",
        options: [
            "Heuristic engines cannot run on 64-bit operating system kernels",
            "Unknown or polymorphic variants lack entries in the signature database",
            "Antivirus products are prohibited from scanning encrypted NTFS volumes",
            "Zero-day exploits always target hardware rather than software layers"
        ],
        correctAnswer: 1,
        explanation: "Signature AV is reactive—it matches known patterns. Zero-days and packed/polymorphic malware evade until analysts publish signatures, creating an inherent detection gap."
    },
    {
        id: "smcq-ml-1b",
        scenarioTopic: "Malware Security",
        scenarioId: "ml-1-avsig",
        scenarioTitle: "Antivirus Failure",
        difficulty: "hard",
        level: 6,
        question: "Which layered control most directly addresses the gap left by signature antivirus in this scenario?",
        options: [
            "Disable macro security to reduce false positives on documents",
            "EDR with behavioural analytics and sandbox detonation pipelines",
            "Remove SIEM logging to improve endpoint CPU performance",
            "Permit unsigned PowerShell execution for administrative efficiency"
        ],
        correctAnswer: 1,
        explanation: "EDR observes process behaviour, memory injection, and lateral movement. Sandboxing detonates unknown files pre-delivery—complementing signatures in a defence-in-depth model."
    },
    {
        id: "smcq-ml-2a",
        scenarioTopic: "Malware Security",
        scenarioId: "ml-2-trojan-mail",
        scenarioTitle: "Trojan via Email",
        difficulty: "hard",
        level: 6,
        question: "After a user executes a malicious invoice attachment, sensitive data is exfiltrated. Which malware classification and propagation model apply?",
        options: [
            "Self-replicating network worm spreading without user interaction",
            "Socially engineered Trojan requiring explicit user execution",
            "Fileless virus infecting every executable on the file system",
            "Boot sector rootkit modifying the master boot record only"
        ],
        correctAnswer: 1,
        explanation: "Trojans masquerade as legitimate files and rely on deception—not autonomous propagation like worms. Email lures are a primary delivery vector."
    },
    {
        id: "smcq-ml-2b",
        scenarioTopic: "Malware Security",
        scenarioId: "ml-2-trojan-mail",
        scenarioTitle: "Trojan via Email",
        difficulty: "hard",
        level: 6,
        question: "Which preventive control combination offers the strongest reduction in Trojan success via email?",
        options: [
            "SPF-only configuration without attachment inspection or user training",
            "Sandboxing, macro restriction, DMARC alignment, and phishing simulations",
            "Blocking all outbound SMTP to prevent internal mail relay abuse",
            "Granting local administrator rights to reduce UAC prompt fatigue"
        ],
        correctAnswer: 1,
        explanation: "Technical controls (sandbox, macro policies, DMARC) plus human factors (awareness, reporting culture) address both delivery and execution stages of email-borne Trojans."
    },
    {
        id: "smcq-ml-3a",
        scenarioTopic: "Malware Security",
        scenarioId: "ml-3-rootkit",
        scenarioTitle: "Rootkit Installation",
        difficulty: "hard",
        level: 6,
        question: "A kernel rootkit persists while user-mode AV reports a clean system. Why is user-mode scanning insufficient?",
        options: [
            "Rootkits only infect BIOS and cannot hook operating system APIs",
            "Kernel hooks can filter results returned to security software",
            "AV signatures are incompatible with 128-bit AES encryption",
            "Rootkits automatically uninstall when the user logs off"
        ],
        correctAnswer: 1,
        explanation: "Kernel rootkits intercept syscalls and alter what AV sees (hidden processes/files). Trusted measurements require offline analysis, memory forensics, or attested boot chains."
    },
    {
        id: "smcq-ml-3b",
        scenarioTopic: "Malware Security",
        scenarioId: "ml-3-rootkit",
        scenarioTitle: "Rootkit Installation",
        difficulty: "hard",
        level: 6,
        question: "What is the industry-accepted remediation approach after confirmed kernel-level compromise?",
        options: [
            "Run a second antivirus product until one report shows clean",
            "Isolate, forensically image, then rebuild from trusted gold media",
            "Delete suspicious files while preserving the existing OS installation",
            "Disable Windows Defender to prevent hook conflicts with the rootkit"
        ],
        correctAnswer: 1,
        explanation: "In-place cleaning cannot be trusted when the kernel is compromised. Rebuild, rotate credentials, and preserve evidence for investigation and regulatory obligations."
    },
    {
        id: "smcq-ml-4a",
        scenarioTopic: "Malware Security",
        scenarioId: "ml-4-multistage",
        scenarioTitle: "Combined Malware Attack",
        difficulty: "hard",
        level: 6,
        question: "A Trojan establishes foothold before deploying a kernel rootkit. What operational challenge does this multi-stage pattern create for SOC analysts?",
        options: [
            "All artefacts appear simultaneously on a single host event log",
            "Indicators emerge asynchronously across hosts and time windows",
            "Antivirus automatically correlates stages without SIEM integration",
            "Encrypted C2 is impossible when more than one stage exists"
        ],
        correctAnswer: 1,
        explanation: "Staged attacks separate downloader, persistence, and stealth components. Correlating sparse events across EDR, proxy, and DNS logs is required—single-tool detection often misses stages."
    },
    {
        id: "smcq-ml-4b",
        scenarioTopic: "Malware Security",
        scenarioId: "ml-4-multistage",
        scenarioTitle: "Combined Malware Attack",
        difficulty: "hard",
        level: 6,
        question: "If the multi-stage attack remains undetected for months, which business impact aligns with extended dwell time?",
        options: [
            "Only temporary performance degradation on the initial workstation",
            "Sustained exfiltration, lateral movement, and regulatory breach risk",
            "Automatic patching of vulnerabilities by the rootkit component",
            "Guaranteed encryption of backups by the first-stage Trojan only"
        ],
        correctAnswer: 1,
        explanation: "Long dwell enables credential theft, data exfiltration, ransomware deployment, and compliance failures—far beyond a single-endpoint performance issue."
    },
    {
        id: "smcq-ml-5a",
        scenarioTopic: "Malware Security",
        scenarioId: "ml-5-evasion",
        scenarioTitle: "Antivirus Evasion",
        difficulty: "hard",
        level: 6,
        question: "Polymorphic malware changes its on-disk representation while preserving behaviour. Which detection philosophy counters this evasion?",
        options: [
            "Increasing signature database size without behavioural telemetry",
            "Behavioural and anomaly-based analysis independent of static hashes",
            "Disabling heuristic scanning to eliminate false positive alerts",
            "Whitelisting all signed Microsoft binaries without execution monitoring"
        ],
        correctAnswer: 1,
        explanation: "Polymorphism defeats static hashes. Behavioural detection (API calls, injection, C2 patterns) targets what the malware does, not its exact byte sequence."
    },
    {
        id: "smcq-ml-5b",
        scenarioTopic: "Malware Security",
        scenarioId: "ml-5-evasion",
        scenarioTitle: "Antivirus Evasion",
        difficulty: "hard",
        level: 6,
        question: "An attacker abuses signed PowerShell to download a second-stage payload. This is best described as:",
        options: [
            "A buffer overflow against the PowerShell scripting engine",
            "Living-off-the-land using trusted binaries to blend with admin activity",
            "A hardware supply-chain compromise of the CPU microcode",
            "Mandatory exploitation of an unpatched SMBv1 remote code flaw"
        ],
        correctAnswer: 1,
        explanation: "LOLBins leverage legitimate tools (PowerShell, WMI, rundll32) to evade simple file-based rules while appearing as normal administrative behaviour—requiring script control and EDR."
    },
    {
        id: "smcq-ml-6a",
        scenarioTopic: "Malware Security",
        scenarioId: "ml-6-enterprise",
        scenarioTitle: "Enterprise Malware Defence",
        difficulty: "hard",
        level: 6,
        question: "Leadership demands defence against Trojans and rootkits across the estate. Which strategy reflects defence-in-depth at Level 6?",
        options: [
            "Deploy signature AV on endpoints and defer all other controls",
            "Combine preventive, detective, and response controls with segmentation",
            "Block all internet egress to eliminate malware download paths",
            "Rely on annual penetration tests instead of continuous monitoring"
        ],
        correctAnswer: 1,
        explanation: "Effective programmes layer patching, application control, EDR, segmentation, backups, SOC monitoring, and IR playbooks—no single product covers all attack phases."
    },
    {
        id: "smcq-ml-6b",
        scenarioTopic: "Malware Security",
        scenarioId: "ml-6-enterprise",
        scenarioTitle: "Enterprise Malware Defence",
        difficulty: "hard",
        level: 6,
        question: "Why is continuous monitoring emphasised over point-in-time antivirus scans in modern SOCs?",
        options: [
            "Threat actors pause activity only during scheduled AV scan windows",
            "Adversaries operate persistently; correlation reduces mean time to detect",
            "Regulations prohibit retention of security logs beyond twenty-four hours",
            "Signature updates eliminate the need for human threat hunters entirely"
        ],
        correctAnswer: 1,
        explanation: "APT campaigns may lie dormant or move slowly. SIEM/EDR with retained telemetry and hunting reduces dwell time—aligned with NIST Detect and Respond functions."
    },

    // ===== PGP & GPG =====
    {
        id: "smcq-pgp-1a",
        scenarioTopic: "PGP & GPG",
        scenarioId: "pgp-1-wrong-key",
        scenarioTitle: "Secure Email with PGP",
        difficulty: "hard",
        level: 6,
        question: "A ciphertext is encrypted to the wrong recipient public key. Which security property is primarily violated from the sender's intended perspective?",
        options: [
            "Confidentiality toward the intended recipient (availability of plaintext)",
            "Integrity of the OpenPGP packet structure during SMTP transit",
            "Authenticity of the X.509 TLS certificate on the mail gateway",
            "Non-repudiation because symmetric session keys were reused"
        ],
        correctAnswer: 0,
        explanation: "The message remains confidential to whoever holds the matching private key—but the intended recipient cannot decrypt. This is an operational key-selection failure, not algorithm breakage."
    },
    {
        id: "smcq-pgp-1b",
        scenarioTopic: "PGP & GPG",
        scenarioId: "pgp-1-wrong-key",
        scenarioTitle: "Secure Email with PGP",
        difficulty: "hard",
        level: 6,
        question: "Which practice most effectively mitigates wrong-key encryption in an organisational GPG deployment?",
        options: [
            "Trust keys labelled 'CEO' on public keyservers without verification",
            "Out-of-band fingerprint verification and a signed internal key directory",
            "Disable subkeys to reduce the number of selectable public keys",
            "Encrypt only the subject line while leaving the body in plaintext"
        ],
        correctAnswer: 1,
        explanation: "Fingerprint verification binds identity to keys. Corporate keyservers with signed keys and mail-client policies reduce TOFU and MITM risks when selecting recipients."
    },
    {
        id: "smcq-pgp-2a",
        scenarioTopic: "PGP & GPG",
        scenarioId: "pgp-2-gpg4win",
        scenarioTitle: "Gpg4win Deployment Issues",
        difficulty: "hard",
        level: 6,
        question: "Staff share one departmental private key without passphrases on shared drives. Which properties are collectively undermined?",
        options: [
            "Only availability, because decryption becomes faster for the team",
            "Accountability, non-repudiation, and confidentiality on key compromise",
            "Algorithm strength of the AES session cipher inside OpenPGP",
            "Compatibility with S/MIME gateways at the mail perimeter"
        ],
        correctAnswer: 1,
        explanation: "Shared private keys prevent attributing actions to individuals, enable insider abuse, and magnify impact of any copy leaking—violating core PKI trust assumptions."
    },
    {
        id: "smcq-pgp-2b",
        scenarioTopic: "PGP & GPG",
        scenarioId: "pgp-2-gpg4win",
        scenarioTitle: "Gpg4win Deployment Issues",
        difficulty: "hard",
        level: 6,
        question: "Importing unverified public keys from the internet into Kleopatra primarily exposes the organisation to:",
        options: [
            "Man-in-the-middle substitution of keys during encrypted communication",
            "Automatic downgrade of AES-256 to DES within the OpenPGP layer",
            "Deletion of all private keys stored in the Windows certificate store",
            "Mandatory transition from hybrid to pure asymmetric encryption"
        ],
        correctAnswer: 0,
        explanation: "Unverified keys may belong to an attacker. Messages encrypted to the fake key are readable by the adversary; forged signatures may appear legitimate."
    },
    {
        id: "smcq-pgp-3a",
        scenarioTopic: "PGP & GPG",
        scenarioId: "pgp-3-keyring",
        scenarioTitle: "Keyring Management Failure",
        difficulty: "hard",
        level: 6,
        question: "A developer's keyring contains duplicate and expired keys for the same UID. What is the most likely operational consequence during a release?",
        options: [
            "Automatic upgrade to post-quantum algorithms by GnuPG",
            "Encryption to an obsolete key causing failed decryption workflows",
            "Mandatory revocation of the entire organisational root of trust",
            "Loss of symmetric compression before the encryption step"
        ],
        correctAnswer: 1,
        explanation: "Poor key hygiene causes wrong-key selection, failed CI decrypt steps, and delayed incident response—availability and integrity of release pipelines suffer."
    },
    {
        id: "smcq-pgp-3b",
        scenarioTopic: "PGP & GPG",
        scenarioId: "pgp-3-keyring",
        scenarioTitle: "Keyring Management Failure",
        difficulty: "hard",
        level: 6,
        question: "In GnuPG, what is the primary distinction between the public keyring and secret key store?",
        options: [
            "Public keys encrypt data; secret keys only verify digital signatures",
            "Public material identifies recipients; secret material performs signing/decryption",
            "Secret keys are published to keyservers; public keys remain offline only",
            "Both rings must be stored in /etc/passwd for POSIX compliance"
        ],
        correctAnswer: 1,
        explanation: "Public keys (and certs) enable encryption to others and signature verification. Secret keys—passphrase-protected—decrypt messages and create signatures."
    },
    {
        id: "smcq-pgp-4a",
        scenarioTopic: "PGP & GPG",
        scenarioId: "pgp-4-trust",
        scenarioTitle: "Public Key Trust",
        difficulty: "hard",
        level: 6,
        question: "A user imports a key labelled 'CEO' from a public keyserver without fingerprint checks. Which attack model is enabled?",
        options: [
            "Brute-force factoring of the 2048-bit RSA modulus in real time",
            "Man-in-the-middle impersonation using an attacker-controlled keypair",
            "Downgrade of TLS 1.3 to SSLv3 on the corporate mail gateway",
            "Collision attack against the SHA-256 hash inside the signed message"
        ],
        correctAnswer: 1,
        explanation: "Anyone can upload keys with arbitrary UIDs. Without fingerprint verification, encrypting to 'CEO' may protect content for an attacker, not the executive."
    },
    {
        id: "smcq-pgp-4b",
        scenarioTopic: "PGP & GPG",
        scenarioId: "pgp-4-trust",
        scenarioTitle: "Public Key Trust",
        difficulty: "hard",
        level: 6,
        question: "How does the OpenPGP Web of Trust differ from a corporate PKI hierarchy?",
        options: [
            "WoT is decentralised peer signatures; PKI uses central CA issuance",
            "WoT mandates X.509v3 certificates for all email users",
            "PKI eliminates the need for any public key distribution",
            "WoT requires hardware tokens for every encryption operation"
        ],
        correctAnswer: 0,
        explanation: "WoT propagates trust via user key signatures. Enterprises often prefer central CAs or internal directories with policy-controlled issuance and revocation."
    },
    {
        id: "smcq-pgp-5a",
        scenarioTopic: "PGP & GPG",
        scenarioId: "pgp-5-sign",
        scenarioTitle: "Digital Signatures Using GPG",
        difficulty: "hard",
        level: 6,
        question: "When verifying a GPG signature on a software installer, what assurance does a successful verification provide?",
        options: [
            "The binary is free from runtime memory vulnerabilities",
            "The payload matches what the signer's private key authenticated",
            "The download occurred over TLS 1.3 exclusively",
            "The signing key can never be compromised in the future"
        ],
        correctAnswer: 1,
        explanation: "Signatures prove integrity and authenticity relative to the signer's key—they do not guarantee code quality, transport security, or future key safety."
    },
    {
        id: "smcq-pgp-5b",
        scenarioTopic: "PGP & GPG",
        scenarioId: "pgp-5-sign",
        scenarioTitle: "Digital Signatures Using GPG",
        difficulty: "hard",
        level: 6,
        question: "A software-signing private key is exfiltrated. What must the organisation prioritise?",
        options: [
            "Publish the private key internally to maintain build continuity",
            "Revoke the key, rotate signing material, and investigate forged artefacts",
            "Disable TLS on the download portal to speed incident response",
            "Re-encrypt all historical releases with AES-ECB for obfuscation"
        ],
        correctAnswer: 1,
        explanation: "Attackers can sign malware as legitimate. Immediate revocation, key rotation in HSMs, artefact scanning, and customer notification are critical supply-chain responses."
    },
    {
        id: "smcq-pgp-6a",
        scenarioTopic: "PGP & GPG",
        scenarioId: "pgp-6-hybrid",
        scenarioTitle: "Hybrid Encryption in PGP",
        difficulty: "hard",
        level: 6,
        question: "Why does OpenPGP encrypt the message body with a symmetric session key before asymmetric encryption?",
        options: [
            "Symmetric ciphers cannot provide confidentiality for email payloads",
            "Performance and payload size limits of asymmetric operations",
            "RSA is required to generate random IVs for each MIME part",
            "Hash functions are slower than block ciphers for large files"
        ],
        correctAnswer: 1,
        explanation: "Hybrid encryption uses fast symmetric ciphers for bulk data and wraps the small session key with RSA/ECC—standard practice in PGP and TLS alike."
    },
    {
        id: "smcq-pgp-6b",
        scenarioTopic: "PGP & GPG",
        scenarioId: "pgp-6-hybrid",
        scenarioTitle: "Hybrid Encryption in PGP",
        difficulty: "hard",
        level: 6,
        question: "Even with encrypted OpenPGP bodies, which information leakage commonly remains?",
        options: [
            "Full plaintext of attachments inside the encrypted packet",
            "Email envelope metadata such as sender, recipient, and timestamps",
            "The symmetric session key printed in the message header",
            "Private key primes embedded in every ciphertext block"
        ],
        correctAnswer: 1,
        explanation: "PGP protects content, not routing metadata. Traffic analysis and retained headers may still reveal communication patterns—motivating additional transport protections."
    },

    // ===== Firewalls & Architecture =====
    {
        id: "smcq-fw-1a",
        scenarioTopic: "Firewalls & Firewall Architecture",
        scenarioId: "fw-1-perim",
        scenarioTitle: "Misconfigured Perimeter Firewall",
        difficulty: "hard",
        level: 6,
        question: "A perimeter firewall permits unrestricted outbound traffic and omits logging on permissive rules. Which risk is most critical for incident response?",
        options: [
            "Inbound SYN floods cannot be mitigated without stateful inspection",
            "Covert exfiltration and C2 channels operate without forensic evidence",
            "DNS responses are automatically encrypted by the firewall engine",
            "Internal users cannot establish any TCP sessions to the internet"
        ],
        correctAnswer: 1,
        explanation: "Permissive egress enables data theft and beaconing; absent logs prevent detection and breach investigation—failing detective and accountability controls."
    },
    {
        id: "smcq-fw-1b",
        scenarioTopic: "Firewalls & Firewall Architecture",
        scenarioId: "fw-1-perim",
        scenarioTitle: "Misconfigured Perimeter Firewall",
        difficulty: "hard",
        level: 6,
        question: "Which rule-base philosophy aligns with least privilege for internet-facing firewalls?",
        options: [
            "Implicit permit with explicit deny statements at the rule base end",
            "Implicit deny with explicit permit for required flows only",
            "Permit all UDP to simplify VoIP and streaming media services",
            "Mirror internal Active Directory groups directly into ACL lines"
        ],
        correctAnswer: 1,
        explanation: "Default-deny reduces attack surface. Explicit permits should be documented, logged, and reviewed—core to firewall hardening and compliance audits."
    },
    {
        id: "smcq-fw-2a",
        scenarioTopic: "Firewalls & Firewall Architecture",
        scenarioId: "fw-2-dmz",
        scenarioTitle: "DMZ Architecture",
        difficulty: "hard",
        level: 6,
        question: "In a screened-subnet design, what is the primary security purpose of placing web servers in a DMZ?",
        options: [
            "To grant domain administrators direct RDP from the internet",
            "To isolate internet-exposed services from the internal core network",
            "To eliminate the need for TLS certificates on public websites",
            "To store database backups on the same VLAN as public HTTP"
        ],
        correctAnswer: 1,
        explanation: "The DMZ contains hardened, exposed services. Inner firewalls restrict paths to sensitive systems—limiting lateral movement if the web tier is compromised."
    },
    {
        id: "smcq-fw-2b",
        scenarioTopic: "Firewalls & Firewall Architecture",
        scenarioId: "fw-2-dmz",
        scenarioTitle: "DMZ Architecture",
        difficulty: "hard",
        level: 6,
        question: "Which traffic flow best satisfies PCI-style separation between internet users and a backend database?",
        options: [
            "Internet → database (1433) → web server → user",
            "Internet → DMZ web tier → restricted rule → internal database",
            "Database initiates HTTPS sessions directly to internet clients",
            "Flat layer-2 network with a single stateless packet filter"
        ],
        correctAnswer: 1,
        explanation: "Users reach the web tier in the DMZ; only the web server's IP may open database ports on the internal zone—never expose SQL directly to the internet."
    },
    {
        id: "smcq-fw-3a",
        scenarioTopic: "Firewalls & Firewall Architecture",
        scenarioId: "fw-3-state",
        scenarioTitle: "Stateful vs Stateless",
        difficulty: "hard",
        level: 6,
        question: "How does connection tracking in a stateful firewall improve security over a pure packet filter?",
        options: [
            "It encrypts payload contents at layer three automatically",
            "It permits return traffic only for established legitimate sessions",
            "It removes the need for any inbound deny rules on the perimeter",
            "It guarantees detection of all application-layer SQL injections"
        ],
        correctAnswer: 1,
        explanation: "Stateful inspection maintains a state table matching responses to outbound or allowed flows—blocking unsolicited inbound packets that stateless ACLs might mishandle."
    },
    {
        id: "smcq-fw-3b",
        scenarioTopic: "Firewalls & Firewall Architecture",
        scenarioId: "fw-3-state",
        scenarioTitle: "Stateful vs Stateless",
        difficulty: "hard",
        level: 6,
        question: "Relative to classic stateful firewalls, an NGFW adds which capability most relevant to modern threats?",
        options: [
            "Removal of all deep packet inspection to reduce latency",
            "Application identification, user context, and integrated IPS",
            "Mandatory use of static NAT for every internal host address",
            "Exclusive reliance on stateless ACLs for east-west traffic"
        ],
        correctAnswer: 1,
        explanation: "NGFWs classify applications and users, integrate threat intelligence and IPS, and may perform SSL inspection—addressing threats opaque to port/protocol filters."
    },
    {
        id: "smcq-fw-4a",
        scenarioTopic: "Firewalls & Firewall Architecture",
        scenarioId: "fw-4-proxy",
        scenarioTitle: "Application Layer Firewall",
        difficulty: "hard",
        level: 6,
        question: "An application-layer proxy firewall terminates client connections and inspects protocol commands. What trade-off is accepted?",
        options: [
            "Complete inability to authenticate users at the application layer",
            "Increased latency and processing cost for deeper visibility",
            "Mandatory prohibition of HTTPS on all corporate web services",
            "Elimination of logging because proxies operate in kernel bypass"
        ],
        correctAnswer: 1,
        explanation: "Proxies understand HTTP/FTP semantics and can block attacks invisible to L3/L4 filters, but brokering connections adds overhead and operational complexity."
    },
    {
        id: "smcq-fw-4b",
        scenarioTopic: "Firewalls & Firewall Architecture",
        scenarioId: "fw-4-proxy",
        scenarioTitle: "Application Layer Firewall",
        difficulty: "hard",
        level: 6,
        question: "Where should a Web Application Firewall (WAF) sit to mitigate OWASP Top 10 attacks against a public API?",
        options: [
            "Behind the internal database cluster without internet routing",
            "In front of the web/application tier inspecting HTTP requests",
            "Only on end-user laptops inspecting outbound browser cache",
            "Replacing the organisation's SIEM log aggregation platform"
        ],
        correctAnswer: 1,
        explanation: "WAFs analyse HTTP/S traffic for injection, XSS, and bot abuse at the application edge—complementing network firewalls and secure coding practices."
    },
    {
        id: "smcq-fw-5a",
        scenarioTopic: "Firewalls & Firewall Architecture",
        scenarioId: "fw-5-insider",
        scenarioTitle: "Firewall Bypass & Insider",
        difficulty: "hard",
        level: 6,
        question: "An employee tunnels traffic over a personal VPN to evade corporate URL filtering. Which control gap does this exploit?",
        options: [
            "Perimeter firewalls cannot inspect any encrypted outbound channels",
            "Uninspected encrypted egress bypasses policy enforcement points",
            "Stateful firewalls block all UDP including DNS and NTP",
            "Insiders never possess credentials for internal resources"
        ],
        correctAnswer: 1,
        explanation: "Without SSL inspection or egress proxy policies, encrypted tunnels hide destinations and payloads from perimeter controls—requiring endpoint policy and DLP."
    },
    {
        id: "smcq-fw-5b",
        scenarioTopic: "Firewalls & Firewall Architecture",
        scenarioId: "fw-5-insider",
        scenarioTitle: "Firewall Bypass & Insider",
        difficulty: "hard",
        level: 6,
        question: "Why are insider threats poorly addressed by perimeter-only firewall strategies?",
        options: [
            "Insiders always attack exclusively from external IP addresses",
            "They may already operate inside with legitimate network access",
            "Firewalls automatically trust all RFC1918 address space as safe",
            "Insider attacks are limited to physical theft of paper records"
        ],
        correctAnswer: 1,
        explanation: "Perimeter models assume external adversaries. Zero trust, segmentation, UEBA, and DLP address insiders and lateral movement inside the trust zone."
    },
    {
        id: "smcq-fw-6a",
        scenarioTopic: "Firewalls & Firewall Architecture",
        scenarioId: "fw-6-layer",
        scenarioTitle: "Multi-Layer Firewall Architecture",
        difficulty: "hard",
        level: 6,
        question: "In a financial institution with edge, DMZ, and internal segmentation firewalls, what is the primary benefit?",
        options: [
            "Guaranteed elimination of all phishing attacks enterprise-wide",
            "Compartmentalisation limiting lateral movement after initial breach",
            "Removal of the need for security monitoring on internal VLANs",
            "Single rule set replicated identically on every device"
        ],
        correctAnswer: 1,
        explanation: "Layered firewalls enforce different policies per zone, shrinking blast radius and supporting compliance mappings (e.g. PCI scoped networks)."
    },
    {
        id: "smcq-fw-6b",
        scenarioTopic: "Firewalls & Firewall Architecture",
        scenarioId: "fw-6-layer",
        scenarioTitle: "Multi-Layer Firewall Architecture",
        difficulty: "hard",
        level: 6,
        question: "What is the dominant operational challenge when managing multiple firewall tiers?",
        options: [
            "IPv6 cannot traverse more than one firewall in a path",
            "Rule drift, change control, and consistent policy across zones",
            "Mandatory replacement of stateful inspection with packet filters",
            "Prohibition of logging to central SIEM platforms for performance"
        ],
        correctAnswer: 1,
        explanation: "Complex estates suffer ACL sprawl and inconsistent changes. Infrastructure-as-code, automated reviews, and periodic audits maintain accuracy and auditability."
    },

    // ===== CSY3023 Mock Test (May 2025) — Bank scenarios =====
    {
        id: "smcq-mt-q1a",
        scenarioTopic: "Mock Test — Malware & Detection",
        scenarioId: "mt-q1",
        scenarioTitle: "Q1 — Fake Antivirus at the Bank",
        source: "mock",
        difficulty: "hard",
        level: 6,
        question: "A bank employee installs rogueware disguised as antivirus; customer accounts are defrauded. Which malware model and propagation path apply?",
        options: [
            "Self-propagating worm scanning RFC1918 subnets autonomously",
            "Socially engineered Trojan delivering infostealer/keylogger payloads",
            "Bootkit modifying GPT partitions without user interaction",
            "Benign adware limited to displaying unwanted advertisements"
        ],
        correctAnswer: 1,
        explanation: "Fake-AV is a Trojan: the user is deceived into executing it. It does not self-replicate; it drops stealers and may beacon to C2 for credential fraud."
    },
    {
        id: "smcq-mt-q1b",
        scenarioTopic: "Mock Test — Malware & Detection",
        scenarioId: "mt-q1",
        scenarioTitle: "Q1 — Fake Antivirus at the Bank",
        source: "mock",
        difficulty: "hard",
        level: 6,
        question: "Which indicator set best supports SOC detection of the fake-AV incident described in the mock bank scenario?",
        options: [
            "Only physical tailgating events at the data centre entrance",
            "Host beaconing, disabled AV, and anomalous banking session geolocation",
            "Exclusive reliance on weekly full-disk signature scans",
            "Blocking all inbound SMTP without endpoint telemetry"
        ],
        correctAnswer: 1,
        explanation: "Combine endpoint (processes, AV tampering, egress) with fraud analytics (impossible travel, ATO). SIEM correlation across both is standard bank SOC practice."
    },
    {
        id: "smcq-mt-q2a",
        scenarioTopic: "Mock Test — Cryptography (Bank)",
        scenarioId: "mt-q2",
        scenarioTitle: "Q2 — Email & Laptop Encryption",
        source: "mock",
        difficulty: "hard",
        level: 6,
        question: "A bank must encrypt laptop disks and secure email. Which mapping of algorithm class to use case is correct?",
        options: [
            "RSA-4096 for full-disk encryption; AES for TLS certificates only",
            "AES for bulk data at rest; RSA/ECC for key exchange and signatures",
            "Caesar cipher for databases; MD5 for email confidentiality",
            "Symmetric keys emailed in plaintext to all branch managers"
        ],
        correctAnswer: 1,
        explanation: "Symmetric ciphers (AES) handle volume (BitLocker, DB). Asymmetric keys establish trust and wrap session keys—hybrid designs per mock Q2(c)."
    },
    {
        id: "smcq-mt-q2b",
        scenarioTopic: "Mock Test — Cryptography (Bank)",
        scenarioId: "mt-q2",
        scenarioTitle: "Q2 — Email & Laptop Encryption",
        source: "mock",
        difficulty: "hard",
        level: 6,
        question: "Where should a bank store master keys used to protect customer database encryption keys per mock exam guidance?",
        options: [
            "In the same MySQL configuration file as the connection string",
            "In an HSM or KMS segregated from the database tier",
            "Embedded in the mobile banking app APK for availability",
            "Printed and stored in each branch manager's desk drawer"
        ],
        correctAnswer: 1,
        explanation: "Master keys must not co-reside with ciphertext. HSM/KMS supports envelope encryption, rotation, and dual control expected in financial environments."
    },
    {
        id: "smcq-mt-q3a",
        scenarioTopic: "Mock Test — Network Security & Firewalls",
        scenarioId: "mt-q3",
        scenarioTitle: "Q3 — HQ, ATMs & Web Servers",
        source: "mock",
        difficulty: "hard",
        level: 6,
        question: "For the bank's public website and core banking network, which architecture matches the mock screened-subnet recommendation?",
        options: [
            "Single flat VLAN with one stateless router ACL",
            "Dual NGFWs: outer DMZ for web, inner zone for core banking",
            "Database servers published directly on public IP addresses",
            "ATMs bridged to the internet without VPN or encryption"
        ],
        correctAnswer: 1,
        explanation: "Screened subnet (DMZ) with outer/inner firewalls isolates exposed services. Core systems stay behind the inner NGFW—central to mock Q3(b)."
    },
    {
        id: "smcq-mt-q3b",
        scenarioTopic: "Mock Test — Network Security & Firewalls",
        scenarioId: "mt-q3",
        scenarioTitle: "Q3 — HQ, ATMs & Web Servers",
        source: "mock",
        difficulty: "hard",
        level: 6,
        question: "Remote bank ATMs in the mock scenario should connect to HQ using:",
        options: [
            "Unencrypted HTTP over the public internet for simplicity",
            "Site-to-site IPsec VPN with firewall policies on both ends",
            "RDP port forwarding from each ATM's public IP address",
            "Emailing transaction logs as ZIP attachments to operations"
        ],
        correctAnswer: 1,
        explanation: "Mock Q3(b) specifies ATMs → IPsec VPN into the trusted network, combined with NGFW segmentation—not direct internet exposure."
    },
    {
        id: "smcq-mt-q3c",
        scenarioTopic: "Mock Test — Network Security & Firewalls",
        scenarioId: "mt-q3",
        scenarioTitle: "Q3 — Distributed Firewall",
        source: "mock",
        difficulty: "hard",
        level: 6,
        question: "After phishing bypasses the perimeter NGFW, why does a distributed firewall architecture help the bank?",
        options: [
            "It removes the need for any DMZ or segmentation design",
            "It enforces policy on each host/VM to block east-west movement",
            "It replaces all endpoint EDR agents with router ACLs only",
            "It decrypts all TLS automatically without legal review"
        ],
        correctAnswer: 1,
        explanation: "Perimeter controls fail once insiders or malware are inside. Host-level enforcement (GPO, NSX, cloud SGs) limits lateral movement per mock Q3(c)."
    },
    {
        id: "smcq-mt-q3d",
        scenarioTopic: "Mock Test — Network Security & Firewalls",
        scenarioId: "mt-q3",
        scenarioTitle: "Q3 — Firewall Types",
        source: "mock",
        difficulty: "hard",
        level: 6,
        question: "Which capability progression correctly orders firewall technologies in the mock Q3(a) comparison?",
        options: [
            "NGFW → stateless ACL → stateful inspection → proxy only",
            "Stateless packet filter → stateful inspection → NGFW with DPI/IPS",
            "Proxy only → hub repeater → MAC filtering → WAF",
            "IDS → antivirus → spam filter → stateless ACL"
        ],
        correctAnswer: 1,
        explanation: "Packet filters inspect headers only; stateful tracks sessions; NGFW adds application/user context and integrated IPS—exact mock exam ladder."
    },
    {
        id: "smcq-mt-q4a",
        scenarioTopic: "Mock Test — VPN & PKI",
        scenarioId: "mt-q4",
        scenarioTitle: "Q4 — SSL VPN & X.509",
        source: "mock",
        difficulty: "hard",
        level: 6,
        question: "In the bank SSL VPN scenario, what does a valid gateway X.509 certificate primarily prove to the client?",
        options: [
            "That all employee passwords meet complexity requirements",
            "That the TLS endpoint belongs to the expected bank gateway identity",
            "That AES-256-GCM is the only cipher permitted worldwide",
            "That the client workstation has no malware installed"
        ],
        correctAnswer: 1,
        explanation: "Server certificates bind identity to a public key signed by a trusted CA. Clients verify chain, dates, hostname, and revocation before trusting the tunnel."
    },
    {
        id: "smcq-mt-q4b",
        scenarioTopic: "Mock Test — VPN & PKI",
        scenarioId: "mt-q4",
        scenarioTitle: "Q4 — Certificate Not Trusted",
        source: "mock",
        difficulty: "hard",
        level: 6,
        question: "Staff see 'certificate not trusted' on the bank SSL VPN. Which cause is most common in internal PKI deployments?",
        options: [
            "The user's monitor resolution is below 1920×1080",
            "The corporate root CA is missing from the laptop trust store",
            "AES session keys were exposed in the TLS Application Data",
            "OpenPGP subkeys expired on the mail server"
        ],
        correctAnswer: 1,
        explanation: "Mock Q4(b): without the internal root in the trust store, the chain fails validation. Deploy root via GPO/MDM and check expiry, hostname, and clock skew."
    },
    {
        id: "smcq-mt-q4c",
        scenarioTopic: "Mock Test — VPN & PKI",
        scenarioId: "mt-q4",
        scenarioTitle: "Q4 — VPN Protocol Comparison",
        source: "mock",
        difficulty: "hard",
        level: 6,
        question: "For travelling bank staff behind restrictive hotel firewalls, which VPN approach does the mock exam favour?",
        options: [
            "L2TP/IPsec on UDP 500/4500 only, without fallback",
            "SSL VPN or OpenVPN tunnelled over TCP/443 where possible",
            "Unencrypted PPP dial-up over analogue telephone lines",
            "P2P mesh VPN with no central gateway authentication"
        ],
        correctAnswer: 1,
        explanation: "SSL VPN (TLS 443) and OpenVPN over 443 traverse most firewalls. L2TP/IPsec is often blocked on guest Wi‑Fi—mock Q4(c) comparison."
    },
    {
        id: "smcq-mt-q4d",
        scenarioTopic: "Mock Test — VPN & PKI",
        scenarioId: "mt-q4",
        scenarioTitle: "Q4 — TLS Handshake",
        source: "mock",
        difficulty: "hard",
        level: 6,
        question: "After successful SSL VPN certificate validation, how is bulk tunnel traffic protected per hybrid encryption?",
        options: [
            "Each packet RSA-encrypted with the server's public modulus",
            "Symmetric AEAD keys derived during the TLS handshake",
            "Base64 encoding of IP headers without confidentiality",
            "Permanent use of the X.509 certificate private key for data"
        ],
        correctAnswer: 1,
        explanation: "TLS negotiates symmetric keys (e.g. AES-GCM) for the tunnel. Certificates authenticate and establish keys—they do not encrypt every packet asymmetrically."
    },
    {
        id: "smcq-mt-q5a",
        scenarioTopic: "Mock Test — PGP & Key Management",
        scenarioId: "mt-q5",
        scenarioTitle: "Q5 — Lost PGP Keys",
        source: "mock",
        difficulty: "hard",
        level: 6,
        question: "Per mock Q5(c), which key-management practice is appropriate for bank encryption subkeys?",
        options: [
            "Escrow encryption keys in HSM; never escrow signing keys",
            "Publish all private keys on the intranet for backup",
            "Share one corporate signing key across all tellers",
            "Disable revocation certificates to avoid downtime"
        ],
        correctAnswer: 0,
        explanation: "Escrow can recover encrypted data if keys are lost. Signing keys must stay non-exportable—escrowing them would enable forgery."
    },
    {
        id: "smcq-mt-q5b",
        scenarioTopic: "Mock Test — PGP & Key Management",
        scenarioId: "mt-q5",
        scenarioTitle: "Q5 — Key Lifecycle",
        source: "mock",
        difficulty: "hard",
        level: 6,
        question: "A teller leaves the bank. What immediate action aligns with mock PGP lifecycle guidance?",
        options: [
            "Archive their private signing key on USB for the replacement hire",
            "Revoke keys, rotate affected material, and audit artefacts signed",
            "Delete only the public keyring so email still arrives",
            "Disable TLS on VPN so ex-employees cannot connect"
        ],
        correctAnswer: 1,
        explanation: "Staff departure triggers revocation, rotation, and artefact review. Retain escrow only under policy—never leave active signing keys with leavers."
    }
];

window.scenarioMcqQuestions = scenarioMcqQuestions;
