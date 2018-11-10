$(document).ready(function () {
    console.log("Welcome to GIFDOME");

//Array of moods
    var moods = [];
 
    var moodTopicsArray = [ 'happy', 'sad', 'amused', 'calm', 'content', 'angry', 'energetic', 'idyllic', 'melancholy', 'giddy', 'silly', 'optimistic', 'frustrated', 'irate', 'comtemplative', 'cynical', 'dorky', 'giggly'
    ];


//search button click event
    $('#searchButton').on('click', function() {
        //gets value of search item
        var searchItem = $("#searchInput").val();
        // console.log("#searchInput");
        //#myFirstApiKey, with searchItem variable to push search to giphy
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=AZknhNL1EbM37Zj2hqjy3FmeNpNNLmZ8&q=" + searchItem;
       
        $.get(queryURL, function (response) {
            moods = response.data;
            showGifs()
        });
    });

    function showGifs(){
        $("#gifSpace").empty();

        for (var i=0; i < moods.length; i++) {
            console.log([i]);
            $("#gifSpace").append('<div class="moods"><p> Rating: '+ moods[i].rating +'</p><img src="' + moods[i].images.fixed_height.url + '"></div>');
        }
    }




});

