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
            + '<div class="post-time">'+data.created_at+'</div>'
            + '<div class="title-post"> <h2>'+data.title+'</h2> </div>'
            + '<div class="description"> <p>'+data.text+'</p> </div>'
            + '<div class="post-image"> <img src="'+data.image+'" class="img-responsive"> </div>'
            + '<div class="post-buttons"> <button type="button" class="btn btn-info btn-service"> <i class="fa fa-thumbs-up" aria-hidden="true"></i> Like </button>'
            + '<button type="button" class="btn btn-info btn-service btn-comment" data-id="'+data.id+'"> <i class="fa fa-comment" aria-hidden="true"></i> Comment </button> '
            + '<button type="button" class="btn btn-info btn-service btn-delete" data-id="'+data.id+'" > <i class="fa fa-trash" aria-hidden="true"></i> Delete </button></div>'
            + '<div class="write-comment"> <h4>Write your comment:</h4>'
            + '<textarea class="form-control" rows="3" name="text-comment"></textarea>'
            + '<button type="button" class="btn btn-info btn-service"> <i class="fa fa-paper-plane" aria-hidden="true"></i> Add comment </button> </div>'
            + '</div>';
    }
});
