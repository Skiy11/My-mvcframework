(function ($) {
    $(document).ready(function () {

        var article = $('article');

        article.on('click', '.btn-comment', function (){
            var idNews = $(this).attr("data-id");
            $('.unique-form-'+idNews).slideDown();
        });

        $(document).click(function(event){
            if ($(event.target).closest(".post").length ) {
                return;
            }

            $('.write-comment').slideUp();
        });

        article.on('click', '.btn-show', function (){
            var idNews = $(this).attr("data-id");
            $('.unique-comment-'+idNews).slideDown();
        });

        $(document).click(function(event){
            if ($(event.target).closest(".post").length ) {
                return;
            }

            $('.comments').slideUp();
        });

        article.on('click', '.btn-add-comment', function (){
            //var dataFormComment = $('#write-comments-form' ).serializeArray();
            var dataFormComment = $('#write-comments-form[form-id="'+$(this).attr("data-id")+'"]' ).serializeArray();
            var dataMsg = '';
            $.each(dataFormComment,function(){
                dataMsg = this.value;
            });

            console.log(dataMsg);
            var idNews = $(this).attr("data-id");
            $.ajax({
                type: 'POST',
                url: 'add-comments',
                data: {dataForm: dataMsg, id: idNews},
                datatype: 'JSON',
                success: function (result) {
                    location.reload();
                },
                error: function() {
                    alert('Something went wrong. Sorry :\'(');
                }
            });

            return false;
        });

        article.on('click', '.btn-show', function () {
            var idNews = $(this).attr("data-id");

            $.ajax({
                type: 'POST',
                url: 'get-comments',
                data: {'id': JSON.stringify($(this).attr("data-id"))},
                success: function (result) {
                    var data = JSON.parse(result);

                    data.forEach(function (item, i, data) {
                        var allComments = getCommentTemplate(item);
                        $('article .unique-comment-' + idNews).append(allComments);
                    });

                },
                error: function (data) {
                    alert('Something went wrong. Sorry :\'(');
                }
            });
        });

        $('article').on('click', '.comment-delete', function () {
            $.ajax({
                type: 'POST',
                url: 'delete-comments',
                data: {'id':JSON.stringify($(this).attr("data-id"))},
                success: function (result) {
                    location.reload();
                },
                error: function () {
                    alert('Something went wrong. Sorry :\'(');
                }
            });
        });

        function getCommentTemplate(data) {
            return  '<div class="row">'
                    + '<div class="user-avatar"><img src="/img/ava.jpg"></div>'
                    + '<div class="comment-info">'
                    + '<div class="row">'
                    + '<div class="username">John Doe</div>'
                    + '<div class="comment-time">'+data.created_at+'</div>'
                    + '<div class="comment-delete"  data-id="'+data.id+'"> <i class="fa fa-times" aria-hidden="true"></i></div>'
                    + '<div class="text-comment">'+data.text+'</div></div></div>';
        }
    });
})(jQuery);
