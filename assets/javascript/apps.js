//initial array of ghouls

var ghouls = ['Babadook', 'Norman Bates', 'The Boogeyman', 'Chupacabra', 'Donald Trump', 'Cujo', 'Gremlins', 'Jigsaw', 'Freddy Krueger', 'Krampus', 'Hannibal Lecter', 'Jack Torrance', 'Jason Voorhees', 'Annie Wilkes', 'Pennywise', 'Chucky', 'Captain Spaulding'];




//button calls 10S gifs from giphy(static)
function displayGhoulGif() {
    $("#gif-view").empty();
    var ghoul = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + ghoul + "&api_key=hEOJpTZTXZTmdI9Wu2qQpiO2COrWCj5q&limit=5";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {

        
        var results = response.data;

        for (var j = 0; j < results.length; j++) {
            
            var gifDiv = $("<div class='item card'>");
            var rating = results[j].rating;
            var p = $("<p>").text("Rating: " + rating.toUpperCase());
            
            
            var ghoulImage = $("<img>");


            ghoulImage.attr("data-animate", results[j].images.original.url);
            ghoulImage.attr("data-state", "animate");
            ghoulImage.attr("src", results[j].images.original.url);
            ghoulImage.attr("data-still", results[j].images.original_still.url);
           
            ghoulImage.addClass("gif");


            gifDiv.append(ghoulImage);
            gifDiv.append(p);
            $("#gif-view").prepend(gifDiv);

        };

        console.log(response.data);
    });


};
//create loop that appends buttons for each string in the array

function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < ghouls.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-ghoul");
        a.attr("data-name", ghouls[i]);
        a.text(ghouls[i]);
        $("#buttons-view").append(a);
    }
}


// This function handles events where one button is clicked
$("#add-ghoul").on("click", function (event) {
    event.preventDefault();
    // This line will grab the text from the input box
    var ghoul = $("#ghoul-input").val().trim();
    // The ghoul from the textbox is then added to our array
    ghouls.push(ghoul);

    // calling renderButtons which handles the processing of our ghoul array
    renderButtons();
});

$(document).on("click", ".btn-ghoul", displayGhoulGif);

$("#gif-view").on("click", ".gif", function () {
    console.log("clicked");


    var state = $(this).attr("data-state");

    if (state === "animate") {
        
        
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        
        
    } else {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");


    }
});

// Calling the renderButtons function at least once to display the initial list of ghouls
renderButtons();