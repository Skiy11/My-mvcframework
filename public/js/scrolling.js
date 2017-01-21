$(document).ready(function(){

    var inProgress = false;
    var startFrom = 4;

    $(window).scroll(function() {

        if($(window).scrollTop() + $(window).height() >= $(document).height() - 200 && !inProgress) {

            $.ajax({
                url: 'get-news',
                method: 'POST',
                data: {"startFrom" : startFrom},
                beforeSend: function() {
                    inProgress = true;}
            }).done(function(result){

                var data = JSON.parse(result);

                if (data.length > 0) {

                    $.each(data, function(i, item) {
                        var allPost = getPostTemplate(item);
                        $('article').append(allPost);
                    });

                    inProgress = false;
                    startFrom += 4;
                }
            });
        }
    });

    function getPostTemplate(data) {
        return '<div class="post block-article row">'
            + '<div class="author-avatar"> <img src="/img/ava.jpg"> </div>'
            + '<div class="author-name"> <h3>John Doe</h3> </div>'
            + '<div class="post-time">16 min.</div>'
            + '<div class="title-post"> <h2>'+data.title+'</h2> </div>'
            + '<div class="description"> <p>'+data.text+'</p> </div>'
            + '<div class="post-image"> <img src="'+data.image+'" class="img-responsive"> </div>'
            + '<div class="post-buttons"> <button type="button" class="btn btn-info btn-service"> <i class="fa fa-thumbs-up" aria-hidden="true"></i> Like </button>'
            + '<button type="button" class="btn btn-info btn-service"> <i class="fa fa-comment" aria-hidden="true"></i> Comment </button> </div>'
            + '</div>';
    }
});
