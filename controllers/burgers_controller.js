// const Path = require("path"),
// 	Join = Path.join;

// // handling uncaught errors
// require(Join(__dirname, "errorhandler/handler.js"));

module.exports = function(emitter) {
   const DEBUG = true; 
   const ctrlRoute = new require("express").Router();

   emitter.on("first-test", function() {
   	console.log("Now waiting for get request");
   	ctrlRoute.get("/:path?", (req, res) => {
   		console.log("GET!!");
   		res.send("Success!!");
   	});
   });

   emitter.on("query-complete", function(data) {
   	console.log(data);

   	emitter.emit("more-burger", "Whopper");
   });

   return ctrlRoute;
}