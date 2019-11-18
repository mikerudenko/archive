$(document).ready(function(){
	var swiper = new Swiper('.swiper-container', {
		spaceBetween: 100,
		speed: 1000,
		autoplay:3000,
		loop:true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
	});


	$('.hidden-comment-blocks').hide();
	$("#trigger-btn").click(function() {
		$(".hidden-comment-blocks").toggle( "slow");
	});

	//button to top
	$( document ).ready(function() {
		$('.button-up').click( function(){
			$("body").animate({"scrollTop":0},"slow");
			return false;
		});

		$(window).scroll(function(){
			if ( $(document).scrollTop() > 0 ) {
				$('.button-up').fadeIn('fast');
			} else {
				$('.button-up').fadeOut('fast');
			}
		});
	});

$('.modal-wrapper-thanks').click(function(){
	$(this).hide();
})

$('.main-nav-item  a').click(function(){
	$("html, body").animate({ scrollTop: $($(this).attr('href')).offset().top }, 1000);
})


/*Validation*/


jQuery(function($){
    $(".phone").mask("+7 (999) 999-9999");
});



});