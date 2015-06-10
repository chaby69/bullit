define(['marionette', 'models/Race', 'collections/ItemCollection', 'Wall/Feed/CollectionView', 'Wall/Info/InfoView'],
    function(Marionette, Race, ItemCollection, FeedCollectionView, InfoView) {
        return Marionette.LayoutView.extend( {
            template: $('#layoutWall'),
            el: "#layoutWall",
            
            regions: {
                Infos: "#Infos",
                Feeder: "#Feeder"
            },

            initialize: function(options){
                this.model = new Race({_id: options.race_id});
                this.model.deferred = this.model.fetch();

                this.collection = new ItemCollection();
                this.collection.url = this.collection.url(options.race_id);
                this.collection.deferred = this.collection.fetch();
            },

            onRender: function(){
                var that = this;
                this.model.deferred.done(function() {
                    var info = new InfoView({ model: that.model });
                    that.Infos.show(info);
                });
                this.collection.deferred.done(function(){
                    var collecView = new FeedCollectionView({collection: that.collection, race: that.model});
                    that.Feeder.show(collecView);
                });
            }
        });
    }
);