const Path = require("path"),
	Join = Path.join;

// // handling uncaught errors
// require(Path.join(__dirname, "errorhandler/handler.js"));

module.exports = function(emitter) {
   const DEBUG = true;
   const ctrlRoute = new require("express").Router();

   emitter.once("sql-connected", function() {
      ctrlRoute.get("/eat-da-burger?", function(req, res) {
         console.log("GET!!");
         emitter.emit("render-initial", res);
      });
   });

   ctrlRoute.post("/eat-da-burger", function(req, res) {
      // depending what i get send out different event
      // console.log(req.body);
      Object.setPrototypeOf(req.body, {});
      const burger = req.body;
      console.log(burger);
      console.log(typeof burger);

      if (burger.hasOwnProperty("devoured")) {
      	return emitter.emit("update-one", burger.name, res);
      }

      emitter.emit("more-burger", burger.name, res);
   });

   return ctrlRoute;
}