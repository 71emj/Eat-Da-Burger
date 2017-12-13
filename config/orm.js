module.exports = function(emitter, connection) {
   // once connection with sql is estaablished
   return {
      selectAll: function() {
         connection.query(
            "SELECT * FROM burgers",
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
      			console.log("okay good test");
      		});
      }
   }
}