// pages/api/read.js
import { createConnection } from 'mysql2/promise';

// Function to create a MySQL connection
async function connectToDatabase() {
  return createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bia_db',
  });
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Connect to the database
    const connection = await connectToDatabase();

    // Execute a query to retrieve data from the "User" table
    const [rows] = await connection.execute('SELECT * FROM users WHERE is_active = 1', );

    // Check if the User exists
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Close the database connection
    await connection.end();

    // Respond with the User data
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
