const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuração da conexão com o banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Usage
async function main() {
    try {
        const connection = await connectToDatabase();
        // Perform database operations here
        // Don't forget to close the connection when done
        // await connection.end();
    } catch (error) {
        console.error('Database connection failed');
    }
}

// Call the main function
main();