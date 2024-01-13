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

// Update user API route
export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { id, name, email } = req.body;
  console.log(req.body);

  if (!id || !name || !email) {
    return res.status(400).json({ error: 'id, name, and email are required in the request body.' });
  }


  try {
    // Connect to the database
    const connection = await connectToDatabase();

    // Execute a query to update the user in the "users" table
    const [result] = await connection.execute(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );

    // Close the database connection
    await connection.end();

    // Check if the user was updated successfully
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Respond with a success message
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
