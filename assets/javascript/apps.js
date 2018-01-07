//initial array of ghouls

var ghouls = ['Babadook', 'Norman Bates', 'The Boogeyman', 'Chupacabra', 'Donald Trump', 'Cujo', 'Gremlins', 'Jigsaw', 'Freddy Krueger', 'Krampus', 'Hannibal Lecter', 'Jack Torrance', 'Jason Voorhees', 'Annie Wilkes', 'Pennywise', 'Chucky', 'Captain Spaulding'];

//create loop that appends buttons for each string in the array
function renderButtons () {
    $("#buttons").empty();
    
    for (var i = 0; i < ghouls.length; i++) {
          var a = $("<button class=btn>");
          a.addClass("ghouls");
          a.attr("data-ghoul", ghouls[i]);
          a.text(ghouls[i]);
          $("#buttons").append(a);
    }
};


//User interaction starts
//User clicks button
$('button').on("click", ".ghouls", function() {
   var selectedVal = $(this).attr("data-ghoul");
   
    
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
                var ghoulImage = $("<img id=ghoulGif>");
                
                ghoulImage.attr("src", results[j].images.fixed_height.url);
                gifDiv.append(p);
                gifDiv.append(ghoulImage);
                $("#gifs").prepend(gifDiv);
            }
        
        console.log(queryURL);
        console.log(response.data);
    })

});


  // This function handles events where one button is clicked
      $("#btn-ghoul").on("click", function(event) {
        event.preventDefault();
// This line will grab the text from the input box
        var addGhoul = $("#ghoul-input").val().trim();
        // The ghoul from the textbox is then added to our array
        ghouls.push(addGhoul);

        // calling renderButtons which handles the processing of our ghoul array
        renderButtons();
      });

      // Calling the renderButtons function at least once to display the initial list of ghouls
      renderButtons();