require.config({
	baseUrl: '/static/js/app/Wally',
	paths: {
		// Core Libraries
		jquery: 				"../../vendor/jquery.min",
		lodash: 				"../../vendor/lodash.min",
		backbone: 				"../../vendor/backbone.min",
		marionette: 			"../../vendor/backbone.marionette.min",
		bootstrap: 				"../../vendor/bootstrap.min",
		socketio: 				"../../vendor/socket.io.min",
		moment: 				"../../vendor/moment.min",

		// Plugins
		'backbone.wreqr': 		"../../vendor/backbone.wreqr.min",
		'backbone.babysitter': 	"../../vendor/backbone.babysitter.min",
		'moment.fr': 			"../../vendor/fr.min",
		text: 					"../../vendor/text.min",
		'twitter-text': 		"../../vendor/twitter-text.min"
	},
	shim: {
		socketio: {
		    exports: "io"
		}
	},
    map: {
        '*': {underscore: 'lodash'}
    }
});

require(['App', 'Router'], 
	function (App, Router) {

		var options = {
		    current_race: window.current_race,
		    settings: window.settings,
		    stream_status: window.stream_status,
		    level: window.level
		};

		App.appRouter = new Router();

		App.start(options);
	});