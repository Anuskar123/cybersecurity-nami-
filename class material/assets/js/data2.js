// Part 2 of Study Notes Database - Covering Modules 6 to 8

const appDataPart2 = [
    {
        id: "crypto-sym",
        title: "6. Symmetric Cryptography",
        description: "Understanding DES, AES, and Block Ciphers.",
        slides: [
            {
                type: "content",
                title: "What is Symmetric Cryptography?",
                content: `
                    <p><strong>Definition:</strong> Symmetric encryption uses a <strong>single shared key</strong> for both encryption and decryption.</p>
                    <p><strong>Speed:</strong> It is mathematically simple and highly efficient, making it ideal for encrypting large amounts of data (e.g., hard drives, database records).</p>
                    <p><strong>Major Challenge:</strong> Key Distribution. How do you securely share the secret key with someone over the internet without someone else intercepting it?</p>
                `,
                realLifeExample: "It's like a house with a physical lock. The same physical key is used to lock the door when leaving and unlock it when returning.",
                notes: "Fast, but key management is the biggest weakness.",
                keyPoints: [
                    "Single shared secret key.",
                    "Very fast and efficient.",
                    "Key distribution is a problem."
                ]
            },
            {
                type: "content",
                title: "DES & 3DES (Legacy)",
                content: `
                    <p><strong>DES (Data Encryption Standard):</strong> Developed in the 1970s. Uses a 56-bit key. It is now completely obsolete because modern computers can brute-force a 56-bit key in hours.</p>
                    <p><strong>3DES (Triple DES):</strong> A temporary fix for DES. It runs the DES algorithm three times (Encrypt-Decrypt-Encrypt) using two or three separate 56-bit keys, effectively increasing the key size to 112 or 168 bits.</p>
                    <p><strong>Status:</strong> 3DES is very slow and is currently being phased out/deprecated by NIST.</p>
                `,
                realLifeExample: "DES is like a 3-digit padlock. Easy to guess eventually. 3DES is putting three padlocks on the door; it's safer, but takes a long time to open.",
                notes: "Do not use DES or 3DES for new applications.",
                keyPoints: [
                    "DES = 56-bit key (Broken).",
                    "3DES = DES applied three times.",
                    "Both are considered legacy."
                ]
            },
            {
                type: "content",
                title: "AES (Advanced Encryption Standard)",
                content: `
                    <p><strong>The Modern Standard:</strong> Replaced DES. It is the global standard for symmetric encryption used by governments, banks, and the military.</p>
                    <p><strong>Key Sizes:</strong> 128-bit, 192-bit, or 256-bit. A 256-bit key is considered 'quantum-resistant' and impossible to brute-force with current technology.</p>
                    <p><strong>Block Cipher:</strong> It encrypts data in fixed blocks of 128 bits at a time.</p>
                `,
                realLifeExample: "AES is the titanium bank vault of encryption. It's the algorithm your phone, your WiFi (WPA3), and your HTTPS banking connections use for data transfer.",
                notes: "AES is currently the unbreakable gold standard of symmetric encryption.",
                keyPoints: [
                    "Replaced DES.",
                    "Supports 128, 192, 256-bit keys.",
                    "Current global standard."
                ]
            },
            {
                type: "quiz",
                question: "Why is AES used for encrypting hard drives (like BitLocker) instead of RSA?",
                options: [
                    "Because AES keys are public.",
                    "Because AES is significantly faster at encrypting large volumes of data.",
                    "Because RSA cannot encrypt files.",
                    "Because AES is asymmetric."
                ],
                correctAnswer: 1,
                explanation: "<strong>Detailed Explanation:</strong> Symmetric algorithms like AES are designed for bulk encryption. They use simple, fast mathematical operations (substitution and permutation). Asymmetric algorithms like RSA use complex prime number factorization, which is incredibly slow and would take hours or days to encrypt a hard drive."
            }
        ]
    },
    {
        id: "crypto-asym",
        title: "7. Asymmetric Cryptography & PKI",
        description: "Public/Private Keys, RSA, and Public Key Infrastructure.",
        slides: [
            {
                type: "content",
                title: "Asymmetric Cryptography",
                content: `
                    <p><strong>Definition:</strong> Uses a <strong>pair of mathematically linked keys</strong>. What one key encrypts, ONLY the other key can decrypt.</p>
                    <p><strong>Public Key:</strong> Shared openly with the world. Anyone can use it to encrypt a message for you.</p>
                    <p><strong>Private Key:</strong> Kept strictly secret. You use it to decrypt messages sent to you.</p>
                `,
                realLifeExample: "A mailbox with a mail slot. Anyone can drop a letter in (Public Key to encrypt), but only the person with the physical mailbox key (Private Key) can open the box to read the mail.",
                notes: "Solves the 'Key Distribution' problem of symmetric cryptography.",
                keyPoints: [
                    "Two keys: Public and Private.",
                    "Public for encryption, Private for decryption.",
                    "Solves key sharing."
                ]
            },
            {
                type: "content",
                title: "RSA & ECC",
                content: `
                    <p><strong>RSA:</strong> The most widely used asymmetric algorithm. Relies on the extreme mathematical difficulty of factoring large prime numbers. Requires large keys (2048 or 4096 bits) to be secure.</p>
                    <p><strong>ECC (Elliptic Curve Cryptography):</strong> A newer approach based on the algebraic structure of elliptic curves. It provides the same security as RSA but with much smaller key sizes (e.g., a 256-bit ECC key = 3072-bit RSA key).</p>
                    <p><strong>Advantages of ECC:</strong> Faster, requires less computing power, and saves battery life on mobile devices.</p>
                `,
                realLifeExample: "RSA is like a giant, heavy reinforced steel door (secure but heavy). ECC is like a carbon-fiber door—just as strong, but much lighter and faster to open.",
                notes: "ECC is replacing RSA in modern mobile and web security.",
                keyPoints: [
                    "RSA relies on prime numbers.",
                    "ECC relies on elliptic curves.",
                    "ECC is faster with smaller keys."
                ]
            },
            {
                type: "content",
                title: "Public Key Infrastructure (PKI)",
                content: `
                    <p><strong>The Problem:</strong> How do you know a Public Key actually belongs to the real bank, and not an attacker pretending to be the bank?</p>
                    <p><strong>The Solution (PKI):</strong> A system of trusted third parties called <strong>Certificate Authorities (CAs)</strong>. A CA verifies an organization's identity and issues a Digital Certificate binding the Public Key to that identity.</p>
                    <p><strong>Certificates:</strong> Contain the owner's name, the public key, the expiration date, and the digital signature of the CA.</p>
                `,
                realLifeExample: "A CA is like the passport office. They check your real identity documents and issue a Passport (Certificate) containing your photo (Public Key). Others trust the passport because they trust the government office that issued it.",
                notes: "PKI establishes trust on the Internet.",
                keyPoints: [
                    "PKI manages digital certificates.",
                    "CA issues and signs certificates.",
                    "Prevents impersonation."
                ]
            },
            {
                type: "quiz",
                question: "If Alice wants to send a secret, encrypted message to Bob using asymmetric cryptography, which key does she use to encrypt the message?",
                options: [
                    "Alice's Public Key",
                    "Alice's Private Key",
                    "Bob's Public Key",
                    "Bob's Private Key"
                ],
                correctAnswer: 2,
                explanation: "<strong>Detailed Explanation:</strong> To ensure only Bob can read the message, Alice must encrypt it using <strong>Bob's Public Key</strong>. Once encrypted with his public key, the mathematical rules of asymmetric cryptography dictate that the message can ONLY be decrypted using Bob's matching Private Key, which only he possesses."
            }
        ]
    },
    {
        id: "hash-digsig",
        title: "8. Hashing & Digital Signatures",
        description: "Data Integrity, SHA-256, and Non-Repudiation.",
        slides: [
            {
                type: "content",
                title: "Hashing (Integrity)",
                content: `
                    <p><strong>Definition:</strong> A one-way mathematical function that takes any amount of data and outputs a fixed-length string of characters (a hash value or digest).</p>
                    <p><strong>Properties:</strong> It is ONE-WAY (you cannot reverse a hash back to the file). It is DETERMINISTIC (the same file always produces the same hash). It is AVALANCHE-PRONE (changing one pixel in a 1GB video completely changes the entire hash).</p>
                    <p><strong>Algorithms:</strong> MD5 (Broken), SHA-1 (Broken), <strong>SHA-256 (Current Standard)</strong>.</p>
                `,
                realLifeExample: "A hash is like a human fingerprint. You can identify a person from a fingerprint, but you cannot rebuild the whole person just by looking at the fingerprint.",
                notes: "Hashing provides Integrity, not Confidentiality.",
                keyPoints: [
                    "One-way function.",
                    "Provides Integrity.",
                    "SHA-256 is the standard."
                ]
            },
            {
                type: "content",
                title: "Digital Signatures",
                content: `
                    <p><strong>Definition:</strong> A mathematical scheme used to verify the authenticity and integrity of a digital message or document.</p>
                    <p><strong>How it works:</strong> The sender hashes the document. The sender then <strong>encrypts that hash with their Private Key</strong>. This encrypted hash is the Digital Signature.</p>
                    <p><strong>Verification:</strong> The receiver uses the sender's Public Key to decrypt the signature, revealing the original hash. The receiver then hashes the document themselves. If both hashes match, the signature is valid.</p>
                `,
                realLifeExample: "Signing a physical contract with a pen proves you agreed to it. A digital signature proves both who sent it (Authenticity) and that the document wasn't altered in transit (Integrity).",
                notes: "Signatures use the Private Key to encrypt the Hash.",
                keyPoints: [
                    "Combines Hashing and Asymmetric Crypto.",
                    "Proves Authenticity and Integrity.",
                    "Provides Non-Repudiation."
                ]
            },
            {
                type: "quiz",
                question: "What is 'Non-Repudiation' in the context of Digital Signatures?",
                options: [
                    "The ability to reverse a hash function.",
                    "The assurance that the sender cannot deny having sent the message.",
                    "The process of making data unreadable.",
                    "The act of revoking a digital certificate."
                ],
                correctAnswer: 1,
                explanation: "<strong>Detailed Explanation:</strong> Non-repudiation means the sender cannot legally or technically deny sending the message. Because a digital signature is created using the sender's strictly secret Private Key, the presence of a valid signature proves beyond doubt that the owner of that key authorized the message."
            }
        ]
    }
];

if (typeof appData !== 'undefined') {
    appData.courses = appData.courses.concat(appDataPart2);
} else {
    window.appDataPart2 = appDataPart2;
}
