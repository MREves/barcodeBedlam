const express = require('express');
const { Pool } = require('pg');

// Initialize express app
const app = express();
const port = 3000;

// Configure PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5440,
});

// Function to get all players from the database
const getPlayers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.players');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error running query', error);
    res.status(500).json({ error: 'An error occurred while fetching players' });
  }
};

// Define the /players route
app.get('/players', getPlayers);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});