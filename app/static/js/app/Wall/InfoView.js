define(['Wall', 'marionette', 'underscore'],
    function( App, Marionette, _ ) {

        return Marionette.ItemView.extend( {

            template: _.template( $("#tpl_info").html() ),
            tagName: 'div',

            ui: {
            	desc: ".desc",
            	// infos: ".infos",
            	hashtags: ".hashtags",
            	phone: ".phone",
                // logo: ".logo"
            },

            initialize: function(){
            	this.listenTo(App.vent, 'race:updated:'+this.model.get('_id'), this.updateRace);
            },

            onDestroy: function(){
                // ne doit pas être indispensable
                console.log("destroy du de l'infoView");
                $(window).off("resize", this.resizeHandler);
            },

            updateRace: function(model){
            	this.model.set(model.race);
                if(this.model.hasChanged("theme")) {
                    document.location.href = document.location.href;
                }else{
            	   this.render();
                }

            }

        });
    }
);
