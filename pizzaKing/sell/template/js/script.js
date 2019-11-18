$(window).load(entryPoint);

function entryPoint() {
    "use strict";

    $('.pk-preloader-mask').remove();
    $('.pk-gallery-item-main  .catalog-open-button').click(openCatalog);
    $('.pk-gallery-catalog-section .close-catalog-button').click(closeCatalog);
    $.stellar();

    //Add slider
    var mySwiper = new Swiper ('.pk-slider-section.swiper-container', {
        // Optional parameters
        autoplay: {
            delay: 5000,
        },

        draggable: true,

        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });

    //smooth transition
    $('.pk-nav-and-social a').click(function(event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
        top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });

    $('.pk-button-up').click(function(event) {
        $('body,html').animate({scrollTop: 0}, 1500);
    });

    //Logic
    function openCatalog(event) {
        $('.pk-gallery-catalog-section[data-catalog-group=' + $(this).data('catalogGroup') + ']').slideToggle('slow');
        event.preventDefault();
    }

    function closeCatalog(event) {
        $(this).parent().slideUp();
        event.preventDefault();
    }

    var overlayOn = function() {
            $('<div id="imagelightbox-overlay"></div>').appendTo('body');
        },
        overlayOff = function() {
            $('#imagelightbox-overlay').remove();
        },
        closeButtonOn = function( instance ) {
            $('<a href="#" id="imagelightbox-close">Close</a>')
            .appendTo('body')
            .on('click', function(){ $( this ).remove(); instance.quitImageLightbox(); return false; });
        },
        closeButtonOff = function() {
            $('#imagelightbox-close').remove();
        },
        activityIndicatorOn = function() {
            $( '<div id="imagelightbox-loading"><div></div></div>' ).appendTo( 'body' );
        },
        activityIndicatorOff = function() {
            $( '#imagelightbox-loading' ).remove();
        };

    var instance = $( '.pk-gallery-catalog-section a' )
        .imageLightbox({
            onStart: function() { overlayOn(); closeButtonOn( instance ) },
            onEnd: function() { overlayOff(); closeButtonOff(); },
            onLoadStart: function() { activityIndicatorOn(); },
            onLoadEnd: function() { activityIndicatorOff(); }
        });
}



