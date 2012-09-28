(function($){

	var defaultItems = [{id: 1, firstname: 'Alain', lastname: 'Bernard'},
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
			{id: 17, firstname: 'Jean', lastname: 'Jeannot'}];
			
	var items;
	
	function renderList(){
		var $section = $('#people')		
		var $peoplelist = $section.find('#peoplelist')	
		var content = $section.find('#peopleTemplate').tmpl(items)		
		$peoplelist.data('people', items).hide().empty().append(content).fadeIn(300);
	}
	
	function buildList(){
		if (!items){
			items = defaultItems
			renderList()
		}
	}

	$('#people').on('list', function(e, args){		
		buildList()
		//$(this).find('#peoplelist a').filter(':first').focus()
		
	}).on('view', function(e, args){		
		var $section = $(this)
		buildList()
		console.debug('view is called on people')
				
		var person = $.grep(items, function(it){return it.id == args.id})[0];
		
		$section.find('#peopleform').populate(person).data('item', person).find('input#firstname').hide().show()		
	});
	
	$('#peopledetails').find('input').change(function(){		
		$(this.form).data('item')[$(this).attr('name')] = $(this).val()
		renderList()
	})

  })(jQuery);  
  
