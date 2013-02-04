define(['jquery', 'jquery.tmpl', 'jquery.views', 'jquery.serialize', 'jquery.populate'], function($){

return {

	items: [{id: 1, name: 'Task1', description: 'Develop new UI'},
			{id: 2, name: 'Task2', description: 'Refactor use case A'}],

	list: function(){	
		var that = this
		
		$('#viewholder').loadViews('task/task.html', function(){
			var $section = $('#task')			
			var content = $section.find('#taskTemplate').tmpl(that.items)
			$section.find('#tasklist').data('task', that.items).empty().append(content)
			$section.view()
		});
				
	},
	view: function(args){
		var that = this
		$('#viewholder').loadViews('task/task.html', function(){
			var $section = $('#task')			
			!$section.find('#tasklist').data('task') && that.list()
			
			var task = $.grep(that.items, function(it){
				return it.id == args.id
			})[0];
			
			$section.find('#taskform').populate(task)
		});
	}
	}

  });  
  