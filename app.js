$(document).ready(function () {
    console.log("Welcome to GIFDOME");

    var moodButtonsArray = ['happy', 'sad', 'amused', 'calm', 'content', 'angry', 'energetic', 'melancholy', 'giddy', 'silly', 'optimistic', 'frustrated', 'irate', 'contemplative', 'cynical', 'dorky', 'giggly'];

    //Array of moods
    var moods = [];

    showGifs();


    function showGifs() {
        //so gifs don't get added repeatedly with each search
        $("#gifSpace").empty();

        for (var i = 0; i < moods.length; i++) {
            //adds gifs and ratings depending on search term added 

            var gifHTML = '<div class="moods"><p> Rating: ' + moods[i].rating + '</p><img src="' + moods[i].images.fixed_height_still.url + '" data-still="' + moods[i].images.fixed_height_still.url + '" data-animate="' + moods[i].images.fixed_height.url + '" data-state="still" class="gif"></div>';

            $("#gifSpace").append(gifHTML);
            /// moved long line of code with iterations and still/animated data to it's own variable for readability when console logged
        }
    };

    function renderButtons() {
        //so the permanent buttons don't get added over and over
        $("#moodButtons").empty();

        for (i = 0; i < moodButtonsArray.length; i++) {
            var maker = $("<button>");
            maker.addClass("moodBtn"); // class of moodBtn to button      
            maker.attr("moodName", moodButtonsArray[i]) // initial name to button text
            maker.text(moodButtonsArray[i]); // adding button to mood buttons div
            $("#moodButtons").append(maker);
        }
    }

    $("#searchButton").on("click", function (event) {
        event.preventDefault();

        var moods = $("#searchInput").val().trim();
        if (moods !== "") {
        moodButtonsArray.push(moods);
        }


        renderButtons();
    });

    renderButtons();

    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        console.log(state);
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });
    

    $(document).on("click", ".moodBtn", function () {
        // formerly used javascript click event, which would get into a state where everything broke when trying to produce gifs for newly created button. switched this to jQuery click event and no issues


        //gets value of search item
        var searchItem = $(this).attr("moodName"); // looks at the attribute for the button being clicked and sets as search attribute


        //#myFirstApiKey, with searchItem variable to push search to giphy
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=AZknhNL1EbM37Zj2hqjy3FmeNpNNLmZ8&limit=15&q=" + searchItem;

        $.get(queryURL, function (response) {
            moods = response.data;
            showGifs()
        });



    });

});

