$(document).ready(function () {
    console.log("Welcome to GIFDOME");

var moodButtonsArray = ['happy', 'sad', 'amused', 'calm', 'content', 'angry', 'energetic', 'melancholy', 'giddy', 'silly', 'optimistic', 'frustrated', 'irate', 'contemplative', 'cynical', 'dorky', 'giggly'];

    //Array of moods
    var moods = [];

    //search button click event
    // $('#searchButton').on('click', function () {
    //     //gets value of search item
    //     var searchItem = $("#searchInput").val();
    //     // console.log("#searchInput");
    //     //#myFirstApiKey, with searchItem variable to push search to giphy
    //     var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=AZknhNL1EbM37Zj2hqjy3FmeNpNNLmZ8&q=" + searchItem;

    //     $.get(queryURL, function (response) {
    //         moods = response.data;
    //         showGifs()
    //     });
    // });

    showGifs();


function showGifs() {
    //so gifs don't get added repeatedly with each search
    $("#gifSpace").empty();

    for (var i = 0; i < moods.length; i++) {
        // console.log([i]);
        //adds gifs and ratings depending on search term added
        $("#gifSpace").append('<div class="moods"><p> Rating: ' + moods[i].rating + '</p><img src="' + moods[i].images.fixed_height.url + '"></div>');
    }
}

function renderButtons() {
    //so the permanent buttons don't get added over and over
    $("#moodButtons").empty();

    for (i = 0; i < moodButtonsArray.length; i++){
        var maker = $("<button>");
        maker.addClass("moodBtn"); // class of moodBtn to button      
        maker.attr("moodName", moodButtonsArray[i]) // initial name to button text
        maker.text(moodButtonsArray[i]); // adding button to mood buttons div
        $("#moodButtons").append(maker);
        // console.log(maker);
    }
}
$("#searchButton").on("click", function(event){
    event.preventDefault();

    var moods = $("#searchInput").val().trim();
    moodButtonsArray.push(moods);

    renderButtons();
});

renderButtons();

$(document).on("click", ".moodBtn", showGifs);

//search button click event
$('.moodBtn').on('click', function () {
    console.log('hey');


    //gets value of search item

   var searchItem = $(this).attr("moodName"); // looks at the attribute for the button being clicked and sets as search attribute


    //#myFirstApiKey, with searchItem variable to push search to giphy
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=AZknhNL1EbM37Zj2hqjy3FmeNpNNLmZ8&q=" + searchItem;

    $.get(queryURL, function (response) {
        moods = response.data;
        showGifs()
    });
});


});

