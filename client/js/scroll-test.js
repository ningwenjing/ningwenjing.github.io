(function() {
    $('body').data('lock', 0);
    var closeType = 0;

    $('.xlx-home__operate').click(function(){
         closeType = 0;
         showUp()
         return closeType;
         
     })

   	
   	$(document).on('mousewheel DOMMouseScroll', function(e) {        
        var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));  
            if(-1 == delta && 0 == $('body').data('lock')) {
               showDown()
            }
            else if(1 == delta && 0 == $(document).scrollTop() &&  0 == $('body').data('lock')) {    
               if(closeType == 0){
                //   showUp()
               }               
            }    		  		
   	});

	  function showDown(){
         var height = $('.index-wrap').height();  
         $('body').data('lock', 1);	
      	setTimeout(function() {
      		$('html').addClass('is-scroll');
      		$('.xlx-home__content').fadeIn();			
      		$('.index-wrap').css("margin-top",-height)
      		setTimeout(function() {
      			$('body').data('lock', 0);
      		}, 500);
         }, 200);
      }

      function showUp(){
         $('body').data('lock', 1);    
         $('html').removeClass('is-scroll');  
            $('.index-wrap').css("margin-top",0)  
            $('.xlx-home__content').fadeOut(500);         
            setTimeout(function() {             
               $('body').data('lock', 0);
          }, 500); 
      }
   	$(window).resize(function() {
   		
		var height = $('.index-wrap').height();  
			$('.index-wrap').css("margin-top",-height)
	
	});
    $(".xlx-home-top").click(function(){
        showUp();
    })
})();