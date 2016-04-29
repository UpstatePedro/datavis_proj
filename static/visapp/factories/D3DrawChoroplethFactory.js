(function() {
    'use strict';

    visApp.factory('D3DrawChoroplethFactory', [
        '$rootScope',
        '$location',
        'SearchStatesFactory',
        'SearchCountiesFactory',
    function(
        $rootScope,
        $location,
        SearchStatesFactory,
        SearchCountiesFactory) {

        return {
            state_choropleth: function (border_data, plotting_data, selected_year, selected_crop, type, statefp) {
                // Clear away the material from any existing visualisation
                // before we proceed
                d3.select("svg").remove()

                // Fill Styling
                var hue1 = 230;
                var saturation1 = 1;
                var lightness1 = 0.9;

                var hue2 = hue1;
                var saturation2 = 1;
                var lightness2 = 0.15;

                var base_colours = {
                    hue_1: hue1,
                    hue_2: hue2,
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
                var max = extractMax(plotting_data);
                var min = extractMin(plotting_data);
                var unit_name = extractUnit(plotting_data);
                var svgHeight = 500,
                    svgWidth = 700,
                    svgMargin = {top: 10, right: 20, bottom: 10, left: 20},
                    legendMargin = {top: 60, right: 50, bottom: 60, left: 50},
                    legendHeight = 150,
                    legendWidth = svgWidth - svgMargin.left - svgMargin.right,
                    mapHeight = svgHeight - svgMargin.top - svgMargin.bottom - legendHeight,
                    mapWidth = svgWidth - svgMargin.left - svgMargin.right;

                var projection = d3.geo.albersUsa()
                    .scale(1)
                    .translate([0,0]);

                var path = d3.geo.path()
                    .projection(projection);

                // courtesy of M Bostock
                // http://stackoverflow.com/questions/14492284/center-a-map-in-d3-given-a-geojson-object
                var b  = path.bounds(border_data),
                    s = .95 / Math.max((b[1][0] - b[0][0]) / mapWidth, (b[1][1] - b[0][1]) / mapHeight),
                    t = [(mapWidth - s * (b[1][0] + b[0][0])) / 2, (mapHeight - s * (b[1][1] + b[0][1])) / 2];

                projection
                    .scale(s)
                    .translate(t);

                var svg = d3.select("div.map-container").append("svg")
                            .attr("width", svgWidth)
                            .attr("height", svgHeight)
                            .attr("transform", "translate("+ svgMargin.left +","+ svgMargin.top +")");


                svg.append("g")
                    .attr("class", "regions")
                    .selectAll("path")
                        .data(border_data.features)
                    .enter().append("path")
                        .attr("class", "regions")
                        .attr("id", function(d) { return d.properties.name; })
                        .attr("data", function(d) {
                            var result = getValue(d, plotting_data);
                            return result[0] + ", " + result[1];
                        })
                        .attr("d", path)
                        .style('stroke', "rgb(200, 200, 200)")
                        .style('fill', function(d) { return getColour(d, plotting_data, min, max); })
                        .on("click", clicked)
                        .on("mouseover", function(){
                            return tooltip.style("visibility", "visible");
                        })
                        .on("mousemove", function(d){
                            var values = getValue(d, plotting_data);
                            tooltip
                                .style("top", (d3.event.pageY-10)+"px")
                                .style("left",(d3.event.pageX+15)+"px")
                                .text(type + ": " + d.properties.name + ", " + values[0] + ' ' + values[1])
                            return tooltip
                        })
                        .on("mouseout", function() {
                            return tooltip.style("visibility", "hidden");
                        });

                http://stackoverflow.com/questions/10805184/d3-show-data-on-mouseover-of-circle
                var tooltip = d3.select("body")
                    .append("button")
                    .attr("class", "btn")
                    .style("position", "absolute")
                    .style("z-index", "10")
                    .style("visibility", "hidden")
                    .text("none");

                function extractMax(data) {
                    var max = null;
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
                    var min = null;
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

                function extractUnit(data) {
                    var item = data[0]
                    return item.value_unit
                }

                function getInterpolationValue(obj, min, range, input_data) {
                    var returnValue = null;
                    var name = obj.properties.name.toLowerCase();
                    input_data.forEach(function(obj, idx, arr) {
                        if(obj.region_name.toLowerCase() === name) {
                            returnValue = obj.value;
                            returnValue = (returnValue - min) / range;
                        }
                    })
                    return returnValue;
                }

                function getValue(obj, input_data) {
                    var returnValue = 'n/a';
                    var unit = ''
                    var name = obj.properties.name.toLowerCase();
                    input_data.forEach(function(obj, idx, arr) {
                        if(obj.region_name.toLowerCase() === name) {
                            returnValue = obj.value;
                            unit = obj.value_unit;
                        }
                    })
                    return [returnValue, unit];
                }

                function getColour(obj, input_data, min, max){
                    var range = max - min;
                    var colourRatio = getInterpolationValue(obj, min, range, input_data);
                    if(colourRatio === null) {
                        return d3.hsl(0,0.0,0.2)
                    } else {
                        return colourFactory(colourRatio, base_colours);
                    }
                }

                // http://stackoverflow.com/questions/10884886/d3js-how-to-get-lat-log-geocoordinates-from-mouse-click
                // http://stackoverflow.com/questions/19499323/location-path-doesnt-change-in-a-factory-with-angularjs
                function clicked(d) {
                    if(type==="state") {
                        $rootScope.selectedStateCoordinates = projection.invert(path.centroid(d))
                        SearchStatesFactory.get({
                                long: $rootScope.selectedStateCoordinates[0],
                                lat: $rootScope.selectedStateCoordinates[1]
                            },
                            function (success_data) {
                                d3.selectAll("body>button").remove()
                                $location.path("/us-counties-map/state/" + success_data.statefp + "/year/" + selected_year + "/crop/" + selected_crop + "/");
                            }, function (error) {
                                console.log(error)
                            }
                        )
                    } else if(type==="county") {
                        $rootScope.selectedCountyCoordinates = projection.invert(path.centroid(d))
                        SearchCountiesFactory.get({
                                long: $rootScope.selectedCountyCoordinates[0],
                                lat: $rootScope.selectedCountyCoordinates[1]
                            },
                            function (success_data) {
                                console.log(success_data);
                                console.log(success_data.countyfp);
                                d3.selectAll("body>button").remove()
                                $location.path("/us-county-chart/crop/"+ selected_crop +"/state/"+ statefp +"/county/"+ success_data.countyfp +"/");
                            }, function (error) {
                                console.log(error)
                            }
                        )
                    }
                }

                // http://bl.ocks.org/mbostock/1086421
                // http://bl.ocks.org/darrenjaworski/5397362
                var key = d3.select("svg")
                var legend = key
                    .append("defs")
                    .append("svg:linearGradient")
                    .attr("id", "gradient")
                    .attr("x1", "100%")
                    .attr("y1", "0%")
                    .attr("x2", "0%")
                    .attr("y2", "0%")
                    .attr("spreadMethod", "pad");
                legend
                    .append("stop")
                    .attr("offset", "0%")
                    .attr("stop-color", d3.hsl(hue2, saturation2, lightness2))
                    .attr("stop-opacity", 1);
                legend
                    .append("stop")
                    .attr("offset", "100%")
                    .attr("stop-color", d3.hsl(hue1, saturation1, lightness1))
                    .attr("stop-opacity", 1);
                key
                    .append("rect")
                    .attr("width", legendWidth - legendMargin.left - legendMargin.right)
                    .attr("height", legendHeight - legendMargin.top - legendMargin.bottom)
                    .style("fill", "url(#gradient)")
                    .attr("transform", "translate("+ legendMargin.left +","+ (mapHeight + legendMargin.top) +")");
                var x = d3.scale.linear()
                    .range([0, legendWidth  - legendMargin.left - legendMargin.right])
                    .domain([min, max]);
                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom");
                key
                    .append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate("+ legendMargin.left +","+ (mapHeight + legendHeight - legendMargin.bottom) +")")
                    .call(xAxis)
                    .append("text")
                    .attr("x", legendMargin.left + 20)
                    .attr("dy", -(legendHeight - legendMargin.top - legendMargin.bottom)-5)
                    .style("text-anchor", "end")
                    .text(unit_name);

            }
        }

    }])
})();
