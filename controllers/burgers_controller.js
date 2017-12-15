const DEBUG = true;

const Path = require("path"),
	Join = Path.join;

// handling uncaught errors
require(Join(__dirname, "../errorhandler/handler.js"))();

module.exports = function(emitter) {
   const ctrlRoute = new require("express").Router();

   emitter.once("sql-connected", function() {
      ctrlRoute.get("/eat-da-burger", function(req, res) {
         DEBUG && console.log("GET!!");
         emitter.emit("render-initial", res);
      });
   });

   ctrlRoute.get("/", function(req, res) {
   	console.log("Redirecting...");
   	res.redirect("/eat-da-burger");
   });

   ctrlRoute.get("/api/eat-da-burger", function(req, res) {
   	emitter.emit("render-initial", res, 1);
   });

   ctrlRoute.post("/eat-da-burger", function(req, res) {
      // Object.setPrototypeOf(req.body, {});
      const burger = req.body;
     
      DEBUG && console.log(burger);
      emitter.emit("more-burger", burger.name, res);
   });

   ctrlRoute.put("/eat-da-burger", function(req, res) {
      const burger = req.body;

      DEBUG && console.log(burger);
      DEBUG && console.log(burger.name);      
      emitter.emit("update-one", burger.name, parseInt(burger.nameid), res);
   });

   return ctrlRoute;
}