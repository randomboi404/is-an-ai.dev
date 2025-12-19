# NOTE
Our service will be releasing soon! Please avoid certaing a PR now and wait for few days as when we are done with testing, we'll be wiping all records and creating a new repo and finally publishing it. You may join one of our discord servers [Linux Bunker](https://discord.gg/Qw9m5SmzBJ) for further updates.

# 🛸 is-an-ai.dev

> **Personalized subdomains for you!** > Simple. Open Source. Free forever.

## Docs
**For complete guidance, visit our docs!**
Link: \[SOON]

## ⚡ Quick Start

Claim your subdomain in 4 steps.

1. **Verify** using \[SOON] to check whether the subdomain you want is available.
2. **Fork** this repo.
3. **Add** `<your subdomain name>.json` to the `/domains` directory.
4. **Open a PR** and wait for the maintainers to review.

## 🎨 Record Format

Create your entry in the `domains/` directory using the following JSON structure (example):

```json
{
  "user": {
    "username": "Your GitHub username",
    "discord": "randomboi404"
  },
  "description": {
    "purpose": "Purpose of wanting your subdomain"
  },
  "subdomain": "nameOfYourSubdomain",
  "records": [
    {
      "type": "CNAME",
      "name": "example.nameOfYourSubdomain",
      "value": "randomboi404.github.io",
      "proxied": false
    }
  ]
}
```

### ⚠️ Important Notes:

> [!IMPORTANT]
> **Identity:** In the `user` section, providing GitHub is compulsory. You must also provide at least one other form of contact (Email, Discord, etc.).
>
> **Technical Details:**
> * **Supported Types:** `A`, `AAAA`, `CNAME`, and `TXT`.
> * **Naming Convention:** Your filename must match your subdomain name.
> * **Management:** Only a single file is allowed per subdomain. This file manages all DNS records and subdomain labels for that entry.
> * **Proxying:** Only enable `proxied: true` when specifically required and suitable for your setup.

<hr>

## ⚖️ Acceptable Use Policy & Legal Disclaimer

By submitting a Pull Request to this repository, you agree to abide by the following terms. Failure to comply will result in immediate domain revocation and blacklisting.

### 1. Prohibited Content
The use of an `is-an-ai.dev` subdomain for any of the following is strictly prohibited:
* **Illegal Activity:** Any content that violates local or international laws.
* **Malware & Phishing:** Hosting viruses, spyware, or sites designed to deceive users into providing sensitive information.
* **Abusive Content:** Promoting hate speech, violence, harassment, or illegal discrimination.
* **NSFW/Adult Content:** This service is intended for technical projects and portfolios; adult-oriented content is not permitted.
* **Copyright Infringement:** Hosting or linking to pirated material or unauthorized copyrighted content.

### 2. Service Terms
* **"As-Is" Basis:** This service is provided for free without any warranties. The maintainers are not responsible for any downtime or data loss.
* **Right to Terminate:** We reserve the right to remove any subdomain at our sole discretion, especially those that harm the reputation of the `is-an-ai.dev` zone.
* **No Squatting:** Subdomains that remain inactive or point to dead links for more than 90 days may be reclaimed.

### 3. Liability
The maintainers of `is-an-ai.dev` do not host the content of these subdomains. We only provide DNS redirection. The owner of the target address (e.g., GitHub Pages, Vercel) is solely responsible for the content hosted therein.
