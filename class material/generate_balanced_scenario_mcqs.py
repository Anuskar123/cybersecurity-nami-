# -*- coding: utf-8 -*-
"""Regenerate scenario-mcqs.js with balanced option lengths (TCA anti-bias)."""
from pathlib import Path

# Each item: id, topic, scenarioId, title, source?, question, options[4], correct, explanation
# All options target 11-14 words; parallel phrasing.

QUESTIONS = [
    # --- AES & RSA (12) ---
    ("smcq-cr-1a", "AES & RSA Cryptography", "cr-1-aes-db", "Secure Data Storage Using AES", None,
     "AES-256 protects patient records, but the DEK sits on the same compromised database host. Which evaluation is most accurate?",
     [
         "The AES algorithm itself is unsuitable for storing structured relational health records",
         "The cipher remains valid but co-located keys nullify the confidentiality control",
         "Integrity fails because AES cannot operate in any authenticated encryption mode",
         "Availability fails because envelope encryption necessarily increases database query time",
     ], 1, "AES is sound when keys are secret. One host breach exposing key and ciphertext is a governance failure, not algorithm failure."),
    ("smcq-cr-1b", "AES & RSA Cryptography", "cr-1-aes-db", "Secure Data Storage Using AES", None,
     "Which design best implements envelope encryption for hospital data at rest?",
     [
         "Derive the master key solely from the database administrator account password hash",
         "Wrap each DEK with a KMS or HSM master key off the database tier",
         "Re-encrypt all ciphertext weekly while keeping one static AES key unchanged",
         "Store the plaintext DEK in the same table as the patient record ciphertext",
     ], 1, "Master keys in KMS/HSM keep plaintext DEKs off the DB host and support rotation and audit."),
    ("smcq-cr-2a", "AES & RSA Cryptography", "cr-2-rsa-kex", "RSA Key Exchange", None,
     "In legacy TLS using RSA key transport, why is hybrid encryption used for session data?",
     [
         "RSA cannot encrypt payloads larger than the modulus without oracle-related risks",
         "RSA public keys may never be distributed inside an X.509 certificate chain",
         "TLS 1.3 forbids deriving symmetric keys from any hash function output",
         "AES-GCM requires elliptic curve keys and cannot work with RSA moduli",
     ], 0, "RSA suits small secrets only; bulk traffic needs fast symmetric ciphers."),
    ("smcq-cr-2b", "AES & RSA Cryptography", "cr-2-rsa-kex", "RSA Key Exchange", None,
     "Static RSA key transport without ephemeral Diffie-Hellman is flagged. What is the main risk?",
     [
         "Captured sessions may be decrypted if the long-term private key is later exposed",
         "Clients cannot negotiate AES-256 as the record-layer bulk encryption algorithm",
         "The server must downgrade symmetric protection to ECB mode for all TLS records",
         "The design automatically violates ISO 27001 control A.8.24 on network segregation",
     ], 0, "Without ephemeral DH there is no forward secrecy for past session keys."),
    ("smcq-cr-3a", "AES & RSA Cryptography", "cr-3-msg", "Symmetric vs Asymmetric in Messaging", None,
     "Strangers must message securely without a pre-shared secret. Which design is most defensible?",
     [
         "Ship one organisational AES key inside every client installer package worldwide",
         "Agree keys asymmetrically then derive session keys using an approved KDF",
         "Use transport TLS only and persist all message bodies as plaintext on servers",
         "Encrypt routing metadata with RSA while leaving all message bodies unencrypted",
     ], 1, "ECDH/RSA solves first contact; KDF-derived AEAD keys carry payloads efficiently."),
    ("smcq-cr-3b", "AES & RSA Cryptography", "cr-3-msg", "Symmetric vs Asymmetric in Messaging", None,
     "Bodies use AES-GCM with unique nonces per message. Which threat remains most plausible?",
     [
         "An adversary brute-forces a 128-bit AES session key during one short chat",
         "Endpoint compromise or metadata correlation may expose communication patterns",
         "A 4096-bit RSA modulus forces downgrade of all ciphertext to plaintext",
         "SHA-1 collisions inside the application break confidentiality of payloads",
     ], 1, "Strong crypto does not fix compromised devices or metadata analysis."),
    ("smcq-cr-4a", "AES & RSA Cryptography", "cr-4-ecb", "AES ECB Implementation Vulnerability", None,
     "Medical images are encrypted with AES-128-ECB. Why can confidentiality still be weak?",
     [
         "ECB requires publishing the private decryption key with every ciphertext block",
         "Identical plaintext blocks produce identical ciphertext blocks revealing structure",
         "ECB limits effective key strength to fifty-six bits like legacy DES systems",
         "ECB prevents use of hardware AES-NI acceleration on modern server processors",
     ], 1, "Pattern leakage in ECB is a mode failure, not weakness of the AES round function."),
    ("smcq-cr-4b", "AES & RSA Cryptography", "cr-4-ecb", "AES ECB Implementation Vulnerability", None,
     "Which migration gives confidentiality and integrity for large files with sound practice?",
     [
         "AES-ECB with one random IV prepended once at the start of each file",
         "AES-GCM with unique nonces and authentication tags verified per object",
         "Triple-DES CBC mode without an HMAC computed over the ciphertext stream",
         "RSA-4096 encrypting each sixteen-byte segment of the file independently",
     ], 1, "GCM is AEAD; nonce reuse under one key catastrophically breaks GCM security."),
    ("smcq-cr-5a", "AES & RSA Cryptography", "cr-5-rsa-kmf", "RSA Key Management Failure", None,
     "1024-bit RSA signing keys sit in plaintext PEM files with no rotation. Worst combined impact?",
     [
         "Only non-repudiation is lost while confidentiality of stored data stays intact",
         "Factoring risk forgery risk and extended retrospective exposure all increase sharply",
         "TLS 1.3 handshakes fail because cipher suite negotiation becomes impossible",
         "All AES data-encryption keys enterprise-wide are invalidated automatically",
     ], 1, "Weak moduli, stolen PEMs, and static keys expand confidentiality integrity and authenticity risk."),
    ("smcq-cr-5b", "AES & RSA Cryptography", "cr-5-rsa-kmf", "RSA Key Management Failure", None,
     "Which control set best matches NIST guidance for high-value RSA private keys?",
     [
         "Store keys in Git with AES-ECB protection and rotate them manually each year",
         "Use HSM storage MFA access paths automated rotation and audited revocation",
         "Email passphrase-protected PEM files to security officers for offline archiving",
         "Deploy one shared corporate private key to simplify certificate renewal tasks",
     ], 1, "HSMs rotation MFA and revocation address storage and lifecycle requirements."),
    ("smcq-cr-6a", "AES & RSA Cryptography", "cr-6-hybrid", "Hybrid Encryption in Web Security", None,
     "After an HTTPS handshake, which layer primarily protects bulk application data?",
     [
         "The server RSA certificate public modulus encrypting each HTTP packet directly",
         "Symmetric record protection using negotiated AEAD ciphers such as AES-GCM",
         "Base64 encoding of HTML resources embedded inside the X.509 certificate object",
         "SHA-256 hashing of handshake messages without encrypting application payloads",
     ], 1, "Handshake establishes keys; AEAD record ciphers encrypt high-volume HTTP data."),
    ("smcq-cr-6b", "AES & RSA Cryptography", "cr-6-hybrid", "Hybrid Encryption in Web Security", None,
     "TLS 1.3 removes static RSA key transport. What does mandatory (EC)DHE mainly improve?",
     [
         "Forward secrecy for session keys even if long-term authentication keys leak later",
         "Mandatory use of triple-DES for backward compatibility with legacy web clients",
         "Elimination of all need for certificate authority trust anchors on clients",
         "Guaranteed resistance to every future quantum cryptanalysis attack on the web",
     ], 0, "Ephemeral DH separates session secrecy from compromise of long-term keys."),
]

# Malware 12
QUESTIONS += [
    ("smcq-ml-1a", "Malware Security", "ml-1-avsig", "Antivirus Failure", None,
     "Signature AV misses a novel malware family. Which limitation does this demonstrate?",
     [
         "Heuristic engines are prohibited from scanning sixty-four-bit Windows kernels",
         "Unknown or polymorphic samples lack matching entries in the signature database",
         "Antivirus products cannot scan files stored on encrypted NTFS volumes at all",
         "Zero-day exploits always target hardware layers rather than software layers",
     ], 1, "Signature AV is reactive until analysts publish patterns for new variants."),
    ("smcq-ml-1b", "Malware Security", "ml-1-avsig", "Antivirus Failure", None,
     "Which layered control most directly closes the gap left by signature antivirus?",
     [
         "Disable Office macro security to reduce false positives on inbound documents",
         "EDR behavioural analytics combined with sandbox detonation of unknown files",
         "Remove SIEM logging entirely to improve endpoint CPU utilisation metrics",
         "Permit unsigned PowerShell execution for all standard user workstations",
     ], 1, "Behaviour and sandboxing detect actions and files hashes cannot yet label."),
    ("smcq-ml-2a", "Malware Security", "ml-2-trojan-mail", "Trojan via Email", None,
     "A malicious invoice attachment leads to data exfiltration. Classification and propagation?",
     [
         "Self-replicating network worm spreading across subnets without user action",
         "Socially engineered Trojan requiring explicit execution by the victim user",
         "Fileless virus infecting every portable executable on the local file system",
         "Boot-sector rootkit modifying the master boot record on first email open",
     ], 1, "Trojans rely on deception and user execution; they do not self-propagate like worms."),
    ("smcq-ml-2b", "Malware Security", "ml-2-trojan-mail", "Trojan via Email", None,
     "Which combination best reduces Trojan success through the email channel?",
     [
         "Configure SPF records only without attachment inspection or security awareness",
         "Sandbox attachments restrict macros align DMARC and run phishing simulations",
         "Block all outbound SMTP relay to prevent internal mail server abuse entirely",
         "Grant local administrator rights to all staff to avoid UAC prompt fatigue",
     ], 1, "Technical controls plus user training address delivery and execution stages."),
    ("smcq-ml-3a", "Malware Security", "ml-3-rootkit", "Rootkit Installation", None,
     "Kernel rootkit persists while user-mode AV stays green. Why is scanning insufficient?",
     [
         "Rootkits infect only legacy BIOS chips and never hook operating system APIs",
         "Kernel hooks can falsify data returned to user-mode security products",
         "Rootkits require no administrative privileges on modern Windows platforms",
         "Rootkits uninstall themselves automatically whenever the interactive user logs off",
     ], 1, "Kernel malware hides processes and files from tools that trust the OS view."),
    ("smcq-ml-3b", "Malware Security", "ml-3-rootkit", "Rootkit Installation", None,
     "What remediation is accepted after confirmed kernel-level compromise?",
     [
         "Install a second antivirus suite until one vendor report shows a clean scan",
         "Isolate forensically image the host then rebuild from trusted gold media",
         "Delete suspicious files manually while keeping the current OS installation",
         "Disable Windows Defender to stop hook conflicts with the rootkit component",
     ], 1, "In-place cleaning is unreliable; rebuild and rotate credentials."),
    ("smcq-ml-4a", "Malware Security", "ml-4-multistage", "Combined Malware Attack", None,
     "A Trojan drops a kernel rootkit in stages. What SOC challenge does this create?",
     [
         "All malicious artefacts appear simultaneously in one host security log",
         "Indicators surface at different times and often on different monitored hosts",
         "Antivirus automatically correlates every stage without any SIEM integration",
         "Encrypted command-and-control becomes impossible when two stages are used",
     ], 1, "Staged attacks need correlation across EDR proxy DNS and timeline data."),
    ("smcq-ml-4b", "Malware Security", "ml-4-multistage", "Combined Malware Attack", None,
     "If the attack stays undetected for months, which business impact is most likely?",
     [
         "Only brief performance degradation on the first infected workstation occurs",
         "Sustained exfiltration lateral movement and regulatory breach exposure grow",
         "The rootkit component automatically patches all exploited vulnerabilities found",
         "Only the first-stage Trojan encrypts backups without any lateral activity",
     ], 1, "Long dwell enables fraud exfiltration and compliance failures beyond one PC."),
    ("smcq-ml-5a", "Malware Security", "ml-5-evasion", "Antivirus Evasion", None,
     "Polymorphic malware changes on-disk bytes while behaviour stays similar. Best counter?",
     [
         "Increase signature database size without collecting any behavioural telemetry",
         "Behavioural and anomaly detection not relying on static file hash matching",
         "Disable heuristic scanning completely to eliminate all false positive alerts",
         "Whitelist every Microsoft-signed binary without monitoring execution behaviour",
     ], 1, "Behaviour analysis targets actions when byte signatures keep changing."),
    ("smcq-ml-5b", "Malware Security", "ml-5-evasion", "Antivirus Evasion", None,
     "Signed PowerShell downloads a second-stage payload. This is best described as:",
     [
         "A buffer overflow exploit against the PowerShell language runtime engine itself",
         "Living-off-the-land abuse of trusted binaries blending with admin activity",
         "A hardware supply-chain compromise of CPU microcode on the endpoint device",
         "Mandatory remote exploitation of an unpatched SMB version one service flaw",
     ], 1, "LOLBins evade naive file rules while looking like legitimate administration."),
    ("smcq-ml-6a", "Malware Security", "ml-6-enterprise", "Enterprise Malware Defence", None,
     "Leadership requires defence against Trojans and rootkits estate-wide. Best strategy?",
     [
         "Deploy signature antivirus on endpoints and defer every other security control",
         "Combine preventive detective and response controls with network segmentation",
         "Block all internet egress permanently to stop any malware download paths",
         "Rely on annual penetration tests instead of any continuous security monitoring",
     ], 1, "Layered people process and technology controls cover multiple attack phases."),
    ("smcq-ml-6b", "Malware Security", "ml-6-enterprise", "Enterprise Malware Defence", None,
     "Why is continuous monitoring emphasised over point-in-time antivirus scans?",
     [
         "Threat actors halt all activity during scheduled antivirus scan windows only",
         "Persistent adversaries require correlation over time to reduce mean-time-to-detect",
         "Regulations prohibit retaining security event logs beyond twenty-four hours total",
         "Signature updates remove the need for human threat-hunting activities entirely",
     ], 1, "SIEM and EDR over retained telemetry catch slow and low-noise campaigns."),
]

# PGP 12
QUESTIONS += [
    ("smcq-pgp-1a", "PGP & GPG", "pgp-1-wrong-key", "Secure Email with PGP", None,
     "Ciphertext was encrypted to the wrong recipient public key. Primary impact for the sender?",
     [
         "Confidentiality toward the intended recipient is lost in practice (cannot decrypt)",
         "Integrity of the OpenPGP packet format is broken during SMTP relay transit",
         "Authenticity of the perimeter TLS certificate on the gateway is invalidated",
         "Non-repudiation fails because symmetric session keys were reused across mails",
     ], 0, "Wrong key means the intended party cannot decrypt; another holder may."),
    ("smcq-pgp-1b", "PGP & GPG", "pgp-1-wrong-key", "Secure Email with PGP", None,
     "Which practice best prevents wrong-key encryption in organisational GPG mail?",
     [
         "Trust any key labelled CEO on public keyservers without further verification",
         "Verify fingerprints out-of-band and use a signed internal key directory",
         "Disable encryption subkeys to reduce the number of selectable public keys",
         "Encrypt only subject lines while leaving all message bodies in plaintext",
     ], 1, "Out-of-band fingerprint checks bind identity to the correct public key."),
    ("smcq-pgp-2a", "PGP & GPG", "pgp-2-gpg4win", "Gpg4win Deployment Issues", None,
     "Staff share one departmental private key without passphrases on shared drives. Impact?",
     [
         "Only availability improves because decryption becomes faster for the whole team",
         "Accountability non-repudiation and confidentiality on compromise are undermined",
         "The symmetric session cipher inside OpenPGP is weakened to DES automatically",
         "S/MIME gateway interoperability at the mail perimeter is permanently lost",
     ], 1, "Shared private keys prevent attribution and magnify leak impact."),
    ("smcq-pgp-2b", "PGP & GPG", "pgp-2-gpg4win", "Gpg4win Deployment Issues", None,
     "Importing unverified public keys from the internet into Kleopatra mainly enables:",
     [
         "Man-in-the-middle substitution of keys during encrypted communication sessions",
         "Automatic downgrade from AES-256 to DES within the OpenPGP message layer",
         "Deletion of all private keys stored in the Windows certificate trust store",
         "Mandatory migration from hybrid encryption to pure asymmetric payload encryption",
     ], 0, "Fake keys let an attacker decrypt traffic or forge apparent legitimacy."),
    ("smcq-pgp-3a", "PGP & GPG", "pgp-3-keyring", "Keyring Management Failure", None,
     "A keyring holds duplicate and expired keys for one UID. Likely release impact?",
     [
         "GnuPG automatically upgrades all keys to post-quantum algorithms overnight",
         "Encryption to an obsolete key causes failed decryption in release pipelines",
         "The organisational root of trust is revoked automatically by the keyserver",
         "Compression before encryption is disabled for all outgoing release artefacts",
     ], 1, "Wrong or stale keys break CI decrypt steps and delay incident response."),
    ("smcq-pgp-3b", "PGP & GPG", "pgp-3-keyring", "Keyring Management Failure", None,
     "What is the primary distinction between GnuPG public and secret key material?",
     [
         "Public keys encrypt payloads; secret keys are used only to verify signatures",
         "Public material identifies others; secret material performs sign and decrypt",
         "Secret keys are published to keyservers; public keys must remain offline only",
         "Both rings must be stored in the system password file for POSIX compliance",
     ], 1, "Public keys encrypt to others; secret keys decrypt and create signatures."),
    ("smcq-pgp-4a", "PGP & GPG", "pgp-4-trust", "Public Key Trust", None,
     "A user imports a key labelled CEO from a keyserver without fingerprint checks. Risk?",
     [
         "Real-time factoring of a 2048-bit RSA modulus becomes trivial on clients",
         "Man-in-the-middle impersonation using an attacker-controlled public key pair",
         "Automatic downgrade from TLS 1.3 to SSL version three on the mail gateway",
         "Collision attacks on SHA-256 hashes embedded in signed message bodies",
     ], 1, "Anyone can upload arbitrary UIDs; encryption may go to an impostor."),
    ("smcq-pgp-4b", "PGP & GPG", "pgp-4-trust", "Public Key Trust", None,
     "How does OpenPGP Web of Trust differ from a corporate PKI hierarchy?",
     [
         "WoT uses decentralised peer signatures; PKI relies on central CA issuance",
         "WoT mandates X.509 version three certificates for every corporate email user",
         "PKI eliminates any need to distribute public keys to communicating parties",
         "WoT requires a hardware token for every single encryption operation performed",
     ], 0, "WoT propagates trust via signatures; enterprises often use internal CAs."),
    ("smcq-pgp-5a", "PGP & GPG", "pgp-5-sign", "Digital Signatures Using GPG", None,
     "Successful GPG signature verification on an installer primarily assures:",
     [
         "The binary contains no memory-safety vulnerabilities at runtime on clients",
         "The payload matches content authenticated by the signer's private key",
         "The download channel used transport layer TLS version 1.3 exclusively",
         "The signing key cannot possibly be compromised at any future point in time",
     ], 1, "Signatures prove integrity and authenticity relative to that key—not code quality."),
    ("smcq-pgp-5b", "PGP & GPG", "pgp-5-sign", "Digital Signatures Using GPG", None,
     "A software-signing private key is exfiltrated. What should the organisation prioritise?",
     [
         "Publish the private key internally so build pipelines continue without delay",
         "Revoke the key rotate signing material and hunt for forged release artefacts",
         "Disable TLS on the public download portal to accelerate incident response",
         "Re-encrypt historical releases with AES-ECB to obscure prior signatures",
     ], 1, "Attackers can sign malware as legitimate; revoke rotate and scan artefacts."),
    ("smcq-pgp-6a", "PGP & GPG", "pgp-6-hybrid", "Hybrid Encryption in PGP", None,
     "Why does OpenPGP encrypt the message body with a symmetric session key first?",
     [
         "Symmetric ciphers cannot provide confidentiality for email-sized payloads",
         "Asymmetric operations are too slow for large files and message bodies",
         "RSA must generate random IV values separately for each MIME part",
         "Hash functions are always slower than block ciphers for large attachments",
     ], 1, "Hybrid design uses fast symmetric bulk encryption and small asymmetric wraps."),
    ("smcq-pgp-6b", "PGP & GPG", "pgp-6-hybrid", "Hybrid Encryption in PGP", None,
     "Even with encrypted OpenPGP bodies, what leakage commonly remains?",
     [
         "Full plaintext of attachments is visible inside the encrypted packet layer",
         "Envelope metadata such as sender recipient and timestamp may still leak",
         "The symmetric session key is printed in cleartext in the message header",
         "Private key prime factors are embedded in each ciphertext block transmitted",
     ], 1, "PGP protects content; routing metadata may still enable traffic analysis."),
]

# Firewalls 12
QUESTIONS += [
    ("smcq-fw-1a", "Firewalls & Firewall Architecture", "fw-1-perim", "Misconfigured Perimeter Firewall", None,
     "Outbound traffic is unrestricted and permissive rules are not logged. Critical IR risk?",
     [
         "Inbound SYN flood attacks cannot be mitigated without stateful inspection",
         "Covert exfiltration and C2 may proceed without usable forensic log evidence",
         "DNS responses are encrypted automatically by the firewall inspection engine",
         "Internal users cannot establish any TCP sessions to internet-hosted services",
     ], 1, "Open egress plus missing logs hides theft and blocks investigation."),
    ("smcq-fw-1b", "Firewalls & Firewall Architecture", "fw-1-perim", "Misconfigured Perimeter Firewall", None,
     "Which rule-base philosophy matches least privilege on an internet-facing firewall?",
     [
         "Implicit permit with explicit deny statements placed at the end of the list",
         "Implicit deny with explicit permit rules only for required traffic flows",
         "Permit all UDP services to simplify VoIP and streaming media deployments",
         "Mirror internal directory groups directly into access-control lines unfiltered",
     ], 1, "Default-deny with documented explicit permits is standard hardening."),
    ("smcq-fw-2a", "Firewalls & Firewall Architecture", "fw-2-dmz", "DMZ Architecture", None,
     "In a screened-subnet design, why place public web servers in a DMZ?",
     [
         "To allow domain administrators direct RDP access from the public internet",
         "To isolate internet-exposed services from the internal core network zone",
         "To eliminate the requirement for TLS certificates on public web properties",
         "To store database backups on the same VLAN as the public HTTP service",
     ], 1, "DMZ limits blast radius if a public-facing server is compromised."),
    ("smcq-fw-2b", "Firewalls & Firewall Architecture", "fw-2-dmz", "DMZ Architecture", None,
     "Which flow best satisfies separation between internet users and a backend database?",
     [
         "Internet to database port then web server then return path to the user",
         "Internet to DMZ web tier then restricted rule to internal database only",
         "Database initiates HTTPS sessions directly to internet clients without proxy",
         "Single flat layer-two segment protected by one stateless packet filter only",
     ], 1, "Web in DMZ; only web tier may open DB ports on the internal zone."),
    ("smcq-fw-3a", "Firewalls & Firewall Architecture", "fw-3-state", "Stateful vs Stateless", None,
     "How does connection tracking in a stateful firewall improve on a packet filter?",
     [
         "It encrypts all payload contents automatically at the network layer three",
         "It allows return traffic only for sessions that were legitimately established",
         "It removes the need for any inbound deny rules on the perimeter device",
         "It guarantees detection of every application-layer SQL injection attempt made",
     ], 1, "State tables block unsolicited inbound packets that simple ACLs may admit."),
    ("smcq-fw-3b", "Firewalls & Firewall Architecture", "fw-3-state", "Stateful vs Stateless", None,
     "Compared with classic stateful firewalls, an NGFW most relevantly adds:",
     [
         "Removal of deep packet inspection to reduce latency on all paths",
         "Application identification user context and integrated intrusion prevention features",
         "Mandatory static NAT mapping for every internal host address on the LAN",
         "Exclusive reliance on stateless ACLs for all east-west data-centre traffic",
     ], 1, "NGFWs classify apps and users and often integrate IPS and threat feeds."),
    ("smcq-fw-4a", "Firewalls & Firewall Architecture", "fw-4-proxy", "Application Layer Firewall", None,
     "An application proxy terminates client connections and inspects commands. Trade-off?",
     [
         "Complete inability to authenticate users at the application protocol layer",
         "Higher latency and processing cost in exchange for deeper protocol visibility",
         "Mandatory prohibition of HTTPS on all corporate-facing web service endpoints",
         "Elimination of security logging because proxies always bypass the kernel",
     ], 1, "Proxies see protocol semantics but broker connections at a performance cost."),
    ("smcq-fw-4b", "Firewalls & Firewall Architecture", "fw-4-proxy", "Application Layer Firewall", None,
     "Where should a Web Application Firewall sit to mitigate OWASP-style API attacks?",
     [
         "Behind the internal database cluster with no route to internet clients",
         "In front of the web or application tier inspecting HTTP request traffic",
         "Only on end-user laptops inspecting outbound browser disk cache data stores",
         "Replacing the organisation-wide SIEM log aggregation platform entirely",
     ], 1, "WAFs analyse HTTP/S at the application edge alongside secure coding."),
    ("smcq-fw-5a", "Firewalls & Firewall Architecture", "fw-5-insider", "Firewall Bypass & Insider", None,
     "An employee tunnels traffic over personal VPN to evade URL filtering. Gap exploited?",
     [
         "Perimeter firewalls cannot inspect any encrypted outbound channel whatsoever",
         "Encrypted egress bypasses policy enforcement unless inspected or proxied",
         "Stateful firewalls block all UDP including DNS and network time protocol",
         "Insider actors never possess valid credentials for internal resource access",
     ], 1, "Personal VPN hides destinations from URL filters without egress controls."),
    ("smcq-fw-5b", "Firewalls & Firewall Architecture", "fw-5-insider", "Firewall Bypass & Insider", None,
     "Why do perimeter-only firewall strategies poorly address insider threats?",
     [
         "Insiders always attack exclusively from external public IP address space",
         "They may already operate inside with legitimate network access privileges",
         "Firewalls automatically trust all RFC1918 address space as fully safe",
         "Insider attacks are limited to physical theft of paper records only",
     ], 1, "Zero trust segmentation UEBA and DLP address internal movement."),
    ("smcq-fw-6a", "Firewalls & Firewall Architecture", "fw-6-layer", "Multi-Layer Firewall Architecture", None,
     "Edge DMZ and internal segmentation firewalls in a bank. Primary benefit?",
     [
         "Guaranteed elimination of all phishing attacks across the enterprise",
         "Compartmentalisation that limits lateral movement after an initial breach",
         "Removal of the need for monitoring on internal VLAN segments entirely",
         "One identical rule set copied to every device without zone tailoring",
     ], 1, "Layered zones shrink blast radius and map to compliance boundaries."),
    ("smcq-fw-6b", "Firewalls & Firewall Architecture", "fw-6-layer", "Multi-Layer Firewall Architecture", None,
     "Dominant operational challenge when managing multiple firewall tiers?",
     [
         "IPv6 traffic cannot traverse more than one firewall hop in any path",
         "Rule drift weak change control and inconsistent policy across zones",
         "Mandatory replacement of stateful inspection with pure packet filters",
         "Prohibition of forwarding logs to any central SIEM for performance",
     ], 1, "ACL sprawl needs IaC reviews and periodic audits to stay accurate."),
]

# Mock test 14
def mock_q(id_, topic, sid, title, q, opts, ans, exp):
    QUESTIONS.append((id_, topic, sid, title, "mock", q, opts, ans, exp))

mock_q("smcq-mt-q1a", "Mock Test — Malware & Detection", "mt-q1", "Q1 — Fake Antivirus at the Bank",
       "Rogueware posing as antivirus defrauds bank customers. Malware model and propagation?",
       ["Self-propagating worm scanning RFC1918 subnets without any user interaction",
        "Socially engineered Trojan delivering infostealer and keylogger components",
        "Bootkit modifying GPT partitions on first open without user execution",
        "Benign adware limited to displaying unwanted advertisements in the browser"],
       1, "Fake AV is a Trojan requiring user deception; it does not self-replicate.")
mock_q("smcq-mt-q1b", "Mock Test — Malware & Detection", "mt-q1", "Q1 — Fake Antivirus at the Bank",
       "Which indicator set best supports SOC detection in the mock bank Trojan scenario?",
       ["Only physical tailgating events recorded at the primary data centre entrance",
        "Host beaconing disabled AV and anomalous banking session geolocation patterns",
        "Exclusive reliance on weekly full-disk signature scans without network telemetry",
        "Blocking all inbound SMTP while disabling endpoint detection and response agents"],
       1, "Correlate endpoint telemetry with fraud analytics and SIEM rules.")
mock_q("smcq-mt-q2a", "Mock Test — Cryptography (Bank)", "mt-q2", "Q2 — Email & Laptop Encryption",
       "A bank must encrypt laptops and secure email. Correct algorithm-to-use-case mapping?",
       ["RSA-4096 for full-disk encryption with AES reserved for TLS certificates only",
        "AES for bulk data at rest and RSA or ECC for exchange and signatures",
        "Caesar cipher for databases and MD5 for email confidentiality protection",
        "Symmetric keys distributed in plaintext email to all branch managers weekly"],
       1, "AES handles volume; asymmetric keys handle trust and key wrapping.")
mock_q("smcq-mt-q2b", "Mock Test — Cryptography (Bank)", "mt-q2", "Q2 — Email & Laptop Encryption",
       "Where should master keys for customer database DEKs be stored per mock guidance?",
       ["In the same MySQL configuration file as the database connection string entry",
        "In an HSM or KMS segregated from the database server hardware tier",
        "Embedded in the mobile banking application package for high availability",
        "Printed and stored in each branch manager personal office desk drawer"],
       1, "Master keys must not co-reside with ciphertext in financial designs.")
mock_q("smcq-mt-q3a", "Mock Test — Network Security & Firewalls", "mt-q3", "Q3 — HQ, ATMs & Web Servers",
       "Public website and core banking separation in the mock screened-subnet answer?",
       ["Single flat VLAN protected by one stateless router access-control list only",
        "Dual NGFWs with outer DMZ for web and inner zone for core banking",
        "Database servers published on public IP addresses for simpler routing",
        "ATMs connected directly to the internet without VPN or encryption layers"],
       1, "Outer/inner firewalls and DMZ match mock Q3(b) bank architecture.")
mock_q("smcq-mt-q3b", "Mock Test — Network Security & Firewalls", "mt-q3", "Q3 — HQ, ATMs & Web Servers",
       "Remote bank ATMs in the mock scenario should connect to headquarters using:",
       ["Unencrypted HTTP over the public internet for operational simplicity today",
        "Site-to-site IPsec VPN with firewall policies enforced on both endpoints",
        "RDP port forwarding from each ATM public IP address to the core network",
        "Emailing transaction logs as ZIP attachments to the operations mailbox"],
       1, "Mock specifies IPsec VPN for ATM connectivity into the trusted zone.")
mock_q("smcq-mt-q3c", "Mock Test — Network Security & Firewalls", "mt-q3", "Q3 — Distributed Firewall",
       "After phishing bypasses the perimeter NGFW, how does distributed firewalling help?",
       ["It removes the need for any DMZ or internal segmentation design entirely",
        "It enforces policy on each host or VM to restrict east-west movement",
        "It replaces all endpoint EDR agents with router ACLs on the LAN only",
        "It decrypts all TLS sessions automatically without legal or privacy review"],
       1, "Host-level enforcement limits lateral movement per mock Q3(c).")
mock_q("smcq-mt-q3d", "Mock Test — Network Security & Firewalls", "mt-q3", "Q3 — Firewall Types",
       "Correct capability progression for packet filter stateful and NGFW in mock Q3(a)?",
       ["NGFW then stateless ACL then stateful inspection then application proxy only",
        "Stateless filter then stateful inspection then NGFW with DPI and IPS",
        "Application proxy then network hub then MAC filter then web application firewall",
        "Intrusion detection then antivirus then spam filter then stateless ACL only"],
       1, "Mock orders increasing inspection depth ending at NGFW with DPI/IPS.")
mock_q("smcq-mt-q4a", "Mock Test — VPN & PKI", "mt-q4", "Q4 — SSL VPN & X.509",
       "In the bank SSL VPN scenario, a valid gateway certificate primarily proves to the client:",
       ["That all employee passwords meet organisational complexity policy requirements",
        "That the TLS endpoint identity matches the expected bank gateway identity",
        "That AES-256-GCM is the only cipher permitted on all global TLS deployments",
        "That the client workstation contains no malware before tunnel establishment"],
       1, "Certificates bind identity to a CA-trusted public key for the gateway.")
mock_q("smcq-mt-q4b", "Mock Test — VPN & PKI", "mt-q4", "Q4 — Certificate Not Trusted",
       "Staff see certificate not trusted on bank SSL VPN. Most common internal PKI cause?",
       ["The user display resolution is below the minimum required desktop standard",
        "The corporate root CA is missing from the laptop operating system trust store",
        "AES session keys were exposed in cleartext inside TLS application data records",
        "OpenPGP encryption subkeys expired on the corporate SMTP relay server"],
       1, "Missing internal root breaks chain validation; deploy via GPO or MDM.")
mock_q("smcq-mt-q4c", "Mock Test — VPN & PKI", "mt-q4", "Q4 — VPN Protocol Comparison",
       "For travelling bank staff behind restrictive hotel firewalls, mock Q4(c) favours:",
       ["L2TP/IPsec on UDP ports five hundred and four thousand five hundred only",
        "SSL VPN or OpenVPN tunnelled over TCP port four forty-three where possible",
        "Unencrypted point-to-point dial-up links over analogue telephone circuits only",
        "Peer-to-peer mesh VPN with no central gateway authentication mechanism used"],
       1, "TLS on 443 traverses most guest networks; L2TP/IPsec is often blocked.")
mock_q("smcq-mt-q4d", "Mock Test — VPN & PKI", "mt-q4", "Q4 — TLS Handshake",
       "After SSL VPN certificate validation succeeds, bulk tunnel traffic is protected by:",
       ["Each IP packet encrypted directly with the server RSA public modulus value",
        "Symmetric AEAD keys derived during the negotiated TLS handshake process",
        "Base64 encoding of IP headers without providing confidentiality to payloads",
        "Continuous use of the X.509 certificate private key for all data frames"],
       1, "TLS derives symmetric keys for the tunnel; certs authenticate and establish keys.")
mock_q("smcq-mt-q5a", "Mock Test — PGP & Key Management", "mt-q5", "Q5 — Lost PGP Keys",
       "Per mock Q5(c), which practice is appropriate for bank encryption subkeys?",
       ["Escrow encryption keys in HSM infrastructure but never escrow signing keys",
        "Publish all private keys on the intranet portal for disaster recovery access",
        "Share one corporate signing key across all teller workstations for speed",
        "Disable issuance of revocation certificates to avoid operational downtime"],
       0, "Escrow aids recovery; escrow of signing keys would enable forgery.")
mock_q("smcq-mt-q5b", "Mock Test — PGP & Key Management", "mt-q5", "Q5 — Key Lifecycle",
       "A teller leaves the bank. Immediate action per mock PGP lifecycle guidance?",
       ["Archive their private signing key on USB media for the replacement employee",
        "Revoke keys rotate affected material and audit artefacts they signed",
        "Delete only the public keyring so inbound email delivery still functions",
        "Disable TLS on the VPN concentrator so former staff cannot reconnect"],
       1, "Departure requires revocation rotation and review of signed artefacts.")


def word_count(s):
    return len(s.split())


def validate(opts):
    counts = [word_count(o) for o in opts]
    if max(counts) - min(counts) > 3:
        return counts
    return None


def emit():
    lines = [
        "// Scenario MCQs — TCA Level 6 (hard)",
        "// Anti-bias: option lengths balanced (~11-14 words); correct index varied",
        "// 24 DOCX scenarios + CSY3023 Mock Test (May 2025)",
        "",
        "const scenarioMcqQuestions = [",
    ]
    warnings = []
    for row in QUESTIONS:
        qid, topic, sid, title, source, question, opts, ans, expl = row
        bad = validate(opts)
        if bad:
            warnings.append((qid, bad))
        src_line = f'\n        source: "{source}",' if source else ""
        lines.append("    {")
        lines.append(f'        id: "{qid}",')
        lines.append(f'        scenarioTopic: "{topic}",')
        lines.append(f'        scenarioId: "{sid}",')
        lines.append(f'        scenarioTitle: "{title}",')
        if source:
            lines.append(f'        source: "{source}",')
        lines.append('        difficulty: "hard",')
        lines.append("        level: 6,")
        lines.append(f'        question: "{question}",')
        lines.append("        options: [")
        for o in opts:
            lines.append(f'            "{o}",')
        lines.append("        ],")
        lines.append(f"        correctAnswer: {ans},")
        lines.append(f'        explanation: "{expl}"')
        lines.append("    },")
    lines.append("];")
    lines.append("")
    lines.append("window.scenarioMcqQuestions = scenarioMcqQuestions;")
    lines.append("")
    out = Path(__file__).parent / "assets" / "js" / "scenario-mcqs.js"
    out.write_text("\n".join(lines), encoding="utf-8")
    print("Wrote", out, "questions:", len(QUESTIONS))
    if warnings:
        print("Length warnings (>3 word spread):")
        for w in warnings:
            print(" ", w)


if __name__ == "__main__":
    emit()
