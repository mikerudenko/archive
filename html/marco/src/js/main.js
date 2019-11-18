$(document).ready(function(){

	// First variant
	/*$('.circle-btn').on('click',function() {

		var item = $(this),
			contentItem = $('.about-us-item'),
			itemPositiion = item.index();

		contentItem.eq(itemPositiion)
			.addClass('active-about-us-item')
			.siblings()
			.removeClass('active-about-us-item')

		item.addClass('active-circle-btn')
			.siblings()
			.removeClass('active-circle-btn')
	});*/

	$('.circle-btn').on('click',function() {
		var item = $(this),
			contentItem = $('.about-us-item'),
			itemPositiion = item.data('class');

		contentItem.filter('.about-us-item-'+itemPositiion)
			.addClass('active-about-us-item')
			.siblings()
			.removeClass('active-about-us-item')

		item.addClass('active-circle-btn')
			.siblings()
			.removeClass('active-circle-btn')
			.addClass('not-active-circle-btn')
	});


	$('.btn-open-menu').on('click', function(){
		if($('.main-nav-wrapper').css('overflow')=="hidden"){
			$('.main-nav-wrapper').css({
				'overflow':'visible',
				'height':'inherit'
			});
		} else {
			$('.main-nav-wrapper').css({
				'overflow':'hidden',
				'height':'0'
			});
		}
	});

	$(window).resize(function() {
		if($(window).width()>=783) {
			$('.main-nav-wrapper').css({
				'overflow':'visible',
				'height':'inherit'
			});
		} else {
			$('.main-nav-wrapper').css({
				'overflow':'hidden',
				'height':'0'
			});
		}
	});

});

