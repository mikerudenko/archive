/**
*Created by Balion 27.03.15
*Last modify 29.03.15
*/

//MENU OF JS CODE

/*
* 1.myResire() this function need if you will resire window
*	 than the styles of your document will changed.
* 2.mySlider() this function need to create diffrent sliders
*	on diffrent resolutions of your screen
* 3.hoverList() this function need for second level list menu on header
* 4.openNav() this function need for button to open menu on doards & phones
*/

var flagOpenNav=false;

//Point of enter in my program

window.addEventListener("load",function(){
	mySlider();
	openNav();
	hoverList();
	myResire();

},false)

function myResire() {
	if($(window).width()>1180) {
			$('.main-header ').css({'overflow':'visible'});
		}

	$(window).resize(function(){
		mySlider();
		if($(window).width()>1180){
			$('.main-header ').css({
				'height':'77px',
				'overflow':'visible'
			});
			flagOpenNav=!flagOpenNav;
		} else {
			$('.main-header ').css({'overflow':'hidden'});
		}

	});
}

function mySlider(){
		var numberOfSliders,
			spaceBetweenSlides,
			w=$( window ).width();

		if(w<650) {
			spaceBetweenSlides=0;
			numberOfSliders=1;
		} else if(w>650 && w<1180) {
			spaceBetweenSlides=30
			numberOfSliders=2;
		} else {
			spaceBetweenSlides=30;
			numberOfSliders=3;
		}

	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		slidesPerView: numberOfSliders,
		paginationClickable: true,
		spaceBetween: spaceBetweenSlides,
		freeMode: true
	});
}

function hoverList(){ 
	$('.image-item').hover(function(){
		$(this).find(".title-in-image-item").css({
			'background-color':'rgba(0,0,0,.7)',
			'opacity':'1'
		});
		$(this ).next().css({
			'opacity':'0'
		});
	},
	function(){
		$(this).find(".title-in-image-item").css({
			'background-color':'none',
			'opacity':'0'
		});
		$(this).next().css({
			'opacity':'1'
		});
	});
}

function openNav(){
	$('.open-menu-button ').click(function(){
		flagOpenNav=!flagOpenNav;
		if(flagOpenNav)
			$('.main-header ').css({'height':'500px'});
		else
			$('.main-header ').css({'height':'77px'});
	});

	if($(window).width()>1180)
		$('.main-header ').css({'height':'77px'});
}