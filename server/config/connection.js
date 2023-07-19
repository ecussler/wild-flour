const Sequelize = require('sequelize');
require('dotenv').config();

// FOR DYNAMIC SWITCH-OVER COMPATIBILITY WITH THE HEROKU JAWSDB REMOTE DATABASE SYSTEM:
let sequelize;
//
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: '127.0.0.1',  // localhost
      dialect: 'mysql',
      port: 3306
    }
  );
}

// OTHER JAWSDB CONNECTION INFORMATION FOR NODE.JS:
//
// Run the following commands from the terminal to update the app:
// git add -A
// git commit -m "connect to jawsdb"
// git push heroku main
//
// If your app doesn't have a front end, there won't be much to see in the browser. 
// You can still test the API endpoints with Insomnia Core, though. Simply replace 
// http://localhost:3001 with the name of your Heroku app. For example: 
// https://just-tech-news.herokuapp.com/api/posts.
//
// NODE.JS CONNECTION/TEST CODE:
// var mysql = require('mysql');
// var connection = mysql.createConnection(process.env.JAWSDB_URL);
// connection.connect();
// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;
//   console.log('The solution is: ', rows[0].solution);
// });
// connection.end();

module.exports = sequelize;
