define(['Wall', 'backbone', 'marionette', 'Wall/LayoutWall', 'Wall/Ping/PingView'],
	function (App, Backbone, Marionette, LayoutWall, PingView) {

		return Marionette.Controller.extend({

			initialize: function(){
				_.bindAll(this, 'index', '_connecting');
				this.current_race = App.getOption('current_race');
				App.vent.on('socket:connected', this._connecting);
				App.vent.on('socket:disconnected', this._disconnecting);
				App.vent.on('remote:ping', this._ping);
				App.vent.on('remote:gotourl', function(url){
				    App.sck.socket.emit('leave', 'play_'+this.current_race);
				    document.location.href = url;
				});
				App.vent.on('theme:updated', function(data){
				    App.sck.socket.emit('leave', 'play_'+this.current_race);
				    document.location.href = document.location.href;
				});
			},
			
			index: function () {
				var layout = new LayoutWall({race_id: this.current_race});
				App.rootView.main.show(layout);
			},

			_ping: function(sessid){
			    var ping = new Backbone.Model({message: sessid});
			    App.rootView.showChildView('visualPing', new PingView({model: ping}));
			    setTimeout(function(){
			        App.rootView.getRegion('visualPing').empty();
			    }, 5000);
			},

			_connecting: function(){
			    var ping = new Backbone.Model({message: 'Connecté !!'});
			    App.rootView.getRegion('visualPing').show( new PingView({model: ping}) );
			    App.sck.socket.emit('join_only', 'play_'+this.current_race);
			    setTimeout(function(){
			        // App.rootView.visualPing.currentView.destroy();
			        App.rootView.getRegion('visualPing').empty();
			    }, 5000);
			},

			_disconnecting: function(data){
			    console.log("_disconnecting: %o", data);
			    var ping = new Backbone.Model({message: 'Connexion ...'});
			    App.rootView.getRegion('visualPing').show( new PingView({model: ping}) );
			}

		});

	});