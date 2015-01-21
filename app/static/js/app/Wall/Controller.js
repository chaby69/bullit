define(['Wall', 'backbone', 'marionette', 'Wall/LayoutWall', 'models/Race', 
    'Wall/InfoView', // 'Wall/InfoViewCustom', 'Wall/Timeline/model', 'Wall/Timeline/TimelineView', 
    'collections/ItemCollection', 'Wall/ItemWallCollectionView', 'Wall/PingView'],
    function (App, Backbone, Marionette, LayoutWall, Race, 
        InfoView, // InfoViewCustom, Timeline, TimelineView, 
        ItemCollection, ItemWallCollectionView, PingView) {

    return Backbone.Marionette.Controller.extend({

        initialize:function (options) {
            console.log("init avec: ", options);
            // Remoting: Si on doit aller plus loin, trouver autre solution
            this.listenTo(App.vent, 'remote:ping', this._ping);
            this.listenTo(App.vent, 'remote:gotourl', function(url){
                // FIXME vérifier de bout en bout, possible que ca marche depuis que les urls des walls ne sont plus des hashs
                // obso ? le router doit repérer qu'il n'y a qu'un changement de hash, du coup ce n'est pas un vrai reload
                App.socket.emit('leave', 'play_'+this.actual_id);
                document.location.href = url;
            });
            this.listenTo(App.vent, 'theme:updated', function(data){
                App.socket.emit('leave', 'play_'+this.actual_id);
                document.location.href = document.location.href;
            });
            this.listenTo(App.vent, 'socket:disconnected', this._disconnecting);
            this.listenTo(App.vent, 'socket:connected', this._connecting);
        },

        filter_race: function() {
            console.log("on y est : ", current_race);
            // pas classe du tout, 
            if(current_race != "twitter"){
                this.index(current_race);
            }else{
                this.twitter(current_race);
            }
        },

        twitter: function(id){
            this.actual_id = id;
            // en test, en doublon du join dans le _connecting()
            if(!window.screenshot){
                App.socket.emit('join_only', 'play_'+id);
            }
            // Layout principal
            var layout = new LayoutWall();
            App.mainRegion.show(layout);
            var race = new Race({_id: id});
            var collection = new ItemCollection(window.home_timeline);
            var collecView = new ItemWallCollectionView({collection: collection, race: race});
            // var collecView = new ItemWallCollectionView({collection: window.home_timeline });
            layout.Feeder.show(collecView);
        },

        index:function(id) {
            this.actual_id = id;
            // en test, en doublon du join dans le _connecting()
            if(!window.screenshot){
                App.socket.emit('join_only', 'play_'+id);
            }
            // Layout principal
            var layout = new LayoutWall();
            App.mainRegion.show(layout);

            var race = new Race({_id: id});
            race.deferred = race.fetch();

            race.deferred.done(function() {
                // Les infos de la Race sont injectées dans la région Infos
                var info = new InfoView({ model: race });
                layout.Infos.show(info);

                // Le Feeder reçoit la collection de msg associés à la Race
                var collection = new ItemCollection();
                collection.url = collection.url(id);
                collection.deferred = collection.fetch();
                
                collection.deferred.done(function(){
                    var collecView = new ItemWallCollectionView({collection: collection, race: race});
                    layout.Feeder.show(collecView);
                });
            });

            $(window).on("unload", function(){
                App.socket.emit('leave', 'play_'+id);
            });
        },



        timeline:function(id){
            // a reprendre ou à virer, sur le model d'index
            console.log("join de la room timeline");
            App.socket.emit('join', id);
            App.mainRegion.show(new TimelineView({ model: new Timeline({_id: id}) } ));
        },

        _ping: function(sessid){
            // App.visualPing.show(new PingView( {model: {message: '', sessid: sessid}} ));
            var ping = new Backbone.Model({message: sessid});
            App.visualPing.show( new PingView({model: ping}) );
            setTimeout(function(){
                App.visualPing.currentView.destroy();
            }, 5000);
        },

        ////////////// Socket.io

        _connecting: function(){
            var ping = new Backbone.Model({message: 'Connecté !!'});
            App.visualPing.show( new PingView({model: ping}) );
            App.socket.emit('join_only', 'play_'+this.actual_id);
            setTimeout(function(){
                App.visualPing.currentView.destroy();
            }, 5000);
        },

        _disconnecting: function(data){
            console.log("_disconnecting: %o", data);
            var ping = new Backbone.Model({message: 'Connexion ...'});
            App.visualPing.show(new PingView( {model: ping} ));
        }

    });
});