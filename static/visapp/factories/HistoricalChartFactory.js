(function() {
    'use strict';

    visApp.factory('HistoricalChartFactory', [function() {

        return {
            historical_chart: function (chartData) {
                parseDates(chartData)
                // Clear away the material from any existing visualisation
                // before we proceed
                d3.select("svg").remove()

                // ********************************
                // Define variables & static config

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

                var max = extractMax(chartData);
                var min = extractMin(chartData);
                var unit_name = extractUnit(chartData);
                var svgHeight = 250,
                    svgWidth = 500,
                    svgMargin = {top: 5, right: 5, bottom: 30, left: 50},
                    legendHeight = svgHeight - svgMargin.top - svgMargin.bottom,
                    legendWidth = 0.15*(svgWidth - svgMargin.left - svgMargin.right),
                    legendMargin = {top: 60, right: 50, bottom: 60, left: 50},
                    chartHeight = svgHeight - svgMargin.top - svgMargin.bottom,
                    chartWidth = 0.85*(svgWidth - svgMargin.left - svgMargin.right);

                var x = d3.time.scale()
                    .range([0, chartWidth]);
                var y = d3.scale.linear()
                    .range([chartHeight, 0]);
                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom");
                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left");

                x.domain(d3.extent(chartData, function(d) { return d.date; }));
                y.domain([d3.min(chartData, function(d) { return d.value*0.9; }), d3.max(chartData, function(d) { return d.value*1.1; })]);

                var svg = d3.select("div.chart-container").append("svg")
                            .attr("width", svgWidth)
                            .attr("height", svgHeight);
                var chart = d3.select("svg").append("g")
                            .attr("width", chartWidth)
                            .attr("height", chartHeight)
                            .attr("transform", "translate("+ svgMargin.left +","+ svgMargin.top +")");

                var line = d3.svg.line()
                    .x(function(d) {return x(d.date); })
                    .y(function(d) { return y(d.value); });

                var tooltip = d3.select("body")
                    .append("button")
                    .attr("class", "btn")
                    .style("position", "absolute")
                    .style("z-index", "10")
                    .style("visibility", "hidden")
                    .text("none");

                var gradient = svg.append("defs")
                    .append("linearGradient")
                        .attr("id", "gradient")
                        .attr("x1", "0%")
                        .attr("x2", "0%")
                        .attr("y1", "0%")
                        .attr("y2", "100%")
                        .attr("spreadMethod", "pad");
                gradient.append("stop")
                    .attr("offset", "0%")
                    .attr("stop-color", colourFactory(1, base_colours))
                    .attr("stop-opacity", 1);
                gradient.append("stop")
                    .attr("offset", "100%")
                    .attr("stop-color", colourFactory(0, base_colours))
                    .attr("stop-opacity", 1);

                //svg.append("rect")
                //    .attr("width", legendWidth - 20)
                //    .attr("height", svgHeight)
                //    .attr("transform", "translate("+ (svgMargin.left + chartWidth +10) +",0)")
                //    .style("fill", "url(#gradient)");

                chart.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0" +","+ chartHeight +")")
                    .call(xAxis);
                chart.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);

                chart.append("path")
                    .datum(chartData)
                    .attr("class", "line")
                    .attr("d", function(d) { return line(d); })
                    .style("stroke-width", "3px")
                    .style("stroke", "url(#gradient)");

                chartData.forEach(function(d) {
                    var value = d.value;
                    var unit = d.value_unit;
                    var transition = getTransitionValue(value, max, min);
                    chart.append("circle")
                        .attr("cx", x(d.date))
                        .attr("cy", y(d.value))
                        .attr("r", 3.5)
                        .style("fill", function() {
                          return colourFactory(1-transition, base_colours);
                        })
                        .on("mouseover", function(){
                            return tooltip.style("visibility", "visible");
                        })
                        .on("mousemove", function(d){
                            tooltip
                                .style("top", (d3.event.pageY-10)+"px")
                                .style("left",(d3.event.pageX+15)+"px")
                                .text(value + " " + unit.toLowerCase())
                            return tooltip
                        })
                        .on("mouseout", function() {
                            return tooltip.style("visibility", "hidden");
                        });
                });

                function extractUnit(data) {
                    var item = data[0]
                    return item.value_unit
                }

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

                function getTransitionValue(value, min, max) {
                    return (value - min)/(max - min);
                }

                function parseDates(data) {
                    data.forEach(function(d) {
                        d.date = new Date(Date.UTC(d.year, 11, 31));
                    });
                }

                function colourFactory(transition, colours) {
                    var hue = colours.hue_1 + transition * (colours.hue_2-colours.hue_1);
                    var saturation = colours.saturation1 + transition * (colours.saturation2 - colours.saturation1);
                    var lightness = colours.lightness1 + transition * (colours.lightness2 - colours.lightness1);
                    return d3.hsl(hue, saturation, lightness);
                }

                function getValue(obj, input_data) {
                    console.log(obj);
                    var returnValue = 'n/a';
                    var unit = ''
                    var name = obj.properties.name.toLowerCase();
                    input_data.forEach(function(obj, idx, arr) {
                        if(obj.region_name.toLowerCase() === name) {
                            returnValue = obj.value;
                            unit = obj.yield_unit;
                        }
                    })
                    return [returnValue, unit];
                }

            }
        }

    }])
})();