//Imports
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

//creation app express
const app = express();
const PORT = 3001;


//Middleware
app.use(bodyParser.json());
app.use(cors());

//Database Connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  database: 'portfolio_kevin',
  user: 'root',
  password: '*KevinGonzalez1251'});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

//Welcome Message Server
app.get('/', (req, res) => {
  res.send('Welcome to the Kevin González Portfolio Server');
});


//Management of the requirement and processing of information from the Front-end
app.post('/submit-form', (req, res) => {
  const { firstName, lastName, email, message } = req.body;


  if (!firstName || !lastName || !email || !message) {
    res.status(400).send('Bad Request: All fields must be provided');
    return;
  }


  const sql = 'INSERT INTO users (firstName, lastName, email, message ) VALUES (?, ?, ?, ?)';
  db.query(sql, [firstName, lastName, email, message ], 
    (err) => {
      if (err) {
        console.error(err);
  
        // Check Error Type
        if (err.code === 'ER_DUP_ENTRY') {
          res.status(409).send('Conflict: Duplicate entry');
        } else {
          res.status(500).send('Internal Server Error');
        }

      } else {
        res.status(200).send('Data Saved Successfully');
      }
    });
  });


//Listening Configuration of the Server
app.listen(PORT, () => {
  console.log(`Server Listening On http://localhost:${PORT}`);
});