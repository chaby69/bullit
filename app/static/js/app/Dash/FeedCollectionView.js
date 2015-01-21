
define(['App', 'marionette', 'underscore', "models/Race", "Dash/Feed/Layout", "Dash/NoFeedView"],
  function(App, Marionette, _, Race, FeedLayout, NoFeedView) {

    var FeedCollectionView = Marionette.CollectionView.extend({
        
        childView: FeedLayout,
        emptyView: NoFeedView,
        tagName: 'div',
        className: 'row feeders',

        events: {
            'update-sort': 'updateSort'
        },

        childViewOptions: function(){
            return { larg: (100 / this.collection.length) + '%' }
        },

        emptyViewOptions: function(){
            return {msg: this.msg, className: "col-sm-6 col-sm-offset-3"}
        },

        initialize: function(options) {
            // la collection est passé en options
            _.bindAll(this, "resizeHandler", "_calcDashWidth");
            $(window).on("resize", this.resizeHandler);
            
            // taille minimale des colonnes 
            this.minwidth = 410;

            // this.msg ne sert que si il n'y a pas de réponses (emptyViewOptions)
            // this.msg = "Vous n'avez pas de wall pour ces critères: " + options.optQuery.filter + " = " + options.optQuery.filter_values;
            this.msg = "Vous n'avez pas encore de wall à afficher.";

            this.listenTo(App.vent, "dash:race:add", this._addRaceCol);
            this.listenTo(App.vent, "dash:race:remove", this._removeRaceCol);
        },

        onDestroy: function() {
            $(window).off("resize", this.resizeHandler);
        },

        onBeforeRender: function(){
            // this.$el.sortable({
            //     stop: function(event, ui) {
            //         ui.item.trigger('drop', ui.item.index());
            //     },
            //     over: this.resizeHandler,
            //     handle: ".Manager", // childView.Manager ?
            //     axis: "x",
            //     // snap: ".row",
            //     snap: ".feeders",

            //     // forceHelperSize: true,
            //     forcePlaceholderSize: true,
            //     // helper: "clone",
            //     scroll: false,
            //     // scroll: true,
            //     zIndex: 9999
            // });
            // this.$el.disableSelection();
            // this.resizeHandler();
        },

        onRender: function(){
            // this.resizeHandler();
        },
        
        resizeHandler: function () {
            // calcul largeur minimale du DashBoard (affichage ou non du scroller horizontal)
            // @todo: les refs au DOM pourraient être plus clean
            if(_.has(this.collection, 'models') && this.collection.models.length){
                // WIP: traitement width / height dissocié
                // contenu de _resizeWidthCol() présent ici précédents commit
                var wh = $(window).height();
                $(".messages").css({height: wh - $(".messages").first().offset().top - 15});
            }


        },

        _calcDashWidth: function(delay){
            var nbrcol = this.collection.models.length;
            var largeurContainer = this.minwidth * nbrcol;
            if(delay){
                $("#DashBoard > .row").animate({'min-width': largeurContainer+'px'}, delay);
            }else{
                $("#DashBoard > .row").css({'min-width': largeurContainer+'px'});
            }
        },


        _addRaceCol: function(raceid){
            // @todo mise en session des races du Dash
            if(!this.collection.get(raceid)){
                console.log("ajout de la race au Dash");
                this.collection.add( new Race({_id: raceid}) );
                // this.resizeHandler();
            }
            // this.resizeHandler();
        },

        // The default implementation:
        attachHtml: function(collectionView, childView, index){
            // this._calcDashWidth();
            if (collectionView.isBuffering) {
                console.log("buffering...");
                // buffering happens on reset events and initial renders
                // in order to reduce the number of inserts into the
                // document, which are expensive.
                collectionView.elBuffer.appendChild(childView.el);
            }
            else {
                // If we've already rendered the main collection, just
                // append the new children directly into the element.

                console.log("start attach in %o de %o", index, collectionView.collection.length);
                // this.resizeHandler();
                // this._calcDashWidth(300);
                this._calcDashWidth();

                var that = this;
                _.delay(function(){ 

                    $("#DashBoard").scrollTo((that.minwidth * 2) * (index + 1), 300);

                    _.delay(function(){ 

                        var newspan = (100 / collectionView.collection.length) + '%';
                        _.each(collectionView.children._views, function(item){
                            $(item.el).css({width: $(item.el).width() - 2});
                            $(item.el).animate( {width: newspan, minWidth: that.minwidth+'px' }, 300 );
                        });

                        collectionView.$el.append( childView.el );
                        // $(".col-sm-x:eq("+childView.model.get('order')+")", collectionView.$el).after(childView.el);
                        $(childView.el).hide();

                        _.delay(function(){ 
                            // collectionView.$el.append(childView.el); 
                            $(childView.el).fadeIn();
                            that.resizeHandler();
                        }, 350);

                    }, 350);

                }, 350);
            }
        },

        // Called after all children have been appended into the elBuffer
        appendHtml: function(collectionView, buffer){
            collectionView.$el.append(buffer);
        },

        // called on initialize and after appendHtml is called
        initRenderBuffer: function() {
          this.elBuffer = document.createDocumentFragment();
        },

        _removeRaceCol: function(raceid){
            console.log("collec avant le remove %o", this.collection);
            // @FIXME surement pas classe du tout
            var rmodel = this.collection.get(raceid);
            var rview = this.children.findByModel(rmodel);
            var that = this;
            $(rview.el).fadeOut(400, function(){
                that.collection.remove(rmodel);
            });
        },

        onRemoveChild: function(childView){
            this._calcDashWidth(600);
            var newspan = (100 / this.collection.length) + '%';
            _.each(this.children._views, function(item){
                $(item.el).animate( {width: newspan}, 300 );
            });
        },

        updateSort: function(event, model, position) { 
            this.collection.each(function (mod, index) {
                var order = index;
                if (index >= position)
                    order += 1;
                if(mod.get('order') != order)
                    if(mod.get('_id') != model.get('_id'))
                        mod.save({'order': order}, {patch: true});
            });            
            model.save({'order': position}, {patch: true});
        }

    });

    return FeedCollectionView;

  }

);