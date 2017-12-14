module.exports = function(emitter, connection) {
   // once connection with sql is estaablished
   // "query-complete" returns data from the sql query and queryalias
   return {
      selectAll: function() {
         connection.query(
            "SELECT burger_name, devoured, id FROM burgers ORDER by id",
            (err, body, fields) => {
               !!err && emitter.emit("error");
               emitter.emit("query-complete", body);
            });
      },

      insertOne: function(burgerName) {
      	connection.query(
      		"INSERT INTO burgers SET ?", 
      		{
      			burger_name: burgerName,
      			devoured: false
      		},
      		(err, body, fields) => {
      			!!err && emitter.emit("error");
      			emitter.emit("query-complete");
      			console.log("okay good test");
      		});
      },

      updateOne: function(burgerName) {
      	connection.query(
      		"UPDATE burgers SET ? WHERE burger_name = ?",
      		(err, body, fields) => {
      			!!err && emitter.emit("error");
               emitter.emit("query-complete");
      		});
      }
   }
}