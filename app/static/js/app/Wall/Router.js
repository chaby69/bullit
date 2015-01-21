define(['marionette'], function(Marionette) {
   return Marionette.AppRouter.extend({
       //"index" must be a method in AppRouter's controller
       appRoutes: {
           // "": "index",
           // "play/:id": "play",
           "": "filter_race",
           ":id": "index",
           // "timeline/:id": "timeline"
       }
   });
});