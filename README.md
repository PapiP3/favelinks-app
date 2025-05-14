# React FavLinks App

A simple React app for saving and viewing your favorite links.  
Built as part of CMP 343 Full Stack Web Dev homework.

---

## Project Structure

ReactFavLinksApp/
├─ README.md
├─ client/ ← React front end
│ ├─ .env
│ ├─ package.json
│ └─ src/
└─ server/ ← Express + Postgres back end
├─ .env
├─ package.json
└─ index.js

---

## Setup & Run Instructions

```bash
# 1. Back-end Setup (Server)
cd server
# → create or edit server/.env:
#    DATABASE_URL=postgresql://<db_user>:<db_pass>@localhost:5432/<db_name>
#    PORT=3001
npm install
npm start
# → API is now at http://localhost:3001
#    GET /links  (or, if your code uses /api, GET /api/links)

# 2. Front-end Setup (Client)
cd ../client
# → create or edit client/.env:
#    PORT=3002
#    REACT_APP_API_URL=http://localhost:3001
npm install
npm start
# → React UI opens at http://localhost:3002

# 3. Verify
# In browser → http://localhost:3002
# Open DevTools Network tab → confirm fetch to:
#    http://localhost:3001/links  (or /api/links)
# You should see your JSON array of links.

# 4. Git & Deployment (from project root)
cd ..
git init
git add .
git commit -m "Initial commit: server & client setup"
# On GitHub.com → create new empty repo (no README)
git remote add origin https://github.com/yourusername/react-favelinks.git
git push -u origin main
# For future changes:
git add .
git commit -m "Describe update"
git push