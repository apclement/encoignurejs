(function( $ ) {

App = {	
	controllers: {}
}

$.routes.add('\!/people/{id:int}', function(args){ 
	require('people/people', function(){
		App.controllers.people.view(args)
	})
});

$.routes.add('\!/people', function(args){ 
	require('people/people', function(){
		App.controllers.people.list()
	})
}); 

$.routes.add('/task/{id:int}', function(){ $('#task').view('view', this) });
$.routes.add('/task', function(){ $('#task').view('list', this) }); 
 
$(document).ready(function(){
	
})

// vertical stretcher
$(window).resize(function(){   
  $('.stretchable').height('auto').parent().each(function(){         
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