const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// ✅ Auto-create table if it doesn't exist
pool.query(`
  CREATE TABLE IF NOT EXISTS links (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL
  );
`)
.then(() => console.log("✅ Table 'links' is ready"))
.catch(err => console.error("❌ Error creating 'links' table:", err));

// Routes

// GET all links
app.get('/api/links', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM links');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching links:', err);
    res.status(500).json({ error: 'Failed to fetch links' });
  }
});

// POST a new link
app.post('/api/links', async (req, res) => {
  const { title, url } = req.body;
  if (!title || !url) {
    return res.status(400).json({ error: 'Title and URL are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO links (title, url) VALUES ($1, $2) RETURNING *',
      [title, url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting link:', err);
    res.status(500).json({ error: 'Failed to add link' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
