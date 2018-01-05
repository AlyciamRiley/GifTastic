//declare global variables

//elements that will be added to site
    //dynamic buttons
    //search bar
    //gifs (append div?)

//initial array of ghouls

var ghouls = ['Babadook', 'Norman Bates', 'The Boogeyman', 'Chupacabra', 'Donald Trump', 'Cujo', 'Gremlins', 'Jigsaw', 'Freddy Krueger', 'Krampus', 'Hannibal Lecter', 'Jack Torrance', 'Jason Voorhees', 'Annie Wilkes', 'Pennywise', 'Chucky', 'Captain Spaulding'];

//create loop that appends buttons for each string in the array
function renderButtons () {
    $("#buttons").empty();
    
    for (var i = 0; i < ghouls.length; i++) {
   
        
          // Then dynamicaly generating buttons for each ghoul in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("ghouls");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-ghoul", ghouls[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(ghouls[i]);
          // Adding the button to the HTML
          $("#buttons").append(a);
    }
};
     
  

//User interaction starts

//User clicks button

    
$("#buttons").on("click", function() {
    ghouls = $(this).attr("data-ghoul");
    
//button calls 10 gifs from giphy(static)
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + ghouls + "&api_key=hEOJpTZTXZTmdI9Wu2qQpiO2COrWCj5q&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }) .done(function(response) {
        var results = response.data;
        
        for (var j = 0; j < results.length; j++) {
            
                var gifDiv = $("<div class='item'>");
                var rating = results[j].rating;
                var p = $("<p>").text("Rating: " + rating);
                
                var ghoulImage = $("<img>");
                
                ghoulImage.attr("src", results[j].images.fixed_height.url);
                gifDiv.append(p);
                gifDiv.append(ghoulImage);
                $("#gifs").prepend(gifDiv);
            }
        
        console.log(queryURL);
    })

});

//gifs appear in div



//User clicks gif and it animates

//user can add own button

  // This function handles events where one button is clicked
      $("#add-ghoul").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var addGhoul = $("#ghoul-input").val().trim();
        // The movie from the textbox is then added to our array
        ghouls.push(addGhoul);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Calling the renderButtons function at least once to display the initial list of movies
      renderButtons();

