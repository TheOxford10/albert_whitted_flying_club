# Albert Whitted Flying Club

A simple static website for the Albert Whitted Flying Club — a 501(c)(3) nonprofit kids flying club.

## GitHub Pages

1. Push this repo to GitHub.
2. Open **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**.
4. Select branch `main` (or `master`) and folder **/ (root)**.
5. Save. The site will be at `https://theoxford10.github.io/albert_whitted_flying_club/`.

No build step required; `index.html` at the root is used as the entry point.

## Custom domain: whittedflyingclub.org (Porkbun)

### Step 1: Verify the domain (TXT record)

GitHub needs one TXT record to verify you own the domain. In **Porkbun**:

1. Go to **Domain Management** → click **whittedflyingclub.org** → **DNS** (or **Edit** next to DNS).
2. Click **Add Record** (or **Add**).
3. Add a **TXT** record:
   - **Host:** `_github-pages-challenge-TheOxford10`  
     (Porkbun may add `.whittedflyingclub.org` for you; if it asks for “subdomain” only, use `_github-pages-challenge-TheOxford10`.)
   - **Answer / Value:** `183ad1d15a7b513f3e9bd41d4d742b`
4. Save the record. Wait a few minutes (up to 24 hours), then in GitHub click **Verify**.

### Step 2: Point the domain to GitHub (A + CNAME)

After verification, in the same Porkbun DNS page add:

**A records** (4 records; host blank or `@`, answer one IP per record):

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

**CNAME** (optional, for www):

- Host: `www`
- Answer: `theoxford10.github.io`

Save. In GitHub **Settings → Pages**, set **Custom domain** to `whittedflyingclub.org` (or `www.whittedflyingclub.org` if you use www), then enable **Enforce HTTPS** when it’s available.
