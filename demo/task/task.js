(function($){

	var items = [{id: 1, name: 'Task1', description: 'Develop new UI'},
			{id: 2, name: 'Task2', description: 'Refactor use case A'}];

	$('#task').on('list', function(e, args){		
		var $section = $(this)			
		var content = $section.find('#taskTemplate').tmpl(items)
		$section.find('#tasklist').data('task', items).empty().append(content)
				
	}).on('view', function(e, args){
		var $section = $(this)
		
		!$section.find('#tasklist').data('task') && $section.trigger('list', [args])
		
		var person = $.grep(items, function(it){
			return it.id == args.id
		})[0];
		
		$section.find('#taskform').populate(person)
	});
	

  })(jQuery);  
  