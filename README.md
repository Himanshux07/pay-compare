# PayCompare

PayCompare is a modern fintech-style comparison tool for e-payment options. It helps users compare UPI, net banking, credit cards, debit cards, and wallets on fee, speed, security, availability, and reliability.

## Highlights

- React + Tailwind CSS frontend with responsive dashboard UI
- Node.js + Express backend with mock APIs
- Comparison table, search, filters, and recommendation engine
- Chart.js analytics dashboard with bar, radar, and pie charts
- Dark/light mode with a premium glassmorphism layout
- Optional admin-style API for updating the mock dataset

## Folder Structure

```text
PayCompare/
  client/
  server/
  package.json
  README.md
```

## Setup

1. Install Node.js 18+.
2. From the project root, run:

```bash
npm install
```

3. Configure admin key for protected updates:

On PowerShell:

```powershell
$env:ADMIN_KEY="your-secure-admin-key"
```

4. Start both apps:

```bash
npm run dev
```

5. Open the client at the Vite URL shown in the terminal and the API at `http://localhost:5000`.

## Scripts

- `npm run dev` - start client and server together
- `npm run build` - build both apps
- `npm run start` - start the API server only

## Dev API Mode

- By default, the client uses local fallback data in development to avoid proxy errors when backend is not running.
- To force real backend API calls from the client, set:

```powershell
$env:VITE_USE_BACKEND="true"
```

- Then start from root so both run together:

```bash
npm run dev
```

## Project Modules

- Home page: hero, value props, quick comparison snapshot
- Compare Tool: side-by-side comparison table, filters, search, and payment cards
- Analytics Dashboard: fee, radar, and share charts
- Recommendation Page: weighted suggestion engine for best payment mode
- Admin Page: edit the mock payment dataset through the API
- About Project: problem statement, modules, future scope, and viva notes

## Mini Project Flow

### Problem Statement
E-commerce users often need to choose between multiple payment methods with different trade-offs in cost, speed, safety, and merchant acceptance. PayCompare removes guesswork by presenting a clear comparison and a recommendation engine.

### Modules
1. Landing page and navigation
2. Comparison engine and filters
3. Analytics dashboard
4. Recommendation engine
5. About/project documentation panel

### Future Scope
- Real transaction data integration
- User login and saved preferences
- Merchant-specific availability data
- MongoDB-backed admin dashboard
- Payment gateway APIs and live scoring

## Tech Stack

- Frontend: React, Tailwind CSS, React Router, Chart.js, Framer Motion
- Backend: Node.js, Express, CORS
- Data: Mock JSON data served by the API

## Talking Points

- The app uses a scoring engine rather than a static comparison page.
- The analytics dashboard turns payment features into visual decision support.
- Theme switching, responsive cards, and glassmorphism make the project look product-grade instead of CRUD-like.
- The backend separates public endpoints from admin updates with a required admin key header.

## Admin Security Notes

- Admin updates are protected by `ADMIN_KEY` on the backend.
- Users cannot update data unless they unlock admin access with the correct key in the Admin page.
- If the backend is down, admin updates are disabled by design.
