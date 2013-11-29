define(['jquery'], function($){

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
	
var current = 'none'

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
		$view.removeClass('in').addClass('none out hidden')
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
				
		if ($view.hasClass('in') || $view.is(':visible')){			
			return;
		}			
		
		var otherViews = $view.parent().children('.view.in')
		var afterShow = function(){
			$view.removeClass(effectClass + ' out').addClass(effect+' animated in')
			otherViews.rebind(endEvents, endHandler).removeClass(effectClass + ' in').addClass(effect+' animated out')
		}	
		
		$view.rebind(endEvents, endHandler).removeClass('hidden').animate({}, 0, afterShow)		
	
		switching.done(function(){
			$view.unbind(endEvents).removeClass(effectClass + ' animated')	
			otherViews.unbind(endEvents).addClass('hidden').removeClass('animated')
		});
		
		if (effect == 'none'){
			switching.resolve()			
		}	
		
	});
}

$.fn.view = function(_effect) {
	var view = this	
	var result;
	
	var parent = view.parent().closest('.view.out')
	if (parent.length){		
		result = showView.call(view, 'none')
		setTimeout(function(){ parent.view() }, 0) 		
	} else {	
		result = showView.call(view)
	}
	
	return result;
}

var loadedFragments = {}

$.fn.loadViews = function(url, cb){
	var $holder = $(this)			
		
	if (!loadedFragments[url]){
		var $content = $('<div>')
		$content.load(url, function(){		
			loadedFragments[url] = true;
			var views = $(this).initViews()
			$content.children().appendTo($holder)
			views.trigger('viewinit')			
			cb()					
		});	
	} else {			
		cb()
	}
}

function hideAddressBar(){ 
	if(document.height <= window.innerHeight){
	  //document.body.style.height = '105%';     
	}
	setTimeout(function(){ window.scrollTo(0, 1) }, 0);
	setTimeout(function(){ $(window).resize() }, 200) 
}


$(document).ready(function(){
	$('.view').addClass('none out hidden')
	
	$(document).on('click', 'a', function(){
		current = $(this).data('transition') || 'fade'
	})	
})

return {
	container: '.load-container',

	action: function(module, method, args){
		var that = this;
		require([module], function(mod){
			$(that.container).loadViews(mod.templateUrl, function(){		
				mod[method](args)
			});
		})
	}
}

});  
