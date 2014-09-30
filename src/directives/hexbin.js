angular.module("leaflet-directive").directive('hexbin', function() {
	return {
		restrict : "A",
		scope : false,
		replace : false,
		require : 'leaflet',
		link : function(scope, element, attrs, controller) {
			var leafletScope  = controller.getLeafletScope();

			controller.getMap().then(function(map) {
				// Initialize the hexbin layer
				var hexLayer = L.hexLayer({}).addTo(map);

				// Watch the hexbin scope variable
				leafletScope.$watch('hexbin', function(){
					hexLayer.update(leafletScope.hexbin);
				});

				hexLayer.update(leafletScope.hexbin);
			});
		}
	};
});
