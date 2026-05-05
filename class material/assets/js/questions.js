// Comprehensive TCA-Style Question Bank
// Anti-Bias Rules Applied: 
// 1. All options are roughly the same word count (±2 words)
// 2. Correct answers are randomly distributed across indices (0, 1, 2, 3)
// 3. Plausible distractors using correct terminology

const tcaQuestions = [
    // --- MODULE 1: Security Fundamentals ---
    {
        id: "mod1-1",
        module: "1. Security Fundamentals",
        difficulty: "hard",
        question: "Within the context of the CIA Triad, which mechanism primarily ensures the 'Integrity' of a transmitted message across an insecure network?",
        options: [
            "Applying asymmetric encryption to the payload",
            "Calculating and verifying a cryptographic hash",
            "Implementing strict role-based access control",
            "Utilizing redundant physical network pathways"
        ],
        correctAnswer: 1,
        explanation: "Integrity ensures data has not been altered. A cryptographic hash (like SHA-256) allows the receiver to verify that the payload remains exactly as it was when transmitted. Encryption provides confidentiality, not integrity."
    },
    {
        id: "mod1-2",
        module: "1. Security Fundamentals",
        difficulty: "hard",
        question: "Which of the following scenarios best demonstrates a failure of the 'Availability' principle rather than Confidentiality or Integrity?",
        options: [
            "An unauthorized user exfiltrates customer records",
            "A database backup is secretly modified offline",
            "A distributed denial of service exhausts bandwidth",
            "A phishing attack compromises administrative credentials"
        ],
        correctAnswer: 2,
        explanation: "Availability ensures resources are accessible when needed. A DDoS attack exhausts bandwidth or resources, rendering the service unavailable to legitimate users without necessarily stealing or altering data."
    },
    {
        id: "mod1-3",
        module: "1. Security Fundamentals",
        difficulty: "hard",
        question: "In threat modeling, what distinguishes an 'Insider Threat' from a traditional external threat actor?",
        options: [
            "They utilize more advanced persistent attack tools",
            "They exclusively target intellectual property data",
            "They operate from outside the primary firewall",
            "They already possess legitimate system access privileges"
        ],
        correctAnswer: 3,
        explanation: "The defining characteristic of an insider threat is that the actor already possesses authorized access to the network or systems, making perimeter defenses like firewalls ineffective against them."
    },
    {
        id: "mod1-4",
        module: "1. Security Fundamentals",
        difficulty: "hard",
        question: "When assessing risk, what is the fundamental relationship between Threats, Vulnerabilities, and Risk?",
        options: [
            "Risk exists when a threat exploits a vulnerability",
            "Threats exist only when vulnerabilities are present",
            "Vulnerabilities automatically generate critical threats",
            "Risk is eliminated when threats are fully identified"
        ],
        correctAnswer: 0,
        explanation: "Risk is the potential for loss or damage when a threat exploits a vulnerability. Without a vulnerability, a threat poses no risk. Without a threat, a vulnerability poses no risk."
    },
    {
        id: "mod1-5",
        module: "1. Security Fundamentals",
        difficulty: "hard",
        question: "Which access control model relies primarily on security labels applied to objects and clearance levels assigned to subjects?",
        options: [
            "Discretionary Access Control (DAC)",
            "Role-Based Access Control (RBAC)",
            "Mandatory Access Control (MAC)",
            "Attribute-Based Access Control (ABAC)"
        ],
        correctAnswer: 2,
        explanation: "Mandatory Access Control (MAC) uses strict security labels (e.g., Secret, Top Secret) and user clearances. The system strictly enforces access, unlike DAC where the owner decides."
    },

    // --- MODULE 2: Security Frameworks (NIST CSF, ISO 27001) ---
    {
        id: "mod2-1",
        module: "2. Security Frameworks",
        difficulty: "hard",
        question: "In the updated NIST Cybersecurity Framework (CSF) 2.0, what is the primary purpose of the newly introduced 'GOVERN' function?",
        options: [
            "To automate the deployment of security patches",
            "To establish organizational strategy and cyber culture",
            "To detect anomalous network traffic in real-time",
            "To isolate compromised systems during an incident"
        ],
        correctAnswer: 1,
        explanation: "The 'GOVERN' function was added to CSF 2.0 to emphasize that cybersecurity is a major enterprise risk. It establishes strategy, policies, oversight, and a culture of security driven by leadership."
    },
    {
        id: "mod2-2",
        module: "2. Security Frameworks",
        difficulty: "hard",
        question: "According to ISO/IEC 27001, an Information Security Management System (ISMS) must inherently adopt which fundamental process methodology?",
        options: [
            "The Agile Software Development Lifecycle",
            "The Plan-Do-Check-Act continual improvement cycle",
            "The Zero-Trust Network Architecture paradigm",
            "The MITRE ATT&CK adversarial tactic matrix"
        ],
        correctAnswer: 1,
        explanation: "ISO 27001 is heavily based on the Plan-Do-Check-Act (PDCA) cycle, ensuring that the ISMS is constantly monitored, evaluated, and improved over time rather than being a static set of rules."
    },
    {
        id: "mod2-3",
        module: "2. Security Frameworks",
        difficulty: "hard",
        question: "How do 'Implementation Tiers' differ from 'Profiles' within the NIST Cybersecurity Framework?",
        options: [
            "Tiers define specific tools; Profiles define general policies",
            "Tiers measure maturity level; Profiles align with business needs",
            "Tiers are mandatory regulations; Profiles are voluntary guidelines",
            "Tiers identify network assets; Profiles monitor user behavior"
        ],
        correctAnswer: 1,
        explanation: "Tiers (1-4) measure how well an organization manages cyber risk (maturity/capability). Profiles compare a 'Current' state of controls against a 'Target' state aligned with specific business requirements."
    },
    {
        id: "mod2-4",
        module: "2. Security Frameworks",
        difficulty: "hard",
        question: "Which NIST CSF core function directly involves implementing offline, immutable backups to safeguard critical operational data?",
        options: [
            "The 'Identify' core function",
            "The 'Detect' core function",
            "The 'Protect' core function",
            "The 'Respond' core function"
        ],
        correctAnswer: 2,
        explanation: "Implementing safeguards like backups, encryption, and access controls falls under the 'Protect' function, as these measures limit or contain the impact of a potential cybersecurity event."
    },
    {
        id: "mod2-5",
        module: "2. Security Frameworks",
        difficulty: "hard",
        question: "What is the primary distinguishing factor of the Payment Card Industry Data Security Standard (PCI DSS) compared to NIST CSF?",
        options: [
            "PCI DSS is a voluntary guideline for federal agencies",
            "PCI DSS focuses exclusively on cloud infrastructure",
            "PCI DSS mandates specific prescriptive technical controls",
            "PCI DSS ignores physical security requirements entirely"
        ],
        correctAnswer: 2,
        explanation: "Unlike NIST CSF which is outcome-based and flexible, PCI DSS is highly prescriptive, mandating specific technical controls (e.g., firewall configurations, password lengths) for handling credit card data."
    },

    // --- MODULE 3: Cryptography - Symmetric ---
    {
        id: "mod3-1",
        module: "3. Symmetric Cryptography",
        difficulty: "hard",
        question: "In symmetric block ciphers, what critical vulnerability arises when using the Electronic Codebook (ECB) mode of operation?",
        options: [
            "It requires significantly more processing overhead",
            "Identical plaintext blocks produce identical ciphertext blocks",
            "It is highly susceptible to brute-force key exhaustion",
            "Initialization vectors must be securely transmitted offline"
        ],
        correctAnswer: 1,
        explanation: "ECB mode encrypts identical plaintext blocks into identical ciphertext blocks. This preserves data patterns (like the famous ECB encrypted bitmap image), making it vulnerable to pattern analysis."
    },
    {
        id: "mod3-2",
        module: "3. Symmetric Cryptography",
        difficulty: "hard",
        question: "Which mathematical operation forms the foundation of the Advanced Encryption Standard (AES) substitution-permutation network?",
        options: [
            "Factoring massive composite prime numbers",
            "Calculating discrete logarithms over finite fields",
            "Applying successive rounds of Galois field operations",
            "Generating elliptic curve point multiplication sequences"
        ],
        correctAnswer: 2,
        explanation: "AES is based on a substitution-permutation network that uses finite field arithmetic (specifically Galois Field GF(2^8)) for its operations like SubBytes and MixColumns, unlike RSA which uses prime factoring."
    },
    {
        id: "mod3-3",
        module: "3. Symmetric Cryptography",
        difficulty: "hard",
        question: "Why was the Data Encryption Standard (DES) officially replaced by AES as the federal government standard?",
        options: [
            "The 56-bit key length became vulnerable to brute-force attacks",
            "The algorithm contained a deliberate cryptographic backdoor",
            "The block size was too large for efficient hardware processing",
            "The standard required asymmetric key distribution methods"
        ],
        correctAnswer: 0,
        explanation: "DES uses a 56-bit key, which became susceptible to brute-force exhaustion attacks as computing power increased (e.g., EFF's Deep Crack). AES was chosen to provide larger key sizes (128, 192, 256 bits)."
    },
    {
        id: "mod3-4",
        module: "3. Symmetric Cryptography",
        difficulty: "hard",
        question: "In the historical Playfair cipher, how are duplicate letters residing in the same digraph handled during encryption?",
        options: [
            "They are encrypted using their standard alphabetical offset",
            "They are replaced entirely by a randomized alphanumeric character",
            "They are separated by inserting a predetermined filler letter",
            "They are skipped completely to maintain cryptographic entropy"
        ],
        correctAnswer: 2,
        explanation: "The Playfair cipher operates on digraphs (pairs of letters). If a pair consists of the same letter (e.g., 'EE'), a filler letter (usually 'X' or 'Q') is inserted to separate them before encryption."
    },

    // --- MODULE 4: Cryptography - Asymmetric & PKI ---
    {
        id: "mod4-1",
        module: "4. Asymmetric Cryptography & PKI",
        difficulty: "hard",
        question: "What fundamental mathematical difficulty provides the primary security guarantee for the RSA public-key cryptosystem?",
        options: [
            "The difficulty of factoring the product of two large prime numbers",
            "The difficulty of solving discrete logarithms in a finite field",
            "The difficulty of finding collisions within cryptographic hash functions",
            "The difficulty of predicting pseudo-random initialization vectors"
        ],
        correctAnswer: 0,
        explanation: "RSA's security relies on the practical difficulty of integer factorization. While it is easy to multiply two large prime numbers together, it is computationally infeasible to factor the resulting product back into its prime components."
    },
    {
        id: "mod4-2",
        module: "4. Asymmetric Cryptography & PKI",
        difficulty: "hard",
        question: "In a Public Key Infrastructure (PKI), what is the definitive purpose of a Certificate Revocation List (CRL)?",
        options: [
            "To publish the private keys of compromised corporate administrators",
            "To securely distribute new root certificates to offline endpoints",
            "To maintain a verifiable record of invalidated digital certificates",
            "To negotiate symmetric session keys during TLS handshakes"
        ],
        correctAnswer: 2,
        explanation: "A CRL is a list maintained by a Certificate Authority (CA) that contains the serial numbers of digital certificates that have been revoked before their expiration date (e.g., due to a compromised private key)."
    },
    {
        id: "mod4-3",
        module: "4. Asymmetric Cryptography & PKI",
        difficulty: "hard",
        question: "When Bob wants to send a confidential, encrypted message to Alice using asymmetric cryptography, which key must Bob use?",
        options: [
            "Bob must encrypt the message using Bob's private key",
            "Bob must encrypt the message using Bob's public key",
            "Bob must encrypt the message using Alice's private key",
            "Bob must encrypt the message using Alice's public key"
        ],
        correctAnswer: 3,
        explanation: "For confidentiality, the sender (Bob) encrypts the message using the recipient's (Alice's) public key. Only Alice possesses the corresponding private key required to decrypt the message."
    },
    {
        id: "mod4-4",
        module: "4. Asymmetric Cryptography & PKI",
        difficulty: "hard",
        question: "How does the Diffie-Hellman algorithm fundamentally differ from the RSA algorithm in cryptographic implementations?",
        options: [
            "Diffie-Hellman only provides secure key exchange, not encryption",
            "Diffie-Hellman utilizes symmetric keys for initial authentication",
            "Diffie-Hellman depends on the factorization of large primes",
            "Diffie-Hellman requires a centralized Certificate Authority"
        ],
        correctAnswer: 0,
        explanation: "Diffie-Hellman is purely a key exchange protocol allowing two parties to establish a shared symmetric secret over an insecure channel. Unlike RSA, DH cannot be directly used to encrypt arbitrary data payloads."
    },

    // --- MODULE 5: Hashing & Digital Signatures ---
    {
        id: "mod5-1",
        module: "5. Hashing & Digital Signatures",
        difficulty: "hard",
        question: "What critical property of a cryptographic hash function ensures that it is computationally infeasible to find two different inputs that produce the same output?",
        options: [
            "Pre-image resistance guarantees against input discovery",
            "Collision resistance prevents identical output generation",
            "Deterministic output mapping ensures consistent digests",
            "Avalanche effect amplifies minor input modifications"
        ],
        correctAnswer: 1,
        explanation: "Collision resistance is the property that prevents attackers from finding any two distinct inputs (messages) that yield the exact same hash output, protecting against forged documents."
    },
    {
        id: "mod5-2",
        module: "5. Hashing & Digital Signatures",
        difficulty: "hard",
        question: "When applying a Digital Signature to a document, what exact data payload is encrypted using the sender's private key?",
        options: [
            "The entire plaintext document is encrypted sequentially",
            "A symmetric session key is encrypted for secure transit",
            "A cryptographic hash digest of the original document",
            "The recipient's public key certificate is digitally signed"
        ],
        correctAnswer: 2,
        explanation: "To create a digital signature efficiently, the sender first generates a hash digest of the document, and then encrypts ONLY that small hash digest using their private key. The recipient decrypts it with the sender's public key to verify."
    },
    {
        id: "mod5-3",
        module: "5. Hashing & Digital Signatures",
        difficulty: "hard",
        question: "Why is the MD5 hashing algorithm no longer recommended for verifying the integrity of security-critical digital certificates?",
        options: [
            "It generates hash outputs that are exceptionally large",
            "It is highly vulnerable to rapid collision generation attacks",
            "It requires specialized hardware for efficient processing",
            "It depends on symmetric encryption algorithms internally"
        ],
        correctAnswer: 1,
        explanation: "MD5 has been cryptographically broken. Researchers have demonstrated practical collision attacks where two different files can be generated that produce the exact same MD5 hash, making it useless for secure integrity checks."
    },
    {
        id: "mod5-4",
        module: "5. Hashing & Digital Signatures",
        difficulty: "hard",
        question: "Which cryptographic concept inherently provides 'Non-repudiation' during a secure digital transaction?",
        options: [
            "Digital Signatures generated with the sender's private key",
            "Symmetric payload encryption using the AES algorithm",
            "Cryptographic hashing utilizing the SHA-256 algorithm",
            "Initialization vectors combined with block cipher modes"
        ],
        correctAnswer: 0,
        explanation: "Non-repudiation ensures a sender cannot deny sending a message. Because a digital signature is created with the sender's private key (which only they possess), it proves cryptographic authorship."
    },

    // --- MODULE 6: Network Security & Firewalls ---
    {
        id: "mod6-1",
        module: "6. Network Security & Firewalls",
        difficulty: "hard",
        question: "How does a Stateful Packet Inspection (SPI) firewall differ functionally from a traditional Stateless Packet Filter?",
        options: [
            "It encrypts all outbound traffic using IPSec tunnels",
            "It maintains context of established active network connections",
            "It restricts access based purely on MAC address filtering",
            "It operates exclusively at the OSI Application layer"
        ],
        correctAnswer: 1,
        explanation: "Unlike stateless filters that inspect packets in isolation based on static rules, stateful firewalls maintain a state table. They track active connections and only allow inbound traffic that is a response to an established outbound request."
    },
    {
        id: "mod6-2",
        module: "6. Network Security & Firewalls",
        difficulty: "hard",
        question: "During an ARP Spoofing attack on a local network, what specific action does the malicious actor typically perform?",
        options: [
            "Overwhelming the target system with synchronized TCP packets",
            "Exploiting a vulnerability within the perimeter routing hardware",
            "Broadcasting falsified MAC addresses to intercept subnet traffic",
            "Injecting malicious SQL queries into backend web databases"
        ],
        correctAnswer: 2,
        explanation: "ARP Spoofing involves the attacker sending falsified ARP messages over a local area network. This links the attacker's MAC address with the IP address of a legitimate computer or gateway, allowing them to intercept traffic."
    },
    {
        id: "mod6-3",
        module: "6. Network Security & Firewalls",
        difficulty: "hard",
        question: "When implementing a Screened Subnet (DMZ) architecture, which traffic flow represents the highest security risk and is heavily restricted?",
        options: [
            "Inbound traffic flowing from the Internet to the DMZ servers",
            "Outbound traffic flowing from the Internal Network to the Internet",
            "Inbound traffic flowing from the DMZ to the Internal Network",
            "Outbound traffic flowing from the Internal Network to the DMZ"
        ],
        correctAnswer: 2,
        explanation: "The DMZ hosts public-facing services (like web servers) which are highly susceptible to compromise. Therefore, traffic originating from the DMZ trying to reach the highly trusted Internal Network represents the highest risk and must be strictly blocked or heavily filtered."
    },
    {
        id: "mod6-4",
        module: "6. Network Security & Firewalls",
        difficulty: "hard",
        question: "In an IPSec VPN tunnel operating in 'Tunnel Mode', how is the original IP packet treated by the VPN gateway?",
        options: [
            "Only the data payload is encrypted; headers remain untouched",
            "The entire original packet is encrypted and given a new IP header",
            "The packet is digitally signed but transmitted without encryption",
            "Only the TCP segment header is compressed and encrypted securely"
        ],
        correctAnswer: 1,
        explanation: "In IPSec Tunnel Mode, the entire original IP packet (payload + original header) is encrypted, and a completely new IP header is added for routing over the public network. This hides the internal network topology."
    },

    // --- MODULE 7: Malware & Intrusion Detection ---
    {
        id: "mod7-1",
        module: "7. Malware & Intrusion Detection",
        difficulty: "hard",
        question: "What is the primary defining characteristic that distinguishes a Network Worm from a standard Computer Virus?",
        options: [
            "A worm relies on social engineering to infect end users",
            "A worm executes exclusively within isolated sandbox environments",
            "A worm requires a host file to execute its malicious payload",
            "A worm propagates autonomously across networks without user action"
        ],
        correctAnswer: 3,
        explanation: "While a virus requires a host program to be executed by a user, a worm is a standalone malicious program that actively scans for network vulnerabilities and replicates itself automatically without any human intervention."
    },
    {
        id: "mod7-2",
        module: "7. Malware & Intrusion Detection",
        difficulty: "hard",
        question: "How does a Heuristic Intrusion Detection System (IDS) identify potentially malicious activity on a corporate network?",
        options: [
            "By matching traffic against a database of known malware signatures",
            "By analyzing behavior patterns that deviate from established baselines",
            "By verifying the digital signatures of incoming executable files",
            "By restricting external IP addresses using static firewall rules"
        ],
        correctAnswer: 1,
        explanation: "Heuristic (or behavior-based) IDS establishes a baseline of normal network activity. It identifies threats by looking for anomalies or behaviors that deviate significantly from that baseline, allowing it to detect zero-day attacks."
    },
    {
        id: "mod7-3",
        module: "7. Malware & Intrusion Detection",
        difficulty: "hard",
        question: "Which of the following techniques is commonly utilized by a Rootkit to maintain persistent, undetected access?",
        options: [
            "Intercepting and altering operating system API calls dynamically",
            "Generating massive volumes of outbound network traffic rapidly",
            "Encrypting user documents and demanding immediate cryptocurrency payment",
            "Displaying intrusive pop-up advertisements within web browsers"
        ],
        correctAnswer: 0,
        explanation: "Rootkits operate at a deep system level (often the kernel). They maintain stealth by intercepting OS API calls, altering the data returned to anti-virus software to hide their own files, processes, and network connections."
    },

    // --- MODULE 8: Ethical Hacking & Vulnerabilities ---
    {
        id: "mod8-1",
        module: "8. Ethical Hacking & Pen Testing",
        difficulty: "hard",
        question: "In the methodology of Penetration Testing, what is the primary objective of the 'Reconnaissance' phase?",
        options: [
            "Exploiting a discovered vulnerability to gain system root access",
            "Gathering intelligence and mapping the target attack surface passively",
            "Erasing event logs to ensure the attack remains completely undetected",
            "Deploying a localized honeypot to observe network defender reactions"
        ],
        correctAnswer: 1,
        explanation: "Reconnaissance (or Footprinting) is the initial phase where the tester passively gathers information about the target (domain names, IP blocks, employee info) to map the attack surface before any active probing begins."
    },
    {
        id: "mod8-2",
        module: "8. Ethical Hacking & Pen Testing",
        difficulty: "hard",
        question: "How does a formal Vulnerability Assessment fundamentally differ from a full-scale Penetration Test?",
        options: [
            "An assessment strictly attempts to exploit and weaponize discovered flaws",
            "An assessment only utilizes highly automated open-source scanning tools",
            "An assessment identifies security gaps without actively exploiting them",
            "An assessment requires full administrative access to the target network"
        ],
        correctAnswer: 2,
        explanation: "A Vulnerability Assessment focuses on identifying and classifying security weaknesses (usually broad coverage). A Penetration Test goes a step further by actively exploiting those weaknesses to achieve a specific goal (depth coverage)."
    },
    {
        id: "mod8-3",
        module: "8. Ethical Hacking & Pen Testing",
        difficulty: "hard",
        question: "When utilizing the Metasploit Framework, what is the specific technical definition of a 'Payload'?",
        options: [
            "The module utilized to scan the network for active ports",
            "The malicious code executed on the target after successful exploitation",
            "The database configuration file holding historical scan results",
            "The vulnerability being actively targeted by the penetration tester"
        ],
        correctAnswer: 1,
        explanation: "In Metasploit, an 'Exploit' is the vehicle that breaches the system by taking advantage of a vulnerability. The 'Payload' is the actual code that runs on the target machine post-breach (e.g., opening a reverse shell)."
    },

    // --- MODULE 9: Web, Email, & DB Security ---
    {
        id: "mod9-1",
        module: "9. Web & Database Security",
        difficulty: "hard",
        question: "Which defensive programming technique is the most effective primary mitigation against SQL Injection (SQLi) attacks?",
        options: [
            "Implementing complex randomized password rotation policies",
            "Utilizing parameterized queries and prepared statements exclusively",
            "Encrypting the backend database using asymmetric algorithms",
            "Configuring a reverse proxy server for all inbound traffic"
        ],
        correctAnswer: 1,
        explanation: "Parameterized queries (prepared statements) ensure that the database treats user input strictly as data, never as executable SQL code. This neutralizes the core mechanism of an SQL injection attack."
    },
    {
        id: "mod9-2",
        module: "9. Web & Database Security",
        difficulty: "hard",
        question: "In a Stored Cross-Site Scripting (XSS) attack, where does the malicious JavaScript payload reside before execution?",
        options: [
            "It is temporarily stored within the victim's local browser cache",
            "It is embedded within the URL parameters of a phishing email",
            "It is persistently saved within the target application's backend database",
            "It is injected directly into the memory space of the web server"
        ],
        correctAnswer: 2,
        explanation: "Stored (Persistent) XSS occurs when a malicious script is injected into a database (e.g., via a forum post or comment). The server then permanently serves that malicious script to any user who views the affected page."
    },

    // --- MODULE 10: OS Hardening & Policies ---
    {
        id: "mod10-1",
        module: "10. OS Hardening",
        difficulty: "hard",
        question: "According to standard CIS (Center for Internet Security) baselines for RHEL Linux, why should the 'root' account login via SSH be disabled?",
        options: [
            "Because root accounts cannot be authenticated via public key infrastructure",
            "To force administrators to use individual accounts providing non-repudiation",
            "Because SSH protocol natively encrypts data using vulnerable legacy algorithms",
            "To prevent the firewall from inspecting encrypted administrative network traffic"
        ],
        correctAnswer: 1,
        explanation: "Disabling direct root login forces administrators to log in with their personal accounts and then escalate privileges (e.g., using `sudo`). This provides an audit trail tying specific administrative actions to individual human users."
    },
    {
        id: "mod10-2",
        module: "10. OS Hardening",
        difficulty: "hard",
        question: "When applying the Principle of Least Privilege during Windows Server hardening, what is the optimal configuration strategy?",
        options: [
            "Assigning all standard users to the local Administrator security group",
            "Granting users the exact minimal permissions required for their specific role",
            "Disabling all user accounts completely during non-business operational hours",
            "Removing all file system permissions and relying entirely on physical security"
        ],
        correctAnswer: 1,
        explanation: "The Principle of Least Privilege dictates that users, processes, and applications should only be granted the minimum level of access rights necessary to perform their legitimate functions, reducing the potential impact of a compromise."
    }
];

// Verify the questions array is available globally
window.tcaQuestions = tcaQuestions;
