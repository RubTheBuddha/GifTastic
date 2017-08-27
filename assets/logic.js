  var animals = [ "Cat","Dog","Bird","Raccoon","Lion","Zebra","Buffalo","Cow","Gopher","Goat","Panda",]
    

    function renderButtons() {

     
        $("#buttons-view").empty();

        
        for (var i = 0; i < animals.length; i++) {

          
          var a = $("<button>");
         
          a.attr("data-animal", animals[i]);
          
          a.text(animals[i]);
          
          $("#buttons-view").append(a);
        }

      };
      renderButtons();


 $("#add-animal").on("click", function(event) {
        event.preventDefault();
        
        var addAnimal = $("#animal-input").val().trim();

        animals.push(addAnimal);

        
        renderButtons();
      });


    

    $("button").on("click", function() {
      var animal = $(this).attr("data-animal");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      $("#gifs-appear-here").empty();
     

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        

        console.log(response);

        
        var results = response.data ;

        // ========================

        for (var i = 0; i < results.length; i++) {

        var animalDiv = $("<div class='item'>");

          var rating = results[i].rating;

          var p = $("<p>").html("Rating: " + rating);

          var animalImage = $("<img>");
          animalImage.attr("src", results[i].images.fixed_height.url);
          animalImage.attr("data-still", results[i].images.fixed_height_still.url);
          
          animalImage.attr('data-state', 'still');
          
          

          animalImage.addClass("gif");

          animalDiv.append(p);
          animalDiv.append(animalImage);

          
          $("#gifs-appear-here").prepend(animalDiv);
     }

      $(".gif").on("click", function() {
       

        var state = $(this).attr("data-state");

            if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

    });

     
      });
    

    });