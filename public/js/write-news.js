(function ($) {
    $(document).ready(function () {
        var $postForm = $('#write-news-form');

        $postForm.on('click', 'input', function(){
            $('.text-news').slideDown();
            $('.btn-hide').slideDown();
        });

        $(document).click( function(event){
            if ( $(event.target).closest(".post-form").length ) {
                return;
            }

            $('.text-news').slideUp();
            $('.btn-hide').slideUp();
        });

        $postForm.submit(function () {
            $.ajax({
                type: 'POST',
                url: 'add-news',
                data: $(this).serialize(),
                success: function (result) {
                    var data = JSON.parse(result);

                    var onePost = getPostTemplate(data);

                    $('article').append(onePost);
                },
                error: function() {
                    alert('Something went wrong. Sorry :\'(');
                }
            });

            return false;
        });

        $.ajax({
            type: 'POST',
            url: 'get-news',
            data: $(this).serialize(),
            success: function (result) {
                var data = JSON.parse(result);

                data.forEach(function(item, i, data) {
                    var allPost = getPostTemplate(item);
                    $('article').append(allPost);
                });

            },
            error: function() {
                alert('Something went wrong. Sorry :\'(');
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
})(jQuery);
