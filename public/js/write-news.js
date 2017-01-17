(function ($) {
    $(document).ready(function () {
        $(".write-news-form input").click(function(){
            $('.text-news').slideDown();
            $('.btn-hide').slideDown();
        });

        $(document).click( function(event){
            if( $(event.target).closest(".post-form").length )
                return;
            $('.text-news').slideUp();
            $('.btn-hide').slideUp();
            event.stopPropagation();
        });

        $.ajax({
            type : 'POST',
            url : 'add-news',
            data : $('write-news-form').serialize(),
            success : function() {
            }
        });
    });
})(jQuery);
