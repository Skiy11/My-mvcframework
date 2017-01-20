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
    });
})(jQuery);
