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
        query.limit(20);

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
                    $( "#liked" ).append( "<div class='page'><img src='"+img_src+"' /><a class='title' href='" + url + "'>" + item.get('title') + "</a><div class='count'>" + item.get('count') + "<div class='nub'><s></s><i></i></div></div></div>" );

                });
                $('#liked img').error(function(){
                    $(this).attr('src', 'assets/missing.png');
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
    },
    build: function() {
        app.controlScrolling();
        app.addTriggers();
    }
};

$(document).ready(function() {
    app.build();
});

