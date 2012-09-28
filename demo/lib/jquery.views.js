(function($){

var effects = {
	all: ['translate-l', 'translate-r', 'flip', 'flip-r', 'fade', 'none'],
	'translate-l': {reverse: 'translate-r', test: 'csstransforms'},
	'translate-r': {reverse: 'translate-l', test: 'csstransforms'},
	'flip': {reverse: 'flip-r', test: 'csstransforms3d'},
	'flip-r': {reverse: 'flip', test: 'csstransforms3d'},
	'fade': {reverse: 'fade', test: 'csstransitions'},
	'none': {reverse: 'none', test: ''}
}

var eventNames = {
    'WebkitTransition' : 'webkitTransitionEnd',
    'MozTransition'    : 'transitionend',
    'OTransition'      : 'oTransitionEnd',
    'msTransition'     : 'MSTransitionEnd',
    'transition'       : 'transitionend',
	'WebkitAnimation' : 'webkitAnimationEnd',
    'MozAnimation'    : 'animationend'
};

var effectClass = effects.all.join(' ')

var endEvents = $.map(['transition', 'animation'], function(n){
	return eventNames[Modernizr.prefixed(n)]
}).join(' ');

var startEvents = endEvents.replace(/end/g, 'start').replace(/End/g, 'Start')
	
var current = 'fade'

$.fn.rebind = function(e, func) {
	var $this = $(this)
	$this.each(function(){
		$(this).unbind(e).bind(e, func)
	})
	return $this
}

$.fn.initViews = function(){
	var $views = $(this).find('.view')
	$views.filter(':gt(0)').addClass('out')
	$views.filter(':first').addClass('in')
}



$.fn.switchTo = function() {
	var view = this
	var $view = $(this)	
	var effect = current
	if (!Modernizr[effects[effect].test]){
		effect = 'none'
	}	
	
	return $.Deferred(function(switching){		
		var endHandler = function(e){						
			switching.resolve()
		}	
		
		if ($view.css('visibility') == 'visible' || $view.hasClass('in')){	
			endHandler.call(view)		
			return
		}
		
		var visibleClass = effect != 'none' ? 'visible' : ''
			
		var otherViews = $view.parent().children('.view.in')
		otherViews.rebind(endEvents, endHandler).addClass(visibleClass).removeClass(effectClass + ' in').addClass(effect+' out')
		$view.rebind(endEvents, endHandler).addClass(visibleClass).removeClass(effectClass + ' out').addClass(effect+' in')
		
		switching.done(function(){
			$view.removeClass('visible').removeClass(effectClass)									
			otherViews.removeClass('visible')
		});
		
		if (effect == 'none'){
			endHandler.call(view)		
		}
	});
}


$.fn.view = function(event, args){
	var $section = $(this)
	var url = $section.data('url')
	
	return $.Deferred(function(viewing){		
		$.Deferred(function(fetching){			
			if ($section.children().length == 0){
				$.get(url, function(data){		
					//var html = data.replace(/(<html?>)|(<head?>)/, '')
					$section.append($('<div>').html(data).children().children()).initViews()						
					$.ajax({
						crossDomain: true, dataType: "script", url: url.replace('.html', '.js'),
						success: function(){
							fetching.resolve()
						}
					})
				});	
			} else {			
				fetching.resolve()
			}	
		}).done(function(){
			$section.switchTo().done(function(){ 
				event && $section.trigger(event, [args]);
				viewing.resolve()
			})
		})	
	});
}

$(document).ready(function(){
	$(document).on('click', 'a[data-transition]', function(){
		current = $(this).attr('data-transition') || 'fade'
	})
	$('body').initViews()
})

})(jQuery);  
