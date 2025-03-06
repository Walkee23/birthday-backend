const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: "hopper.proxy.rlwy.net",
    user: "root",
    password: "DfIohBtkvMtNFDtnCtMfDrWohCeqSgeU",
    database: "railway",
    port: 42690
});

connection.connect(err => {
    if (err) {
        console.error("❌ Database connection failed:", err);
        return;
    }
    console.log("✅ Connected to Railway MySQL!");
});

module.exports = connection;

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});


app.post('/submit-wish', (req, res) => {
    const { name, message } = req.body;
    const query = 'INSERT INTO wishes (name, message) VALUES (?, ?)';
    db.query(query, [name, message], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to submit wish' });
        } else {
            res.json({ success: true, id: result.insertId });
        }
    });
});

app.get('/get-wishes', (req, res) => {
    db.query('SELECT * FROM wishes ORDER BY created_at DESC', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch wishes' });
        } else {
            res.json(results);
        }
    });
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
