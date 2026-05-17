// CSY3062 — Extended terminology from all workspace materials:
// PDFs, PPTX, DOCX, HTML (74 extracted files), Study Notes modules 1–14

const terminologyExtendedEntries = [
    // —— Cyber Security Fundamentals ——
    {
        id: "term-cybersecurity",
        category: "Cyber Security Fundamentals",
        term: "Cybersecurity",
        definition: "A wide-ranging discipline covering protection of citizens, businesses, and critical infrastructure from threats arising from computers and the Internet. It includes technical controls, processes, policies, laws, and human factors—not only IT tools.",
        example: "A hospital protects patient records (confidentiality), ensures billing data is accurate (integrity), and keeps systems online for emergencies (availability).",
        points: ["Socio-technical: people + process + technology.", "Broader than computer security alone.", "Covers prevention, detection, and recovery."]
    },
    {
        id: "term-cia-triad",
        category: "Cyber Security Fundamentals",
        term: "CIA Triad",
        definition: "The core information-security model: Confidentiality (only authorised users see data), Integrity (data is accurate and unaltered), Availability (systems and data are accessible when needed). Most security controls map to one or more of these goals.",
        example: "ATM: only you see your balance (C), the amount is correct (I), you can withdraw 24/7 (A).",
        points: ["Exam staple—link controls to C, I, or A.", "Trade-offs exist (e.g. strong encryption can affect performance).", "Often extended with Authenticity and Non-repudiation."]
    },
    {
        id: "term-active-passive",
        category: "Cyber Security Fundamentals",
        term: "Active vs Passive Attack",
        definition: "Passive attacks observe or copy data without modifying it (eavesdropping, traffic analysis). Active attacks alter systems or data (modification, spoofing, DoS, malware installation). Passive attacks are hard to detect; active attacks may trigger alerts.",
        example: "Passive: attacker copies Wi‑Fi packets. Active: attacker changes account balance in a database.",
        points: ["Encryption mainly counters passive disclosure.", "Integrity controls and IDS help against active attacks.", "From attacks framework (16-A framework.pdf)."]
    },
    {
        id: "term-social-engineering",
        category: "Cyber Security Fundamentals",
        term: "Social Engineering",
        definition: "Tricking people into revealing information or taking unsafe actions—opening malicious attachments, giving passwords, or sending files. Exploits human trust rather than technical flaws alone.",
        example: "Caller claims to be IT support and asks for your password to 'fix' your account.",
        points: ["Listed in attacks framework alongside malware and probing.", "Training and verification procedures are key defences.", "Often the first step in larger breaches."]
    },
    {
        id: "term-eavesdropping",
        category: "Cyber Security Fundamentals",
        term: "Eavesdropping / Packet Sniffing",
        definition: "Capturing network traffic on a shared or compromised link (promiscuous mode). If data is plaintext, contents are readable. Motivates encryption on insecure networks like the Internet.",
        example: "On unencrypted café Wi‑Fi, a neighbour captures your login if the site uses HTTP not HTTPS.",
        points: ["Introduction to Encryption HTML: 'Internet is insecure' without crypto.", "TLS protects payload in transit.", "Insider on LAN can sniff if not segmented."]
    },
    {
        id: "term-mitm",
        category: "Cyber Security Fundamentals",
        term: "Man-in-the-Middle (MITM)",
        definition: "Attacker positions between two parties, intercepting and possibly altering messages. Public-key systems are vulnerable if keys are not authenticated—motivates certificates and CAs.",
        example: "Trudy convinces Bob that her public key is Alice's; Bob encrypts secrets Trudy can read.",
        points: ["Certificate Authorities solve key authenticity.", "Use HTTPS, certificate pinning where appropriate.", "VPN and mTLS reduce MITM on paths."]
    },
    {
        id: "term-dos",
        category: "Cyber Security Fundamentals",
        term: "Denial of Service (DoS / DDoS)",
        definition: "Attack that disrupts availability by overwhelming resources (bandwidth, CPU, connections) or crashing services. DDoS uses many distributed sources. Firewalls and rate limiting help but large attacks need ISP/cloud scrubbing.",
        example: "Botnet floods a web server with millions of requests so customers cannot shop.",
        points: ["Targets Availability in CIA triad.", "In attacks framework under penetration/malware categories.", "Combine with redundancy and incident response."]
    },
    {
        id: "term-defense-in-depth",
        category: "Cyber Security Fundamentals",
        term: "Defense in Depth",
        definition: "Layering multiple independent security controls so failure of one layer does not mean total compromise. Examples: firewall + IDS + encryption + training + backups.",
        example: "Even if phishing gets malware on a PC, segmentation stops it reaching the payroll database.",
        points: ["Core design principle in Module IV and firewall architectures.", "No single product is sufficient.", "Maps to NIST CSF multiple functions."]
    },
    // —— Frameworks & Governance ——
    {
        id: "term-security-framework",
        category: "Security Frameworks & Governance",
        term: "Security Framework",
        definition: "Structured approach to managing cybersecurity: policies, procedures, standards, and controls. Provides consistency, supports compliance, and helps identify and treat risk systematically.",
        example: "NIST CSF gives functions (Govern, Identify, Protect…) so a bank can prioritise investments the same way peers do.",
        points: ["CSA-CSF / CSA-INTRODUCTION PDFs in course pack.", "Framework ≠ single tool; it guides the programme.", "Senior management must own governance."]
    },
    {
        id: "term-nist-csf",
        category: "Security Frameworks & Governance",
        term: "NIST Cybersecurity Framework (CSF 2.0)",
        definition: "Voluntary, risk-based US NIST framework (2014, major update 2.0 in 2024) to identify, assess, manage, and reduce cyber risk. Components: Framework Core, Implementation Tiers, Profiles. Used before, during, and after incidents—not only after breaches.",
        example: "Organisation profiles current state vs target profile, then closes gaps in Protect and Detect.",
        points: ["Six functions in 2.0 include Govern.", "Applicable to all sectors and SME to critical infrastructure.", "Communicates risk to leadership."]
    },
    {
        id: "term-iso27001",
        category: "Security Frameworks & Governance",
        term: "ISO/IEC 27001",
        definition: "International standard for an Information Security Management System (ISMS). Defines requirements for establishing, implementing, maintaining, and continually improving security management—not a list of every technical control.",
        example: "Company certifies to ISO 27001 to prove structured risk treatment to customers and regulators.",
        points: ["Study Notes module 3; CSA-ISO PDF/pptx.", "Often paired with ISO 27002 control guidance.", "Certification requires audits and evidence."]
    },
    {
        id: "term-risk-management",
        category: "Security Frameworks & Governance",
        term: "Risk Management",
        definition: "Identifying assets and threats, assessing likelihood and impact, then choosing treatment: mitigate, transfer (insurance), accept, or avoid. Frameworks like NIST and ISO embed risk management in governance.",
        example: "High risk of ransomware → mitigate with backups + training, not only 'accept'.",
        points: ["Informs firewall rules and control prioritisation.", "Document risk decisions for audits.", "Residual risk always remains."]
    },
    // —— Cryptography Basics ——
    {
        id: "term-cryptography",
        category: "Cryptography — Basics",
        term: "Cryptography",
        definition: "Science of using mathematics to encrypt and decrypt data so only intended recipients can read it. Supports confidentiality; combined with hashing and signatures supports integrity and authentication over insecure networks.",
        example: "Online banking uses crypto so your password and balance are not readable on the wire.",
        points: ["17-Concepts of Cryptography.pptx.", "Two main families: symmetric and asymmetric.", "Does not replace need for secure design and ops."]
    },
    {
        id: "term-plaintext-ciphertext",
        category: "Cryptography — Basics",
        term: "Plaintext and Ciphertext",
        definition: "Plaintext is readable message data. Encryption transforms it into ciphertext (unreadable without the key). Decryption reverses the process. Cryptanalysis tries to recover plaintext without the key.",
        example: "HELLO → ciphertext gibberish → HELLO after decryption with correct key.",
        points: ["Unit 2 Cryptography PDF definitions.", "Never confuse encoding (Base64) with encryption.", "Key secrecy determines strength."]
    },
    {
        id: "term-symmetric",
        category: "Cryptography — Symmetric",
        term: "Symmetric Key Cryptography",
        definition: "Same secret key encrypts and decrypts. Fast for bulk data but key distribution is hard—every pair of users needs a shared secret without an insecure channel.",
        example: "AES-256 key shared via pre-arranged meeting or derived inside an TLS session.",
        points: ["DES/3DES legacy; AES is modern standard.", "Algorithms: AES, ChaCha20, 3DES.", "Key distribution problem led to public-key crypto."]
    },
    {
        id: "term-asymmetric",
        category: "Cryptography — Asymmetric",
        term: "Asymmetric (Public Key) Cryptography",
        definition: "Key pair: public key encrypts (or verifies); private key decrypts (or signs). Solves distribution—publish public keys openly. Slower than symmetric; often used to agree a session key then switch to AES.",
        example: "Bob publishes public key; Alice encrypts message only Bob's private key can open.",
        points: ["RSA, ECC common algorithms.", "Diffie-Hellman for key agreement.", "17-enc-2.html Public Key Systems."]
    },
    {
        id: "term-key-distribution",
        category: "Cryptography — Basics",
        term: "Key Distribution Problem",
        definition: "Challenge of getting symmetric keys to all parties securely. O(n²) keys for n users if pairwise. Solutions: face-to-face exchange, trusted third party, or public-key infrastructure.",
        example: "Army cannot phone enemy to agree daily AES key—uses PKI or DH instead.",
        points: ["Motivation for PKI and certificates.", "PGP notes: O(n²) keys without good design.", "TLS hybrid: asymmetric handshake + symmetric data."]
    },
    {
        id: "term-diffie-hellman",
        category: "Cryptography — Asymmetric & PKI",
        term: "Diffie-Hellman Key Exchange",
        definition: "Protocol (1976) letting two parties agree a shared secret over an insecure channel without transmitting the secret itself. Original proposal was insufficient alone; concept led to modern key agreement (e.g. TLS, IKE).",
        example: "Two colours mixed in public; each adds private colour—shared result matches without sending private colour.",
        points: ["17-enc-2.html history.", "Vulnerable to MITM without authenticated parameters.", "Used inside IPsec and TLS."]
    },
    {
        id: "term-rsa",
        category: "Cryptography — Asymmetric & PKI",
        term: "RSA",
        definition: "Public-key algorithm (Rivest, Shamir, Adleman, 1978) based on difficulty of factoring large integers. Used for encryption, digital signatures, and key exchange in TLS and many systems. Key sizes 2048+ bits recommended today.",
        example: "HTTPS certificate uses RSA or ECDSA public key in X.509 cert.",
        points: ["CSY3062_AES_RSA_questions.docx.", "Not for encrypting huge files directly—use hybrid.", "Quantum computers threaten long-term RSA use."]
    },
    {
        id: "term-aes",
        category: "Cryptography — Symmetric",
        term: "AES (Advanced Encryption Standard)",
        definition: "Symmetric block cipher (128-bit blocks) selected by NIST; key sizes 128, 192, 256 bits. Fast, secure when implemented correctly. Replaced DES for most uses including TLS, Wi‑Fi (WPA2), and disk encryption.",
        example: "BitLocker and TLS 1.3 often use AES-256-GCM.",
        points: ["Study Notes module 6.", "Modes matter (ECB weak for patterns; use GCM).", "Exam: know block size and key lengths."]
    },
    {
        id: "term-des",
        category: "Cryptography — Symmetric",
        term: "DES and 3DES",
        definition: "Data Encryption Standard: 56-bit effective key, now broken by brute force. Triple-DES applies DES three times for legacy compatibility. Both deprecated—use AES for new systems.",
        example: "Old payment terminals may still mention 3DES; migration to AES required.",
        points: ["Historical exam context.", "Small key space = insecure today.", "Understand why standards evolve."]
    },
    // —— Classical Ciphers ——
    {
        id: "term-caesar",
        category: "Classical Ciphers",
        term: "Caesar Cipher",
        definition: "Substitution cipher shifting each letter by fixed positions in the alphabet (e.g. shift 3). Classical, easily broken by brute force (25 shifts) or frequency analysis.",
        example: "HELLO with shift 3 → KHOOR.",
        points: ["caesar_cipher.docx; Unit 2 PDF.", "Illustrates encryption concept only—not secure.", "Foundation for understanding substitution."]
    },
    {
        id: "term-playfair",
        category: "Classical Ciphers",
        term: "Playfair Cipher",
        definition: "Digraphic substitution cipher using a 5×5 key matrix (I/J share a cell). Encrypts letter pairs with rules: same row → shift right; same column → shift down; rectangle → swap columns. Double letters split (e.g. LL → LX).",
        example: "HELLO → pairs HE, LX, LO → ciphertext CFSUSC with KEYWORD matrix in playfair_hill.docx.",
        points: ["playfair_hill.docx step-by-step.", "Stronger than Caesar but still breakable.", "Know matrix construction from keyword."]
    },
    {
        id: "term-hill",
        category: "Classical Ciphers",
        term: "Hill Cipher",
        definition: "Polygraphic cipher using matrix multiplication modulo 26. Plaintext blocks are vectors multiplied by an invertible key matrix to produce ciphertext. Security depends on matrix size and key secrecy; vulnerable to known-plaintext attack.",
        example: "CAT as vector (2,0,19) × key matrix → UUH in course docx example.",
        points: ["Requires invertible matrix mod 26.", "playfair_hill.docx worked example.", "Linear algebra link for exams."]
    },
    {
        id: "term-classical-crypto",
        category: "Classical Ciphers",
        term: "Classical vs Modern Cryptography",
        definition: "Classical ciphers (Caesar, Playfair, Hill, simple substitution/transposition) were designed for hand computation; modern computers break them quickly. Modern crypto uses AES, RSA, ECC with large keys and proven modes.",
        example: "WWII Enigma was 'classical' by today's standards—broken with machines.",
        points: ["Unit 2 PDF: classical easily breakable.", "Teaches concepts before AES/RSA.", "Never use classical ciphers for real data."]
    },
    // —— Hashing & Signatures ——
    {
        id: "term-hash",
        category: "Hashing & Digital Signatures",
        term: "Cryptographic Hash Function",
        definition: "One-way function mapping variable input to fixed-size digest. Properties: preimage resistance, collision resistance, avalanche effect. Used for integrity, passwords (with salt), digital signatures, and blockchain.",
        example: "Download site publishes SHA-256 of file; you hash download and compare—must match.",
        points: ["17-Concepts: no collisions, hard to reverse.", "MD5 broken for collisions—use SHA-256+.", "Not encryption—cannot decrypt hash."]
    },
    {
        id: "term-digital-signature",
        category: "Hashing & Digital Signatures",
        term: "Digital Signature",
        definition: "Signer hashes message, encrypts digest with private key; verifier decrypts with public key and compares to fresh hash. Provides integrity, authentication, and non-repudiation if private key is protected.",
        example: "PDF signed by company—Adobe shows signer identity and tamper warning if edited.",
        points: ["Module VIII Digital Signatures ppt.", "Uses asymmetric crypto on hash only.", "Timestamping strengthens non-repudiation."]
    },
    {
        id: "term-non-repudiation",
        category: "Hashing & Digital Signatures",
        term: "Non-repudiation",
        definition: "Sender cannot credibly deny sending a message. Achieved with digital signatures, audit logs, and legal process. Distinct from confidentiality.",
        example: "Signed contract email—sender later claims they did not send; signature proves otherwise.",
        points: ["17-Concepts: data origin + legal weight.", "Requires protected private keys.", "Logs alone are weaker than crypto signatures."]
    },
    {
        id: "term-checksum-crc",
        category: "Hashing & Digital Signatures",
        term: "Checksum vs CRC vs Hash",
        definition: "Checksum (simple bit sum) and CRC (polynomial) detect accidental errors; weak against intentional tampering. Cryptographic hashes (SHA-256) detect malicious modification and support signatures.",
        example: "Credit card Luhn checksum catches typos; SHA-256 on firmware detects attacker changes.",
        points: ["17-Concepts lists all three for integrity.", "Use hashes for security; CRC for links/storage errors.", "Authentication combines hash + key."]
    },
    // —— PKI & PGP ——
    {
        id: "term-pki",
        category: "PKI & PGP",
        term: "Public Key Infrastructure (PKI)",
        definition: "System of CAs, certificates, registration authorities, and revocation that binds public keys to identities. Enables scalable trust for TLS, email, and code signing.",
        example: "Browser trusts hundreds of root CAs; site cert chains to one for padlock icon.",
        points: ["17-class pki.pptx; 18-enc-3.html.", "X.509 standard format.", "Trust hierarchy vs PGP web of trust."]
    },
    {
        id: "term-ca",
        category: "PKI & PGP",
        term: "Certificate Authority (CA)",
        definition: "Trusted organisation that verifies identity and issues digital certificates binding a public key to a distinguished name. CAs sign certs with their private key; clients trust roots in trust stores.",
        example: "Let's Encrypt CA issues free TLS certs after proving domain control.",
        points: ["18-enc-3: CA verifies applicant identity.", "Compromise of CA affects entire ecosystem.", "Private CAs used inside enterprises."]
    },
    {
        id: "term-x509",
        category: "PKI & PGP",
        term: "X.509 Certificate",
        definition: "Standard format containing public key, subject name, issuer, validity dates, serial number, extensions, and CA signature. Used in TLS, S/MIME, and VPN authentication.",
        example: "Click padlock in browser → view certificate details and chain to root CA.",
        points: ["18-enc-3 Certificate Authority section.", "Expired or wrong-name certs cause warnings.", "Revocation via CRL or OCSP."]
    },
    {
        id: "term-pgp",
        category: "PKI & PGP",
        term: "PGP / GnuPG (GPG)",
        definition: "Pretty Good Privacy and open-source GNU variant for encrypting/signing email and files. Uses hybrid encryption, web of trust or key signing, and key servers. Contrasts with hierarchical PKI.",
        example: "Researcher signs public key at conference; colleagues sign it—web of trust grows.",
        points: ["Introduction to Certificates and PGP htm; Study Notes module 14.", "CSY3062_PGP_GPG_questions.docx.", "Circle of trust vs CA hierarchy."]
    },
    {
        id: "term-web-of-trust",
        category: "PKI & PGP",
        term: "Web of Trust (PGP)",
        definition: "Decentralised trust model where users sign each other's keys to attest identity. Contrast with X.509 where a few CAs are trusted globally. Flexible but harder to scale for general public web.",
        example: "You trust Alice's signature on Bob's key, so you trust Bob's key for email.",
        points: ["17-class pki.pptx: PGP key dist vs CA.", "Key servers distribute public keys.", "Know when PKI vs PGP fits scenario questions."]
    },
    // —— Malware ——
    {
        id: "term-malicious-code",
        category: "Malware & Threats",
        term: "Malicious Code",
        definition: "Software designed to cause adverse effects: modify/destroy data, steal information, allow unauthorised access, or damage systems. Broad category including viruses, worms, trojans, logic bombs, and ransomware.",
        example: "Employee runs fake invoice.exe that installs spyware—malicious code category.",
        points: ["17-MaliciousCode.pptx objectives.", "Independent vs host-dependent types.", "Layered defences: AV, EDR, training, backups."]
    },
    {
        id: "term-virus",
        category: "Malware & Threats",
        term: "Computer Virus",
        definition: "Code fragment embedded in a host program; becomes active when host runs and replicates to other programs. Four phases often taught: dormant, propagation, triggering, execution.",
        example: "Macro virus in Word document spreads when recipients open and enable macros.",
        points: ["Needs host program (not independent).", "malicious software-Notes.pdf.", "CSY3062_malware_questions.docx scenarios."]
    },
    {
        id: "term-worm",
        category: "Malware & Threats",
        term: "Worm",
        definition: "Self-contained malware that replicates across networks without user opening a host file. Spreads automatically exploiting vulnerabilities (e.g. WannaCry, Morris worm).",
        example: "Worm scans Internet for vulnerable SMB port and installs itself on thousands of hosts per hour.",
        points: ["Independent malicious code category.", "Network segmentation limits spread.", "Patch management critical."]
    },
    {
        id: "term-trojan",
        category: "Malware & Threats",
        term: "Trojan Horse",
        definition: "Malware disguised as legitimate software. User installs it willingly; it then performs malicious actions (backdoor, credential theft). Does not self-replicate like a worm.",
        example: "Free 'game crack' that also installs keylogger.",
        points: ["Social engineering often delivers trojans.", "Differs from virus (no host replication focus).", "Application whitelisting helps."]
    },
    {
        id: "term-logic-bomb",
        category: "Malware & Threats",
        term: "Logic Bomb",
        definition: "Malicious code embedded in a program that triggers on a condition (date, user action, file deletion). Often insider threat—planted before leaving organisation.",
        example: "Payroll system deletes records if disgruntled employee's name removed from HR DB.",
        points: ["17-MaliciousCode: parts of malicious software.", "Code review and separation of duties.", "Backups and logging for recovery."]
    },
    {
        id: "term-ransomware",
        category: "Malware & Threats",
        term: "Ransomware",
        definition: "Malware that encrypts or locks data/systems and demands payment for restoration. Often spreads via phishing or exposed RDP. NIST case study module covers prevention and recovery.",
        example: "Hospital systems encrypted; attackers demand Bitcoin for decryption key.",
        points: ["Study Notes module 4 NIST case.", "Backups offline + incident response.", "Paying ransom does not guarantee recovery."]
    },
    {
        id: "term-rootkit",
        category: "Malware & Threats",
        term: "Rootkit",
        definition: "Malware that hides deep in OS (kernel/firmware) to maintain access and evade detection. Can subvert antivirus and logging.",
        example: "Attacker installs rootkit so 'dir' command does not show backdoor files.",
        points: ["Study Notes malware module.", "Rebuild from trusted media if infected.", "Secure boot and integrity monitoring help."]
    },
    {
        id: "term-botnet",
        category: "Malware & Threats",
        term: "Zombie / Botnet",
        definition: "Compromised machine (zombie) controlled remotely; many zombies form a botnet used for DDoS, spam, or credential stuffing. Command-and-control (C2) servers coordinate bots.",
        example: "Home router infected; joins botnet firing traffic at victim during DDoS.",
        points: ["17-MaliciousCode: zombies.", "Egress filtering blocks C2 callbacks.", "Change default credentials on IoT devices."]
    },
    // —— VPN & Network ——
    {
        id: "term-vpn",
        category: "VPN & Network Security",
        term: "Virtual Private Network (VPN)",
        definition: "Creates secure tunnel over public Internet so remote devices appear on a private network. Provides confidentiality and integrity for traffic between endpoints using protocols like IPsec or SSL/TLS.",
        example: "Staff laptop VPNs to office; accesses internal file server as if on LAN.",
        points: ["What is a VPN.docx; 43-VPN Concept.pptx.", "Privacy + integrity from source to destination.", "Not a substitute for endpoint security."]
    },
    {
        id: "term-ipsec",
        category: "VPN & Network Security",
        term: "IPsec",
        definition: "Suite of protocols (AH, ESP, IKE) providing encryption and authentication at IP layer. Used for site-to-site and remote-access VPNs. Encrypts payloads (confidentiality) and uses hashes (integrity).",
        example: "Two branch routers build IPsec tunnel over Internet replacing expensive leased line.",
        points: ["4-S2S-IPSecVPN-Tunnel-Router.pptx.", "MD5/SHA mentioned in VPN slides—prefer SHA-256 today.", "50-IPSec-Troubleshooting.pptx for labs."]
    },
    {
        id: "term-site-to-site",
        category: "VPN & Network Security",
        term: "Site-to-Site vs Remote-Access VPN",
        definition: "Site-to-site connects whole networks (routers/firewalls). Remote-access connects individual user devices to corporate network. Both use tunnels; policy and authentication differ.",
        example: "HQ and warehouse linked site-to-site; travelling sales rep uses remote-access SSL VPN.",
        points: ["49-Site2Site-Client-Theory ppt.", "Cost saving vs dedicated WAN.", "MFA on remote-access essential."]
    },
    {
        id: "term-arp-poisoning",
        category: "Network Attacks",
        term: "ARP Poisoning / Spoofing",
        definition: "Attacker sends fake ARP replies mapping victim's IP to attacker's MAC, redirecting LAN traffic for MITM. Local attack—perimeter firewall does not stop it.",
        example: "On office Wi‑Fi, attacker ARP-poisons gateway and reads unencrypted traffic.",
        points: ["16-ARP Poising or Spoofing Attack.pptx.", "Use HTTPS, 802.1X, dynamic ARP inspection on switches.", "Segment guest and corporate LANs."]
    },
    {
        id: "term-mac-flooding",
        category: "Network Attacks",
        term: "MAC Flooding Attack",
        definition: "Flooding switch CAM table with fake MAC addresses causes switch to fail open like a hub, allowing sniffing of other ports' traffic. Targets LAN switches, not Internet perimeter.",
        example: "Attacker tool sends thousands of random MACs; switch broadcasts traffic to all ports.",
        points: ["18-MAC Flooding Attack.pptx.", "Port security limits MACs per port.", "Monitor for CAM table exhaustion."]
    },
    // —— Pen Testing ——
    {
        id: "term-pentest",
        category: "Ethical Hacking & Pen Testing",
        term: "Penetration Test",
        definition: "Authorised simulated attack on systems/networks/apps to find exploitable weaknesses before criminals do. Includes reconnaissance, scanning, exploitation attempt, and reporting. Can be manual or tool-assisted.",
        example: "Company hires testers; they find open S3 bucket and report fix before data leak.",
        points: ["16 penetration test vs vulnerability assessment.pptx.", "Legal authorisation required.", "Tester reports findings; may not fix them."]
    },
    {
        id: "term-vuln-assessment",
        category: "Ethical Hacking & Pen Testing",
        term: "Vulnerability Assessment",
        definition: "Systematic scan/review to find vulnerabilities and misconfigurations. Typically broader and more automated than pen test; prioritises patching. Less focus on successful exploitation chains.",
        example: "Weekly Nessus scan lists missing patches; IT prioritises Critical CVEs.",
        points: ["Contrast: pen test proves exploit path.", "VA finds weaknesses; pen test demonstrates impact.", "Both support compliance baselines."]
    },
    {
        id: "term-ethical-hacking",
        category: "Ethical Hacking & Pen Testing",
        term: "Ethical Hacking",
        definition: "Skilled security testing with permission and rules of engagement. Ethical hackers may perform penetration tests or broader security tests including policy review. Requires experience in scripting (Python, Perl, etc.).",
        example: "Bank's red team tests phishing resilience with written scope and stop conditions.",
        points: ["CSY3062-Ethical Hacking ppt.", "16-2 Ethical Hacking overview.", "Years of study—not one module only.", "metasploit_lab4_guide.docx for labs."]
    },
    {
        id: "term-recon",
        category: "Ethical Hacking & Pen Testing",
        term: "Reconnaissance & Port Scanning",
        definition: "First pen-test phases: gather information about target (DNS, employees, tech stack) then scan for open ports and services. Identifies entry points before exploitation.",
        example: "nmap shows port 22 SSH and 443 HTTPS open; tester checks SSH version for known CVE.",
        points: ["Pen test process in course slides.", "Defence: minimise exposed services.", "Log and alert on scans where possible."]
    },
    // —— Web / Email / DB ——
    {
        id: "term-sqli",
        category: "Web, Email & Database Security",
        term: "SQL Injection (SQLi)",
        definition: "Attacker inserts malicious SQL in input fields; poorly sanitised apps execute it against the database. Can read, modify, or delete data and sometimes run OS commands.",
        example: "Login form username: `admin' OR '1'='1` bypasses authentication.",
        points: ["Study Notes OWASP module; extra Web Security PDF.", "Defence: parameterised queries, least privilege DB accounts.", "WAF helps but secure coding is primary."]
    },
    {
        id: "term-xss",
        category: "Web, Email & Database Security",
        term: "Cross-Site Scripting (XSS)",
        definition: "Attacker injects script into web pages viewed by other users. Stored, reflected, or DOM-based. Steals cookies, defaces sites, or redirects to phishing.",
        example: "Forum post contains script that steals session cookie of anyone who views the post.",
        points: ["OWASP top risk.", "Encode output, Content-Security-Policy, HttpOnly cookies.", "Input validation alone insufficient."]
    },
    {
        id: "term-phishing-email",
        category: "Web, Email & Database Security",
        term: "Phishing & Email Security",
        definition: "Phishing uses fake emails/sites to steal credentials. Defences: user training, SPF/DKIM/DMARC, filtering, and MFA. Email security module covers protocols and threats.",
        example: "Fake 'HR bonus' link leads to credential harvest page mimicking Microsoft login.",
        points: ["extra 8-Web-Security-and-Email-Security.pdf.", "Technical + human controls.", "Report and simulate phishing tests."]
    },
    {
        id: "term-db-security",
        category: "Web, Email & Database Security",
        term: "Database Security",
        definition: "Protecting DBMS: access control, encryption at rest/in transit, auditing, patching, and preventing injection. Firewalls segment DB from Internet; apps use least-privilege DB accounts.",
        example: "Web app uses read-only DB user for queries; admin account not used by application code.",
        points: ["extra 9-Database-Security.pdf.", "Backup encryption and access logs.", "Separate DB VLAN in DMZ designs."]
    },
    // —— Wi-Fi ——
    {
        id: "term-wifi-threats",
        category: "Wi-Fi Security",
        term: "Wi-Fi Security Threats",
        definition: "Wireless risks: signal spillage outside buildings, attacks below Layer 3, rogue APs, evil twins, weak encryption. Wired firewalls and IDS do not fully protect Wi‑Fi—need WPA3, 802.1X, WIDS.",
        example: "Attacker sets 'Free_Cafe_WiFi' evil twin; users connect and credentials are stolen.",
        points: ["DSCI_Seminar.pdf; Top 10 WiFi Vulnerabilities.docx.", "Disable SSID broadcast alone is weak security.", "Enterprise: WPA3-Enterprise + certificate auth."]
    },
    {
        id: "term-wpa",
        category: "Wi-Fi Security",
        term: "WPA2 / WPA3",
        definition: "Wi-Fi Protected Access protocols encrypt wireless traffic. WPA2 (PSK or Enterprise) replaced WEP; WPA3 improves handshake and SAE for passwords. Use strong passphrases or 802.1X certificates.",
        example: "Home router WPA3-Personal; corporate uses WPA3-Enterprise with RADIUS.",
        points: ["Never use WEP.", "Change default router PIN/admin password.", "Segment IoT on separate SSID/VLAN."]
    },
    // —— OS Hardening ——
    {
        id: "term-os-hardening",
        category: "OS Hardening & Endpoint",
        term: "OS Hardening",
        definition: "Reducing attack surface: remove unused services, apply patches, enforce strong auth, enable logging, configure host firewall, encrypt disks, and follow benchmarks (CIS).",
        example: "Server: disable Telnet, enable auditd, separate /tmp with noexec—CIS RHEL Level 1.",
        points: ["CIS_RHEL docx; Windows_10 / Windows_server docx.", "Study Notes module 13.", "Hardening is continuous, not one-time."]
    },
    {
        id: "term-cis-benchmark",
        category: "OS Hardening & Endpoint",
        term: "CIS Benchmark",
        definition: "Center for Internet Security configuration guides (Level 1 = essential, Level 2 = defence in depth) for OS, browsers, cloud. Provides checklist controls aligned to compliance.",
        example: "Windows 10 guide: password length ≥14, lockout policy, Defender, BitLocker.",
        points: ["CIS_RHEL_Level_1_Baseline_Overview.docx.", "nodev, nosuid, noexec mount options.", "Auditd and firewall enabled."]
    },
    {
        id: "term-bitlocker-defender",
        category: "OS Hardening & Endpoint",
        term: "BitLocker & Endpoint Protection",
        definition: "BitLocker encrypts Windows volumes at rest. Microsoft Defender provides antivirus/anti-malware and firewall integration. Part of layered endpoint security with patching and user rights.",
        example: "Laptop stolen; BitLocker prevents thief reading disk without TPM PIN/key.",
        points: ["Windows_10.docx hardening sections.", "Combine with backup and MFA.", "Server 2022 docx for datacentre controls."]
    }
];

window.terminologyExtendedEntries = terminologyExtendedEntries;
