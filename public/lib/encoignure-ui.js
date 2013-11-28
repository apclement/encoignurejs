define(['jquery', 'watch', 'weld'], function($, WatchJS) {

	// weld jquery plugin
	$.fn.weld = function (data, config) {		
		weld(this[0], data, config);	
		return this
	};
		
	$.fn.itemlist = function(items, config){
		var $this = $(this)
				
		$this.data('items', items)		
		
		function render(){
			$this.find('li').removeClass('leave').weld(items, config)
			
			$this.find('li').each(function(i){
				$(this).data('item', items[i])
			});			
		}		
		
		WatchJS.watch({value: items}, function(name, action, params){
			console.info('watch: '+ action + ' '+ name + ' '+ params)
			// optimized version for array splice function
			if (action == 'splice_'){
				var removed = $this.find('li').slice(params[0], params[0] + params[1]).addClass('leave');
				setTimeout(function(){ removed.remove() }, 1000)
			} else {
				// generic update version
				var removed = $this.find('li').filter(function(){
					return items.indexOf($(this).data('item')) == -1;
				}).addClass('leave');
						
				if (removed.length > 0){
					setTimeout(render, 1000)
				} else {
					render()
				}
			}
		});	

		render()
		
		return $this;
	}	
	
	return true;
});
