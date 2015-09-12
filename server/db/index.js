var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

exports.connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chat"
});

// exports.connection.connect();

// connection.query('SELECT * FROM messages', function(err, rows) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(rows);
//   }
// });