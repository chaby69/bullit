define(['marionette', 'Wally/views/LayoutWall'],
	function (Marionette, LayoutWall) {
		'use strict';

		var rm = new Marionette.RegionManager({
			regions: {
				body: '#body',
				main: '#main'
			}
		});

		return {
			showIndex: function () {
				rm.get('main').show(new LayoutWall());
			}
		};

	});