module.exports = function(emitter) {
   const Mysql = require("mysql"),
      connection = Mysql.createConnection({
         host: "localhost",
         port: 3306,
         user: "root",
         password: "root",
         database: "burgers_db"
      });

   emitter.once("connect-sql", function() {
      connection.connect((err) => {
         !!err && emitter.emit("error");
         emitter.emit("sql-connected", connection);
      });
   });

   return connection;
}