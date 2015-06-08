require.config({
	baseUrl: '/static/js/app',
	paths: {
		// jquery: 'libs/jquery/dist/jquery',
  //       lodash: 'libs/lodash/lodash',
		// backbone: 'libs/backbone/backbone',
		// marionette: 'libs/marionette/lib/backbone.marionette',
		// hogan: 'libs/hogan/web/builds/3.0.2/hogan-3.0.2',
		// text: 'libs/requirejs-text/text'

		// Core Libraries
		jquery:                   "../vendor/jquery.min",
		// LoDash remplace Underscore
		// "underscore":               "../vendor/lodash.compat.min",
		// underscore:               "../vendor/lodash.min",
		lodash:               "../vendor/lodash.min",
		backbone:                 "../vendor/backbone.min",
		marionette:               "../vendor/backbone.marionette.min",
		bootstrap:                "../vendor/bootstrap.min",
		socketio:                 "../vendor/socket.io.min",
		moment:                   "../vendor/moment.min",

		// Plugins
		'backbone.wreqr':           "../vendor/backbone.wreqr.min",
		'backbone.babysitter':      "../vendor/backbone.babysitter.min",
		'moment.fr':                "../vendor/fr.min",
		text:                     "../vendor/text.min",
		'twitter-text':             "../vendor/twitter-text.min"
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

requirejs.onError = function (err) {
	'use strict';
	console.log(err);
	console.log(err.requireType);
	console.log(err.requireModules);
};

require(['Wally/App'], function (App) {
	'use strict';

	App.options = {
	    current_race: window.current_race,
	    settings: window.settings,
	    stream_status: window.stream_status,
	    level: window.level
	};

	App.start(App.options);
});