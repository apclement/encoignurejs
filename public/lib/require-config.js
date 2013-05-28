var require = {
	
    paths: {
        jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery',
		'jquery.tmpl': 'https://ajax.microsoft.com/ajax/jquery.templates/beta1/jquery.tmpl',
		modernizr: 'modernizr.custom',
		jquerypp: 'jquerypp.custom'
    },
	
	shim: {
	    jquerypp: ['jquery'],
		'jquery.tmpl': ['jquery'],
		'jquery.routes': ['jquery'],
		'encoignure': ['modernizr', 'jquery']
	}
  
};