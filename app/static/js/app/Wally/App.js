define(['marionette','backbone','Wally/Router'],
	function (Marionette, Backbone, Router) {
		'use strict';

		var App = new Marionette.Application({

			initialize: function () {
				new Router();
			}

		});

		App.on('start', function () {
			Backbone.history.start();
		});

		return App;
	});