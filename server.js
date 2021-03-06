const DEBUG = true;
// setup dependencies
const BodyParser = require("body-parser"),
   MethodOverride = require("method-override"),
   Path = require("path"),
   Events = require("events"),
   Express = require("express"),
   app = Express(),
   emitter = new Events();

const Join = Path.join;

// handling uncaught errors
require(Join(__dirname, "errorhandler/handler.js"))();

app.listen(process.env.PORT || 8008, function(err) {
   console.log("Server listening on port %i", process.env.PORT || 8008);
   emitter.emit("server-init", "Okay setup connections");
});

emitter.once("server-init", function(initMsg) {
   DEBUG && console.log(initMsg);

   // setup file connections
   const sql = require(Join(__dirname, "config/connection.js"))(emitter),
      controller = require(Join(__dirname, "controllers/burgers_controller.js"))(emitter),
      models = require(Join(__dirname, "models/burger.js"))(emitter, sql); // return Handlebars

   app.use(BodyParser.urlencoded({ extended: false }));
   app.use(BodyParser.json());
   app.use(Express.static(Join(__dirname, "public")));
   app.engine("handlebars", models({
      defaultLayout: "main",
      extname: "handlebars"
   }));
   app.set("view engine", "handlebars");
   
   app.get("/*", controller);
   app.post("/eat-da-burger", controller);
   app.put("/eat-da-burger", controller);
  
   // DEBUG && emitter.emit("first-test");
   emitter.emit("connect-sql");
});