module.exports = function(emitter, connection) {
   const Path = require("path"),
      Handlebars = require("express-handlebars");

   const orm = require(Path.join(__dirname, "../config/orm.js"))(emitter, connection);
   let res = "response object";

   // render the page when first being requested by the user
   emitter.on("render-initial", function(response) {
      res = response;
      console.log(res);
      res.render("index", { burgers: [ { burger_name: "AHHH" } ] });
   });

   emitter.on("more-burger", function(burgerName, response) {
      res = response;
      orm.insertOne(burgerName);
   });

   emitter.on("update-one", function(burgerName, response) {
      res = response;
      orm.updateOne(burgerName);
   });

   emitter.on("query-complete", function(data) {

      if (!data) {
         console.log("here I am")
         return orm.selectAll();
      }

      console.log("ready to test send");
      const burger = data.filter((elem) => {
            return !elem.devoured;
         }),
         devBurger = data.filter((elem) => {
            return elem.devoured;
         });

      console.log(burger);
      console.log(devBurger);
      console.log(res);
      res.render("index", { burgers: burger, devoured: devBurger });
      console.log("send");
   });


   return Handlebars;
}