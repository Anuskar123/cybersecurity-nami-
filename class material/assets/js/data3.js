// Part 3 of Study Notes Database - Covering Modules 9 to 11

const appDataPart3 = [
    {
        id: "firewalls-net",
        title: "9. Network Security & Firewalls",
        description: "Stateless, Stateful, Proxies, NGFW, IDS/IPS.",
        slides: [
            {
                type: "content",
                title: "Firewall Types: Stateless vs Stateful",
                content: `
                    <p><strong>Stateless (Packet Filter):</strong> The oldest type. Inspects packets individually against simple rules (ACLs) looking only at Source IP, Dest IP, and Port. Very fast, but easily fooled and offers low security.</p>
                    <p><strong>Stateful Firewall:</strong> Maintains a 'state table' tracking active connections (e.g., TCP handshakes). If you request a website, it remembers your request and automatically allows the reply back through. Highly secure against spoofing.</p>
                `,
                realLifeExample: "Stateless is a bouncer checking IDs but forgetting you immediately. Stateful is a bouncer who checks your ID, stamps your hand, and remembers you when you go outside and come back in.",
                notes: "Modern networks require stateful inspection.",
                keyPoints: [
                    "Stateless = No memory, fast.",
                    "Stateful = Tracks connections, secure.",
                    "ACLs = Access Control Lists."
                ]
            },
            {
                type: "content",
                title: "Proxy Firewalls (Application Layer)",
                content: `
                    <p><strong>Definition:</strong> Acts as an intermediary. The client connects to the proxy, the proxy connects to the server on the client's behalf. The client and server never directly connect.</p>
                    <p><strong>Deep Inspection:</strong> It operates at Layer 7 (Application). It doesn't just look at IPs; it reads the actual HTTP web traffic, looking for SQL injections, viruses, or inappropriate content.</p>
                    <p><strong>Disadvantage:</strong> High performance overhead (slow) because it must fully rebuild and inspect every packet.</p>
                `,
                realLifeExample: "A translator at a meeting. You speak to the translator, they check your words for insults, and then they speak to the other person. You never speak to the other person directly.",
                notes: "Proxies provide the deepest level of security but are the slowest.",
                keyPoints: [
                    "Breaks direct connection.",
                    "Layer 7 (Application) inspection.",
                    "Can be slow."
                ]
            },
            {
                type: "content",
                title: "Next-Generation Firewall (NGFW)",
                content: `
                    <p><strong>Definition:</strong> An NGFW is a network security appliance that builds on classic <strong>stateful firewall</strong> functions (routing IP/port rules and tracking connection state) but adds deeper insight and enforcement. It ties traffic not only to <strong>five-tuple</strong> headers (IPs, ports, protocol) but to <strong>applications</strong>, <strong>users or groups</strong> (often via integration with LDAP/Active Directory), and <strong>content</strong> inside sessions.</p>
                    <p><strong>Capabilities (typical):</strong> <strong>Application awareness</strong> so policies can say “allow Microsoft 365 email” rather than blindly opening TCP 443; <strong>Deep Packet Inspection (DPI)</strong> and protocol-aware parsing; embedded or coupled <strong>IPS</strong> (and sometimes IDS) against exploits and anomalies; optional <strong>SSL/TLS inspection</strong> (decrypt, inspect, re-encrypt) where policy allows; <strong>URL filtering</strong>, <strong>malware/antivirus signatures</strong>, and sometimes <strong>sandbox/file detonation</strong> for unknown payloads; feeds from <strong>threat intelligence</strong>. Many vendors ship these as blades or subscriptions on one platform.</p>
                    <p><strong>Compared to legacy firewalls:</strong> Older stateful/perimeter gear mainly asked “Which IP/port is this?” NGFW asks “Which <em>application</em> and <em>user</em>, is it allowed, does the payload match a threat?” That reduces reliance on pretending every attack uses predictable ports.</p>
                    <p><strong>Trade-offs:</strong> Higher CPU/memory and licensing complexity; TLS decryption raises <strong>privacy and key-management</strong> requirements; sizing and tuning (App-IDs, updates) matter or risk latency and misses.</p>
                `,
                realLifeExample: "A classic firewall is airport security counting bags by weight only. An NGFW is security that reads bag labels (application), ties them to your passport (identity), scans inside with X‑ray rules (IPS/DPI), and can block forbidden items—even if someone hides them in an allowed-looking suitcase.",
                notes: "Exam tip: cite stateful baseline + App-ID/use identity + DPI/IPS (+ optional TLS inspect) when defining NGFW. Examples: Palo Alto PA-Series, Fortinet FortiGate, Cisco Secure Firewall (formerly FirePOWER).",
                keyPoints: [
                    "Stateful inspection + application/user awareness + DPI.",
                    "Often includes IPS, URL/filtering, malware, threat intel on one chassis.",
                    "TLS inspection optional but sensitive (keys, privacy, perf).",
                    "Costs more to size and tune than plain packet/stateful ACLs."
                ]
            },
            {
                type: "content",
                title: "IDS vs IPS",
                content: `
                    <p><strong>IDS (Intrusion Detection System):</strong> A passive monitor. It watches network traffic, compares it to known malicious signatures, and generates an <strong>alert</strong> if it sees an attack. It does NOT stop the attack.</p>
                    <p><strong>IPS (Intrusion Prevention System):</strong> An active device placed inline. It watches traffic, and if it detects an attack, it <strong>blocks the traffic</strong> and drops the packets immediately.</p>
                `,
                realLifeExample: "IDS is a security camera (records the crime and alerts guards). IPS is a guard dog (actively attacks the intruder and stops them).",
                notes: "IPS is inline (in the path of traffic). IDS is passive (out of band).",
                keyPoints: [
                    "IDS = Detect & Alert (Passive).",
                    "IPS = Detect & Block (Active).",
                    "Often integrated into Next-Gen Firewalls."
                ]
            },
            {
                type: "quiz",
                question: "Which type of firewall maintains a table of active connections to dynamically allow return traffic?",
                options: [
                    "Stateless Packet Filter",
                    "Stateful Firewall",
                    "Web Application Firewall (WAF)",
                    "Intrusion Detection System (IDS)"
                ],
                correctAnswer: 1,
                explanation: "<strong>Detailed Explanation:</strong> A <strong>Stateful Firewall</strong> keeps track of the state of network connections (such as TCP streams, UDP communication) in a state table. This allows it to distinguish legitimate responses to internal requests from unsolicited external attacks."
            }
        ]
    },
    {
        id: "malware",
        title: "10. Malware & Intrusion Detection",
        description: "Viruses, Trojans, Ransomware, and Rootkits.",
        slides: [
            {
                type: "content",
                title: "Malware Types",
                content: `
                    <p><strong>Virus:</strong> Malicious code that attaches itself to a legitimate executable file. It requires user interaction (e.g., clicking the file) to run and spread.</p>
                    <p><strong>Worm:</strong> Standalone malware that self-replicates and spreads across networks <em>without</em> user interaction by exploiting vulnerabilities.</p>
                    <p><strong>Trojan:</strong> Malware disguised as legitimate software (like a free game). It tricks the user into installing it, then opens a backdoor for attackers.</p>
                `,
                realLifeExample: "Virus = A cold you get from shaking hands (interaction). Worm = Airborne flu spreading through the vents (no interaction). Trojan = A poisonous apple disguised as a gift.",
                notes: "Worms are the most dangerous for rapid network compromise.",
                keyPoints: [
                    "Viruses need a host file.",
                    "Worms self-replicate over networks.",
                    "Trojans disguise themselves."
                ]
            },
            {
                type: "content",
                title: "Ransomware & Rootkits",
                content: `
                    <p><strong>Ransomware:</strong> Encrypts user files or locks the entire system, demanding payment (usually crypto) to provide the decryption key. Best defense is offline immutable backups.</p>
                    <p><strong>Rootkit:</strong> Extremely stealthy malware that hides deep in the Operating System (often at the kernel level). It modifies the OS so that antivirus tools and task managers cannot see it running.</p>
                `,
                realLifeExample: "Ransomware is someone putting a boot on your car and demanding cash. A Rootkit is a spy replacing your car's dashboard so it always shows the speed limit even when you are speeding.",
                notes: "Rootkits often require completely reinstalling the OS to remove.",
                keyPoints: [
                    "Ransomware = Extortion via encryption.",
                    "Rootkit = Kernel-level stealth.",
                    "Rootkits hide from Antivirus."
                ]
            },
            {
                type: "quiz",
                question: "What is the defining characteristic of a network 'Worm'?",
                options: [
                    "It hides its files from the operating system.",
                    "It encrypts user data for a ransom.",
                    "It self-replicates and spreads across networks without human interaction.",
                    "It requires the user to click an executable to run."
                ],
                correctAnswer: 2,
                explanation: "<strong>Detailed Explanation:</strong> The hallmark of a worm is its ability to <strong>self-propagate</strong>. While viruses require a user to execute an infected file, worms actively scan networks for vulnerable services (like unpatched SMB ports) and automatically copy themselves over, spreading like wildfire."
            }
        ]
    },
    {
        id: "hacking-pen",
        title: "11. Ethical Hacking & Pen Testing",
        description: "Penetration Testing Phases and Methodologies.",
        slides: [
            {
                type: "content",
                title: "The Penetration Testing Process",
                content: `
                    <p><strong>1. Reconnaissance:</strong> Gathering intelligence on the target (Passive: public records; Active: port scanning).</p>
                    <p><strong>2. Scanning/Enumeration:</strong> Probing for open ports, running services, and specific software versions to find vulnerabilities.</p>
                    <p><strong>3. Exploitation:</strong> Actually launching the attack to gain access to the system using the found vulnerabilities.</p>
                    <p><strong>4. Maintaining Access:</strong> Installing backdoors or rootkits to ensure the hacker can return later.</p>
                    <p><strong>5. Covering Tracks:</strong> Deleting logs to hide evidence of the attack.</p>
                `,
                realLifeExample: "Robbing a bank: Recon (watching the guards), Scanning (checking if the side door is unlocked), Exploitation (picking the lock), Maintaining Access (leaving a wedge in the door), Covering Tracks (erasing the security tapes).",
                notes: "Ethical hackers stop at Exploitation and report the findings.",
                keyPoints: [
                    "Recon is the longest phase.",
                    "Enumeration finds the exact weakness.",
                    "Exploitation is gaining entry."
                ]
            },
            {
                type: "quiz",
                question: "Which phase of a penetration test involves actively extracting usernames, machine names, and network resources?",
                options: [
                    "Reconnaissance",
                    "Enumeration",
                    "Exploitation",
                    "Covering Tracks"
                ],
                correctAnswer: 1,
                explanation: "<strong>Detailed Explanation:</strong> <strong>Enumeration</strong> is the highly active phase where the attacker connects to open ports and extracts detailed, specific information from the OS, such as user lists, routing tables, and share names, which are then used to plan the direct exploitation."
            }
        ]
    }
];

if (typeof appData !== 'undefined') {
    appData.courses = appData.courses.concat(appDataPart3);
} else {
    window.appDataPart3 = appDataPart3;
}
