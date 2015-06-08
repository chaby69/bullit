define(['marionette', 'Controller'],
	function (Marionette, Controller) {

		return Marionette.AppRouter.extend({

			controller: new Controller(),

			appRoutes: {
				'': 'index'
			},

		});
	});