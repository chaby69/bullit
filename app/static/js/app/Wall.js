define(['jquery', 'backbone', 'marionette', 'underscore', 'socketio', 'Modal/Region'],
    function ($, Backbone, Marionette, _, io, ModalRegion) {

    if(!window.debugging){
        console = {};
        console.log = function(){};
    }
    
    Wall = new Backbone.Marionette.Application();

    Wall.addRegions({
        mainRegion:"#main",
        visualPing: "#visualPing",
    });

    // @size: classname pour la taille de la modale (de l'admin)
    // normal : '' | small : 'modal-sm' | large : 'modal-lg'
    var optionsModale = {
        small: {size: '', text: true, media: false},
        large: {size: 'modal-lg', text: false, media: true}
    };

    // modalRegion ne se retrouve pas dans Wall.getRegions(), normal ?
    Wall.modalRegion = new ModalRegion(optionsModale);

    function isMobile() {
        var ua = (navigator.userAgent || navigator.vendor || window.opera, window, window.document);
        return (/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
    }

    Wall.mobile = isMobile();

    Wall.socket;
    Wall.socketUrl = "/shouts";
    
    var init_socketio = function() {
        var socket_callbacks = [
            ['connect','socket:connected'],
            ['disconnect','socket:disconnected'],
            ['message_to_race', 'feed:add'],
            ['visible', 'feed:visible'],
            ['stared', 'feed:stared'],
            ['openbubble', 'bubble:exec:open'],
            ['destroybubble', 'bubble:exec:destroy'],
            // Dumbers
            ['dumber_added', 'dumber:added'],
            ['dumber_removed', 'dumber:removed'],
            // Walls
            ['ping', 'remote:ping'],
            ['gotourl', 'remote:gotourl'],
            // Themes
            ['theme_updated', 'theme:updated'],
        ];

        Wall.socket = io.connect(Wall.socketUrl);

        _.each(socket_callbacks,function(signal){
            Wall.socket.on(signal[0], function(data) {
                if (typeof(data) != "undefined") {
                    console.log('trigger %s | %o',signal[1],data);
                    Wall.vent.trigger(signal[1],data);
                } else {
                    console.log('trigger %s',signal[1]);
                    Wall.vent.trigger(signal[1]);
                }
            });
        });

        // event avec race_id dynamique en suffixe, traitement à part
        Wall.socket.on('race_updated', function(data){
            console.log("Race modifiée: %o", data['race']);
            Wall.vent.trigger("race:updated:"+data.race._id, data);
        });

        window.onbeforeunload = function(){
            Wall.socket.emit("leave_all");
        }
    };

    if(!window.screenshot){
        Wall.addInitializer(init_socketio);
    }

    Wall.addInitializer(function (options) {
        Backbone.history.start();
        // Backbone.history.start({ pushState: true }, root= '/');
    });

    return Wall;
});