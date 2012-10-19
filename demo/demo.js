(function( $ ) {

App = {	
	controllers: {}
}

$.routes.add('\!/people/{id:int}', function(args){ 
	require(['people/people'], function(){
		App.controllers.people.view(args)
	})
});

$.routes.add('\!/people', function(args){ 
	require(['people/people'], function(){
		App.controllers.people.list()
	})
}); 

$.routes.add('\!/task/{id:int}', function(args){ 
	require(['task/task'], function(){
		App.controllers.task.view(args)
	})
});

$.routes.add('\!/task', function(){ 
	require(['task/task'], function(){
		App.controllers.task.list()
	})
}); 

$.routes.add('\!/menu', function(){ 
	$('#menu').view()
}); 
 
$(document).ready(function(){
	
})

// default use case
if (!window.location.hash){
	 window.location.hash = '#!/menu'
}

 // loading overlay
    $('body').prepend($("<div class='loading-overlay' />"))
    $("body").on({      
      ajaxStart: function(e) { 
        $('.loading-overlay').fadeIn(300)
      },     
      ajaxStop: function() { 
        $('.loading-overlay').fadeOut(300) 
      }    
    });

// vertical stretcher
$(window).resize(function(){   
  $('.stretchable:visible').height('auto').parent().each(function(){         
	var $this = $(this)
	var total = $this.outerHeight(true)
	var used = 0
	$this.children(':not(.stretchable):visible').each(function(){
	  used += $(this).outerHeight(true)      
	})
	
	var $stretchable = $this.children('.stretchable')
	var h = (total - used) / $stretchable.length
	$stretchable.height(h)                  
  })          
})   

$(window).load(function(){     
  $(window).resize()   
});	



})(jQuery);