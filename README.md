# Local Frontend + Backend Mirror

## Run

```bash
node server.js
```

Open: `http://127.0.0.1:3000`

## MotherPanel Mirror Domains (New)

Admin panel now supports an **Unlimited Domain Mirror System** inside the existing dashboard UI:

- Sidebar: `Hosting -> Domains -> Mirror Domains -> DNS Management`
- Mirror Domains page: add/disable/delete domains that all proxy to the same Node app.
- Proxy target: `localhost:3000` by default (configurable).

### Mirror automation flow

When a mirror domain is added:

1. Save domain record in `backend/data/hosting-db.json` (`mirror_domains` list)
2. Generate nginx vhost in `/etc/nginx/sites-available/{domain}`
3. Enable site link in `/etc/nginx/sites-enabled/{domain}`
4. Reload nginx
5. Optionally create Cloudflare zone + `A @` and `A www` records
6. Optionally install SSL using Certbot

### Required VPS env vars

- `MOTHERPANEL_ENABLE_SYSTEM_CMDS=1`
- `MOTHERPANEL_MIRROR_TARGET_PORT=3000`
- `MOTHERPANEL_PRIMARY_WEBSITE=1xbets.xyz`
- `MOTHERPANEL_VPS_IP=<your_public_ip>`
- `MOTHERPANEL_ENABLE_SSL=1`
- `MOTHERPANEL_CERTBOT_EMAIL=<your_email>`
- `CLOUDFLARE_API_TOKEN=<token>`
- `CLOUDFLARE_ACCOUNT_ID=<account_id>`

### SQL reference

Mirror table schema reference:

- `backend/database/mirror-domains.sql`

## Connectivity Audit

```bash
node scripts/audit-connect.js
```

- Checks frontend-used API endpoints, host-mirror static paths, and backend mirror-dir mappings.
- Report me `endpointErrors`, `hostPathMissing`, `mapMissing` ideally `0` hone chahiye.

## Demo Login

- Login page par `Login with demo ID` button click karo.
- Localhost mode me demo session auto-set hota hai.
- App `/home` par open hoti hai.

## Live Sports Feed (Source Sync)

- Cricket/other sports tabs + matches + odds ke liye backend upstream live feed proxy use karta hai.
- Default source: `https://allpanelexch9.co` (server-side fetch, frontend same local URL use karta hai).
- Agar upstream unavailable ho, backend local snapshot/mock fallback serve karta hai.
- Disable karna ho to:
  - `UPSTREAM_LIVE_FEED=0 node server.js`

### The Odds API

- The adapter uses the documented v4 API (`https://api.the-odds-api.com/v4`); `/v1` is not the current documented API version.
- Copy `.env.example` to `.env` in this folder and set `ODDS_API_KEY` there.
- `server.js` loads that local file before starting the backend. `.env` is ignored by Git and must not be committed.
- Provider-backed Match Odds are shown with the available feed; other market sections are labeled unavailable and disabled unless a source supplies them.
- Without a valid key and successful provider response, sports data falls back to the local snapshot/mock.

## API Games (Images + Live Structure)

- Casino/API games endpoints ke liye backend me dedicated live adapter added hai.
- Ye routes pe live/provider data try hota hai:
  - `/api/front/casino/alllist`
  - `/api/front/casino/catlist`
  - `/api/front/casino/providerlist`
  - `/api/front/casino/slotlist`
  - `/api/front/casino/other`
  - `/api/front/casino/tablist`
  - `/api/front/casino/tablelist`
  - `/api/front/casino/data2`
  - `/api/front/casino/lastresultsnew`
- Agar live/provider response fail ho ya non-200 aaye, existing local fallback auto-use hota hai.
- Image paths auto-normalize hote hain local mirror URLs me:
  - `dataobj.ecoassetsservice.com` (casino icons)
  - `sitethemedata.com` (slot/other icons)
  - fallback image: `front/v93/static/front/img/casino/default.jpeg`

### API Games env vars (aapki key/token setup ke liye)

- `API_GAMES_ENABLED=1`
- `API_GAMES_PROXY_URL=https://sqwzecuuatenlhlzqver.supabase.co/functions/v1/user-api-proxy`
- `API_GAMES_KEY=rdx_6d19426d155043b6fb814e4491543bf5f052baf3325c5873`
- `API_GAMES_SECRET=rdxs_45357d3025d045c0c1765b379493df0740b313f63bd42e06334a230e12cc1f34`
- `API_GAMES_CURRENCY=INR`
- `API_GAMES_LANGUAGE=en`
- `API_GAMES_DEFAULT_CREDIT=100`
- `API_GAMES_LIST_FILE=C:\\path\\to\\all-games.json` (optional fallback cache file)
- `API_GAMES_CALLBACK_PATH=/api/provider/callback`
- `API_GAMES_CALLBACK_REQUIRE_SIGNATURE=1`
- `API_GAMES_TIMEOUT_MS=8000`

### Example run

```bash
API_GAMES_ENABLED=1 API_GAMES_PROXY_URL=https://sqwzecuuatenlhlzqver.supabase.co/functions/v1/user-api-proxy node server.js
```

### Provider Callback URL

- Callback endpoint: `https://YOUR-DOMAIN/api/provider/callback`
- Health check (browser): `GET /api/provider/callback`
- Callback verification: `X-Signature` HMAC-SHA256 over raw JSON body using `API_GAMES_SECRET`
- Success response:

```json
{ "code": 0, "msg": "Success" }
```

## Backend Structure

- `server.js`: startup entry point
- `backend/app.js`: HTTP server + route orchestration
- `backend/api-front-router.js`: `/api/front/*` endpoint handlers
- `backend/database.js`: local users/balance/bets/statements/session store logic
- `backend/snapshot-store.js`: captured API snapshot resolver/fallback
- `backend/static-store.js`: mirrored static file resolver
- `backend/http-utils.js`: request parsing + response helpers
- `backend/crypto.js`: AES encrypt/decrypt wrapper (frontend-compatible)
- `backend/data/local-db.json`: persistent local database

## Main Frontend Files

- `site/index.html`: main frontend app shell
- `site/local/local-bootstrap.js`: localhost rewrites + recaptcha/demo-login helpers
- `site/api/front/`: captured API snapshot files

## Deposit & Withdrawal UI (Frontend)

- User dropdown me `Deposit & Withdrawal` option inject hota hai (local bootstrap layer se).
- Modal me 2 sections hain: `Deposit` + `Withdrawal`.
- Deposit me `UPI ID` + `QR` show hota hai; Withdrawal me limits + processing info show hota hai.
- Settings endpoint:
  - `GET /api/front/local-payment-settings`
  - `POST /api/front/local-payment-settings`
- Default QR asset: `site/local/payment-qr.svg`
- Optional browser override key: `localStorage["local_payment_settings"]`

## Asset Folders (Required)

- `ip`: IP lookup (`api.ipify.org`) fallback data
- `jsd`: jsDelivr assets (Bootstrap, SweetAlert, Thumbmark)
- `jq`: jQuery CDN mirror
- `casino`: casino icon/image data assets
- `gcss`: Google Fonts CSS mirror
- `gfont`: webfont files from gstatic
- `theme`: site theme CSS + theme images
- `front`: main frontend CSS/JS/images bundle
- `badge`: static footer/security image assets
- `recap`: Google recaptcha related assets
- `grun`: Firebase + recaptcha runtime assets
- `fa`: Font Awesome CSS/webfont assets
- `datauri`: captured data-uri files

## Notes

- API responses frontend contract ke hisab se encrypted envelope format me serve hote hain.
- Dynamic local backend auth, users, wallet, bets, statements, deposits, withdrawals support karta hai.
- Jitne endpoints dynamic nahi hain unke liye snapshot fallback automatic hai.
