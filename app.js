// the following codes define preset buttons
var giphyPresetButtonsArray = ["batman","tomorrow","unicorn","maps","noodles"];
var favGif = [];


function displayFavGif() {
  $("#movies-view").empty();
  for (var i=0; i<favGif.length; i++) {
    var FavImage = $("<img>").attr("src", favGif[i]);
    $("#movies-view").prepend(FavImage);
  }
}

//the following codes define a fucntion which will take the input from button array and create buttons, each 
// each button will have a class and an attribute
function renderButtons() {
    // Deleting the buttons prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Looping through the array of movies
    for (var i = 0; i < giphyPresetButtonsArray.length; i++) {
      // Then dynamically generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var myButton = $("<button>");
      // Adding a class of movie to our button
      myButton.addClass("giphy");
      // Adding a data-attribute
      myButton.attr("data-name", giphyPresetButtonsArray[i]);
      // Providing the initial button text
      myButton.text(giphyPresetButtonsArray[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(myButton);
    }
  };

// the following lines define the function when user click on Add a Giphy. it takes the text from the box
// as input then create a new button. at the same time, the input text is added to the button array
  $("#add-giphy").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var inputGiphy = $("#giphy-input").val().trim();
    // Adding the movie from the textbox to our array
    giphyPresetButtonsArray.push(inputGiphy);
    console.log(giphyPresetButtonsArray);
    renderButtons();
  });

  // the following line run the renderButtons() function
  renderButtons();

// the following codes define what action happen when user click on a giphy button
  function displayGiphyInfo() {
    
    var giphy = $(this).attr("data-name");
    var queryURL = "https://www.omdbapi.com/?t=" + giphy + "&y=&plot=short&apikey=trilogy";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&limit=10&api_key=wslWpWhssAgYDK6zVXacBDsacT47flr4"
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        for (var limit = 0; limit < 10; limit++){
      //console.log(queryURL);
      //console.log(JSON.stringify(response))
      //console.log(response.data[limit].images.original.url);
      //$("#movies-view").text(JSON.stringify(response));
      var image = $("<img>").attr("src", response.data[limit].images.original.url);
      image.addClass("gifImage");
      image.attr("thisImageURL", response.data[limit].images.original.url);
      //console.log(image);
      $("#movies-view").prepend(image);
      //var movieDiv = $("div class='movie'>");
      //movieDiv.append(image);
      //$("#movies-view").prepend(movieDiv);
      }
      //$("#movies-view").text(JSON.stringify(response));
    });
  }

  function alertImage() {
    var clickImageURL = $(this).attr('src');
    //alert("this is an image with URL: " + clickImageURL);
    if (confirm("Save this image to favorite?")) {
      alert("saved to favorite");
      favGif.push(clickImageURL);
      console.log(favGif);
      $("#favCount").text("you have  saved " + favGif.length +" favorite");
    }
    else {
      alert("Not save to favorite");
    }
    }
  

  $(document).on("click", ".giphy", displayGiphyInfo);
  $(document).on("click", ".gifImage", alertImage);
  $(document).on("click", ".FavButtonClass", displayFavGif);


 
  