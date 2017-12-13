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

   // This is where I build functionality, need cautious in it's que stack
   emitter.once("sql-connected", function() {
      const orm = require("./orm.js")(emitter, connection);
      orm.selectAll();

      emitter.on("select-all", function() {
      	orm.selectAll();
      })

      emitter.on("more-burger", function(burgerName) {
      	orm.insertOne(burgerName);
      });
   });

   return;
}