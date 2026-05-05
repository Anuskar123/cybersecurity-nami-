const appData = {
    // SECURITY: In a real app, never store hashes/salts in client-side JS like this.
    // This is for demonstration as a standalone local platform.
    users: [
        {
            username: "admin",
            // Hash for 'password123'
            passwordHash: "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f",
            pin: "134679" // Updated PIN per request
        }
    ],
    courses: [
        {
            id: "csa-intro",
            title: "1. Cyber Security Fundamentals",
            description: "Introduction to Cyber Security, CIA Triad, and Cryptography.",
            slides: [
                {
                    type: "content",
                    title: "What is Cyber Security?",
                    content: `
                        <p><strong>Definition:</strong> Cyber security refers to the protection of systems, networks, and digital data. It prevents unauthorised access, misuse, and disruption of information.</p>
                        <p><strong>Scope:</strong> It applies across hardware, software, and human processes. It is essential for governments, organisations, and individuals.</p>
                        <p><strong>Why it matters:</strong> Cyber attacks are increasing in frequency and sophistication. Breaches cause financial loss and reputational damage.</p>
                    `,
                    realLifeExample: "Think of your home security. You lock doors (prevention), install alarms (detection), and have insurance (recovery). Cyber security does the same for your digital life.",
                    notes: "Key takeaway: Security is not just technical; it involves people and processes too.",
                    keyPoints: [
                        "Protection of systems, networks, and data.",
                        "Prevents unauthorised access.",
                        "Critical for everyone: individuals to nations."
                    ]
                },
                {
                    type: "content",
                    title: "The CIA Triad",
                    content: `
                        <p>The <strong>CIA Triad</strong> is the core model for information security:</p>
                        <ul>
                            <li><strong>Confidentiality:</strong> Ensures data is accessible only to authorised users. (e.g., Encryption, Access Controls).</li>
                            <li><strong>Integrity:</strong> Ensures data is accurate and has not been altered. (e.g., Hashing, Validation).</li>
                            <li><strong>Availability:</strong> Ensures systems and data are accessible when required. (e.g., Backups, Redundancy).</li>
                        </ul>
                    `,
                    realLifeExample: "ATM Machine: Only you can see your balance (Confidentiality). The balance amount is correct and nobody changed it (Integrity). You can withdraw money 24/7 (Availability).",
                    notes: "Memorize: Confidentiality, Integrity, Availability.",
                    keyPoints: [
                        "Confidentiality = Secrecy",
                        "Integrity = Accuracy",
                        "Availability = Accessibility"
                    ]
                },
                {
                    type: "content",
                    title: "Threat Landscape",
                    content: `
                        <p><strong>Malware:</strong> Viruses, worms, and ransomware.</p>
                        <p><strong>Phishing:</strong> Exploiting human trust to steal information (e.g., fake emails).</p>
                        <p><strong>Insider Threats:</strong> Risks from employees or contractors.</p>
                        <p><strong>Common Attacks:</strong> Denial-of-Service (DoS) disrupts access; Man-in-the-Middle intercepts communications.</p>
                    `,
                    realLifeExample: "Phishing is like a con artist calling you pretending to be the bank to get your PIN. They don't break the vault; they trick you into opening it.",
                    notes: "Humans are often the weakest link in security.",
                    keyPoints: [
                        "Threats come from external and internal sources.",
                        "Phishing targets people, not just machines.",
                        "Ransomware encrypts data for money."
                    ]
                },
                {
                    type: "content",
                    title: "Cryptography Basics",
                    content: `
                        <p><strong>Definition:</strong> Uses mathematical techniques to secure information.</p>
                        <p><strong>Functions:</strong> Supports confidentiality, integrity, and authentication.</p>
                        <p><strong>Importance:</strong> Enables secure communication over insecure networks (like the Internet). It builds trust in digital transactions.</p>
                    `,
                    realLifeExample: "Sending a letter in a locked steel box. Only the person with the key can open it and read the letter.",
                    notes: "Cryptography is the foundation of modern privacy.",
                    keyPoints: [
                        "Secures communication.",
                        "Ensures authenticity.",
                        "Protect sensitive data."
                    ]
                },
                {
                    type: "quiz",
                    question: "Brainstorming: Why is 'Availability' as crucial as 'Confidentiality' for a hospital?",
                    options: [
                        "It ensures patient records are private.",
                        "It ensures doctors can access life-saving data instantly during surgery.",
                        "It prevents billing errors.",
                        "It encrypts the database."
                    ],
                    correctAnswer: 1,
                    explanation: "<strong>Detailed Explanation:</strong> unique to the 'Availability' pillar. In a hospital, if systems are down (loss of availability), doctors cannot access patient history, allergies, or lab results during emergencies, which can lead to loss of life. While privacy (Confidentiality) is legal requirement, availability is an operational necessity for safety."
                }
            ]
        },
        {
            id: "csa-csf",
            title: "2. Security Frameworks & Governance",
            description: "Understanding Governance, Risk Management, and Compliance (GRC).",
            slides: [
                {
                    type: "content",
                    title: "What is a Security Framework?",
                    content: `
                        <p>A structured approach to managing cyber security. It provides policies, procedures, and controls.</p>
                        <p><strong>Benefits:</strong></p>
                        <ul>
                            <li>Consistency in security practices.</li>
                            <li>Compliance with legal/regulatory requirements.</li>
                            <li>Systematic risk management.</li>
                        </ul>
                    `,
                    realLifeExample: "Building Code: You can't just build a house however you want using any materials. You must follow the 'Building Code' (Framework) to ensure it doesn't collapse (Security Breach) and is safe to live in.",
                    notes: "Frameworks provide a common language for security.",
                    keyPoints: [
                        "Structured approach.",
                        "Ensures compliance.",
                        "Reduces risk."
                    ]
                },
                {
                    type: "content",
                    title: "Security Governance",
                    content: `
                        <p><strong>Governance:</strong> Defines responsibility and accountability. Senior management oversight is essential.</p>
                        <p><strong>Policies:</strong> Define acceptable and unacceptable behaviour. Must be clear and enforceable.</p>
                        <p><strong>Controls:</strong>
                        <ul>
                            <li>Technical (Firewalls)</li>
                            <li>Administrative (Training)</li>
                            <li>Physical (Locks)</li>
                        </ul></p>
                    `,
                    realLifeExample: "Governance is like the CEO steering a ship. The policies are the standing orders for the crew, and controls are the engine room protocols.",
                    notes: "Governance = Accountability.",
                    keyPoints: [
                        "Senior management must be involved.",
                        "Roles must be clear.",
                        "Controls enforce the policies."
                    ]
                },
                {
                    type: "content",
                    title: "Risk Management",
                    content: `
                        <p><strong>Risk:</strong> The likelihood of a threat exploiting a vulnerability.</p>
                        <p><strong>Process:</strong> Identify assets -> Identify threats -> Assess vulnerabilities -> Prioritise risks.</p>
                        <p><strong>Goal:</strong> To manage and reduce risk to an acceptable level, not eliminate it (which is impossible).</p>
                    `,
                    realLifeExample: "Driving a car has risk. You manage it by wearing a seatbelt (control), obeying speed limits (policy), and having airbags (technical control).",
                    notes: "Risk = Threat x Vulnerability.",
                    keyPoints: [
                        "Identify assets first.",
                        "Assess impact.",
                        "Prioritise mitigation."
                    ]
                },
                {
                    type: "quiz",
                    question: "Brainstorming: If you have a strong firewall but employees click on phishing links, which type of control failed?",
                    options: [
                        "Physical Control",
                        "Technical Control",
                        "Administrative Control",
                        "Governance Control"
                    ],
                    correctAnswer: 2,
                    explanation: "<strong>Detailed Explanation:</strong> Firewalls are Technical Controls. However, employee behavior and training fall under <strong>Administrative Controls</strong>. A failure to train staff (or staff failing to follow policy) represents a failure in the administrative layer, showing why technical tools alone aren't enough."
                }
            ]
        },
        {
            id: "iso-27001",
            title: "3. ISO/IEC 27001 Standard",
            description: "Information Security Management Systems (ISMS) Standard.",
            slides: [
                {
                    type: "content",
                    title: "ISO/IEC 27001 Overview",
                    content: `
                        <p><strong>International Standard:</strong> For Information Security Management Systems (ISMS).</p>
                        <p><strong>Objective:</strong> Identify risks, apply controls, reduce incidents, and ensure business continuity.</p>
                        <p><strong>Key Concept:</strong> Continual Improvement. It's not a one-time project; it's an ongoing cycle.</p>
                    `,
                    realLifeExample: "ISO 27001 is like a 'Quality Seal' for security. When a company has it, customers trust that they handle data professionally, just like a restaurant with a 5-star hygiene rating.",
                    notes: "Focus is on 'Management System' - the process of managing security.",
                    keyPoints: [
                        "Global standard.",
                        "Focus on ISMS.",
                        "Requires continual improvement."
                    ]
                },
                {
                    type: "quiz",
                    question: "Brainstorming: Why does ISO 27001 emphasize 'Continual Improvement'?",
                    options: [
                        "Because auditors need work.",
                        "Because threats evolve and change constantly.",
                        "To comply with GDPR.",
                        "Because software updates are expensive."
                    ],
                    correctAnswer: 1,
                    explanation: "<strong>Detailed Explanation:</strong> The security landscape is dynamic. New hackers, new malware, and new technologies (like AI) emerge daily. A system that is secure today might be vulnerable tomorrow. Therefore, ISO 27001 mandates a cycle of constant review and upgrade to stay ahead of evolving threats."
                }
            ]
        },
        {
            id: "nist-case",
            title: "4. NIST Case Study: Ransomware",
            description: "Real-world analysis of a financial institution's ransomware recovery.",
            slides: [
                {
                    type: "content",
                    title: "The Incident",
                    content: `
                        <p><strong>Victim:</strong> B-Class Financial Institution.</p>
                        <p><strong>Attack:</strong> Ransomware via phishing -> Lateral movement -> Encrypted critical systems.</p>
                        <p><strong>Impact:</strong> Services down for days, regulatory scrutiny, loss of customer trust.</p>
                    `,
                    realLifeExample: "Imagine the bank's digital vault was welded shut by robbers who demanded a key fee. Meanwhile, customers couldn't withdraw cash, and the bank manager didn't know who to call.",
                    notes: "Phishing was the entry point.",
                    keyPoints: [
                        "Phishing entry.",
                        "Critical impact.",
                        "Reputational damage."
                    ]
                },
                {
                    type: "content",
                    title: "The Failures (Before NIST)",
                    content: `
                        <p><strong>Govern:</strong> No board oversight. Security was just an 'IT problem'.</p>
                        <p><strong>Identify:</strong> Incomplete asset inventory.</p>
                        <p><strong>Protect:</strong> Weak passwords, No MFA, <strong>Backups were online and accessible</strong>.</p>
                        <p><strong>Respond:</strong> No tested plan.</p>
                    `,
                    realLifeExample: "Keeping backups online is like keeping the spare key under the doormat. If the burglars find the door, they find the key too.",
                    notes: "Online backups are a critical vulnerability in ransomware attacks.",
                    keyPoints: [
                        "Lack of Governance.",
                        "No MFA.",
                        "Compromised Backups."
                    ]
                },
                {
                    type: "content",
                    title: "The Recovery (Applying NIST)",
                    content: `
                        <p><strong>Govern:</strong> Formed Cyber Crisis Committee.</p>
                        <p><strong>identify:</strong> Classified sensitive data.</p>
                        <p><strong>Protect:</strong> Enforced MFA, <strong>Immutable/Offline Backups</strong>.</p>
                        <p><strong>Detect:</strong> Centralized logs (SIEM) and alerts.</p>
                    `,
                    realLifeExample: "Immutable backups are like writing data to a CD-ROM (Read Only). Ransomware can't overwrite or encrypt it because the media physically doesn't allow changes once written.",
                    notes: "Offline/Immutable backups are the silver bullet against ransomware data loss.",
                    keyPoints: [
                        "Governance structure created.",
                        "MFA enforced.",
                        "Offline backups implemented."
                    ]
                },
                {
                    type: "quiz",
                    question: "Brainstorming: Why was 'No Board Oversight' listed as a major failure?",
                    options: [
                        "Because the Board likes meetings.",
                        "Because security requires funding and strategic authority that only the Board can provide.",
                        "Because the IT manager needs a boss.",
                        "It wasn't a major failure."
                    ],
                    correctAnswer: 1,
                    explanation: "<strong>Detailed Explanation:</strong> Cybersecurity is not just a technical issue; it's a business risk. Without Board oversight, security teams often lack the budget to buy tools (like MFA) or the authority to enforce rules (like password policies) across the company. The Board sets the 'Safety Culture'."
                }
            ]
        },
        {
            id: "nist-csf2",
            title: "5. NIST CSF 2.0 Framework",
            description: "The modern standard: Govern, Identify, Protect, Detect, Respond, Recover.",
            slides: [
                {
                    type: "content",
                    title: "NIST CSF 2.0 Functions",
                    content: `
                        <p>The core of the framework is organized into 6 Functions:</p>
                        <ol>
                            <li><strong>GOVERN:</strong> Establish strategy, policy, and culture. (The new addition!).</li>
                            <li><strong>IDENTIFY:</strong> Know what you have (assets, risks).</li>
                            <li><strong>PROTECT:</strong> Safeguard it (Access control, Training).</li>
                            <li><strong>DETECT:</strong> Spot problems (Monitoring, Logs).</li>
                            <li><strong>RESPOND:</strong> Act when attacked (containment).</li>
                            <li><strong>RECOVER:</strong> Restore normal operations.</li>
                        </ol>
                    `,
                    realLifeExample: "Think of a sports team. Govern = Coach/Strategy. Identify = Scouting the opponent. Protect = Defense players. Detect = Spotting a gap. Respond = Counter-attack. Recover = Halftime strategy adjustment.",
                    notes: "GOVERN is the umbrella function that overlays all others.",
                    keyPoints: [
                        "6 Core Functions.",
                        "Govern is the new addition.",
                        "Covers the whole lifecycle."
                    ]
                },
                {
                    type: "content",
                    title: "Tiers & Profiles",
                    content: `
                        <p><strong>Implementation Tiers:</strong> Measure maturity (Tier 1: Partial -> Tier 4: Adaptive).</p>
                        <p><strong>Profiles:</strong> Current Profile (Where we are) vs Target Profile (Where we want to be).</p>
                        <p><strong>Gap Analysis:</strong> The work needed to move from Current to Target.</p>
                    `,
                    realLifeExample: "Tiers are like belt levels in Karate. White belt (Tier 1) knows a little. Black belt (Tier 4) adapts instinctively. Profiles are like your fitness assessment today vs your goal for next year.",
                    notes: "Tiers measure 'How well', Profiles measure 'What'.",
                    keyPoints: [
                        "Tiers = Maturity.",
                        "Profiles = Alignment.",
                        "Gap Analysis drives roadmap."
                    ]
                },
                {
                    type: "quiz",
                    question: "Brainstorming: Why was 'GOVERN' added as a separate function in CSF 2.0?",
                    options: [
                        "To make the diagram look better.",
                        "Because technology alone was failing; leadership responsibility was missing.",
                        "To copy ISO 27001.",
                        "Because the government mandated it."
                    ],
                    correctAnswer: 1,
                    explanation: "<strong>Detailed Explanation:</strong> Analysis of many breaches showed that while teams had tools (firewalls, antivirus), they lacked direction. Decisions on risk were not being made by leaders. 'Govern' was elevated to emphasize that Cyber Security is a top-level organizational responsibility, not just an IT task."
                }
            ]
        },
        {
            id: "final-exam",
            title: "6. Final Exam",
            description: "Comprehensive 20-question assessment covering all modules.",
            slides: [
                {
                    type: "content",
                    title: "Final Exam Instructions",
                    content: `
                        <p><strong>Welcome to the Final Exam.</strong></p>
                        <p>This exam consists of 20 questions covering all 5 modules of the course.</p>
                        <ul>
                            <li>Intro & Fundamentals</li>
                            <li>Security Frameworks</li>
                            <li>ISO/IEC 27001</li>
                            <li>NIST Case Study</li>
                            <li>NIST CSF 2.0</li>
                        </ul>
                        <p>Good luck!</p>
                    `,
                    realLifeExample: "In the real world, a 'breach' is the final exam. Here, we test you safely before that happens.",
                    notes: "Read each question carefully.",
                    keyPoints: [
                        "20 Questions.",
                        "Covers all topics.",
                        "Test your knowledge."
                    ]
                },
                // --- MODULE 1: INTRO ---
                {
                    type: "quiz",
                    question: "1. Which element of the CIA Triad ensures that data has not been altered by unauthorized people?",
                    options: [
                        "Confidentiality",
                        "Integrity",
                        "Availability",
                        "Authentication"
                    ],
                    correctAnswer: 1,
                    explanation: "<strong>Integrity</strong> deals with accuracy and completeness. Hashing is a common tool to verify integrity."
                },
                {
                    type: "quiz",
                    question: "2. Phishing attacks primarily exploit which vulnerability?",
                    options: [
                        "Software Bugs",
                        "Weak Firewalls",
                        "Human Trust",
                        "Unencrypted Data"
                    ],
                    correctAnswer: 2,
                    explanation: "Phishing is a 'Social Engineering' attack. It targets the <strong>human</strong> element, tricking them into revealing secrets, rather than hacking software directly."
                },
                {
                    type: "quiz",
                    question: "3. Which concept ensures you can access your data when you need it?",
                    options: [
                        "Availability",
                        "Confidentiality",
                        "Encryption",
                        "Authorization"
                    ],
                    correctAnswer: 0,
                    explanation: "<strong>Availability</strong> ensures systems and data are reliable and accessible (e.g., preventing DDoS attacks)."
                },
                {
                    type: "quiz",
                    question: "4. What is the primary purpose of Cryptography?",
                    options: [
                        "To slow down the computer",
                        "To secure communication and build trust",
                        "To delete viruses",
                        "To monitor employee emails"
                    ],
                    correctAnswer: 1,
                    explanation: "Cryptography uses math to secure information, supporting confidentiality and integrity, which builds <strong>trust</strong> in digital systems."
                },
                // --- MODULE 2: FRAMEWORKS ---
                {
                    type: "quiz",
                    question: "5. What is the main purpose of a Security Framework?",
                    options: [
                        "To punish employees who make mistakes",
                        "To provide a structured approach to managing risk",
                        "To increase IT spending",
                        "To slow down software development"
                    ],
                    correctAnswer: 1,
                    explanation: "Frameworks provide a <strong>structured approach</strong> (policies, controls) to systematically manage and reduce security risk."
                },
                {
                    type: "quiz",
                    question: "6. Who is ultimately responsible for Security Governance?",
                    options: [
                        "The IT Manager",
                        "The firewall administrator",
                        "Senior Management / Board",
                        "The software developer"
                    ],
                    correctAnswer: 2,
                    explanation: "Governance requires authority and resources. Only <strong>Senior Management</strong> can provide the oversight and strategic direction needed."
                },
                {
                    type: "quiz",
                    question: "7. 'Risk' is defined as:",
                    options: [
                        "A bad event",
                        "The likelihood of a threat exploiting a vulnerability",
                        "A hacker",
                        "A weak password"
                    ],
                    correctAnswer: 1,
                    explanation: "Risk is the intersection of a <strong>Threat</strong> (potential harm) meeting a <strong>Vulnerability</strong> (weakness)."
                },
                {
                    type: "quiz",
                    question: "8. Training employees on how to spot phishing is an example of which type of control?",
                    options: [
                        "Technical Control",
                        "Physical Control",
                        "Administrative Control",
                        "Logical Control"
                    ],
                    correctAnswer: 2,
                    explanation: "Training, policies, and procedures are <strong>Administrative Controls</strong>. They deal with people and rules."
                },
                // --- MODULE 3: ISO 27001 ---
                {
                    type: "quiz",
                    question: "9. What is the core focus of ISO/IEC 27001?",
                    options: [
                        "Technical Firewalls",
                        "Information Security Management Systems (ISMS)",
                        "Payment Card Security",
                        "US Government Regulations"
                    ],
                    correctAnswer: 1,
                    explanation: "ISO 27001 is the international standard specifically for <strong>Information Security Management Systems (ISMS)</strong>."
                },
                {
                    type: "quiz",
                    question: "10. ISO 27001 emphasizes that security is:",
                    options: [
                        "A one-time project",
                        "Only for banks",
                        "A cycle of Continual Improvement",
                        "Fixed and never changing"
                    ],
                    correctAnswer: 2,
                    explanation: "The standard requires <strong>Continual Improvement</strong>. You must constantly review, audit, and improve your ISMS."
                },
                {
                    type: "quiz",
                    question: "11. Which is NOT a benefit of ISO 27001 certification?",
                    options: [
                        "Guarantees 100% immunity from all hacks",
                        "Builds customer trust",
                        "Ensures compliance with laws",
                        "Reduces likelihood of incidents"
                    ],
                    correctAnswer: 0,
                    explanation: "<strong>No standard guarantees immunity.</strong> ISO 27001 helps you <em>manage</em> risk, but it cannot promise 100% security."
                },
                {
                    type: "quiz",
                    question: "12. In ISO 27001, what do you apply to reduce risks?",
                    options: [
                        "Controls",
                        "More computers",
                        "Licensing fees",
                        "Faster internet"
                    ],
                    correctAnswer: 0,
                    explanation: "You treat risks by applying <strong>Controls</strong> (safeguards) appropriate to the level of risk."
                },
                // --- MODULE 4: CASE STUDY ---
                {
                    type: "quiz",
                    question: "13. In the Ransomware case study, what was a critical 'Protect' failure?",
                    options: [
                        "The internet was too slow",
                        "Backups were online and accessible",
                        "The hacker was too good",
                        "The computers were old"
                    ],
                    correctAnswer: 1,
                    explanation: "Storing <strong>backups online</strong> allowed the ransomware to encrypt them too. Good protection requires offline/immutable backups."
                },
                {
                    type: "quiz",
                    question: "14. How did the attackers initially enter the system in the case study?",
                    options: [
                        "Breaking a window",
                        "Phishing email",
                        "USB Stick",
                        "Brute force"
                    ],
                    correctAnswer: 1,
                    explanation: "The entry vector was <strong>Phishing</strong>, highlighting the need for awareness training and email filters."
                },
                {
                    type: "quiz",
                    question: "15. Which function was improved by creating a 'Cyber Crisis Committee'?",
                    options: [
                        "Detect",
                        "Recover",
                        "Govern",
                        "Identify"
                    ],
                    correctAnswer: 2,
                    explanation: "Creating a committee to oversee decisions and accountability is a clear <strong>GOVERN</strong> function action."
                },
                {
                    type: "quiz",
                    question: "16. Why are 'Immutable Backups' important?",
                    options: [
                        "They are cheaper",
                        "They cannot be modified or deleted (even by ransomware)",
                        "They are faster to download",
                        "They don't require passwords"
                    ],
                    correctAnswer: 1,
                    explanation: "Immutable means <strong>unchangeable</strong>. If ransomware cannot write to the backup, you can always recover your data."
                },
                // --- MODULE 5: NIST CSF 2.0 ---
                {
                    type: "quiz",
                    question: "17. What is the major new function added in NIST CSF 2.0?",
                    options: [
                        "ATTACK",
                        "GOVERN",
                        "DESTROY",
                        "ANALYZE"
                    ],
                    correctAnswer: 1,
                    explanation: "<strong>GOVERN</strong> was added to emphasize that cybersecurity strategy, policy, and culture must come from the top leadership."
                },
                {
                    type: "quiz",
                    question: "18. Which function involves 'knowing what you have' (Asset Inventory)?",
                    options: [
                        "Protect",
                        "Identify",
                        "Detect",
                        "Recover"
                    ],
                    correctAnswer: 1,
                    explanation: "<strong>IDENTIFY</strong> is about understanding your environment, assets, and risks so you know what to protect."
                },
                {
                    type: "quiz",
                    question: "19. The 'Detect' function is considered:",
                    options: [
                        "Purely Reactive",
                        "Purely Preventive",
                        "Preventive & Reactive (Early Warning)",
                        "Useless"
                    ],
                    correctAnswer: 2,
                    explanation: "Detection acts as an <strong>Early Warning</strong>. It bridges prevention (stopping damage) and reaction (responding to the alert)."
                },
                {
                    type: "quiz",
                    question: "20. What is a 'Target Profile' in NIST CSF?",
                    options: [
                        "The comprehensive list of hackers to catch",
                        "The desired state of cybersecurity posture the organization wants to reach",
                        "The current state of security controls",
                        "The profile of the CEO"
                    ],
                    correctAnswer: 1,
                    explanation: "The <strong>Target Profile</strong> represents the <em>goal</em>: the level of security maturity the organization aims to achieve."
                }
            ]
        }
    ]
};
