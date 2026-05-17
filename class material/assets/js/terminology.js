// CSY3062 — Terminology glossary (firewall + merged extended entries from terminology-extra.js)
// Sources: all workspace PDF/PPTX/DOCX/HTML (74 files), Study Notes modules 1–14

const terminologyFirewallEntries = [
    {
        id: "term-firewall",
        category: "Firewall Basics",
        term: "Firewall",
        definition: "A security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules. It can be hardware-based, software-based, or both. The firewall sits at the boundary between your trusted internal network and untrusted networks (usually the Internet), acting as a gatekeeper that allows or blocks traffic.",
        example: "Without a firewall, every host on your LAN can be reached directly from the Internet. With one, only traffic matching your rules (e.g. allow HTTPS to the web server) gets through.",
        points: ["Implements the organisation's Internet Access Policy.", "First program to receive inbound traffic; last to handle outbound.", "Reduces network vulnerability but is not a complete security solution."]
    },
    {
        id: "term-network-fw",
        category: "Firewall Basics",
        term: "Network Firewall",
        definition: "A firewall deployed at the network perimeter (or between network segments) that filters traffic for many hosts. It enforces rules on IP addresses, ports, protocols, and—on modern devices—applications and users.",
        example: "The router/firewall at your office Internet connection that blocks inbound RDP but allows staff web browsing outbound.",
        points: ["Contrast with host-based firewall on a single PC.", "Often combined with NAT and VPN termination."]
    },
    {
        id: "term-host-fw",
        category: "Firewall Basics",
        term: "Host-Based Firewall",
        definition: "Software running on an individual computer or server that filters traffic to and from that host only. Examples include Windows Defender Firewall and Linux iptables/nftables on the machine itself.",
        example: "Your laptop blocks incoming connections on all ports except when you enable file sharing on the home network.",
        points: ["Defence even if perimeter is breached.", "Part of endpoint hardening (CIS benchmarks)."]
    },
    {
        id: "term-perimeter",
        category: "Firewall Basics",
        term: "Perimeter Security Device",
        definition: "Security placed at the edge between internal and external networks. A perimeter firewall protects internal hosts from attacks originating outside, but cannot by itself stop attacks that start inside the network (insider threats).",
        example: "A castle wall keeps out invaders from the field—it does not stop a thief who already lives inside the castle.",
        points: ["Statistics: many breaches involve insiders.", "Complement with IDS, segmentation, and physical controls."]
    },
    {
        id: "term-iap",
        category: "Policies & Governance",
        term: "Internet Access Policy (IAP)",
        definition: "The business rules that define what Internet services are allowed, when, and for whom. The firewall is the technical device that enforces this policy—it does not decide policy by itself. Senior management / information owners set policy; administrators implement it in firewall rules.",
        example: "Policy: 'Staff may use web and email during work hours; gaming sites blocked.' The firewall translates that into allow/deny rules for ports, URLs, or applications.",
        points: ["Wrong to assume only the sysadmin decides allowed services.", "Policy must be reviewed when business needs change."]
    },
    {
        id: "term-acl",
        category: "Firewall Basics",
        term: "Access Control List (ACL)",
        definition: "A numbered or named list of permit/deny rules matched against packet headers (source/destination IP, port, protocol). Used by packet-filtering firewalls and routers. Rules are typically processed top-down until a match occurs.",
        example: "Rule 10: deny TCP any any eq 23. Rule 20: permit IP any any. (Block Telnet, allow everything else.)",
        points: ["Implicit deny at end is best practice.", "Order matters—place specific rules before broad permits."]
    },
    {
        id: "term-packet-filter",
        category: "Firewall Types",
        term: "Packet Filtering Firewall (Stateless)",
        definition: "The oldest firewall type. Examines each packet in isolation against ACL rules using Layer 3/4 headers (IP, port, protocol) with no memory of prior packets. Very fast but weak security—easy to spoof or fragment around.",
        example: "A bouncer who checks your ID on every single step through the door but forgets you immediately—someone can sneak in by mimicking a valid return packet.",
        points: ["Also called stateless firewall.", "Good for simple edge drops or very high-speed filtering.", "Cannot understand TCP connection state."]
    },
    {
        id: "term-stateful",
        category: "Firewall Types",
        term: "Stateful Firewall (SPI)",
        definition: "Stateful Packet Inspection maintains a dynamic state table tracking active connections (TCP handshake, UDP flows). Return traffic for an outbound request is automatically allowed; unsolicited inbound packets are dropped unless a rule explicitly permits them.",
        example: "You request a website—the firewall records the connection. When the server's reply comes back, it matches the table entry and is allowed without a separate inbound rule.",
        points: ["SPI = Stateful Packet Inspection.", "More secure against spoofed 'reply' packets.", "Uses more memory/CPU than stateless."]
    },
    {
        id: "term-state-table",
        category: "Firewall Types",
        term: "State Table / Connection Table",
        definition: "In-memory table where a stateful firewall records active flows (typically the five-tuple: source IP, destination IP, source port, destination port, protocol). Entries expire when the connection closes or times out.",
        example: "After you open 50 browser tabs, the firewall may hold 50+ state entries for your PC until they idle out.",
        points: ["State exhaustion is a possible DDoS vector.", "Essential for correct TCP behaviour through NAT."]
    },
    {
        id: "term-proxy-fw",
        category: "Firewall Types",
        term: "Proxy Firewall (Application-Layer)",
        definition: "Acts as an intermediary at Layer 7. The client connects to the proxy; the proxy connects to the real server. Traffic is terminated and rebuilt, enabling deep inspection of HTTP, FTP, etc. Breaks direct client–server connections.",
        example: "A translator in a meeting—you speak to the translator, they check your words, then speak to the other person. Neither side talks directly.",
        points: ["Can block SQL injection, malware URLs in HTTP.", "Slower than packet/stateful filters.", "Users often reach Internet only via corporate proxy."]
    },
    {
        id: "term-ngfw",
        category: "Firewall Types",
        term: "Next-Generation Firewall (NGFW)",
        definition: "Builds on stateful inspection by adding application identification (App-ID), user identity (AD/LDAP integration), deep packet inspection, integrated IPS, URL filtering, optional SSL/TLS decryption, and threat intelligence feeds.",
        example: "Instead of 'allow TCP 443', policy says 'allow Microsoft 365 for Finance group' and blocks risky file uploads inside HTTPS.",
        points: ["Examples: Palo Alto, FortiGate, Cisco Secure Firewall.", "Higher cost and tuning effort than basic firewalls.", "Often the enterprise perimeter standard today."]
    },
    {
        id: "term-dpi",
        category: "Firewall Types",
        term: "Deep Packet Inspection (DPI)",
        definition: "Analysis of packet payloads beyond headers—looking inside protocols to classify applications, detect attacks, or enforce content policy. Used by NGFWs, IPS, and some proxies.",
        example: "Seeing that traffic on port 443 is actually video streaming, not generic web, and applying a bandwidth or block policy.",
        points: ["Raises privacy concerns when decrypting TLS.", "More CPU-intensive than header-only filtering."]
    },
    {
        id: "term-waf",
        category: "Firewall Types",
        term: "Web Application Firewall (WAF)",
        definition: "Specialised firewall focused on HTTP/HTTPS traffic to web applications. Protects against OWASP-style attacks (SQLi, XSS) at Layer 7. Often deployed in front of web servers in a DMZ.",
        example: "Blocking a login form submission containing `' OR 1=1 --` before it reaches the database.",
        points: ["Complements but does not replace secure coding.", "Can be cloud-based (e.g. in front of SaaS sites)."]
    },
    {
        id: "term-dmz",
        category: "Architecture",
        term: "DMZ (Demilitarized Zone)",
        definition: "A separate network subnet between the Internet and the internal LAN where public-facing servers live (web, email, DNS). External users can reach DMZ services; those servers should not have free access into the core internal network.",
        example: "Website and mail gateway sit in DMZ. Customer database stays on internal VLAN with no direct inbound Internet route.",
        points: ["Layered defence—compromise of DMZ ≠ instant core breach.", "Traffic flows controlled by two firewalls or one multi-homed firewall."]
    },
    {
        id: "term-screened-subnet",
        category: "Architecture",
        term: "Screened Subnet Architecture",
        definition: "Firewall architecture that creates a screened subnet (DMZ) using either two firewalls (external + internal) or one firewall with three interfaces (Internet, DMZ, internal). External traffic can only reach DMZ hosts; internal users reach DMZ under controlled rules before going to the Internet.",
        example: "Classic: Internet → outer firewall → DMZ (bastion hosts) → inner firewall → corporate LAN.",
        points: ["Most common enterprise DMZ design.", "Also called dual-firewall or three-homed design."]
    },
    {
        id: "term-bastion",
        category: "Architecture",
        term: "Bastion Host",
        definition: "A hardened server placed in the DMZ that offers services to external users (HTTP, FTP, SMTP). Built to withstand Internet attacks because it is directly exposed. Should be patched, minimally configured, and monitored.",
        example: "Public web server and mail relay in DMZ are bastion hosts—if hacked, attacker still must cross inner firewall to reach HR database.",
        points: ["Harden OS, disable unused services.", "Log and alert on bastion activity."]
    },
    {
        id: "term-dual-fw",
        category: "Architecture",
        term: "Dual-Firewall DMZ",
        definition: "Two firewalls with two interfaces each: one connects Internet↔DMZ, the other connects DMZ↔internal network. Provides stronger separation than a single three-interface device because compromise of one layer still leaves another.",
        example: "Outer Cisco ASA faces ISP; inner Palo Alto faces LAN; DMZ switch between them hosts web servers.",
        points: ["Different vendors optional (defence in diversity).", "More complex change management."]
    },
    {
        id: "term-three-homed",
        category: "Architecture",
        term: "Three-Homed Firewall",
        definition: "Single firewall with three network interfaces: Internet, DMZ, and internal. Rules define which traffic may flow between each zone. Simpler cabling than dual-firewall but single point of failure for policy enforcement.",
        example: "One FortiGate with WAN1, DMZ port, and LAN port configured as separate security zones.",
        points: ["Configure zones with least privilege between each pair.", "Still widely used in SMB networks."]
    },
    {
        id: "term-ids",
        category: "IDS / IPS",
        term: "IDS (Intrusion Detection System)",
        definition: "Passive security monitor that analyses traffic or host logs, compares activity to signatures or anomalies, and generates alerts. It does not block traffic—it only detects and reports.",
        example: "Security camera: records a break-in and notifies guards but cannot stop the intruder.",
        points: ["Can be network-based (NIDS) or host-based (HIDS).", "Risk of alert fatigue if not tuned.", "Often complements firewall for internal traffic."]
    },
    {
        id: "term-ips",
        category: "IDS / IPS",
        term: "IPS (Intrusion Prevention System)",
        definition: "Inline device that detects malicious traffic and actively blocks or drops it. Sits in the traffic path like a firewall. Can be standalone or integrated into NGFW.",
        example: "Guard dog that bites an intruder and stops them entering.",
        points: ["False positives can break legitimate apps.", "Requires careful tuning and change control."]
    },
    {
        id: "term-least-privilege-fw",
        category: "Policies & Governance",
        term: "Least Privilege (Firewall Rules)",
        definition: "Firewall design principle: default deny all traffic, then explicitly allow only what is required. Avoid 'allow any outbound' or unnecessary open inbound ports. Reduces attack surface and data exfiltration paths.",
        example: "Start with deny-all; add allow outbound DNS to resolver, HTTPS to proxy, deny rest.",
        points: ["Implicit deny rule at bottom of ACL.", "Review rules when services are decommissioned."]
    },
    {
        id: "term-egress",
        category: "Policies & Governance",
        term: "Egress Filtering / Outbound Traffic Control",
        definition: "Controlling traffic leaving your network to the Internet. Unrestricted outbound traffic lets malware call command-and-control servers and exfiltrate data even after perimeter inbound rules are strict.",
        example: "Ransomware on a PC tries to beacon out—egress firewall blocks unknown destinations and logs the attempt.",
        points: ["As important as inbound filtering.", "Often overlooked in misconfigured perimeters."]
    },
    {
        id: "term-logging-fw",
        category: "Policies & Governance",
        term: "Firewall Logging & Monitoring",
        definition: "Recording allowed/denied flows (source, destination, port, action, time) and sending logs to a SIEM for analysis. Without logging, attacks and policy violations go unnoticed and forensics is impossible.",
        example: "After a breach, analysts search firewall logs for unusual outbound connections at 3 AM.",
        points: ["Log retention and tamper protection matter.", "Correlate with IDS and endpoint telemetry."]
    },
    {
        id: "term-fw-limit-integrity",
        category: "Limitations & Threats",
        term: "Firewall Limitation — Data Integrity",
        definition: "Firewalls do not guarantee that packet contents are uncorrupted or unmodified in transit. Integrity is provided by higher-layer mechanisms (TLS, hashes, signatures), not by filtering alone.",
        example: "Firewall allows HTTPS but cannot tell if the file inside was tampered with before encryption.",
        points: ["Pair firewalls with TLS and endpoint controls."]
    },
    {
        id: "term-fw-limit-auth",
        category: "Limitations & Threats",
        term: "Firewall Limitation — Source Authenticity",
        definition: "Firewalls generally do not verify that the true sender is who the IP address claims to be. Spoofing and MITM can occur outside or despite firewall rules unless additional auth (VPN, mTLS) is used.",
        example: "Attacker spoofs internal IP unless anti-spoofing and segmentation stop it.",
        points: ["Use BCP38 egress filtering.", "Do not trust IP alone for identity."]
    },
    {
        id: "term-fw-limit-confidentiality",
        category: "Limitations & Threats",
        term: "Firewall Limitation — Confidentiality",
        definition: "Firewalls do not encrypt traffic. Confidentiality requires VPN, TLS, or other crypto between endpoints. A firewall with VPN feature can help, but plain packet filter does not hide data.",
        example: "Allowing HTTP through the firewall leaves passwords readable on the wire inside your LAN segments.",
        points: ["Encrypt sensitive flows end-to-end.", "VPN for remote access."]
    },
    {
        id: "term-fw-limit-insider",
        category: "Limitations & Threats",
        term: "Firewall Limitation — Insider Threats",
        definition: "Perimeter firewalls cannot stop attacks originating from inside the network—malicious employees, compromised laptops, or lateral movement after a phishing success. Internal segmentation and monitoring are required.",
        example: "Employee on LAN scans and attacks internal payroll server; perimeter firewall never sees it as 'external'.",
        points: ["Most org attacks involve internal origin statistically cited in teaching material.", "Use IDS, micro-segmentation, zero trust."]
    },
    {
        id: "term-fw-limit-bypass",
        category: "Limitations & Threats",
        term: "Firewall Bypass (Traffic Not Through Firewall)",
        definition: "Firewalls only control traffic that passes through them. Backdoors like dial-up modems, rogue Wi‑Fi, USB exfiltration, or cloud tunnels can bypass perimeter controls entirely.",
        example: "Staff tether phone to laptop and upload files to personal cloud—corporate firewall never inspects that path.",
        points: ["Policy + DLP + NAC reduce bypass.", "Once traffic passes through, firewall cannot re-inspect downstream."]
    },
    {
        id: "term-fw-spof",
        category: "Limitations & Threats",
        term: "Single Point of Failure",
        definition: "If the perimeter firewall fails or is misconfigured open, the entire network may be exposed. High availability (HA pairs), backups, and tested recovery plans are essential.",
        example: "Firewall crash during patch window leaves site offline or, worse, fails open allowing all traffic.",
        points: ["HA active/passive clusters common.", "Protect admin access to firewall tightly."]
    },
    {
        id: "term-fw-internal-attack",
        category: "Limitations & Threats",
        term: "Internal Network Attack",
        definition: "Attack where the threat actor is already inside the LAN (insider, malware, VPN compromise). Perimeter firewall rules designed for north-south traffic do not apply the same way to east-west internal traffic.",
        example: "Ransomware spreads SMB share to share after one phishing click—perimeter never involved.",
        points: ["Complement with internal firewalls / micro-segmentation.", "IDS on internal spans."]
    },
    {
        id: "term-five-tuple",
        category: "Related Network Terms",
        term: "Five-Tuple",
        definition: "The five key fields used to identify a connection: source IP, destination IP, source port, destination port, and protocol (TCP/UDP/ICMP). Stateful firewalls and NAT use the five-tuple for tracking flows.",
        example: "192.168.1.10:52431 → 93.184.216.34:443 TCP is one unique flow entry.",
        points: ["Basis of most connection state tables.", "IPv6 uses same concept with longer addresses."]
    },
    {
        id: "term-nat",
        category: "Related Network Terms",
        term: "NAT (Network Address Translation)",
        definition: "Maps private internal IPs to a public IP (or pool) on outbound traffic and reverses it for replies. Often combined with firewalls on home/SMB routers. Hides internal topology but is not a security substitute for filtering.",
        example: "Whole office shares one public IP; firewall tracks which internal PC each return packet belongs to.",
        points: ["NAT ≠ firewall though both on same device.", "Complicates some protocols (SIP, VPN)."]
    },
    {
        id: "term-vpn-fw",
        category: "Related Network Terms",
        term: "VPN and Firewall Integration",
        definition: "Virtual Private Network tunnels encrypted traffic through the Internet. Firewalls may terminate SSL/IPsec VPN for remote users. Firewall alone does not encrypt user data unless VPN features are enabled and configured.",
        example: "Remote worker VPNs into firewall; once inside, same rules as on-site LAN apply.",
        points: ["VPN provides confidentiality on untrusted paths.", "MFA on VPN login strongly recommended."]
    },
    {
        id: "term-chapman",
        category: "Architecture",
        term: "Chapman / Belt-and-Braces Architectures",
        definition: "Named screened-subnet variants from teaching material: 'Classic' (router + DMZ + bastion + internal), 'Belt and braces' (extra router layers), 'Chapman' (application proxy with separate FTP/WWW), 'Separate services' (distinct subnets per service). All emphasise layered DMZ designs.",
        example: "Chapman puts application proxy between Internet and internal web—extra inspection hop.",
        points: ["Know diagram labels for exams.", "Goal: defence in depth at architecture level."]
    },
    {
        id: "term-implicit-deny",
        category: "Policies & Governance",
        term: "Implicit Deny / Default Deny",
        definition: "Security best practice where anything not explicitly allowed is blocked. The last rule on a firewall ACL is often 'deny all'. Opposite of default permit, which is dangerous.",
        example: "Only rules 1–20 permit specific services; rule 21 deny ip any any catches everything else.",
        points: ["Core of least privilege.", "Document exceptions carefully."]
    }
];

const terminologyExtended = typeof terminologyExtendedEntries !== "undefined"
    ? terminologyExtendedEntries
    : [];

window.terminologyEntries = terminologyExtended.concat(terminologyFirewallEntries);
