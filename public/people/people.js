define(['jquery', 'jquery.views', 'jquery.serialize', 'jquery.populate'], function($){

var result = {	
			
	items: null,
	
	renderList: function(){			

		var config = { 
			alias: {
				id: function(parent, element, key, value) { $(element).find('a').attr('href', '#!/people/'+ value) }
			}
		};
		$('#peoplelist li').weld(this.items, config);		
	},	

	list: function(){
		var that = this
		$('#viewholder').loadViews('people/people.html', function(){							
			$('#peoplelistview').view()			
		})		
	},
	
	view: function(args){		
		var that = this
		$('#viewholder').loadViews('people/people.html', function(){		
									
			var person = $.grep(that.items, function(it){return it.id == args.id})[0];
			
			$('#people').find('form').populate(person).data('item', person)
			
			$('#peopledetails').find("a.next").attr('href', '#!/peoplemore/'+ person.id)
			$('#peoplemore').find("a.back").attr('href', '#!/people/'+ person.id)			
			
			$('#peopledetails').view()						
		});		
	},
	
	editmore: function(args){		
		var that = this
		$('#viewholder').loadViews('people/people.html', function(){					
			$('#peoplemore').view()			
		});		
	}
};

$(document).on('viewinit', '#peoplelistview', function(){
	var $view = $(this)
	
	var defaultItems = [{id: 1, firstname: 'Alain', lastname: 'Bernard', company: 'Bull', address: '170 barnaby street'},
                 {id: 2, firstname: 'Bill', lastname: 'Bibaa', company: 'Duck', address: '1 sesame street'},
                 {id: 3, firstname: 'Jean', lastname: 'Tazon'},
                 {id: 4, firstname: 'Pine', lastname: 'Dhuitre'},
                 {id: 5, firstname: 'Jean', lastname: 'Tazon'},
                 {id: 6, firstname: 'Jean', lastname: 'Tazon'},
                 {id: 7, firstname: 'Jean', lastname: 'Tazon'},
                 {id: 8, firstname: 'Jean', lastname: 'Tazon'},
                 {id: 9, firstname: 'Jean', lastname: 'Tazon'},
                 {id: 10, firstname: 'Jean', lastname: 'Tazon'},
                 {id: 11, firstname: 'Jean', lastname: 'Tazon'},
                 {id: 12, firstname: 'Jean', lastname: 'Tazon'},
                 {id: 13, firstname: 'Jean', lastname: 'Tazon'},
                 {id: 14, firstname: 'Jean', lastname: 'Tazon'},
                 {id: 15, firstname: 'Jean', lastname: 'Tazon'},
                 {id: 16, firstname: 'Jean', lastname: 'Tazon'},
                 {id: 17, firstname: 'Jean', lastname: 'Jeannot'}];
	
	result.items = defaultItems
	result.renderList()
});

$(document).on('viewinit', '#peopledetails,#peoplemore', function(){
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
  
