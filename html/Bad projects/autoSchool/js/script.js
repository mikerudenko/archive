//point of enter

window.addEventListener("load", function() {
	var mySwiper = new Swiper ('.swiper-container', {
	  // Optional parameters
	  direction: 'horizontal',
	  pagination: '.swiper-pagination',
	  paginationClickable: true,
	  freeMode: true,

	  loop: true
	})  

	for(var i=1;i<11;i++){
		var id='#title-reason-'+i;
		accordeon(id);
	}

}, false);


function accordeon(id){
	$(id+','+id+'> article').hover(function(){
		$(id).css({
			'border':'2px solid black',
			'border-bottom':'none',
			'z-index':'44'
		});


		$(id+'> article')
		.css({'border':'2px solid black'})
		.show();
	},
	function(){
		$(id).css({'border':'none','z-index':'0'});
		$(id+'> article')
		.hide();
	});
}