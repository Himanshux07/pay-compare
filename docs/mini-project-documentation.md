# PayCompare Mini Project Documentation

## Problem Statement
E-commerce users need a fast way to choose between payment options such as UPI, net banking, credit cards, debit cards, and wallets. These methods differ in fee, speed, security, acceptance, and reliability, so a simple payment list is not enough.

## Objective
Build a full-stack web application that compares payment modes, visualizes their differences, and recommends the best choice based on user priorities.

## Modules
1. Landing page with hero section and premium fintech UI
2. Compare tool with search, sort, and side-by-side comparison
3. Insights section with scenario-based recommendations
4. Recommendation engine with weighted priorities
5. About page for viva explanation and future scope

## Tech Stack
- Frontend: React, Tailwind CSS, React Router, Chart.js, Framer Motion
- Backend: Node.js, Express
- Data: Mock API dataset served from the backend

## Working Flow
1. User opens the landing page and sees a modern overview.
2. User compares payment methods using filters and cards.
3. User checks the dashboard to understand the trade-offs visually.
4. User sets priorities on the recommendation page.
5. The app returns the best payment option with a ranked list.

## Viva Talking Points
- The app is not a static CRUD project; it uses scoring and analytics.
- The insights section makes the comparison practically explainable.
- The recommendation engine changes output based on user priorities.
- Backend APIs are clean and focused on comparison and recommendation data.

## Future Scope
- MongoDB persistence
- Authentication for user accounts and saved preferences
- Live gateway data and merchant-level availability
- Historical success-rate tracking
- Saved user preferences
