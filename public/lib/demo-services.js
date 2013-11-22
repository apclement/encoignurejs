define(['jquery'], function($){

return {
	cache: {},

	get: function (name) {
		if (!this.cache[name]){
			this.cache[name] = JSON.parse(localStorage.getItem(name) || '[]')
		}
		return this.cache[name];
	},
	put: function (name, data) {
		localStorage.setItem(name, JSON.stringify(data));
	}
}

});  
  
