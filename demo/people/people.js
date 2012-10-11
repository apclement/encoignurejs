(function($){

App.controllers.people = {
	defaultItems: [{id: 1, firstname: 'Alain', lastname: 'Bernard'},
			{id: 2, firstname: 'Kamel', lastname: 'Malek'},
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
			{id: 17, firstname: 'Jean', lastname: 'Jeannot'}],
			
	items: null,
	
	renderList: function(){		
		var $peoplelist = $('#peoplelist')	
		var content = $('#peopleTemplate').tmpl(this.items)		
		$peoplelist.data('people', this.items).hide().empty().append(content).fadeIn(300);
	},
	
	buildList: function(){
		if (!this.items){
			this.items = this.defaultItems
			this.renderList()
		}
	},

	list: function(){
		var that = this
		$('#viewholder').loadOnce('people/people.html', function(){			
			that.buildList()			
			
			$('#peopledetails').find(':input').attr('disabled', true).blur()		
						
			$('#people').view()
			$('#peoplelistview').view()			
		})		
	},
	
	view: function(args){		
		var that = this
		$('#viewholder').loadOnce('people/people.html', function(){		
			that.buildList()
			console.debug('view is called on people')				
			var person = $.grep(that.items, function(it){return it.id == args.id})[0];
			
			$('#peopledetails').find('#peopleform').populate(person).data('item', person).find('input#firstname').hide().show()			
			
			$('#people').view()
			$('#peopledetails').view()
			
			$('#peopledetails').find(':input').attr('disabled', false).first().focus()	
		});		
	}
};
	
$(document).on('init', '#peopledetails', function(){
	var $view = $(this)
	$view.find('input').change(function(){
		$(this.form).data('item')[$(this).attr('name')] = $(this).val()
		App.controllers.people.renderList()
	})
})

})(jQuery);  
  
