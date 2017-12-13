const DEBUG = true;
// setup dependencies
const BodyParser = require("body-parser"),
   MethodOverride = require("method-override"),
   Path = require("path"),
   Events = require("events"),
   app = require("express")(),
   emitter = new Events();

const Join = Path.join;

// handling uncaught errors
require(Join(__dirname, "errorhandler/handler.js"));

app.listen(8080, function(err) {
   console.log("Server listening on port %i", 8080);
   emitter.emit("server-init", "Okay setup connections");
});

emitter.once("server-init", function(initMsg) {
   DEBUG && console.log(initMsg);

   // setup file connections
   const sql = require(Join(__dirname, "config/connection.js"))(emitter),
   	controller = require(Join(__dirname, "controllers/burgers_controller.js"))(emitter),
   	models = require(Join(__dirname, "models/burger.js"))(emitter);

   // sql();
   // controller();
   // models();

   // setup middleware & router
   app.use(BodyParser.urlencoded({ extended: false }));
   app.use(BodyParser.json());
   app.use("/?", controller);

   DEBUG && emitter.emit("first-test");
   emitter.emit("connect-sql");
});