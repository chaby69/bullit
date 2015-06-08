define(['marionette'],
    function(Marionette) {
        return Marionette.LayoutView.extend( {
            template: $('#layoutWall'),
            el: "#layoutWall",
            
            regions: {
                Infos: "#Infos",
                Feeder: "#Feeder"
            }
        });
    }
);