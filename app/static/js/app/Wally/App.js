define(['marionette', 'backbone'],
	function (Marionette, Backbone) {

		if(!window.debugging){
		    console = {};
		    console.log = function(){};
		}

		App = new Backbone.Marionette.Application({});

		var RootView = Marionette.LayoutView.extend({
		    el: 'body',
		    regions: {
		        main: "#main",
		        visualPing: "#visualPing"
		    }
		});

		App.rootView = new RootView();

		App.on('start', function () {
			Backbone.history.start();
		});

		return App;
	});