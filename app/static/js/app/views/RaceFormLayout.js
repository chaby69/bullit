define([ 'App', 'backbone', 'marionette', 'underscore', 'models/Race', 'text!templates/race-form.html'],
    function (App, Backbone, Marionette, _, Race, tplFormRace) {

        // return Marionette.ItemView.extend({
        return Marionette.LayoutView.extend({

            model: Race,
            template: _.template(tplFormRace),
            tagName: "div",

            regions: {
                "themeList": ".cont_themes",
            },

            initialize: function(){
                // collection par defaut du layout utilisée pour stocker la collec de Thèmes
                console.log("init du RaceFormLayout, model: %o | collectiob: %o", this.model, this.collection);
                // console.log("ce model est %o", this.model.isNew());
                this.model.set('is_new', this.model.isNew());
            },

            ui: {
                fullFormRace: "#fullFormRace",
                backDash: ".backDash",
                submitFormRace: "#submitFormRace"
            },

            modelEvents: {
                "change:theme": "themeSelected"
            },

            events: {
                "submit form": "onSubmitForm",
            },
            themeSelected: function(){
                console.log("Nouveau Thème sélectionné");
                // this.ui.submitFormRace.addClass('active');
                this.ui.fullFormRace.trigger("submit");
            },  
            onSubmitForm: function(event){
                // @todo: sert pour création ET édition. Or, l'event "race:add" est triggé à chaque edit.
                // Possible que cela ne pose pas de pb à BB/Marionette, mais c pas très classe
                event.preventDefault();
                var data = Backbone.Syphon.serialize(this);

                if(data['hashtag'] != this.model.get('hashtag_str') ){
                    // redémarrage du stream requis
                    // @todo: devrait etre factorisé dans le model
                    App.vent.trigger("stream:restart:required", {action: "modification hashtag"});
                }

                var that = this;
                console.log("on patch: %o", data);
                this.model.deferred = this.model.save(data, {patch: true});
                this.model.deferred.done(function(){
                    that.ui.backDash.show();
                    // triggé mais pas écouté
                    // App.vent.trigger("race:add", that.model);
                });
                
            }

        });
    });