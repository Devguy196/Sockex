import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { promises as fs } from 'fs';
import pg from 'pg';

dotenv.config();
const { Pool } = pg;
// PostgreSQL pool configuration
const pool = new Pool({
    user: 'postgres',
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: 'postgres',
    port: 5432,
});
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;
const app = express();
app.use(cors());
const PORT = 3000;

// Endpoint to read and send JSON file content
app.get('/socks', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const socks = await collection.find({}).toArray();
        res.json(socks);

    
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});
app.post('/socks/search', async (req, res) => {
    const { color } = req.body;

    try {
        // Search MongoDB based on the color value
        const socks = await Sock.find({ color: color });

        res.json(socks); // Send the results back as JSON
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error searching for socks');
    }
});

app.delete('/socks/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the index of the sock in the array
        const index = socks.findIndex(sock => sock.id === parseInt(id));

        if (index !== -1) {
            // Remove the sock from the array
            socks.splice(index, 1);
            res.status(204).send(); // 204 means No Content (successful deletion)
        } else {
            res.status(404).send('Sock not found');
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
    }
});

app.post('/socks', async (req, res) => {
    const { color, size, quantity } = req.body;

    try {
        // Create a new sock document
        const newSock = new Sock({
            color: color,
            size: size,
            quantity: quantity,
            // other properties
        });

        // Save the sock to MongoDB
        await newSock.save();

        res.status(201).send('Sock added successfully'); // Send success response
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error adding sock');
    }
});

app.get('/socks/:color{', async (req, res) => {
    
        // Console log the entire request object
        console.log(req);

        // Console log specific parts of the request
        console.log("Headers:", req.headers);
        console.log("URL:", req.url);
        console.log("Method:", req.method);
        console.log("Query parameters:", req.query);
        const colorParam = req.params.color.toLowerCase();
        const matchingSocks = socks.filter(sock => sock.color === colorParam);
        if (matchingSocks.length > 0) {
            res.json(matchingSocks); // Return matching socks if found
        } else {
            res.status(404).send('No socks found with that color.'); // Return 404 if no matching socks found
        }
    });

// Middleware to parse JSON bodies
app.use(express.json());


app.post('/socks', async (req, res) => {
    try {
        // Obligatory reference to POST Malone
        console.log("If POST Malone were a sock, he'd be the one with the most colorful pattern.");
        // Simulate creating a user
        const { username, email } = req.body;
        if (!username || !email) {
            // Bad request if username or email is missing
            return res.status(400).send({ error: 'Username and email are required.' });
        }

        // Respond with the created user information and a 201 Created status
        res.status(201).send({
            status: 'success',
            location: 'http://localhost:3000/users/1234', // This URL should point to the newly created user
            message: 'User created successfully.'
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.delete('/socks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting sock with ID:', id);
        res.status(200).send('Sock deleted successfully');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
    }
});
app.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        console.log('Updating email for user with ID:', id);
        res.status(200).send({
            status: 'success',
            data: email, // This URL should point to the newly created user
            message: 'User updated successfully.'
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
    }
});
app.post('/socks/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT uid FROM users WHERE username = $1 AND password = $2', [username, password]);
        if (result.rows.length > 0) {
            res.status(200).json({ uid: result.rows[0].uid });
        } else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});