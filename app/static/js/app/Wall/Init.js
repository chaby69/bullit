require.config({
    baseUrl:"/static/js/app",
    // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
    noGlobal: true,
    paths:{
        // Core Libraries
        "jquery":                   "../vendor/jquery.min",
        // LoDash remplace Underscore
        "underscore":               "../vendor/lodash.compat.min",
        "backbone":                 "../vendor/backbone.min",
        "marionette":               "../vendor/backbone.marionette.min",
        "bootstrap":                "../vendor/bootstrap.min",
        "socketio":                 "../vendor/socket.io.min",
        "moment":                   "../vendor/moment.min",

        // Plugins
        "backbone.wreqr":           "../vendor/backbone.wreqr.min",
        "backbone.babysitter":      "../vendor/backbone.babysitter.min",
        "moment.fr":                "../vendor/fr.min",
        "text":                     "../vendor/text.min",
        "twitter-text":             "../vendor/twitter-text.min"
    },
    // Sets the configuration for your third party scripts that are not AMD compatible
    shim:{
        "bootstrap":["jquery"],
        "backbone":{
            "deps":["underscore"],
            "exports":"Backbone"
        },
        "marionette":{
            "deps":["underscore", "backbone", "backbone.wreqr", "backbone.babysitter", 
                    "jquery", "twitter-text"],
            "exports":"Marionette"
        },
        "socketio": {
            "exports":"io"
        }
    }
});

require(["Wall", "Wall/Router", "Wall/Controller", "jquery", "bootstrap"],
    function (Wall, AppRouter, Controller) {

        Wall.options = {
            current_race: window.current_race,
            settings: window.settings,
            stream_status: window.stream_status,
            level: window.level
        };
        
        Wall.appRouter = new AppRouter({
            controller:new Controller(Wall.options)
        });
        Wall.start(Wall.options);
    });