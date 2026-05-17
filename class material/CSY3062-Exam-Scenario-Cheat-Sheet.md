# CSY3062 / CSY3023 — Exam Scenario Cheat Sheet

Use this when any scenario question appears. **Structure every answer the same way** so markers see clear thinking.

---

## 1. Universal answer template (use for ANY scenario)

Copy this skeleton and fill in the blanks:

```
1. IDENTIFY the problem
   - What went wrong? (misconfiguration / wrong crypto / malware / policy gap)
   - Which security goal failed? (Confidentiality / Integrity / Availability)

2. EXPLAIN why it is a risk
   - Who could exploit it? (external attacker / insider / malware)
   - What is the impact? (data leak / fraud / downtime / compliance fine)

3. RECOMMEND controls (be specific)
   - Technical: encryption, firewall rules, MFA, EDR, backups, segmentation
   - Process: policy, training, IR plan, patching, key rotation
   - Monitoring: logging, SIEM, alerts

4. JUSTIFY (one line)
   - "This follows least privilege / defense in depth / NIST Protect-Detect-Respond"
```

**Opening sentence starters (pick one):**
- "The organisation has failed to apply the principle of least privilege because…"
- "This scenario primarily threatens **confidentiality** because…"
- "The root cause is a **key management** failure, not the algorithm itself…"
- "Perimeter controls alone cannot stop this because the threat originates **inside** the network…"

---

## 2. CIA Triad — map every scenario in 10 seconds

| Goal | Question to ask | Example controls |
|------|-----------------|------------------|
| **Confidentiality** | Who can read the data? | Encryption (AES/TLS), access control, VPN |
| **Integrity** | Can data be changed unnoticed? | Hashing (SHA-256), digital signatures, versioning |
| **Availability** | Can users reach systems when needed? | Backups, redundancy, anti-DDoS, patching |

**One-liner:** *"AES at rest protects confidentiality; hashing + signatures protect integrity; backups and HA protect availability."*

---

## 3. Topic finder — if the scenario mentions…

| Keywords in scenario | Topic | Jump to section |
|---------------------|-------|-----------------|
| AES, ECB, CBC, encrypt database, data at rest | Symmetric crypto | §4 |
| RSA, key exchange, 1024-bit, private key on server | Asymmetric / key mgmt | §5 |
| Email, PGP, GPG, signature, web of trust, wrong key | PGP | §6 |
| Trojan, virus, worm, rootkit, ransomware, AV failed | Malware | §7 |
| Firewall, DMZ, inbound/outbound, stateful, proxy, NGFW | Firewalls | §8 |
| Key lifecycle, KMS, HSM, rotation, revocation, envelope | Key management | §5 |
| SQL injection, XSS, web app, OWASP | Web security | §9 |
| VPN, IPsec, remote worker | VPN | §10 |
| NIST, ISO 27001, framework, governance, risk | Frameworks | §11 |
| Pen test, vulnerability scan, ethical hacker | Pen testing | §12 |
| Playfair, Hill, Caesar, classical cipher | Classical crypto | §13 |
| Wi‑Fi, WPA, rogue AP | Wireless | §14 |

---

## 4. Cryptography scenarios

### 4.1 Symmetric (AES) — data at rest / database

**Problem patterns:** keys stored with data; ECB mode; weak key; no rotation.

**Write this:**
> AES is a symmetric block cipher (128-bit blocks; keys 128/192/256). The same secret key encrypts and decrypts. It is fast for large data (databases, disks). The weakness here is **key management**—keys must never sit on the same server as ciphertext without strong access control. Prefer **AES-256** in a secure mode (**GCM** or CBC with HMAC), not ECB (ECB leaks patterns in repeated data).

**Controls checklist:**
- [ ] Encrypt data at rest (BitLocker, DB TDE, AES-256-GCM)
- [ ] Store keys in HSM / KMS / separate vault—not beside the DB
- [ ] Rotate keys; separate duties (admin ≠ key custodian)
- [ ] TLS for data in transit as well

**Analogy:** *"Same house key locks and unlocks—fast, but if you tape the key under the doormat (same server), a burglar gets everything."*

---

### 4.2 Asymmetric (RSA) — key exchange / email bootstrap

**Write this:**
> RSA uses a public/private key pair. Anyone encrypts with the **recipient's public key**; only the recipient's **private key** decrypts. It solves key distribution but is **slow** for bulk data. Use RSA (2048+ bits) to wrap a session key, then use **AES** for the message (hybrid encryption—same as TLS/HTTPS).

**Common exam mistakes to mention:**
- Private key stored unencrypted → full compromise
- 1024-bit RSA → obsolete; use 2048+
- No certificate / no CA → MITM risk

**Hybrid one-liner:** *"RSA ships the small lock; AES carries the heavy box."*

---

### 4.3 Symmetric vs asymmetric (comparison table)

| | Symmetric (AES) | Asymmetric (RSA/ECC) |
|---|----------------|----------------------|
| Keys | One shared secret | Public + private pair |
| Speed | Very fast | Slow |
| Best for | Bulk data, disks, sessions | Key exchange, signatures |
| Main problem | Key distribution | Key size / performance |
| Exam example | Laptop disk encryption | HTTPS handshake, signing email |

---

### 4.4 AES modes (if ECB mentioned)

> **ECB (Electronic Codebook)** encrypts each block independently—identical plaintext blocks produce identical ciphertext (patterns visible). **Do not use ECB** for structured data. Use **GCM** (authenticated encryption) or CBC with proper IV and integrity check.

---

## 5. Cryptographic key management (Module IX PPTX + scenarios)

### 5.1 What is key management?

> **Cryptographic key management** is the secure handling of keys through their whole life: **generation, storage, distribution, usage, rotation, revocation, and destruction**. Strong algorithms (AES, RSA) fail if keys are stolen, shared, or stored beside the data they protect.

**Why it is critical (exam lines):**
- Strong algorithms fail if keys are compromised
- Improper key handling causes breaches
- Key management underpins trust in all crypto systems

### 5.2 Types of keys

| Key type | Use | Exam note |
|----------|-----|-----------|
| **Symmetric key** | Same key encrypts and decrypts (AES) | Fast; distribution is the hard problem |
| **Asymmetric key pair** | Public + private (RSA, ECC) | Public encrypts for you; private decrypts |
| **Session key** | Temporary key for one connection | Often generated per TLS/HTTPS session |

### 5.3 Key lifecycle (memorise this order)

| Stage | What to say in scenarios |
|-------|--------------------------|
| **Generation** | Use cryptographically secure random (CSPRNG); weak random = predictable keys |
| **Storage** | HSM, KMS, vault—never plaintext on app/DB server; least privilege access |
| **Distribution** | TLS, DH, RSA key wrap; asymmetric solves "how to share secret" |
| **Usage** | Audit who used keys; separate duties |
| **Rotation / renewal** | Change keys on schedule and after incident; limits blast radius |
| **Revocation** | CRL, OCSP for certificates; disable compromised keys immediately |
| **Destruction** | Securely erase expired keys (software + hardware) |

### 5.4 KMS, HSM, and cloud

> **HSM (Hardware Security Module):** tamper-resistant hardware for generating and storing keys.  
> **KMS (Key Management System):** automates lifecycle; reduces human error (AWS KMS, Azure Key Vault, HashiCorp Vault).  
> **Cloud KMS:** shared responsibility—provider secures platform; you control IAM, auditing, key policies.

### 5.5 Envelope encryption (healthcare / database scenarios)

> Encrypt data with a **data encryption key (DEK)**; encrypt the DEK with a **key encryption key (KEK)** stored in KMS/HSM. Compromise of one DB file does not expose the master key if DEKs are wrapped properly.

### 5.6 Common threats & best practices

| Threat | Mitigation |
|--------|------------|
| Key theft / leakage | HSM, KMS, no keys in Git/env on servers |
| Insider abuse | Separation of duties, dual control, audit logs |
| Poor access control | Least privilege, MFA for key admins |
| No rotation | Policy: quarterly or after incident |
| Keys on same server as data | **Never**—use KMS/HSM off-host |

**Always mention in crypto scenarios:**
1. Keys **confidential** at rest (encrypted in vault)
2. **Separation**—encryption admin ≠ key recovery admin
3. **Rotation** on schedule + after breach
4. **Revocation** when staff leave or key exposed
5. **Backup** of keys (secure, tested restore)

**Sentence:** *"Strong algorithms fail when keys are treated like ordinary files on the application server."*

---

## 6. PGP / GPG scenarios

### 6.1 How PGP works (short paragraph)

> PGP uses **hybrid encryption**: a random symmetric session key encrypts the message (fast); the session key is encrypted with the recipient's **public** key. For signing, the sender hashes the message and encrypts the hash with their **private** key. Recipients verify with the sender's **public** key.

### 6.2 Common scenario problems & fixes

| Problem | Risk | Fix |
|---------|------|-----|
| Encrypted to wrong public key | Wrong person reads / nobody reads | Verify fingerprint; use key signing |
| Private key shared / no passphrase | Theft = full impersonation | One key per user; strong passphrase; hardware token |
| Unverified key from internet | MITM / fake "CEO" key | Web of trust, signing parties, internal key directory |
| Expired keys on keyring | Wrong key chosen | Key hygiene, revocation, annual audit |
| No revocation cert published | Cannot retire compromised key | Publish revocation; maintain key server |

**Web of trust one-liner:** *"Users sign each other's keys after ID check—decentralised trust, unlike CA hierarchy in TLS."*

**vs PKI:** *"TLS uses CAs; PGP uses web of trust or corporate key server."*

---

## 7. Malware scenarios

### 7.1 Types (know the difference)

| Type | How it spreads | User action needed? | Exam phrase |
|------|----------------|---------------------|-------------|
| **Virus** | Attaches to host file | Yes (run file) | "Needs a host program" |
| **Worm** | Network self-replication | No | "Exploits vulnerabilities at scale" |
| **Trojan** | Disguised as legit software | Yes (tricked install) | "Social engineering delivery" |
| **Ransomware** | Often worm/trojan delivery | Varies | "Encrypts data; extortion" |
| **Rootkit** | After compromise | — | "Hides in kernel; evades AV" |
| **Logic bomb** | Embedded code | Trigger event | "Insider / timed trigger" |

### 7.2 Trojan vs rootkit (mock-test favourite)

**Trojan:** User-level, deception, often detected by AV/EDR. **Remove** with AV, isolate host, reset passwords.

**Rootkit:** Kernel/boot level, hides from OS tools. **Do not trust** AV alone. **Wipe and re-image** from clean media; rotate all credentials; offline forensic scan if required.

### 7.3 AV failed / zero-day — what to recommend

1. **EDR** (behavioural detection, not signatures only)
2. **Application whitelisting** where possible
3. **Network segmentation** (limit lateral movement)
4. **User training** (phishing is #1 delivery)
5. **Backups** (offline/immutable for ransomware)
6. **SIEM** + IR plan (detect beaconing, C2 traffic)
7. **Patch management** (close exploited CVEs)

**Indicators to list:** high CPU idle, unknown processes, disabled AV, new startup entries, outbound beaconing, impossible-travel logins, fraud on accounts.

### 7.4 Enterprise malware defence (layered)

> Defence in depth: perimeter firewall + email filtering + endpoint AV/EDR + patching + least privilege + backups + IR plan + user awareness. No single product is sufficient.

---

## 8. Firewall scenarios

### 8.1 Misconfigured perimeter (template answer)

**Weaknesses to spot:**
- Allow all outbound (malware C2, data exfiltration)
- Unnecessary inbound ports open
- No logging / monitoring
- Default permit instead of **implicit deny**

**Secure rule set (least privilege):**
```
1. DENY all (implicit deny at end)
2. ALLOW outbound only: DNS to resolver, HTTPS to proxy, required app ports
3. ALLOW inbound only: 443 to DMZ web servers from Internet
4. DENY direct Internet → internal LAN
5. LOG all deny and sensitive allow rules → SIEM
```

**Why logging matters:** *"Without logs, attacks and policy violations are invisible; forensics impossible."*

### 8.2 DMZ architecture (web + database)

**Write this:**
> Place public web servers in a **DMZ** (screened subnet) between Internet and internal network. Internet → outer firewall → DMZ (bastion hosts) → inner firewall → internal DB. Database has **no direct inbound route** from Internet. Traffic flows: user → web (DMZ) → app → DB (internal only).

**Diagram words:** Internet | Router/FW | DMZ (WWW, mail) | FW | Internal LAN (DB, HR)

**Architectures to name:** Classic, Belt and braces, Chapman (app proxy), Separate services per subnet.

### 8.3 Stateless vs stateful

| | Stateless (packet filter) | Stateful (SPI) |
|---|---------------------------|----------------|
| Memory | None per flow | State table (5-tuple) |
| Security | Weak (spoofing) | Stronger (tracks handshake) |
| Speed | Very fast | Moderate |
| Exam line | "Checks each packet alone" | "Remembers legitimate sessions" |

**Recommend:** Stateful at perimeter; stateless only for simple/high-speed drops.

### 8.4 Proxy / application firewall

> Proxy terminates client connection at **Layer 7**, inspects HTTP/FTP content (SQLi, malware URLs), then opens new connection to server. Client and server never connect directly. **Slower** but deepest inspection. Use for outbound web control and DMZ web protection.

### 8.5 Next-Generation Firewall (NGFW) — full detail

**Definition:** An NGFW builds on **stateful firewall** functions (IP/port rules + connection state table / five-tuple) but adds:

| Capability | What it means |
|------------|---------------|
| **Application awareness (App-ID)** | Knows *which app* (e.g. Teams, YouTube) not only port 443 |
| **User / group identity** | Policy by AD/LDAP user or group, not only IP |
| **Deep Packet Inspection (DPI)** | Inspects payload inside sessions |
| **Integrated IPS** | Blocks exploits and malware inline |
| **URL / content filtering** | Block categories or file types |
| **Threat intelligence feeds** | Known-bad IPs, domains, signatures |
| **Optional SSL/TLS inspection** | Decrypt, inspect, re-encrypt HTTPS (privacy/perf trade-off) |

**Legacy vs NGFW:**

| Legacy stateful firewall | NGFW |
|------------------------|------|
| "Allow TCP 443 from any to any" | "Allow Microsoft 365 for Finance group only" |
| Sees IP + port only | Sees application + user + content |
| Misses malware inside HTTPS | Can inspect with TLS decryption (if enabled) |

**Compared to packet filter and stateful:**

| Type | Layer | Memory | Exam phrase |
|------|-------|--------|-------------|
| Packet filter | L3/L4 | None | Fast, weak, each packet alone |
| Stateful | L3/L4 + state | State table | Tracks connections; blocks spoofed replies |
| Proxy | L7 | High | Breaks direct connection; deep HTTP inspect |
| **NGFW** | L3–L7 | High | Stateful + App-ID + user + DPI + IPS |

**Write this in exams:**
> An NGFW is a perimeter appliance that combines stateful inspection with application identification, user identity integration, deep packet inspection, and often integrated IPS and URL filtering. Policy can allow "Microsoft 365 for Finance" instead of blindly opening TCP 443. Examples: Palo Alto PA-Series, Fortinet FortiGate, Cisco Secure Firewall (FirePOWER). Trade-offs: higher cost, CPU, and tuning; TLS inspection needs key management and has privacy implications.

**Analogy:** *Classic firewall = weighing bags only. NGFW = reads bag label (app), checks passport (user), X-rays contents (DPI/IPS), blocks forbidden items even inside allowed-looking luggage.*

**Bank / distributed branches (mock test):** Outer NGFW + DMZ in HA; inner NGFW protects core; ATMs via IPsec VPN; remote staff SSL VPN + MFA.

### 8.6 Firewall limitations (always valid extra points)

- Does **not** encrypt (use TLS/VPN)
- Does **not** guarantee integrity of payload
- Does **not** verify true identity (IP can be spoofed)
- **Cannot stop insiders** on LAN (need segmentation + IDS)
- **Bypass:** rogue Wi‑Fi, USB, cloud upload, modem—traffic never hits FW
- **Single point of failure**—use HA pair

### 8.7 Insider / bypass scenario

> Employee on trusted LAN attacks internal systems—perimeter rules do not apply. Attacker tunnels via personal hotspot—corporate FW never sees traffic. **Fix:** internal segmentation, NAC, DLP, egress filtering, monitor east-west traffic, zero trust.

---

## 9. Web, email & database security

### SQL injection
> Attacker inserts SQL in input; app builds query unsafely. **Impact:** read/modify/delete DB. **Fix:** parameterized queries / prepared statements, least-privilege DB account, input validation, WAF as extra layer.

### XSS
> Attacker injects JavaScript stored or reflected in page; victim browser runs it. **Impact:** steal session cookie, deface site. **Fix:** output encoding, Content-Security-Policy, HttpOnly cookies, validate input.

**Rule:** *"Never trust user input."*

### Database security extras
- Encrypt at rest; TLS to DB
- Separate VLAN; no direct Internet
- Audit logs; backup encryption

---

## 10. VPN

> VPN = encrypted tunnel over public Internet. **IPsec** provides confidentiality (encrypt) and integrity (hash—SHA, not MD5 in modern designs). **Site-to-site:** links offices. **Remote-access:** laptop to corporate LAN. **Require MFA** on VPN login. Firewall may terminate VPN; VPN does not replace firewall rules inside.

---

## 11. Frameworks & governance

### NIST CSF 2.0 functions (memorise)
**Govern → Identify → Protect → Detect → Respond → Recover**

| Function | Exam example activity |
|----------|----------------------|
| Govern | Policies, roles, risk appetite |
| Identify | Asset inventory, data classification |
| Protect | Access control, training, encryption |
| Detect | IDS, SIEM, monitoring |
| Respond | IR plan, contain, communicate |
| Recover | Backups, restore, lessons learned |

**Note:** Used **before, during, and after** incidents—not only after breach.

### ISO/IEC 27001
> International **ISMS** standard—management system for information security (risk assessment, controls, continual improvement). Certification proves structured approach to customers/regulators.

### Risk management sentence
> Identify assets → assess threat/likelihood/impact → treat (mitigate, transfer, accept, avoid) → document residual risk.

### Security policy types
- **AUP** (acceptable use)
- **Data classification**
- **Incident response**
- **Internet access policy** (firewall enforces this)

---

## 12. Penetration testing vs vulnerability assessment

| | Penetration test | Vulnerability assessment |
|---|------------------|---------------------------|
| Goal | Prove exploit path | Find weaknesses |
| Depth | Simulated attack | Scan/review |
| Output | "We got in via X" | List of CVEs/misconfigs |
| Legal | Must have **written permission** | Usually broader scanning |

**Pen test phases:** Recon → Scan/Enumerate → Exploit → (Maintaining access) → Report  
**Ethical hacker:** Reports findings; may offer fixes in "security test" vs pen test.

---

## 13. Classical ciphers (Playfair / Hill / Caesar)

### Caesar
Shift each letter by n (mod 26). **Broken** by brute force (25 shifts) or frequency analysis.

### Playfair
- 5×5 matrix from keyword (I/J share cell)
- Encrypt **digraphs** (pairs); double letter → split (LL→LX)
- Same row → shift right; same column → shift down; rectangle → swap columns

### Hill
- Multiply plaintext vector by key matrix **mod 26**
- Key matrix must be **invertible** mod 26
- Vulnerable to known-plaintext attack

**Exam line:** *"Classical ciphers teach concepts; modern systems use AES/RSA."*

---

## 14. Wi‑Fi security

- Threats: signal spillage, evil twin AP, weak encryption, rogue AP
- **WEP** broken; use **WPA2/WPA3**; enterprise = 802.1X + certificates
- Hiding SSID is **not** real security
- Wired firewall ≠ Wi‑Fi threats; need WIDS, segmentation, guest SSID

---

## 15. OS hardening (CIS-style quick bullets)

- Remove/disable unused services (telnet, FTP)
- Strong passwords (14+ chars), lockout, **MFA**
- Host firewall enabled; patch OS/apps
- Separate partitions; mount options (nodev, nosuid, noexec) on Linux
- Enable auditing (auditd / Windows advanced audit)
- BitLocker / encryption at rest
- **Least privilege**—users not local admin

---

## 16. IDS vs IPS (one comparison)

| IDS | IPS |
|-----|-----|
| Passive, alerts only | Inline, blocks traffic |
| Camera | Guard dog |
| No break risk from false positive | False positive can break apps |

---

## 17. Ready-made scenario endings (paste & adapt)

### "Recommend controls" closing
> In summary, the organisation should adopt **defence in depth**: technical controls (encryption, segmentation, monitoring), procedural controls (policy, training, incident response), and regular **risk assessment** aligned with **NIST CSF** or **ISO 27001**. All changes should follow **least privilege** and **implicit deny**, with logging sent to a central SIEM for detection.

### "Evaluate risk of outbound traffic"
> Unrestricted outbound traffic allows malware to reach command-and-control servers and enables data exfiltration even when inbound rules are strict. **Egress filtering** should allow only required destinations (DNS, proxy, approved SaaS) and log anomalies.

### "Explain logging importance"
> Without firewall and system logs, security teams cannot detect lateral movement, investigate fraud, or meet compliance duties. Logs must be protected from tampering, retained per policy, and correlated in a SIEM.

### "Bank / healthcare context"
> For regulated data, failure also implies **reputational damage**, **regulatory fines** (GDPR/ICO), and loss of **customer trust**. Encryption and access control are mandatory; backups must be tested for **ransomware recovery**.

---

## 18. Mock test (CSY3023) — quick recall

### Q1 Fake AV / banking trojan
- **Malware:** Trojan (fake AV) → keylogger / infostealer → C2 → account takeover
- **Indicators:** CPU spike, unknown processes, disabled AV, beaconing, fraud logins
- **Trojan vs rootkit:** Trojan = user-level, remove with EDR; rootkit = kernel, **wipe & reimage**

### Q2 AES vs RSA for bank
- **Symmetric:** one key, fast, key distribution problem → AES for data at rest
- **Asymmetric:** public/private pair → RSA for key exchange / signatures
- **Hybrid:** RSA wraps AES session key (like HTTPS)

### Q3 Firewall for bank branches
- **Stateful** perimeter; **DMZ** for public web; **deny by default**; log to SIEM
- **Limitations:** no insider protection alone; no encryption; bypass possible

### Q4 PGP email
- **Hybrid** encryption; sign with **private** key, verify with **public**
- **Trust:** fingerprints, web of trust, don't import unverified keys

### Q5 Incident response
- **Contain** (isolate host), **eradicate** (remove malware), **recover** (restore from backup), **learn** (post-incident review)

---

## 19. Scenario question checklist (before you submit)

- [ ] Named the **threat / weakness** clearly
- [ ] Linked to **CIA** (C, I, or A)
- [ ] Gave **at least 3 specific** controls (not vague "be more secure")
- [ ] Mentioned **monitoring/logging** where relevant
- [ ] Used course terms (least privilege, DMZ, stateful, hybrid encryption, etc.)
- [ ] Short **real-world analogy** if you have time (one sentence)

---

## 20. Additional topics (from other folders — often in exams)

### 20.1 Network attacks (powerpoints folder)

| Attack | What happens | Defence |
|--------|--------------|---------|
| **ARP poisoning / spoofing** | Attacker sends fake ARP replies; traffic redirected on LAN | Dynamic ARP Inspection, 802.1X, HTTPS, segment LAN |
| **MAC flooding** | Flood switch CAM table; switch acts like hub | Port security, limit MACs per port |

### 20.2 Digital signatures & hashing (Module VII / VIII, extra PDFs)

> **Hash (SHA-256):** one-way digest for **integrity**.  
> **Digital signature:** hash the document → encrypt hash with sender's **private key** → verify with **public key** → **authenticity + integrity + non-repudiation**.

### 20.3 Intrusion detection (extra/7-Intrusion-Detection.pdf)

> **NIDS/HIDS** monitor and alert; **IPS** inline and block. Often built into NGFW. Complement firewalls for internal east-west traffic.

### 20.4 Design principles (extra/5-Design-Principles PDF)

> **Least privilege**, **defence in depth**, **fail secure**, **separation of duties**, **don't rely on security through obscurity**.

### 20.5 Policy & acceptable use (extra/10-Policy-and-Procedures.pdf)

> **AUP**, **data classification**, **incident response policy**—firewall enforces **Internet Access Policy** set by management, not by the admin alone.

### 20.6 Materials checklist (what each folder adds)

| Source | Topics covered |
|--------|----------------|
| `docxs/CSY3062_Module_IX` | Key lifecycle, KMS, HSM, CRL/OCSP |
| `docxs/playfair_hill` | Playfair, Hill ciphers |
| `docxs/CSY3062_*_questions` | Scenario-style exam practice |
| `17-*.pptx` | Crypto, malware, firewalls, PKI |
| `powerpoints/43,49,50` | VPN, IPsec, site-to-site |
| `powerpoints/16,18` | ARP spoofing, MAC flooding |
| `pdf/firewall-V2`, Firewall docx | Firewall purpose, limitations |
| `extra/1–11 PDFs` | Core security, web, email, DB, IDS, policies |
| `DSCI_Seminar`, WiFi docx | Wireless threats |

---

## 21. One-page memory sheet (print this)

```
CIA = Confidentiality, Integrity, Availability
AES = symmetric, fast, key distribution problem, 128-bit blocks, use GCM not ECB
RSA = asymmetric, 2048+, public encrypts / private decrypts, hybrid with AES
Hash = SHA-256 integrity; Sign = hash + encrypt hash with private key
PGP = hybrid + web of trust; never share private key
Virus/host | Worm/network | Trojan/trick | Rootkit/kernel/wipe PC
Firewall = implicit deny, stateful > stateless, DMZ, log everything
NGFW = app + user + DPI + IPS
IDS=alert | IPS=block
NIST = Govern Identify Protect Detect Respond Recover
SQLi=parameterised queries | XSS=encode output + CSP
Pen test=authorised exploit | Vuln scan=list issues
```

---

*Generated from CSY3062 Exam Prep site: Study Notes (modules 1–14), 24 scenario questions, Mock Test (May 2025), Terminology (95 terms), and course PDFs/PPTX/DOCX.*
