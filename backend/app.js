const bodyParser = require('body-parser')
const cors = require('cors')

const express = require('express');
const { Pool } = require('pg');

// Initialize express app
const app = express();
app.use(cors())

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
})

app.options(
  '*', (request, response) => {
    response.sendStatus(200)
  }
)

const port = 4000;

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
    const result = await pool.query('SELECT * FROM "public.players"');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error running query', error);
    res.status(500).json({ error: 'An error occurred while fetching players' });
  }
};

// Function to save a card into the database (req = request, res = response)
const saveCard = async (req, res) => {
  const card = req.body
  const sql = 'INSERT INTO public.cards (race_id, name, agility, endurance, hit_points, luck, strength) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;'
  const values = [card.race, "name_placeholder", card.agility, card.endurance, card.hitPoints,  card.luck, card.strength]
  try{
    const results = await pool.query(sql, values)
    res.status(201).json(results.rows[0])
  } 
  catch (error) {
      res.status(500).send(error)
    }
  }

// Define the /players route
app.get('/players', getPlayers);

// Define the save card route
app.post('/saveCard', saveCard)

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});