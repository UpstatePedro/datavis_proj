(function() {
    'use strict';

    visApp.factory('D3DrawChoroplethFactory', [function() {
        return {
            state_choropleth: function (border_data, variable_data) {
                console.log(border_data);
                // Clear away the material from any existing visualisation
                // before we proceed
                d3.select("svg").remove()

                var colour1 = d3.hsl(0, 0.5, 0.5);
                var colour2 = d3.hsl(180, 0.5, 0.5);

                console.log("variable data");
                console.log(variable_data);
                console.log(border_data);

                var max = extractMax(variable_data);
                var min = extractMin(variable_data);

                //var color = d3.scale.category10();
                //
                //var uniqueNames = [];
                //    for(var i = 0; i < api_data.length; i++){
                //        if(uniqueNames.indexOf(api_data[i].properties.countyfp) === -1){
                //            uniqueNames.push(api_data[i].properties.countyfp);
                //    };
                //};
                //
                //color.domain(uniqueNames);


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
                        .style('stroke', "rgb(50, 50, 50)")
                        .style('fill', function(d) { return color(d.properties.countyfp); });

                function extractMax(data) {
                    var max = null
                    data.forEach(function(obj, index, array){
                        console.log(Number.parseInt(obj.value));
                        if(Number.parseInt(obj.value) > max){
                            max = Number.parseInt(obj.value)
                        }
                        if(max === null){
                            max = Number.parseInt(obj.value)
                        }
                        console.log(max);
                    })
                    return max
                }
                function extractMin(data) {

                }
            }
        }

    }])
})();