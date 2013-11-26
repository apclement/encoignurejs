require(['jquery', 'encoignure', 'jquery.routes', 'weld'], function($, encoignure) {

var peopleModule = '../people/people';
var taskModule = '../task/task';

$.routes.add('\!/people/{id:int}', function(args){ 
	encoignure.action(peopleModule, 'edit', args)
});

$.routes.add('\!/peoplemore/{id:int}', function(args){ 
	encoignure.action(peopleModule, 'editMore', args)
});

$.routes.add('\!/people', function(args){ 
	encoignure.action(peopleModule, 'list', args)
});

$.routes.add('\!/task/{id:int}', function(args){ 
	encoignure.action(taskModule, 'edit', args)
});

$.routes.add('\!/task', function(){ 
	encoignure.action(taskModule, 'list', args)
}); 

$.routes.add('\!/menu', function(){ 
	$('#menu').view()
}); 

// default use case
if (!window.location.hash){
	window.location.hash = '#!/people'
}

$.routes.load(location.hash);
 
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
	
	$('body').bind('swipeleft', function(){
      $('.btn.next:visible').each(function(){
		    window.location = $(this).click().attr('href')
	    })
	})
    
	$('body').bind('swiperight', function(){
      $('.btn.back:visible').each(function(){
	      window.location = $(this).click().attr('href')
      })
	})
	
	if(document.height <= window.height) {
      $('body').height( ($('body').height() + 50) )
    }
	  
	$('body').scrollTop(1);
	
})

  
});
