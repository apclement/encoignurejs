(function( $ ) {

App = {	
	controllers: {}
}

$.routes.add('\!/people/{id:int}', function(args){ 
	require(['people/people'], function(){
		App.controllers.people.view(args)
	})
});

$.routes.add('\!/people-more/{id:int}', function(args){ 
	require(['people/people'], function(){
		App.controllers.people.edit2(args)
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
	 // loading overlay
	//$('body').prepend($('<div>').addClass('loading-overlay'))
	$("_body").on({      
	  ajaxStart: function(e) { 
		var $view = $('.view.in')
		if (!$view.find('.loading-overlay').length){
			$view.prepend($('<div>').addClass('loading-overlay'))
		}
		$view.find('.loading-overlay').fadeIn(300)
	  },     
	  ajaxStop: function() { 
		var $view = $('.view.in')
		$view.find('.loading-overlay').fadeOut(300) 
	  }    
	});
	
})

// default use case
if (!window.location.hash){
	 window.location.hash = '#!/menu'
}


// vertical stretcher
$(window).resize(function(){   
  $('.stretchable:visible').height('auto').parent().each(function(){         	
	var $this = $(this)
	var total = $this.height()
	var used = 0
	$this.children(':not(.stretchable):visible').each(function(){
	  used += $(this).outerHeight(true)      
	})
	
	var $stretchable = $this.children('.stretchable')
	var h = (total - used) / $stretchable.length
	$stretchable.height(h)                  
  })          
})   

$(document).load(function(){     
	
 window.scrollTo( 0, 1 );
$(window).resize()   	

  
});	


})(jQuery);