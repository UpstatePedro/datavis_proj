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
            .otherwise({
                redirectTo: '/'
            });
    }
])
