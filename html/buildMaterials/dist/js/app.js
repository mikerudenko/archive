

jQuery(document).ready(function(){
  $('.accordion .head').click(function() {
      $(this).next().toggle("slow");
      if($(this).hasClass("ui-accordion-header-active"))
     	$(this).removeClass("ui-accordion-header-active");
      else
      	$(this).addClass("ui-accordion-header-active");
      return false;
  }).next().hide()
});