# Natural Mart — online grocery store

React (Vite + Tailwind) storefront and Express + MongoDB API, deployed as two Vercel projects (`client/` and `server/`).

## Run locally

```bash
cd server && npm install && npm run server     # API on http://localhost:4000
cd client && npm install && npm run dev        # shop on http://localhost:5173
```

Server environment (`server/.env` or the repo-root `.env`):

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string (the app uses the `greencart` database) |
| `JWT_SECRET` | Signs login cookies |
| `SELLER_EMAIL`, `SELLER_PASSWORD` | Store owner login at `/seller` |
| `CLIENT_ORIGINS` | Comma-separated frontend URLs allowed by CORS |
| `CLOUDINARY_*` | Image uploads from the owner dashboard |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Optional online card payments (NGN) |

Client environment: `VITE_BACKEND_URL` (the API URL).

## Load the product catalog

132 grocery products in 12 categories, priced in Naira (`server/data/catalog.js`).

```bash
cd server
npm run seed          # add/update catalog products, keep everything else
npm run seed:reset    # delete ALL existing products first, then load the catalog
node scripts/seed.js --drop --yes   # wipe the whole database (users, orders...) then load
```

Point `MONGODB_URI` at the production database to fill the live shop.

## Make it the client's shop

Everything a shop owner would change lives in `client/src/config/store.js`:
store name, phone, WhatsApp number, address, opening hours, delivery promise, delivery fee
(keep in sync with `server/configs/pricing.js`) and optional real photos
(see `client/public/images/photos/README.txt`).

Product and scene illustrations are Microsoft Fluent Emoji (MIT), see `client/public/images/ATTRIBUTION.txt`.
