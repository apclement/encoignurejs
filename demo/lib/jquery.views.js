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
	return $(this).find('.view').hideView()	
}

$.fn.hideView = function(){
	$(this).each(function(){
		var $view = $(this)
		$view.removeClass('in').addClass('out').hide()
	})
	return $(this)
}

function showView(_effect) {
	var view = this
	var $view = $(this)	
	var effect = _effect || current
	if (!Modernizr[effects[effect].test]){
		effect = 'none'
	}	
		
	return $.Deferred(function(switching){		
		var endHandler = function(e){	
			var $this = $(this)
			if (e && e.eventPhase == 2 && $this.hasClass('view')){
				switching.resolve()
			}			
		}	
		
		if ($view.hasClass('in')){	
			switching.resolve()
			return
		}				
		
		var otherViews = $view.parent().children('.view.in')
		otherViews.rebind(endEvents, endHandler).removeClass(effectClass + ' in').addClass(effect+' out')
		$view.rebind(endEvents, endHandler).show().removeClass(effectClass + ' out').addClass(effect+' in')
				
		switching.done(function(){
			$view.unbind(endEvents).removeClass(effectClass)		
			otherViews.unbind(endEvents).hideView()
			//setTimeout(function(){ $(window).resize() }, 10) 
		});
		
		if (effect == 'none'){
			switching.resolve()	
		}	
		
	});
}

$.fn.view = function(_effect) {
	var view = this
	var $view = $(this)	
	
	var parent = $view.parent().closest('.view.out')
	if (parent.length){
		showView.call(view, 'none')
		return parent.view();
	}
	
	return showView.call(view)
}

var loadedFragments = {}

$.fn.loadOnce = function(url, cb){
	var $holder = $(this)			
		
	if (!loadedFragments[url]){
		var $content = $('<div>')
		$content.load(url, function(){		
			loadedFragments[url] = true;
			var views = $(this).initViews().find('.view')
			$content.children().appendTo($holder)
			views.trigger('viewinit')			
			cb()		
		//	hideAddressBar()
			setTimeout(function(){ $(window).resize() }, 50) 
		});	
	} else {			
		cb()
	}
}

function hideAddressBar(){ 
	if(document.height <= window.innerHeight){
	  document.body.style.height = (window.innerHeight + 50) + 'px';     
	}
	setTimeout( function(){ window.scrollTo(0, 1); }, 0 );
}


$(document).ready(function(){
	$(document).on('click', 'a', function(){
		current = $(this).data('transition') || 'fade'
	})

	$('body').initViews()
})

})(jQuery);  
