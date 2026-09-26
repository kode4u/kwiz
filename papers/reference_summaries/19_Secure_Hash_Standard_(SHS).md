# [19] Secure Hash Standard (SHS)
* **Authors:** National Institute of Standards and Technology (NIST)
* **Venue & Year:** Federal Information Processing Standards Publication (FIPS PUB 180-4, 2015)
* **Category:** `Cryptographic Content Hashing`
* **Associated Full Paper PDF:** `nist_2015_sha256_fips180-4.pdf`

---

### ⚡ 1-Minute Executive Takeaway
> **Key Finding:** The official standard for SHA-256, providing the cryptographic foundation for Kwiz's 549x cache speedup.

---

### 🎯 Core Research Objective
To specify secure hash algorithms (SHA-1, SHA-224, SHA-256, SHA-384, SHA-512) for computing a condensed representation of electronic data.

---

### 🔬 Methodology & Architecture
Defined mathematical bitwise operations, padding constants, and compression functions guaranteeing collision resistance.

---

### 📊 Key Empirical Findings & Evidence
SHA-256 generates a deterministic 256-bit cryptographic message digest with negligible collision probability, making it the industry standard for content integrity verification.

---

### 🔗 Direct Relevance to Our Kwiz Paper
Cited in Section 3.1 and Section 4.5. Kwiz computes SHA-256 hashes for each normalized course chunk, using the hash as an immutable cache lookup key to detect unchanged syllabus content and bypass redundant embedding computation.
