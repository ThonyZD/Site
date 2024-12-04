const mysql = require('mysql2/promise');

async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            database: 'projust_bd',
            user: 'root',
            password: ''
        });

        console.log('Successfully connected to the database');
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

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