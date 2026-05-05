// Part 2 of the TCA Question Bank - Massive expansion
const tcaQuestionsPart2 = [
    // --- MODULE 1: Security Fundamentals Expansion ---
    {
        id: "mod1-6",
        module: "1. Security Fundamentals",
        difficulty: "hard",
        question: "When evaluating the 'Confidentiality' aspect of the CIA triad, which cryptographic mechanism is typically prioritized over the others?",
        options: [
            "Advanced symmetric block encryption modes",
            "Cryptographically secure digital signatures",
            "High-speed hardware-based hash functions",
            "Non-repudiation logging audit mechanisms"
        ],
        correctAnswer: 0,
        explanation: "Confidentiality ensures that data is kept secret from unauthorized viewers. Encryption (especially strong symmetric block ciphers like AES) is the primary method for providing this secrecy."
    },
    {
        id: "mod1-7",
        module: "1. Security Fundamentals",
        difficulty: "hard",
        question: "A malicious actor leverages a Zero-Day vulnerability in a server OS. Within risk management, this represents an exploitation of a:",
        options: [
            "Known mitigating security control framework",
            "Previously undiscovered system vulnerability",
            "Documented administrative policy weakness",
            "Routine operational service availability"
        ],
        correctAnswer: 1,
        explanation: "A Zero-Day vulnerability is a flaw in software, hardware, or firmware that is unknown to the vendor. It is a 'previously undiscovered system vulnerability' exploited by a threat."
    },
    {
        id: "mod1-8",
        module: "1. Security Fundamentals",
        difficulty: "hard",
        question: "Which term accurately describes an entity that possesses the motivation and capability to attack an organization's network?",
        options: [
            "An exposed system vulnerability",
            "A calculated business risk level",
            "An active malicious threat actor",
            "A passive administrative control"
        ],
        correctAnswer: 2,
        explanation: "A threat actor (or agent) is the entity—whether a hacker, insider, or nation-state—that has the intent and capability to launch an attack."
    },
    {
        id: "mod1-9",
        module: "1. Security Fundamentals",
        difficulty: "hard",
        question: "In the context of physical security controls, what is the primary purpose of implementing a 'Mantrap' at a data center entrance?",
        options: [
            "To intercept inbound malicious network traffic",
            "To prevent unauthorized tailgating by individuals",
            "To encrypt data stored on physical hard drives",
            "To detect environmental hazards like fires quickly"
        ],
        correctAnswer: 1,
        explanation: "A mantrap is a small room with interlocking doors designed to ensure that only one authenticated person can pass through at a time, preventing tailgating."
    },
    {
        id: "mod1-10",
        module: "1. Security Fundamentals",
        difficulty: "hard",
        question: "When an organization adopts an 'Assume Breach' mindset, what operational change is most commonly implemented immediately?",
        options: [
            "Relaxing perimeter firewall security policies",
            "Enhancing internal lateral movement detection",
            "Outsourcing all IT operations to third parties",
            "Disabling complex password rotation mandates"
        ],
        correctAnswer: 1,
        explanation: "Assuming a breach means accepting that attackers will get past the perimeter. Therefore, focusing on detecting lateral movement within the network becomes paramount."
    },

    // --- MODULE 2: Security Frameworks Expansion ---
    {
        id: "mod2-6",
        module: "2. Security Frameworks",
        difficulty: "hard",
        question: "Under the NIST CSF 2.0 framework, conducting a 'Business Impact Analysis' (BIA) falls strictly under which core function?",
        options: [
            "The Protect core function",
            "The Respond core function",
            "The Identify core function",
            "The Detect core function"
        ],
        correctAnswer: 2,
        explanation: "The 'Identify' function involves understanding the business context, critical assets, and risks. A BIA is essential to identifying what systems are most critical."
    },
    {
        id: "mod2-7",
        module: "2. Security Frameworks",
        difficulty: "hard",
        question: "When referencing ISO/IEC 27001 compliance, what does the required 'Statement of Applicability' (SoA) specifically document for auditors?",
        options: [
            "The exact cost of all installed security software",
            "Which Annex A controls are implemented and why",
            "The names of all employees with administrative rights",
            "A timeline for recovering from a ransomware attack"
        ],
        correctAnswer: 1,
        explanation: "The Statement of Applicability (SoA) lists all the security controls from ISO 27001 Annex A, stating which ones are applicable, which are excluded, and the justification for both."
    },
    {
        id: "mod2-8",
        module: "2. Security Frameworks",
        difficulty: "hard",
        question: "In the context of the NIST Cybersecurity Framework, an organization classified at 'Tier 4: Adaptive' primarily exhibits what characteristic?",
        options: [
            "Cybersecurity practices are highly reactive to incidents",
            "Cybersecurity relies entirely on outsourced managed services",
            "Cybersecurity practices adapt based on advanced threat intelligence",
            "Cybersecurity processes are informal but generally effective"
        ],
        correctAnswer: 2,
        explanation: "Tier 4 (Adaptive) indicates an organization that continuously improves its cybersecurity posture by utilizing advanced predictive threat intelligence and agile risk management processes."
    },
    {
        id: "mod2-9",
        module: "2. Security Frameworks",
        difficulty: "hard",
        question: "What is the key structural difference between COBIT and the NIST Cybersecurity Framework (CSF)?",
        options: [
            "COBIT focuses exclusively on specific encryption algorithms",
            "COBIT is a broader IT governance and management framework",
            "COBIT only applies to organizations in the healthcare sector",
            "COBIT strictly regulates physical data center environmental controls"
        ],
        correctAnswer: 1,
        explanation: "While NIST CSF is strictly focused on cybersecurity risk, COBIT (Control Objectives for Information and Related Technologies) is a comprehensive framework for the governance and management of enterprise IT as a whole."
    },
    {
        id: "mod2-10",
        module: "2. Security Frameworks",
        difficulty: "hard",
        question: "Within the CIS (Center for Internet Security) Critical Security Controls, what is fundamentally emphasized in Control Number 1?",
        options: [
            "Implementing multi-factor authentication for all users",
            "Inventory and control of all enterprise hardware assets",
            "Continuous automated vulnerability scanning across networks",
            "Securing configurations for network devices like routers"
        ],
        correctAnswer: 1,
        explanation: "CIS Control 1 is 'Inventory and Control of Enterprise Assets'. You cannot protect what you don't know you have. Establishing a hardware inventory is the foundational step in security."
    },

    // --- MODULE 3: Cryptography - Symmetric Expansion ---
    {
        id: "mod3-5",
        module: "3. Symmetric Cryptography",
        difficulty: "hard",
        question: "Which cryptographic principle ensures that a minor change in the plaintext drastically alters the resulting ciphertext output?",
        options: [
            "The principle of cryptographic non-repudiation",
            "The cryptographic avalanche effect property",
            "The mathematical discrete logarithm problem",
            "The asymmetric key encapsulation mechanism"
        ],
        correctAnswer: 1,
        explanation: "The avalanche effect is a desirable property in cryptography where a small change in the input (even one bit) results in a massive, seemingly random change in the output ciphertext or hash."
    },
    {
        id: "mod3-6",
        module: "3. Symmetric Cryptography",
        difficulty: "hard",
        question: "When utilizing Advanced Encryption Standard (AES) in Counter (CTR) mode, what critical requirement exists for the cryptographic counter?",
        options: [
            "It must be derived using an asymmetric private key",
            "It must never be reused with the identical symmetric key",
            "It must consist entirely of randomized alphabetic characters",
            "It must be transmitted out-of-band via secure physical means"
        ],
        correctAnswer: 1,
        explanation: "In CTR mode, the counter acts as a nonce. If the same counter value is used twice with the same encryption key, it produces the same keystream, completely compromising the encryption (the 'two-time pad' vulnerability)."
    },
    {
        id: "mod3-7",
        module: "3. Symmetric Cryptography",
        difficulty: "hard",
        question: "In the context of classical cryptography, what specifically makes the 'One-Time Pad' theoretically unbreakable by any adversary?",
        options: [
            "The key is mathematically derived from large prime numbers",
            "The key is completely random, used once, and kept secret",
            "The algorithm utilizes complex substitution-permutation networks",
            "The ciphertext is transmitted over a highly secure physical wire"
        ],
        correctAnswer: 1,
        explanation: "A One-Time Pad is mathematically unbreakable (providing perfect secrecy) as long as the key is truly random, is at least as long as the plaintext, is never reused, and is kept completely secret."
    },
    {
        id: "mod3-8",
        module: "3. Symmetric Cryptography",
        difficulty: "hard",
        question: "How does the Triple DES (3DES) algorithm improve upon the original DES algorithm's security posture?",
        options: [
            "It replaces the symmetric key with an asymmetric key pair",
            "It runs the data through the DES algorithm three distinct times",
            "It increases the underlying block size from 64 to 128 bits",
            "It utilizes a complex elliptic curve mathematical foundation"
        ],
        correctAnswer: 1,
        explanation: "3DES applies the original 56-bit DES algorithm three times in succession (usually Encrypt-Decrypt-Encrypt) using two or three different keys to increase the effective key length and resist brute-force attacks."
    },
    {
        id: "mod3-9",
        module: "3. Symmetric Cryptography",
        difficulty: "hard",
        question: "What is the primary function of an 'Initialization Vector' (IV) when utilized in modern symmetric block cipher modes like CBC?",
        options: [
            "To dramatically increase the computational speed of encryption",
            "To authenticate the identity of the sender communicating the data",
            "To ensure identical plaintexts encrypt into distinct unique ciphertexts",
            "To automatically rotate the symmetric encryption key periodically"
        ],
        correctAnswer: 2,
        explanation: "An IV introduces randomness into the encryption process. By combining the IV with the first block of plaintext (as in Cipher Block Chaining), it guarantees that identical messages encrypted with the same key produce different ciphertexts."
    },

    // --- MODULE 4: Cryptography - Asymmetric & PKI Expansion ---
    {
        id: "mod4-5",
        module: "4. Asymmetric Cryptography & PKI",
        difficulty: "hard",
        question: "During a secure TLS handshake protocol, how is asymmetric cryptography typically integrated into the communication process?",
        options: [
            "It encrypts the entire bulk data stream during the session",
            "It is used exclusively to exchange symmetric session keys",
            "It verifies the integrity of the underlying hardware components",
            "It securely stores password hashes within the server database"
        ],
        correctAnswer: 1,
        explanation: "Because asymmetric encryption is computationally expensive, TLS uses it primarily during the handshake to authenticate the server and securely exchange a much faster symmetric 'session key', which is then used for the bulk data transfer."
    },
    {
        id: "mod4-6",
        module: "4. Asymmetric Cryptography & PKI",
        difficulty: "hard",
        question: "Within the X.509 digital certificate standard, what specific entity's digital signature guarantees the authenticity of the certificate itself?",
        options: [
            "The client machine requesting the secure connection",
            "The overarching trusted Certificate Authority (CA)",
            "The physical network router transmitting the certificate",
            "The end-user who originally generated the key pair"
        ],
        correctAnswer: 1,
        explanation: "An X.509 certificate binds a public key to an entity. The trusted Certificate Authority (CA) signs the certificate with its own private key, vouching for the authenticity of the certificate's contents."
    },
    {
        id: "mod4-7",
        module: "4. Asymmetric Cryptography & PKI",
        difficulty: "hard",
        question: "What is the primary cryptographic advantage of utilizing Elliptic Curve Cryptography (ECC) over the traditional RSA algorithm?",
        options: [
            "It does not require the use of a public key infrastructure",
            "It offers equivalent security using significantly shorter key lengths",
            "It executes without consuming any localized system memory",
            "It is completely immune to future quantum computing attacks"
        ],
        correctAnswer: 1,
        explanation: "ECC provides a very high level of security with much smaller key sizes compared to RSA (e.g., a 256-bit ECC key offers comparable security to a 3072-bit RSA key), making it highly efficient for mobile and IoT devices."
    },
    {
        id: "mod4-8",
        module: "4. Asymmetric Cryptography & PKI",
        difficulty: "hard",
        question: "In the PGP (Pretty Good Privacy) 'Web of Trust' model, how is the authenticity of a user's public key validated?",
        options: [
            "Through a centralized, government-regulated Certificate Authority",
            "Through automated DNS verification of the user's email domain",
            "Through decentralized digital signatures from mutually trusted individuals",
            "Through mandatory hardware tokens distributed by the software vendor"
        ],
        correctAnswer: 2,
        explanation: "Unlike hierarchical PKI models that rely on a centralized CA, PGP uses a decentralized Web of Trust. Users validate each other by digitally signing their peers' public keys at physical 'key signing parties' or via trusted networks."
    },
    {
        id: "mod4-9",
        module: "4. Asymmetric Cryptography & PKI",
        difficulty: "hard",
        question: "If an adversary compromises a trusted Root Certificate Authority's private key, what is the most severe immediate consequence?",
        options: [
            "All previously encrypted symmetric databases immediately decrypt",
            "The adversary can forge perfectly valid certificates for any domain",
            "The network routers physically disconnect from the internet backbone",
            "Internal corporate firewalls automatically disable all traffic filtering"
        ],
        correctAnswer: 1,
        explanation: "The Root CA's private key is the ultimate anchor of trust. If compromised, an attacker can issue fraudulent digital certificates for any website (e.g., a fake Google.com certificate) that browsers will accept as perfectly legitimate."
    },

    // --- MODULE 5: Hashing & Digital Signatures Expansion ---
    {
        id: "mod5-5",
        module: "5. Hashing & Digital Signatures",
        difficulty: "hard",
        question: "When storing user passwords securely in a database, why is a unique cryptographic 'salt' appended to each password before hashing?",
        options: [
            "To reduce the computational processing required by the server",
            "To thwart precomputed rainbow table and dictionary attacks",
            "To compress the size of the password string significantly",
            "To allow administrators to easily decrypt the password later"
        ],
        correctAnswer: 1,
        explanation: "A salt is random data added to a password before hashing. It ensures that identical passwords have different hashes, preventing attackers from using precomputed lists of hashes (rainbow tables) to crack them."
    },
    {
        id: "mod5-6",
        module: "5. Hashing & Digital Signatures",
        difficulty: "hard",
        question: "Which cryptographic algorithm is currently recommended by NIST to replace the aging SHA-1 hashing standard?",
        options: [
            "The legacy MD5 message digest algorithm",
            "The AES-256 symmetric encryption algorithm",
            "The SHA-256 or SHA-3 family of algorithms",
            "The Rivest-Shamir-Adleman asymmetric algorithm"
        ],
        correctAnswer: 2,
        explanation: "Due to collision vulnerabilities, SHA-1 is deprecated. NIST recommends using the SHA-2 family (which includes SHA-256) or the newer SHA-3 standard for secure cryptographic hashing."
    },
    {
        id: "mod5-7",
        module: "5. Hashing & Digital Signatures",
        difficulty: "hard",
        question: "What specific security assurance does an HMAC (Hash-based Message Authentication Code) provide that a standard hash function does not?",
        options: [
            "It guarantees non-repudiation by utilizing asymmetric keys",
            "It ensures data confidentiality by heavily encrypting the payload",
            "It provides authentication by combining the hash with a secret key",
            "It automatically compresses the data transmission over the network"
        ],
        correctAnswer: 2,
        explanation: "A standard hash only provides integrity. An HMAC combines a cryptographic hash function with a secret cryptographic key, providing both data integrity and authentication (proving the sender possessed the secret key)."
    },
    {
        id: "mod5-8",
        module: "5. Hashing & Digital Signatures",
        difficulty: "hard",
        question: "In the context of digital signatures, what is the specific role of the recipient's software during the verification process?",
        options: [
            "It encrypts the received document using the sender's public key",
            "It decrypts the signature using the sender's public key and compares hashes",
            "It calculates a new symmetric key to authenticate the digital payload",
            "It contacts the centralized Certificate Authority to request a private key"
        ],
        correctAnswer: 1,
        explanation: "To verify a digital signature, the recipient's software calculates the hash of the received document, decrypts the attached digital signature using the sender's public key to reveal the original hash, and compares the two hashes."
    },

    // --- MODULE 6: Network Security & Firewalls Expansion ---
    {
        id: "mod6-5",
        module: "6. Network Security & Firewalls",
        difficulty: "hard",
        question: "Which OSI layer does a Next-Generation Firewall (NGFW) primarily analyze to enforce deep packet inspection policies?",
        options: [
            "Layer 2 - The Data Link Layer",
            "Layer 3 - The Network Layer",
            "Layer 4 - The Transport Layer",
            "Layer 7 - The Application Layer"
        ],
        correctAnswer: 3,
        explanation: "While traditional firewalls look at Layers 3 and 4 (IPs and Ports), Next-Generation Firewalls (NGFWs) perform Deep Packet Inspection (DPI) up to Layer 7 (Application Layer) to identify specific apps, malware, and web threats."
    },
    {
        id: "mod6-6",
        module: "6. Network Security & Firewalls",
        difficulty: "hard",
        question: "In an enterprise network, what is the primary defensive purpose of implementing a MAC filtering mechanism on a network switch?",
        options: [
            "To encrypt all wireless traffic transmitted over the local airspace",
            "To restrict physical network access to authorized hardware devices only",
            "To dynamically translate internal private IP addresses to public ones",
            "To prevent sophisticated SQL injection attacks against internal servers"
        ],
        correctAnswer: 1,
        explanation: "MAC filtering checks the physical hardware address (MAC address) of devices attempting to connect to a switch or access point, allowing only pre-approved devices to join the network (though it can be bypassed by spoofing)."
    },
    {
        id: "mod6-7",
        module: "6. Network Security & Firewalls",
        difficulty: "hard",
        question: "When establishing a Site-to-Site IPSec VPN, what is the primary function of the Internet Key Exchange (IKE) protocol?",
        options: [
            "To securely negotiate encryption algorithms and exchange symmetric keys",
            "To compress the network payload to maximize the tunnel's bandwidth",
            "To physically route the encapsulated packets across the public internet",
            "To log all connection attempts within the centralized firewall console"
        ],
        correctAnswer: 0,
        explanation: "IKE (Internet Key Exchange) is used to establish Security Associations (SAs). It negotiates which encryption and hashing algorithms the VPN endpoints will use and securely exchanges the symmetric keys required for the IPSec tunnel."
    },
    {
        id: "mod6-8",
        module: "6. Network Security & Firewalls",
        difficulty: "hard",
        question: "A malicious actor floods a network switch with thousands of forged Ethernet frames. What type of attack is occurring?",
        options: [
            "A synchronized TCP connection hijacking exploit",
            "A covert ICMP data exfiltration operation",
            "A malicious MAC address table flooding attack",
            "A structured web application cross-site attack"
        ],
        correctAnswer: 2,
        explanation: "In a MAC flooding attack, an attacker bombards a switch with fake MAC addresses. This overflows the switch's Content Addressable Memory (CAM) table, causing the switch to fail-open and act like a hub, broadcasting all traffic to all ports."
    },

    // --- MODULE 7: Malware & Intrusion Detection Expansion ---
    {
        id: "mod7-4",
        module: "7. Malware & Intrusion Detection",
        difficulty: "hard",
        question: "What specific evasion technique does 'Polymorphic Malware' utilize to bypass traditional signature-based antivirus scanners?",
        options: [
            "It rapidly uninstalls the antivirus software upon initial execution",
            "It continuously alters its underlying code structure while retaining its function",
            "It disguises itself as a legitimate digitally signed hardware driver",
            "It executes entirely within the volatile Random Access Memory space"
        ],
        correctAnswer: 1,
        explanation: "Polymorphic malware changes its identifiable features (its signature) every time it infects a new system or replicates, usually by altering its encryption routine, making static signature matching extremely difficult."
    },
    {
        id: "mod7-5",
        module: "7. Malware & Intrusion Detection",
        difficulty: "hard",
        question: "When deploying a Network Intrusion Prevention System (NIPS), what is the most significant operational risk compared to an IDS?",
        options: [
            "A NIPS cannot detect previously unknown zero-day vulnerabilities",
            "A NIPS generates false positives that automatically block legitimate traffic",
            "A NIPS requires significantly more manual configuration and oversight",
            "A NIPS cannot operate effectively on high-speed fiber optic networks"
        ],
        correctAnswer: 1,
        explanation: "While an IDS only alerts, an IPS actively blocks traffic. The biggest risk of an IPS is a 'false positive'—incorrectly identifying legitimate business traffic as malicious and blocking it, causing a self-inflicted denial of service."
    },
    {
        id: "mod7-6",
        module: "7. Malware & Intrusion Detection",
        difficulty: "hard",
        question: "Which of the following descriptions accurately defines a 'Logic Bomb' within a malicious software context?",
        options: [
            "A script that actively scans the local network for vulnerable open ports",
            "Malicious code that executes only when specific predetermined conditions are met",
            "A tool used exclusively to decrypt ransomware-encrypted corporate files",
            "A program that mimics a legitimate application to trick the end-user"
        ],
        correctAnswer: 1,
        explanation: "A logic bomb is malicious code inserted into software that lies dormant until a specific trigger occurs (e.g., a specific date/time, or an employee's name being deleted from the payroll database)."
    },

    // --- MODULE 8: Ethical Hacking & Vulnerabilities Expansion ---
    {
        id: "mod8-4",
        module: "8. Ethical Hacking & Pen Testing",
        difficulty: "hard",
        question: "During a penetration test, the tester is provided with absolutely no prior knowledge of the target network. This is known as:",
        options: [
            "A comprehensive White-Box penetration test",
            "A simulated Gray-Box penetration test",
            "An unauthenticated Black-Box penetration test",
            "A cooperative Purple-Team security engagement"
        ],
        correctAnswer: 2,
        explanation: "A Black-Box test simulates an external attacker with no inside knowledge. The tester must discover everything from scratch. White-Box provides full knowledge, and Gray-Box provides partial knowledge."
    },
    {
        id: "mod8-5",
        module: "8. Ethical Hacking & Pen Testing",
        difficulty: "hard",
        question: "What is the primary function of utilizing an exploitation framework such as Metasploit during a security assessment?",
        options: [
            "To generate complex, legally binding vulnerability compliance reports",
            "To automate the development and deployment of reliable exploit payloads",
            "To establish a baseline of normal employee network activity patterns",
            "To definitively patch discovered vulnerabilities within the target system"
        ],
        correctAnswer: 1,
        explanation: "Metasploit is a powerful framework that standardizes and automates the process of selecting vulnerabilities, configuring exploits, and delivering payloads to a target machine during penetration testing."
    },
    {
        id: "mod8-6",
        module: "8. Ethical Hacking & Pen Testing",
        difficulty: "hard",
        question: "In the context of the cyber kill chain, what specific action constitutes the 'Weaponization' phase?",
        options: [
            "Actively mapping the target's external facing IP addresses",
            "Coupling a known exploit with a malicious remote access payload",
            "Transmitting the malicious file to the target via a phishing email",
            "Establishing an encrypted command and control channel outward"
        ],
        correctAnswer: 1,
        explanation: "Weaponization occurs when an attacker takes an exploit (the vulnerability mechanism) and bundles it with a payload (the malicious action, like a remote access trojan) into a deliverable package."
    },

    // --- MODULE 9: Web, Email, & DB Security Expansion ---
    {
        id: "mod9-3",
        module: "9. Web & Database Security",
        difficulty: "hard",
        question: "A Cross-Site Request Forgery (CSRF) attack relies primarily on exploiting which specific web browser mechanism?",
        options: [
            "The browser's inherent lack of secure memory space isolation",
            "The browser's automatic inclusion of ambient authentication cookies",
            "The browser's failure to validate internal SSL certificate chains",
            "The browser's inability to parse maliciously crafted HTML frames"
        ],
        correctAnswer: 1,
        explanation: "CSRF tricks a victim's browser into executing an unwanted action on a trusted site where they are authenticated. It works because the browser automatically attaches ambient session cookies to requests sent to that domain."
    },
    {
        id: "mod9-4",
        module: "9. Web & Database Security",
        difficulty: "hard",
        question: "When securing corporate email, what specific protection does the Sender Policy Framework (SPF) protocol provide?",
        options: [
            "It encrypts the entire email body contents using asymmetric keys",
            "It prevents domain spoofing by verifying authorized sending IP addresses",
            "It automatically scans all incoming file attachments for polymorphic malware",
            "It enforces complex password rotation rules for all email accounts"
        ],
        correctAnswer: 1,
        explanation: "SPF is a DNS record that lists the IP addresses authorized to send emails on behalf of a domain. Receiving mail servers check the SPF record to verify the sender, preventing email spoofing."
    },

    // --- MODULE 10: OS Hardening Expansion ---
    {
        id: "mod10-3",
        module: "10. OS Hardening",
        difficulty: "hard",
        question: "When applying CIS benchmarks to harden a Windows 10 environment, what is the primary purpose of disabling the LLMNR protocol?",
        options: [
            "To prevent attackers from poisoning local network name resolution requests",
            "To ensure all external web browsing traffic routes through a secure proxy",
            "To restrict standard users from installing unauthorized software packages",
            "To disable legacy wireless networking protocols like WEP and WPA"
        ],
        correctAnswer: 0,
        explanation: "Link-Local Multicast Name Resolution (LLMNR) is a fallback name resolution protocol in Windows. It is highly vulnerable to poisoning attacks where an attacker answers the broadcast request, capturing credentials."
    },
    {
        id: "mod10-4",
        module: "10. OS Hardening",
        difficulty: "hard",
        question: "In standard Linux system administration, what specific security function does the 'chmod 700' command perform on a sensitive directory?",
        options: [
            "It allows all system users to read, write, and execute the directory contents",
            "It strictly restricts read, write, and execute permissions to the owner only",
            "It encrypts the directory contents using the default system cryptographic key",
            "It transfers the ownership of the directory directly to the root administrator"
        ],
        correctAnswer: 1,
        explanation: "In Linux permissions, '700' means the owner has full read (4) + write (2) + execute (1) permissions, while the group and all other users have absolutely zero permissions (0)."
    }
];

// Merge with existing questions
if (typeof window.tcaQuestions !== 'undefined') {
    window.tcaQuestions = window.tcaQuestions.concat(tcaQuestionsPart2);
} else {
    window.tcaQuestions = tcaQuestionsPart2;
}
