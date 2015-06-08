define(['App', 'marionette', 'views/LayoutWall'],
	function (App, Marionette, LayoutWall) {

		return Marionette.Controller.extend({

			initialize: function(){
				// console.log("teuf: ", App);
			},
			
			index: function () {
				App.rootView.main.show(new LayoutWall());
			}

		});

	});