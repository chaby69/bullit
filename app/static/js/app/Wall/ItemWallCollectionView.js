
define(['Wall', 'marionette', 'underscore', "models/Item", "models/Race", "Wall/ItemWallView", "Wall/modal/WallView", 
    "text!Wall/empty-view.html"],

  function(App, Marionette, _, Item, Race, ItemWallView, ModalView, emptyTemplate) {
    
    var NoItemsView = Marionette.ItemView.extend({
        template: _.template(emptyTemplate)
    });

    var msg_pause = {
        // @todo: msg_pause à passer dans le model Race. 
        // author, avatar pourrait venir d'un model 'Proprio' ?
        status: "new",
        visible: 1,
        prefs: {text: true, media: false, size: ""},
        message: 'message de pause',
        author: "@bullit_io",
        preselec: {type: "", index: ""},
        avatar: "/static/img/logo-b_120.png",
        ctime: "",
    }

    var ItemCollectionView = Marionette.CollectionView.extend({

        childView: ItemWallView,
        emptyView: NoItemsView,
        tagName: 'ul',
        className: 'list-group media-list',

        initialize: function(options) {
            this.race = options.race;

            this.childViewOptions = { current_race_id: this.race.get('_id') };
            this.listenTo(App.vent, 'race:updated:'+this.race.get('_id'), this.updateRace);

            this.listenTo(App.vent, 'feed:add', this.addItem);
            this.listenTo(App.vent, 'feed:visible', this.setVisible);
            this.listenTo(App.vent, 'feed:stared', this.setStar);
            this.listenTo(App.vent, 'bubble:exec:open', this.openBubble);
            this.listenTo(App.vent, 'bubble:exec:destroy', this.destroyBubble);

            this.listenTo(App.vent, 'dumber:added', this.refetch);
            this.listenTo(App.vent, 'dumber:removed', this.refetch);
        },

        onRender: function(){
            if(this.race.get('status') == "stopped"){
                this.setPauseRace();
            }else{
                this.destroyBubble();
            }
        },

        attachHtml: function(collectionView, childView, index){

            // le buffer n'est actif que sur fetch et reset: il ne peut pas y avoir de 'new' bufferisés
            // if (collectionView.isBuffering && childView.model.get('status') == "new") {
            if (collectionView.isBuffering) {
                // buffering happens on reset events and initial renders
                // in order to reduce the number of inserts into the
                // document, which are expensive.
                if(childView.model.get('status') == "new"){
                  // collectionView.elBuffer.appendChild(childView.el);
                  collectionView._bufferedChildren.push(childView);
                }else{
                  // collectionView.elBuffer.insertBefore(childView.el, collectionView.elBuffer.firstChild);
                  collectionView._bufferedChildren.splice(0, 0, childView);
                }
            }
            else {
                if(childView.model.get('status') == "new"){
                    collectionView.$el.prepend(childView.$el.hide());
                }else{
                    collectionView.$el.append(childView.$el.hide());
                }
                if(childView.model.get('visible')){
                    childView.$el.slideDown("fast");
                }
            }
        },

        // Called after all children have been appended into the elBuffer
        attachBuffer: function(collectionView) {
            collectionView.$el.append(this._createBuffer(collectionView));
        },

        // called on initialize and after appendBuffer is called
        initRenderBuffer: function() {
            // this.elBuffer = document.createDocumentFragment();
            this._bufferedChildren = [];
        },

        addItem: function(data){
            this.collection.add(data);
            this.removeOld();
        },

        removeOld: function(){
            // @todo: passer la limite en config ou en param pour les clients comme pour l'API
            var max = 50;
            if(this.collection.length >= max){
                var diff = this.collection.length - max;
                for(i=0; i<diff; i++){
                    var out = this.collection.shift();
                    console.log("remove one: ", out);
                }
            }
        },

        setVisible: function(data){
            console.log("toggle visible de %o", data['_id']);
            var msg = this.collection.get( data['_id']);
            msg.set('visible', data['visible']);
        },

        openBubble: function(data){
            this.destroyBubble();
            console.log("Ouverture d'une bubble, data: %o", data);
            var mod = new Item(data);
            var bub = new ModalView({model: mod});

            // FIXME tweak juste pour bloquer l'affichage des bulles pour MobilActeurs
            if($("#bubble").length){
                App.modalRegion.show(bub);
            }
        },

        destroyBubble: function(){
            if( App.modalRegion.currentView ){
                $(App.modalRegion.currentView.$el).modal('hide');
            }
        },

        setStar: function(data){
            console.log("toggle star de %o", data['_id']);
            var msg = this.collection.get( data['_id']);
            msg.set('stared', data['stared']);
        },

        updateRace: function(data){
            this.race.set(data.race);
            if(this.race.hasChanged("status")) {
                console.log("le status de la Race a changé");
            }
            if(this.race.get('status') == "stopped"){
                this.setPauseRace();
            }else{
                
                if($("#bubble").length){
                    this.destroyBubble();
                }
            }
        },

        setPauseRace: function(){
            msg_pause['ctime'] = moment();
            var msg = App.getOption('settings').msg_pause;
            // FIXME test sur #bubble: tweak juste pour bloquer l'affichage des bulles pour MobilActeurs
            if($("#bubble").length){
                msg_pause['message_html'] = msg;
                var mod = new Item(msg_pause);
                var bub = new ModalView({model: mod});
                App.modalRegion.show(bub);
            }else{
                msg_pause['message'] = msg;
                this.addItem(msg_pause);
            }
        },

        refetch: function(){
            console.log("refetch");
            this.collection.fetch();
        }

        
    });

    // Returns the Model class
    return ItemCollectionView;

  }

);