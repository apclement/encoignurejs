define(['jquery', 'demo-services', 'encoignure', 'jquery.serialize', 'jquery.populate'], function($, resources){

var result = {		

	templateUrl: 'people/people.html',
	
	renderList: function(){
		var config = { 
			alias: {
				id: function(parent, element, key, value) { 
					$(element).find('a.edit').attr('href', '#!/people/'+ value) 
				}
			},
			map: function(parent, element, key, value) { 
				console.info(value)
			}
		};
		var items = resources.get('peopleItems')
		$('#people-list .itemlist li').weld(items, config);		
	},	

	list: function(){
		var that = this									
		$('#people-list').view()							
	},
	
	edit: function(args){		
		var that = this
				
		var items = resources.get('peopleItems')
		var person = $.grep(items, function(it){ return it.id == args.id })[0];
		
		$('#people').find('form').populate(person).data('item', person)
		
		$('#people-details').find("a.next").attr('href', '#!/peoplemore/'+ person.id)
		$('#people-more').find("a.back").attr('href', '#!/people/'+ person.id)		
		
		$('#people-details').view()			
	},
	
	editMore: function(args){		
		var that = this
		$('#people-more').view()				
	}
};


var defaultItems = []
				
				
for (var i = 1; i <= 100; i++){
	defaultItems.push({id: i, firstname: 'Alain', lastname: 'Bernard-'+ i, company: 'Bull', address: '170 barnaby street'})
}
				
resources.put('peopleItems', defaultItems)

$(document).on('viewinit', '#people-list', function(){
	var $view = $(this)
	result.renderList()
	
	$view.find('.itemlist').on('click', 'a.delete', function(){
		var $li = $(this).parent()
		var obj = $li.data('model')
		var items = resources.get('peopleItems')
		items.splice(items.indexOf(obj), 1)
		$li.addClass('bounceOut')
		setTimeout(function(){ $li.remove() }, 1000)
		//result.renderList()
	})
});

$(document).on('viewinit', '#people-details,#people-more', function(){
	var $view = $(this)
	
	$view.find('input').change(function(){
		var item = $(this.form).data('item')
		item[$(this).attr('name')] = $(this).val()
		$(document).trigger('peoplechange', [item])
	})	
});

$(document).on('peoplechange', function(p){
	result.renderList()	
});

return result;

});  
  
