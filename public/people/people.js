define(['jquery', 'demo-services', 'encoignure', 'encoignure-ui', 'jquerypp'], function($, resources){

var result = {		

	templateUrl: 'people/people.html',
		
	list: function(){
		var that = this									
		$('#people-list').view()							
	},
	
	edit: function(args){		
		var that = this
				
		var items = resources.get('peopleItems')
		var person = $.grep(items, function(it){ return it.id == args.id })[0];
		
		$('#people').find('form').data('item', person).formParams(person)
		
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

$(document).on('viewinit', '#people', function(e){
	if (e.target.id != 'people')
		return;

	var $view = $(this)
	var items = resources.get('peopleItems')
	
	var config = { 
		alias: {
			id: function(parent, element, key, value) { 
				$(element).find('a.edit').attr('href', '#!/people/'+ value) 
			}
		}
	};	
	
	$view.find('#people-list .itemlist').itemlist(items, config)
	.on('click', 'a.delete', function(){		
		items.splice(items.indexOf($(this).parent().data('item')), 1)			
	})
	
	$view.find('form .btn').click(function(e){
		e.preventDefault()
		var $form = $view.find('form')	
		$.extend($form.data('item'), $form.formParams())
	})	
});





return result;

});  
  
