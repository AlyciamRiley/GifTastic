var ghouls = ['Babadook', 'Norman Bates', 'The Boogeyman', 'Chupacabra', 'Donald Trump', 'Cujo', 'Gremlins', 'Jigsaw', 'Freddy Krueger', 'Krampus', 'Hannibal Lecter', 'Jack Torrance', 'Jason Voorhees', 'Annie Wilkes', 'Pennywise', 'Chucky', 'Captain Spaulding'];

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
    });
};

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < ghouls.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-ghoul");
        a.attr("data-name", ghouls[i]);
        a.text(ghouls[i]);
        $("#buttons-view").append(a);
    }
};

$("#add-ghoul").on("click", function (event) {
    event.preventDefault();
    var ghoul = $("#ghoul-input").val().trim();
    ghouls.push(ghoul);
    renderButtons();
});

$(document).on("click", ".btn-ghoul", displayGhoulGif);

$("#gif-view").on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    } else {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
});

renderButtons();