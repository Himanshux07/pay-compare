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

3. Start both apps:

```bash
npm run dev
```

4. Open the client at the Vite URL shown in the terminal and the API at `http://localhost:5000`.

## Scripts

- `npm run dev` - start client and server together
- `npm run build` - build both apps
- `npm run start` - start the API server only

## Project Modules

- Home page: hero, value props, quick comparison snapshot
- Compare Tool: side-by-side comparison table, filters, search, and payment cards
- Analytics Dashboard: fee, radar, and share charts
- Recommendation Page: weighted suggestion engine for best payment mode
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
- The backend supports both public comparison APIs and an admin-style update route for extensibility.
