(function ($) {
    $(document).ready(function () {
        var $postForm = $('#write-news-form');

        $postForm.on('click', 'input', function(){
            $('.text-news').slideDown();
            $('.btn-hide').slideDown();
        });

        $(document).click(function(event){
            if ($(event.target).closest(".post-form").length ) {
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
                    location.reload();
                },
                error: function() {
                    alert('Something went wrong. Sorry :\'(');
                }
            });

            return false;
        });

        $('article').on('click', '.btn-delete', function () {
            $.ajax({
                type: 'POST',
                url: 'delete-news',
                data: {'id':JSON.stringify($(this).attr("data-id"))},
                success: function (result) {
                    location.reload();
                },
                error: function () {
                    alert('Something went wrong. Sorry :\'(');
                }
            });
        });

        $.ajax({
            type: 'POST',
            url: 'get-news',
            data: $(this).serialize(),
            success: function (result) {
                var data = JSON.parse(result);

                data.forEach(function (item, i, data) {
                    var allPost = getPostTemplate(item);
                    $('article').append(allPost);
                });

            },
            error: function () {
                alert('Something went wrong. Sorry :\'(');
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
                + '<button type="button" class="btn btn-info btn-service btn-comment" data-id="'+data.id+'"> <i class="fa fa-comment" aria-hidden="true"></i> Comment </button>'
                + '<button type="button" class="btn btn-info btn-service btn-delete" data-id="'+data.id+'" > <i class="fa fa-trash" aria-hidden="true"></i> Delete </button> </div>'
                + '<div class="write-comment unique-form-'+data.id+'"> <h4>Write your comment:</h4>'
                + '<form id="write-comments-form"  form-id = "'+data.id+'" action="" method="post">'
                + '<textarea class="form-control" rows="3" name="text-comments"></textarea>'
                + '<button type="submit" class="btn btn-info btn-service btn-add-comment" data-id="'+data.id+'" > <i class="fa fa-paper-plane" aria-hidden="true"></i> Add comment </button> </form></div>'
                + '<div class="show-button"><button type="button" class="btn btn-info btn-show" data-id="'+data.id+'" > <i class="fa fa-eye" aria-hidden="true"></i> Show comments </button> </div>'
                + '<div class="comments" comment-id="'+data.id+'"></div>'
                + '</div>';
        }
    });
})(jQuery);
