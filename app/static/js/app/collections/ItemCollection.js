define(["jquery","backbone","moment","models/Item"],
	function($, Backbone, Moment, Item) {

		var ItemCollection = Backbone.Collection.extend({

			model: Item,

			url: function(target,filter) {
				var param = (filter) ? target+"?"+filter+"=1" : target
				return "/messages/"+param;
			},

			comparator: function(item){
				// return item.get('ctime').$date;
				return Moment(item.get('ctime'));
			}

		});

		return ItemCollection;
	});