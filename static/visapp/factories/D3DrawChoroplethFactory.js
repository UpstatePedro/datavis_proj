(function() {
    'use strict';

    visApp.factory('D3DrawChoroplethFactory', [
        '$rootScope',
        '$location',
        'SearchStatesFactory',
    function(
        $rootScope,
        $location,
        SearchStatesFactory) {

        return {
            state_choropleth: function (border_data, plotting_data, type) {
                console.log(type);
                // Clear away the material from any existing visualisation
                // before we proceed
                d3.select("svg").remove()

                // Fill Styling
                var hue_1 = 216;
                var saturation1 = 1;
                var lightness1 = 0.7;

                var hue_2 = hue_1;
                var saturation2 = 1;
                var lightness2 = 1.0;

                var base_colours = {
                    hue_1: hue_1,
                    hue_2: hue_2,
                    saturation1: saturation1,
                    saturation2: saturation2,
                    lightness1: lightness1,
                    lightness2: lightness2
                }
                var colourFactory = function(transition, colours){
                    var hue = colours.hue_1 + transition * (colours.hue_2-colours.hue_1);
                    var saturation = colours.saturation1 + transition * (colours.saturation2 - colours.saturation1);
                    var lightness = colours.lightness1 + transition * (colours.lightness2 - colours.lightness1);
                    return d3.hsl(hue, saturation, lightness);
                }

                // ********************************
                // Define variables & static config
                var svgHeight = 450,
                    margin = {top: 5, right: 5, bottom: 10, left: 100},
                    height = svgHeight - margin.top - margin.bottom,
                    width = 750 - margin.left - margin.right

                var projection = d3.geo.albersUsa()
                    .scale(1)
                    .translate([0,0]);

                var path = d3.geo.path()
                    .projection(projection);

                // courtesy of M Bostock
                // http://stackoverflow.com/questions/14492284/center-a-map-in-d3-given-a-geojson-object
                var b  = path.bounds(border_data),
                    s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
                    t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

                projection
                    .scale(s)
                    .translate(t);

                var svg = d3.select("div.map-container").append("svg")
                            .attr("width", width)
                            .attr("height", height)

                svg.append("g")
                    .attr("class", "counties")
                    .selectAll("path")
                        .data(border_data.features)
                    .enter().append("path")
                        .attr("class", "states")
                        .attr("d", path)
                        .on("hover", hovering)
                        .on("click", clicked)
                        .style('stroke', "rgb(50, 50, 50)")
                        .style('fill', function(d) { return getColour(d, plotting_data); });

                function extractMax(data) {
                    var max = null
                    data.forEach(function(obj, index, array){
                        if(Number.parseInt(obj.value) > max){
                            max = Number.parseInt(obj.value)
                        }
                        if(max === null){
                            max = Number.parseInt(obj.value)
                        }
                    })
                    return max
                }
                function extractMin(data) {
                    var min = null
                    data.forEach(function(obj, index, array){
                        if(Number.parseInt(obj.value) < min){
                            min = Number.parseInt(obj.value)
                        }
                        if(min === null){
                            min = Number.parseInt(obj.value)
                        }
                    })
                    return min
                }

                function getInterpolationValue(obj, min, range, input_data) {
                    var returnValue = null;
                    var name = obj.properties.name.toLowerCase();
                    input_data.forEach(function(obj, idx, arr) {
                        if(obj.state_name.toLowerCase() === name) {
                            returnValue = obj.value;
                            returnValue = (returnValue - min) / range;
                        }
                    })
                    return returnValue;
                }

                function getColour(obj, input_data){
                    var max = extractMax(input_data);
                    var min = extractMin(input_data);
                    var range = max - min;
                    var colourRatio = getInterpolationValue(obj, min, range, input_data);
                    if(colourRatio === null) {
                        return d3.hsl(0,0.0,1.0)
                    } else {
                        return colourFactory(colourRatio, base_colours);
                    }
                }

                function hovering(d) {
                    console.log(hovering);
                    console.log(d);
                }

                // http://stackoverflow.com/questions/10884886/d3js-how-to-get-lat-log-geocoordinates-from-mouse-click
                // http://stackoverflow.com/questions/19499323/location-path-doesnt-change-in-a-factory-with-angularjs
                function clicked(d) {
                    $rootScope.selectedStateCoordinates = projection.invert(path.centroid(d))
                    SearchStatesFactory.get({long: $rootScope.selectedStateCoordinates[0],
                                             lat: $rootScope.selectedStateCoordinates[1]},
                        function(success_data) {
                            console.log("Success!")
                            console.log(success_data);
                            $location.path("/us-counties-map/"+ success_data.statefp);
                            $rootScope.$apply()
                    })
                }
            }
        }

    }])
})();
