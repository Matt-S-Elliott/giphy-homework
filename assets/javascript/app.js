topics = ["cat", "dog", "kitten", "puppy", "monkey", "snake", "cow", "horse", "zebra", "ant", "snail", "bird", "crocodile", "owl", "meercat", "sloth", "puma", "kangaroo", "koala"];


//Create initial button array
function createButtons() {
    $("#buttons-go-here").empty();
    for (var i = 0; i < topics.length; i++) {
        $("#buttons-go-here").append("<button class='btn btn-outline-primary' id='topic" + i + "' value='" + topics[i] + "'>" + topics[i] + "</button>");
    }
}
createButtons();

//Lets user add more to the topics array
$("#newAnimalButton").click(function () {
    var newAnimalText = $("#newAnimalText").val().trim();
    if (newAnimalText !== "") {
        topics.push(newAnimalText);
    }
    $("#newAnimalText").val("");
    createButtons();
})

$(document).on("click", ".btn", function () {
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=0Aw07tlKAjEZKillKQGuY4jdWj9zFOXy&limit=10&q=" + $(this).val();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#gifs-go-here").empty();
        var gifArray = response.data;
        for (var i = 0; i < gifArray.length; i++) {
            var newGifDiv = $("<div class='card'>");
            var newGif = $("<img class='card-img-top' id='" + i + "' src='" + gifArray[i].images.fixed_width_still.url + "' data-animate='" + gifArray[i].images.fixed_width.url + "' data-still='" + gifArray[i].images.fixed_width_still.url + "'>");
            var rating = $("<div class='card-body'><p class='card-text'>" + gifArray[i].rating + "</p></div>");
            newGifDiv.append(newGif);
            newGifDiv.append(rating);
            $("#gifs-go-here").append(newGifDiv);
        }
    })

})

$(document).on("click", "img", function () {
    var animateURL = $(this).attr("data-animate");
    var stillURL = $(this).attr("data-still");
    var srcURL = $(this).attr("src");
    if (animateURL === srcURL) {
        $(this).attr("src", stillURL);
    }
    if (stillURL === srcURL) {
        $(this).attr("src", animateURL);
    }
})
