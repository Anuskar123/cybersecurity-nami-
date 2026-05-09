// Part 4 of Study Notes Database - Covering Modules 12 to 14

const appDataPart4 = [
    {
        id: "web-db",
        title: "12. Web, Email & Database Security",
        description: "Securing Web Applications (OWASP) and Databases.",
        slides: [
            {
                type: "content",
                title: "Common Web Vulnerabilities (OWASP)",
                content: `
                    <p><strong>SQL Injection (SQLi):</strong> An attacker injects malicious SQL commands into a website's input fields (like a login box). If the backend database executes it, the attacker can view, modify, or delete the entire database.</p>
                    <p><strong>Cross-Site Scripting (XSS):</strong> An attacker injects malicious JavaScript into a legitimate webpage. When other users view that page, their browser executes the script, which can steal their session cookies and hijack their account.</p>
                    <p><strong>Defense:</strong> The primary defense against both is <strong>Input Validation</strong> and <strong>Parameterized Queries</strong> (for SQLi) — never trust data submitted by a user.</p>
                `,
                realLifeExample: "SQLi is like tricking a security guard by handing them a note that says 'Let me in, AND ALSO open the vault'. XSS is like putting a fake sign on a real ATM that tricks people into handing their PIN to a thief.",
                notes: "Input validation is the #1 rule of web security.",
                keyPoints: [
                    "SQLi attacks the backend database.",
                    "XSS attacks the user's browser.",
                    "Never trust user input."
                ]
            },
            {
                type: "quiz",
                question: "How does an attacker typically execute a Cross-Site Scripting (XSS) attack?",
                options: [
                    "By sending too much traffic to crash the web server.",
                    "By injecting malicious JavaScript into a webpage that is then executed by other users' browsers.",
                    "By guessing the administrator's database password.",
                    "By physically breaking into the server room."
                ],
                correctAnswer: 1,
                explanation: "<strong>Detailed Explanation:</strong> <strong>XSS</strong> occurs when an application includes untrusted data in a web page without proper validation or escaping. The victim's browser has no way to know that the script should not be trusted, and will execute the script, potentially giving the attacker access to session tokens or sensitive data."
            }
        ]
    },
    {
        id: "os-hardening",
        title: "13. OS Hardening & Security Policies",
        description: "Reducing the Attack Surface and Implementing Policies.",
        slides: [
            {
                type: "content",
                title: "OS Hardening Basics",
                content: `
                    <p><strong>Definition:</strong> The process of reducing the attack surface of an operating system by disabling unnecessary services and applying secure configurations.</p>
                    <p><strong>Key Steps:</strong></p>
                    <ul>
                        <li>Remove unnecessary software and disable unused ports/services.</li>
                        <li>Apply the Principle of Least Privilege (users only get the access they need).</li>
                        <li>Enforce strong password policies and MFA.</li>
                        <li>Apply patches and updates immediately.</li>
                    </ul>
                `,
                realLifeExample: "Hardening a house: You don't leave 10 doors unlocked if you only use the front door. You lock the windows, install an alarm, and only give keys to the family.",
                notes: "A smaller attack surface means fewer ways for a hacker to get in.",
                keyPoints: [
                    "Reduce attack surface.",
                    "Disable unused services.",
                    "Patch regularly."
                ]
            },
            {
                type: "content",
                title: "Security Policies",
                content: `
                    <p><strong>Definition:</strong> Formal rules established by an organization to govern the protection of information assets.</p>
                    <p><strong>Types of Policies:</strong></p>
                    <ul>
                        <li>Acceptable Use Policy (AUP): What users are allowed to do on company computers.</li>
                        <li>Data Classification Policy: How to handle Secret vs Public data.</li>
                        <li>Incident Response Policy: What to do when a breach occurs.</li>
                    </ul>
                `,
                realLifeExample: "A security policy is like the employee handbook. It doesn't physically stop you from doing something wrong, but it establishes the rules so you know what is expected and what the consequences are.",
                notes: "Policies must be enforceable to be effective.",
                keyPoints: [
                    "Formal rules and guidelines.",
                    "AUP dictates user behavior.",
                    "Foundation of security governance."
                ]
            },
            {
                type: "quiz",
                question: "Which security principle states that a user should only be given the minimum level of access necessary to perform their job?",
                options: [
                    "Separation of Duties",
                    "Principle of Least Privilege",
                    "Defense in Depth",
                    "Security through Obscurity"
                ],
                correctAnswer: 1,
                explanation: "<strong>Detailed Explanation:</strong> The <strong>Principle of Least Privilege</strong> ensures that if a user's account is compromised, the attacker only gains access to a limited set of resources, rather than full administrative control over the entire network."
            }
        ]
    },
    {
        id: "pgp-gpg",
        title: "14. PGP & GPG",
        description: "Pretty Good Privacy and Secure Email Communication.",
        slides: [
            {
                type: "content",
                title: "PGP (Pretty Good Privacy)",
                content: `
                    <p><strong>Purpose:</strong> A widely used system for encrypting and digitally signing emails and files.</p>
                    <p><strong>Hybrid Encryption:</strong> PGP generates a fast symmetric session key to encrypt the large message. It then uses the recipient's public RSA key to encrypt that small session key. Both are sent together.</p>
                    <p><strong>Web of Trust:</strong> Unlike standard PKI which relies on central Certificate Authorities, PGP relies on a decentralized 'Web of Trust'. Users verify each other's keys in person and sign them to vouch for their authenticity.</p>
                `,
                realLifeExample: "The Web of Trust is like vouching for a friend. 'I know Bob, and Bob says he knows Alice, so I will trust Alice based on Bob's word.'",
                notes: "GPG (GNU Privacy Guard) is the free, open-source implementation of the PGP standard.",
                keyPoints: [
                    "Secures email and files.",
                    "Uses Hybrid Encryption.",
                    "Relies on a decentralized Web of Trust."
                ]
            },
            {
                type: "quiz",
                question: "Why does PGP use a 'Hybrid' encryption approach rather than just encrypting the entire email with RSA?",
                options: [
                    "Because RSA cannot encrypt text.",
                    "Because symmetric encryption is much faster for encrypting the actual message body.",
                    "Because PGP does not support RSA.",
                    "Because symmetric encryption provides better key distribution."
                ],
                correctAnswer: 1,
                explanation: "<strong>Detailed Explanation:</strong> Asymmetric algorithms (like RSA) are mathematically intensive and very slow when encrypting large amounts of data. <strong>Hybrid encryption</strong> solves this by using a fast symmetric key (like AES) for the heavy lifting (the message), and using RSA only to securely transmit that tiny symmetric key."
            }
        ]
    }
];

if (typeof appData !== 'undefined') {
    // Move 'Final Exam' to the end so it appears after Module 14
    const finalExamIndex = appData.courses.findIndex(c => c.id === 'final-exam');
    let finalExam = null;
    if (finalExamIndex !== -1) {
        finalExam = appData.courses.splice(finalExamIndex, 1)[0];
    }
    
    // Add the new parts
    appData.courses = appData.courses.concat(appDataPart4);
    
    // Put final exam back at the end
    if (finalExam) {
        appData.courses.push(finalExam);
    }
} else {
    window.appDataPart4 = appDataPart4;
}
