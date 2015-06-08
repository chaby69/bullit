define(['marionette','Wally/RegionManager'	],
	function (Marionette, regionManager) {
		'use strict';
		return Marionette.AppRouter.extend({

			routes: {
				'': function () {
					regionManager.showIndex();
				}
			}

		});
	})