var app = {


    renderLiked: function(order) {
        Parse.initialize("Pfx7Q4qTar92RiUQfGWdBeqLk9yUCQlWHT8r5LDt", "W1R2kFLnlUL4gIQ17q21CBmZ0Pe8mNzLZ1HvGu71");

        // Extend the Parse 'Like' class.
        var Like = Parse.Object.extend("like");

        // Create a query object.
        var query = new Parse.Query(Like);

        // Sort by updated time.
        query.descending(order);

        // Set limit to 20, default is 100.
        query.limit(15);

        // Clear any existing content
        $( "#liked" ).html("");

        // Run the query.
        query.find({
            success: function (results) {

                results.forEach(function (item) {

                    var url = item.get('url');
                    var img_path = "?url="+url+"&viewport=1480x1037&thumbnail_max_width=500";
                    var token = md5(img_path + "S5186C33D0A175");
                    var img_src = "http://api.url2png.com/v6/P53657257D7555/"+token+"/png/"+img_path;

                    // Insert the page data into the recently liked list
                    $( "#liked" ).append( "<div class='page'><a href='" + url + "' target='_blank'><img src='"+img_src+"' /></a><div class='bg-fade'></div><a class='title' href='" + url + "' target='_blank'>" + item.get('title') + "</a><div class='count'><i class='fa fa-lock'></i> &nbsp;" + item.get('count') + "<div class='nub'><s></s><i></i></div></div></div>" );

                });
                $('#liked img').error(function(){
                    $(this).attr('src', 'assets/missing.png');
                });
                $( "#liked .page" ).each(function(index) {
                    $(this).stop().delay(50*index).animate({opacity:1},200);
                });
            },
            error: function (err) {
                console.error(err);
            }
        });
    },
    controlScrolling: function() {
        // Use smooth scroll to make sure that movement in the page look nice
        $('a').smoothScroll();
    },
    addTriggers: function() {
        $( "#stream li").click(function() {
            $( "#stream li.active").removeClass("active");
            $(this).addClass("active");
            var order = $(this).data("order");
            app.renderLiked(order);
        });
        $( "#stream li.active").trigger("click");
        var tryActive = true;
        $( window ).scroll(function() {
            var scrollTop = $(window).scrollTop();
            if(scrollTop > 0) {
                if(tryActive) {
                    tryActive = false;
                    $("#try-it-out").fadeOut();
                }
            }
            else {
                if(!tryActive) {
                    tryActive = true;
                    $("#try-it-out").fadeIn();
                }
            }
        });

        //$('.tip').tooltip({});

        var client = new ZeroClipboard( document.getElementById("copy-button"), {
            moviePath: "assets/zeroclipboard/ZeroClipboard.swf"
        } );

        client.on( "load", function(client) {
            // alert( "movie is loaded" );

            client.on( "complete", function(client, args) {
                // `this` is the element that was clicked
                $(this).addClass("clicked");
                $(this).tooltip('show')
                //alert("Copied text to clipboard: " + args.text );
            } );
        } );

    },
    build: function() {
        app.controlScrolling();
        app.addTriggers();
    }
};

$(document).ready(function() {
    app.build();
});

