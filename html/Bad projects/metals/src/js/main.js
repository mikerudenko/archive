window.onload = function(){
	$('.tab-item').on('click',function() {
		var item = $(this),
			contentItem = $('.tabs-content-item'),
			itemPositiion = item.data('class');

			console.log(itemPositiion);

		contentItem.filter('.tabs-content-item'+itemPositiion)
			.addClass('active-tab-content-item')
			.siblings()
			.removeClass('active-tab-content-item')

		item.addClass('active-tab')
			.siblings()
			.removeClass('active-tab')
	});
}

