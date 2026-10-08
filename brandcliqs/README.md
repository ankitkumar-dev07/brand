# BrandCliqs — MERN SaaS

A production-oriented JavaScript MERN implementation of the BrandCliqs software-discovery product shown in the supplied references. It includes a responsive marketing site, MongoDB-backed tool catalog, authentication, favorites, named lists, comparison, AI/rule-based recommendations, mock subscriptions, support/newsletter flows and an admin area.

## Stack
- React + Vite + JavaScript
- React Router, Axios, Tailwind CSS, Lucide React
- Node.js + Express + MongoDB + Mongoose
- JWT HTTP-only cookie auth + bcryptjs
- Helmet, CORS, rate limiting, dotenv
- Optional OpenAI integration with a rule-based fallback

## Requirements
- Node.js 20+ recommended
- MongoDB local instance or MongoDB Atlas

## Install
```bash
npm install
npm --prefix client install
npm --prefix server install
```

## Environment
Copy `server/.env.example` to `server/.env` and `client/.env.example` to `client/.env`. Set `MONGO_URI` and a strong `JWT_SECRET`. `OPENAI_API_KEY` is optional. Never commit real secrets.

## Seed
```bash
npm run seed
```
The seed creates 200+ named software records, categories and demo accounts.

Demo credentials (development only):
- Admin: `admin@brandcliqs.com` / `Admin@12345`
- User: `demo@brandcliqs.com` / `Demo@12345`

## Run
```bash
npm run dev
```
Frontend: http://localhost:5173
Backend: http://localhost:5000
Health: http://localhost:5000/api/health

## Production build
```bash
npm run build
npm --prefix server start
```
Serve the built `client/dist` from a static host and point `VITE_API_URL` at the deployed API. Configure the API's `CLIENT_URL` to the exact frontend origin.

## API overview
- `POST /api/auth/register`, `/login`, `/logout`, `GET /api/auth/me`
- `POST /api/auth/forgot-password`, `/reset-password`
- `GET /api/tools`, `GET /api/tools/:slug`
- `GET/POST/DELETE /api/users/favorites...`
- `GET/POST/PUT/DELETE /api/lists...` and list tool membership routes
- `POST /api/recommendations`
- `POST /api/subscriptions/upgrade`, `GET /api/subscriptions`, `POST /api/subscriptions/cancel`
- `POST /api/newsletter/subscribe`
- `POST /api/support/contact`
- Admin: `/api/admin/stats`, `/users`, `/tools`, `/subscribers`, `/messages`

## Notes
The payment flow is intentionally mocked for development and structured around a Subscription model so Stripe/Razorpay can be added later. The recommendation service uses OpenAI only when `OPENAI_API_KEY` exists; otherwise it falls back to catalog keyword/category matching.
