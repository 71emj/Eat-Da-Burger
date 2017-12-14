(function($) {
   console.log("loaded");
   const newBurgerBtn = document.getElementById("burger_new"),
      eatBurgerBtns = document.querySelectorAll("ul.burger_btn")[0];

   console.log(newBurgerBtn);
   newBurgerBtn.onclick = function(event) {
      event.preventDefault();
      const burgerName = $("#burger_name").val();

      $.ajax({
         url: "/eat-da-burger",
         method: "POST",
         data: { name: burgerName },
         traditional: true
      }).done(function(response) {
         console.log(response);
         location.reload();
      });
   }

   eatBurgerBtns.addEventListener("click", function(event) {
      // location.reload();
      const evntTarget = $(event.target);
      if (evntTarget.is("button")) {
      	event.preventDefault();
         const burgerName = evntTarget.val();

         $.ajax({
            url: "/eat-da-burger",
            method: "PUT",
            data: { name: burgerName, nameid: evntTarget.data("id") },
            traditional: true
         }).done(function(response) {
            console.log(response);
            location.reload();
         });
      }
   });
}(jQuery));