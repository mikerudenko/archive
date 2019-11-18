
window.addEventListener("load",function(){
	formAction();
	littleDevicesTable();
	$(window).resize(littleDevicesTable);
	$(".block-finished-table").hide();
	insetControllers(".pending",".finished",".pending-table",".block-finished-table");
	insetControllers(".finished",".pending",".block-finished-table",".pending-table");
},false);



function formAction() {

	$('.button-new-project').click(function(){
	    $('.dark-wrapper-project-form').css({
	      'z-index':5,
	      'opacity':1
	    });

	    $('.project-form').css({
	      'z-index':6,
	      'opacity':1
	    });
	    
	});

	$('.dark-wrapper-project-form').click(function(){
		$(this).css({ 
		  'z-index':-10,
		  'opacity':0
		});

		$('.project-form').css({
		  'z-index':-10,
		  'opacity':0
		});
	});


	$('body').keydown(function(eventObject){
	     if (eventObject.which == 27){
	     	$('.dark-wrapper-project-form').css({ 
	     	  'z-index':-10,
	     	  'opacity':0
	     	});

	     	$('.project-form').css({
	     	  'z-index':-10,
	     	  'opacity':0
	     	});
	     }
	 });
}

function littleDevicesTable(){
	if($(window).width()<883) {
		$('.table-of-projects tbody .item-status').hide();
		$('.table-of-projects thead td:nth-child(4)').hide();

	} else {
		$('.table-of-projects tbody .item-status').show();
		$('.table-of-projects thead td:nth-child(4)').show();
	}
}

//insets controllers

function insetControllers(controller,hideController,table,hideTable) {
	$(controller).click(function(){
		$(this).css({
			'border-bottom-color': '#f6f6f6',
			'background': 'none'
		});

		$(hideController).css({
			'border-bottom-color': '#cdcece',
			'background-image': 'url(images/pattern-insets.png)'

		});

		$(table).show();
		$(hideTable).hide();
	});
}
