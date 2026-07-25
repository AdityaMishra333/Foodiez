Foodiez

A full-stack food-ordering platform with a live-inventory AI assistant. Browse the menu, add items to a cart, place orders, and get instant help from an AI chatbot that answers using real-time menu and offer data from the database.

---

Features

- Browse a full food menu with real food photography and category filtering
- Add, update, and remove items from a persistent shopping cart
- Complete checkout and order-placement flow
- User authentication with secure signup and login
- Admin panel to manage menu items, offers, and incoming orders
- Live offers and deals surfaced across the storefront
- AI chatbot widget available on every page for instant support
- Responsive UI with a dark glassmorphism aesthetic and aurora blob effects

---

Tools & Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Atlas) with Mongoose ODM
- **Templating:** EJS server-side rendering
- **Auth:** JSON Web Tokens (JWT) + bcrypt
- **AI:** Groq API (`llama-3.3-70b-versatile`)
- **Styling:** Custom CSS (glassmorphism, aurora effects)
- **Deployment:** Render (app) + MongoDB Atlas (database)

---

Backend

- RESTful architecture built on Express.js
- MongoDB Atlas as the primary datastore, accessed via Mongoose models
- JWT-based authentication with bcrypt password hashing
- Separate models for users, menu items, offers, cart, and orders
- Admin routes protected behind role-based access
- Environment-driven config to cleanly separate local and production databases

---

🤖 AI Chatbot

- Conversational assistant powered by Groq's `llama-3.3-70b-versatile` model
- Grounded in **live MongoDB inventory** — pulls the current menu and active offers at query time so answers are never stale
- Answers questions about dishes, prices, availability, and running deals
- Embedded as a floating widget with a dark glassmorphism design and animated aurora blobs
- Falls back gracefully when the model or data source is unavailable

---

Deployment

- Hosted on **Render** with the MongoDB Atlas cluster as the production database
- Environment variables configured through the Render dashboard
- Note: the production database holds its own menu data, kept separate from local — run update scripts against the Atlas URI when syncing content

---
