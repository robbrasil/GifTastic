var btnArray = ["Messi", "Neymar", "Ronaldo", "Kaka", "Zidane", "Robinho", "Zlatan"];
var personImage;
var animate="";
var still="";

$.each(btnArray, function (i, value) {
    $("#divButtons").append("<button class='btn btn-success' onclick='gifButton(this.name)' name=" + btnArray[i] + ">" + btnArray[i] + "</button>");
});

    function addNewButton() {
        console.log("button pressed");
        var newButton = $("#txtInput").val().trim();
        $("#divButtons").append("<button class='btn btn-success' onclick='gifButton(this.name)' name="+ newButton + ">" + newButton + "</button>");
    };

    function gifButton(value) {
        $("#divGifs").empty();
        console.log(value);
        console.log( value + " button pressed");
       
        var person = value;

        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" +
            person + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Performing our AJAX GET request
        $.ajax({
            url: queryUrl,
            method: "GET"
        })
            // After the data comes back from the API
            .done(function (response) {
                // Storing an array of results in the results variable
                var results = response.data;
            console.log(results);

                // Looping over every result item
                for (var i = 0; i < results.length; i++) {

                    // Only taking action if the photo has an appropriate rating
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                        still = String(results[i].images.fixed_height_still.url);
                         animate = String(results[i].images.fixed_height.url);
                      

                        // Creating a div with the class "item"
                        var gifDiv = $("<div class='item'>");

                        // Storing the result item's rating
                        var rating = results[i].rating;

                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + rating);

                        // Creating an image tag
                        personImage = $("<img class='gif' src=" + animate + " onclick='changeState(this.dataset.animate, this.dataset.still)' style='cursor:pointer' data-still=" + still + " data-animate=" + animate + " data-state='still'>");

                        // Giving the image tag an src attribute of a proprty pulled off the
                        // result item
                       
                        // Appending the paragraph and personImage we created to the "gifDiv" div we created
                        gifDiv.append(p);
                        gifDiv.append(personImage);

                        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                        $("#divGifs").prepend(gifDiv);
                    }
                }
            });
    }

     function changeState(animate, still) {
        console.log("Gif clicked");
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        console.log(state);
        console.log(animate);
        console.log(still);
        
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
           
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");

            console.log("Img src=" + $(this).attr("src"));
            console.log("Animated url= " + animate);
        } else {
            $(this).attr("src", still);
            $(this).attr("data-state", "still");

            console.log("Img src= " + $(this).attr("src"));
            console.log("Still url= " + still);
        }
    };

