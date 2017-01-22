(function ($) {
    $(document).ready(function () {

        $('article').on('click', '.btn-comment', function (){
            var idNews = $(this).attr("data-id");
            $('.unique-form-'+idNews).slideDown();
        });

        $(document).click(function(event){
            if ($(event.target).closest(".post").length ) {
                return;
            }

            $('.write-comment').slideUp();
        });

        $('#write-comments-form').submit(function () {

            $.ajax({
                type: 'POST',
                url: 'add-comments',
                data: $(this).serialize(),
                success: function (result) {
                    console.log('hello');
                },
                error: function() {
                    alert('Something went wrong. Sorry :\'(');
                }
            });

            return false;
        });

        /*$postForm.on('click', '.btn-delete', function () {
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
        });*/

        function getCommentTemplate(data) {
            return '<div class="comments"><h4>Comments:</h4>'
                    + '<div class="row">'
                    + '<div class="user-avatar"><img src="/img/ava.jpg"></div>'
                    + '<div class="comment-info">'
                    + '<div class="row">'
                    + '<div class="username">John Doe</div>'
                    + '<div class="comment-time">'+data.created_at+'</div>'
                    + '<div class="text-comment">'+data.text+'</div></div></div></div>';
        }
    });
})(jQuery);
