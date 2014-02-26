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

// loading spinner

$.fn.spinner = function(){
	var $spinner = $("<div id='circularG'>")
	for (var i = 1; i <= 8; i++){
		$("<div class='circularG'>").attr('id', 'circularG_'+ i).appendTo($spinner)
	}

	$spinner.appendTo($(this))
}
 
$(document).ready(function(){

	$('#spinner').spinner()

	// loading overlay	
	$("body").on({      
	  ajaxStart: function(e) {		
		$('#spinner').show()
	  },     
	  ajaxStop: function() { 		
		$('#spinner').hide() 
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
