define(['jquery', 'jquery.tmpl', 'encoignure', 'jquery.serialize', 'jquery.populate'], function($){

return {

	templateUrl: 'task/task.html',

	items: [{id: 1, name: 'Task1', description: 'Develop new UI'},
			{id: 2, name: 'Task2', description: 'Refactor use case A'}],

	list: function(){	
		var that = this	
		
		var $section = $('#task')			
		var content = $section.find('#taskTemplate').tmpl(that.items)
		$section.find('#task-list').data('task', that.items).empty().append(content)
		$section.view()			
	},
	edit: function(args){
		var that = this		
		var $section = $('#task')			
		!$section.find('#task-list').data('task') && that.list()
		
		var task = $.grep(that.items, function(it){
			return it.id == args.id
		})[0];
		
		$section.find('#task-form').populate(task)		
	}
}
});  
  