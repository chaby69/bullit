// define(['App', 'marionette', 'underscore', 'text!Wall/layout.html'],
    // function( App, Marionette, _, tpl ) {
define(['Wall', 'marionette', 'underscore'],
    function( App, Marionette, _) {

        return Marionette.LayoutView.extend( {

            // template: _.template(tpl),
            // className: "row",
            template: $('#layoutWall'),
            el: "#layoutWall",
            
            regions: {
                Infos: "#Infos",
                Feeder: "#Feeder"
            }

        });
    }
);