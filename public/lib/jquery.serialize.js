(function($){
$.fn.serializeObject = function() {
    var o = {};
	
	$(this).each(function(){
		var a = this.serializeArray();
		$.each(a, function() {
		  // remove empty brackets [] from name
		  this.name = this.name.replace(/\[\]/g, '')

		  if (o[this.name]) {
			if (!o[this.name].push) {
			  o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		  } else {
			var tmpName = this.name.replace(/\]/g, '')
			var names = tmpName.split('[')

			function getSubObject(parent, names) {
			  if (names.length == 1) {
				return parent;
			  } else {
				var sname = names.shift();
				parent[sname] = parent[sname] || {};
				return getSubObject(parent[sname], names)
			  }
			}
			var so = getSubObject(o, names)
			so[names[0]] = this.value || '';
		  }
		});
	});
    return o;
};

})(jQuery); 