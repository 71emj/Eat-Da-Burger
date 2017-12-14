const DEBUG = true;

const Path = require("path"),
   Join = Path.join,
   exHbs = require("express-handlebars");

// handling uncaught errors
require(Join(__dirname, "../errorhandler/handler.js"));

module.exports = function(emitter, connection) {
   const orm = require(Join(__dirname, "../config/orm.js"))(emitter, connection);
   let res = "response object";

   // render the page when first being requested by the user
   emitter.on("render-initial", function(response) {
      res = response;
      orm.selectAll();
   });

   emitter.on("more-burger", function(burgerName, response) {
      res = response;
      orm.insertOne(burgerName);
   });

   emitter.on("update-one", function(burgerName, burgerId, response) {
      res = response;
      orm.updateOne(burgerName, burgerId);
   });

   emitter.on("query-complete", function(data) {
      if (!data) {
         DEBUG && console.log("here I am");
         return res.status(200).end("database update");
      }

      DEBUG && console.log("ready to test send");
      const burger = data.filter((elem) => {
            return !elem.devoured;
         }),
         devBurger = data.filter((elem) => {
            return elem.devoured;
         });

      DEBUG && console.log("send");
      res.render("index", { burgers: burger, devoured: devBurger });
      // const html = exHbs.renderView("index", { burgers: burger, devoured: devBurger });
      // console.log(html);
   });

   return exHbs;
}