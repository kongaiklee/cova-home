# COVA

**Insurance, without the admin.**

COVA is a Singapore technology platform for SME insurance administration.

COVA is not an insurer, an insurance broker or a financial adviser, and holds no licence from the Monetary Authority of Singapore. It does not advise on, recommend, rank, compare, arrange or bind insurance, and it never handles premium or claims money. All advice, quotations and cover come from licensed intermediaries and insurers.

## 🎯 What this is

- **Document storage**: upload and keep policy documents in one place
- **Renewal visibility**: every renewal date visible in one view. There are no automated reminders - the feature does not exist and must not be described as if it does
- **Recorded requirements**: what a business states it needs, recorded as stated and passed on unevaluated. COVA does not assess requirements
- **Claim documents**: forwarded to the intermediary on the client's request. COVA does not assess, negotiate, adjust or decide any claim
- **Introductions**: with the client's consent, an introduction to a licensed insurance intermediary, who gives all advice

## ✨ What this is not

- **Not a quotation engine.** COVA does not browse, compare or secure insurance plans
- **Not a recommendation engine.** COVA expresses no view on any insurer, product or premium
- **Not a payment rail.** Premium is paid directly to the insurer in every case
- **Not a concierge.** Medical concierge services are provided by IASO Pte. Ltd., a separate company connected to COVA through a shared founder. IASO arranges clinic and doctor appointments; it is not an insurance intermediary and takes no part in insurance advice, arranging, placement or claims

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd covarage
```

2. Install dependencies:

```bash
npm install
```

## 🚀 Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port Vite assigns).

## 🏗️ Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 📝 Code Quality

Check code formatting:

```bash
npm run fm:check
```

Fix formatting issues:

```bash
npm run fm:fix
```

Lint the codebase:

```bash
npm run lint
```

Fix linting issues automatically:

```bash
npm run lint:fix
```

## 🧭 Routes

- `/` - Home page with feature overview
- `/features` - Detailed features page
- `/corporates` - Corporate solutions page
- `*` - 404 Not Found page

## 📨 Minting an onboarding-pack link

`/pack` is personalised entirely by an opaque `?t=` token, so the served page holds no personal
data and there is nothing to store. **Delivery is human, at the follow-up** - the founder welcome
does not carry a pack link, because at submit time the token would hold only name and company and
the personalisation is the whole payoff. Mint after the call, once the trade and any renewal dates
are known, and paste the link into the follow-up email:

```bash
node scripts/make-pack-link.mjs --name "Jane Tan" --company "Tan Logistics" \
  --email jane@example.com --trade logistics --introduced \
  --renewal "Public liability=2027-03-01"
```

`--trade` takes one of: `fnb`, `construction`, `logistics`, `retail`, `maritime`, `professional`,
`tech`, `startups`. Omit anything you do not know - the page elides missing fields by contract and
never renders broken personalisation. A stale or malformed token renders the ask-us-again state.
