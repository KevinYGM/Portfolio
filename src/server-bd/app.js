const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  database: 'kevin_tester',
  user: 'root',
  password: '*KevinGonzalez1251',
  
});

console.log("hola");
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// module.exports = connection;