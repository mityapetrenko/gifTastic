var topics=["Bugs Bunny", "Mickey Mouse", "Popeye", "Donald Duck", "Daffy Duck","Tweetie"];
$( document ).ready( function(){

    function renderButtons() {
    $("#buttonsDiv").empty();
        // Delete the content inside the movies-view div prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)

        // Loop through the array of characters, then generate buttons for each cartoon character in the array
      for(var j=0; j< topics.length; j++){
       var a =$("<button>");
         a.addClass("cartoon");
        a.attr("data-name", topics[j]);
        a.text(topics[j]);
        $("#buttonsDiv").append(a);      
      }
      console.log(j); 
    }
     renderButtons();
    
   // Calling the renderButtons function to display the initial list of characters

   $(document).on("click",".cartoon", function() {
        // In this case, the "this" keyword refers to the button that was clicked
        var toon = $(this).attr("data-name");

        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      toon + "&api_key=e4atuEvatt8hRoV5K4D587kLNDttQJOu&limit=10";

        // Performing our AJAX GET request
        $.ajax({
      url: queryURL,
      method: "GET"
        })
      // After the data comes back from the API
        .then(function(response) {
        // Storing an array of results in the results variable
            var results = response.data;
            console.log(response);
            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div for the gif
            var gifDiv = $("<div>");
                gifDiv.addClass("gifDiv");
            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var personImage = $("<img>");
            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            personImage.attr("src", results[i].images.fixed_height_still.url);
            personImage.attr("data-still", results[i].images.fixed_height_still.url)
            personImage.attr("data-animate", results[i].images.fixed_height.url);
            personImage.attr("data-state", "still")
            personImage.addClass("gifs");
            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(personImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifContainer").prepend(gifDiv);
                
            };
            };
              //animating gifs
    $(".gifs").on("click", function(changeState) {
        var state = $(this).attr("data-state");
        if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        }
        else {
         $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
            }
            changeState();
    });
                
        })
   })

   $("#add-character").on("click", function(event) {
    event.preventDefault();
        // This line of code will grab the input from the textbox
    var character = $("#cartoon-input").val().trim();
    console.log(character);
    // The movie from the textbox is then added to our array
    topics.push(character);
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
    console.log(topics);
    $("#cartoon-input").val("");
    });
  
});