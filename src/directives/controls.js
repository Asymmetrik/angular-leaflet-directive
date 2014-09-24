angular.module("leaflet-directive").directive('controls', function ($log, leafletHelpers) {
    return {
        restrict: "A",
        scope: false,
        replace: false,
        require: '?^leaflet',

        link: function(scope, element, attrs, controller) {
            if(!controller) {
                return;
            }

            var isDefined = leafletHelpers.isDefined,
                leafletScope  = controller.getLeafletScope(),
                controls = leafletScope.controls;

            controller.getMap().then(function(map) {
                if (isDefined(L.Control.Draw) && isDefined(controls.draw)) {
                    var drawnItems = new L.FeatureGroup();
                    var drawOptions = {
                        edit: {
                            featureGroup: drawnItems
                        }
                    };
                    angular.extend(drawOptions, controls.draw);
                    controls.draw = drawOptions;
                    map.addLayer(drawOptions.edit.featureGroup);

                    var drawControl = new L.Control.Draw(drawOptions);
                    map.addControl(drawControl);
                }

                if (isDefined(L.Control.Filter) && isDefined(controls.filter)) {
                    var filterFeature = new L.FeatureGroup();
                    var filterOptions = {
                        filter: {
                            circle: {},
                            rectangle: {}
                        },
                        filterGroup: filterFeature
                    };
                    angular.extend(filterOptions, controls.filter);
                    controls.filter = filterOptions;
                    map.addLayer(filterOptions.filterGroup);

                    var filterControl = new L.Control.Filter(filterOptions);
                    map.addControl(filterControl);
                }

                if(isDefined(controls.custom)) {
                    for(var i in controls.custom) {
                        map.addControl(controls.custom[i]);
                    }
                }
            });
        }
    };
});
