# Rental-Backend

The backend API for RentalKing, a real-estate rental listing site. Built with Node.js, Express, and MongoDB, it serves property/project/testimonial listings and site contact details, and provides JWT-cookie-based authentication for the admin dashboard used to manage that content.

## Setup

```bash
npm install
```

Copy the example env file and fill in real values (Mongo URI, JWT secrets, Cloudinary credentials, session secret, CORS origin):

```bash
cp .env_example .env
```

Make sure MongoDB is running and reachable at the `MONGODB_URI` in `.env` (defaults to a local instance at `mongodb://127.0.0.1:27017/rentalking`).

Create the first admin user (interactive — prompts for a password of at least 8 characters):

```bash
npm run create-admin -- <username>
```

Start the server:

```bash
npm run dev     # development, with auto-restart (nodemon)
npm start       # production
```

The server runs on the `PORT` set in `.env` (default `5001`). Health check: `GET /`.
