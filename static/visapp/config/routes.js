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
            .when("/us-state-chart/crop/:crop/state/:statefp/", {
                controller: "HistoricalStateChartController",
                templateUrl: "static/visapp/partials/StatesChart.html"
            })
            .when("/us-counties-map/state/:statefp/year/:year/crop/:crop/", {
                controller: "CountiesMapController",
                templateUrl: "static/visapp/partials/CountiesMap.html"
            })
            .when("/us-county-chart/crop/:crop/state/:statefp/county/:countyfp/", {
                controller: "HistoricalCountyChartController",
                templateUrl: "static/visapp/partials/CountiesChart.html"
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
