var db = require('../db');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};
//
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
      var data = req.body;
      console.log('body is: ' + data);
      var user = data.username;
      var room = data.roomname;
      var message = data.message;
      var userid, roomid;
      console.log('user is: ' + user + ', room is: ' + room + ', message is: ' + message);

      // db.connection.query('INSERT into users (username) values ("' + user + '")', function(error, result) {
      //   if (error) {
      //     console.log('user insert failed: ' + error);
      //   } else {
      //     console.log('user insert worked');
      //     userid = result.insertId;
      //   }
      //   console.log('userid is: ' + userid);
      // });

      // db.connection.query('INSERT into rooms (roomname) values ("' + room + '")', function(error, result) {
      //    if (error) {
      //      console.log('room insert failed: ' + error);
      //    } else {
      //      console.log('room insert worked');
      //      roomid = result.insertId;
      //    }
      //    console.log('roomid is: ' + roomid);
      //  });

      // db.connection.query('INSERT into messages (message, user, room) VALUES ("' +
      //   message + '", "' + userid + '", "' + roomid + '"")', function(error, rows) {
      //     if(error){
      //       console.log('message insert error: ' + error);
      //     } else {
      //       res.writeHead(200, headers);
      //       res.end();
      //     }
      //   }
      // );

      db.connection.query('INSERT into users (username) values ("' + user + '")', function(error, result) {
        if (error) {
          console.log('user insert failed: ' + error);
        } else {
          console.log('user insert worked');
          userid = result.insertId;
          db.connection.query('INSERT into rooms (roomname) values ("' + room + '")', function(error, result) {
             if (error) {
               console.log('room insert failed: ' + error);
             } else {
               console.log('room insert worked');
               roomid = result.insertId;
               db.connection.query('INSERT into messages (message, user, room) VALUES ("' +
                message + '", ' + userid + ', ' + roomid + ')', function(error, rows) {
                  if(error){
                     console.log('message insert error: ' + error);
                   } else {
                     res.writeHead(200, headers);
                     res.end();
                   }
                 }
              );
             }
          });
        }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

