var db = require('../db/index.js');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

module.exports = {
  messages: {
    get: function (req, res) {
      db.connection.query('SELECT m.message, u.username, r.roomname FROM users u inner join' +
      'messages m on (u.id = m.user) inner join' +
      'rooms r on (r.id = m.room) WHERE m.id > ((SELECT COUNT(*) FROM messages) - 100);', function(error, rows, fields){
        // format into the object and return to user with sendData function
        var result = {results: rows};
        res.writeHead(200, headers);
        res.JSON(result);
      });
    }, // a function which produces all the messages
    post: function (req, res) {
      var data = JSON.parse(req.data);
      var user = data.username;
      var room = data.roomname;
      var message = data.message;
      var userid, roomid;

      db.connection.query('SELECT id FROM users where username = ' + user + ';', function(error, rows) {
        if (error) {
          db.connection.query('INSERT into users (username) values (' + user + ');', function(error) {
            if (error) {
              console.log(error);
            } else {
              db.connection.query('SELECT id FROM users where username = ' + user + ';'), function(error, rows) {
                if(error){
                  console.log(error);
                } else {
                  userid = rows[0];
                }
              }
            }
          });
        } else {
          userid = rows[0];
        }
      });

      db.connection.query('SELECT id FROM rooms where room = ' + room + ';', function(error, rows) {
        if (error) {
          db.connection.query('INSERT into rooms (room) values (' + room + ');', function(error) {
            if (error) {
              console.log(error);
            } else {
              db.connection.query('SELECT id FROM rooms where room = ' + room + ';', function(error, rows) {
                if(error){
                  console.log(error);
                } else {
                  roomid = rows[0];
                }
              });
            }
          });
        } else {
          roomid = rows[0];
        }
      });

      db.connnection.query('INSERT into messages (message, user, room) VALUES (' +
        message + ', ' + userid + ', ' + roomid + ');', function(error, rows) {
          if(error){
            console.log(error);
          } else {
            res.writeHead(200, headers);
            res.end();
          }
        }
      );
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

