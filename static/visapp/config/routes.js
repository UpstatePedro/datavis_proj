visApp.config([
    "$routeProvider",
    "$resourceProvider",
    function(
    $routeProvider,
    $resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
        $routeProvider
            .when("/", {
                controller: "VisAppLandingController",
                templateUrl: "static/visapp/partials/VisAppLanding.html"
            })
            .when("/us-states-map", {
                controller: "StatesMapController",
                templateUrl: "static/visapp/partials/StatesMap.html"
            })
            .when("/us-counties-map", {
                controller: "CountiesMapController",
                templateUrl: "static/visapp/partials/CountiesMap.html"
            })
            .when("/historical-yields", {
                controller: "HistoricalYieldsController",
                templateUrl: "static/visapp/partials/HistoricalYields.html"
            })
            .otherwise({
                redirectTo: '/'
            });
    }
])
