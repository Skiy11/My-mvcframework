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

    });
})(jQuery);
