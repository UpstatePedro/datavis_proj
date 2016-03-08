(function() {
  'use strict';

  visApp.factory('D3chart', [function() {
            return {
                render: function(data) {

                // Clear away the material from any existing visualisation
                // before we proceed
                d3.select("svg").remove()

                // ********************************
                // Define variables & static config
                var svgHeight = 450,
                    margin = {top: 5, right: 5, bottom: 10, left: 50},
                    width = 650 - margin.left - margin.right,
                    height = (svgHeight*.55) - margin.top - margin.bottom,
                    margin2 = {top: height+20+margin.top+margin.bottom, right: 120, bottom: 20, left: 40},
                    height2 =  svgHeight - margin2.top - margin.top - margin.bottom - margin2.bottom;

                var svg = d3.select("div.yield-chart-container").append("svg")

                    svg.attr("width", width + margin.left + margin.right)
                       .attr("height", height2 + margin2.top + margin2.bottom)

                var parseDate = d3.time.format("%Y").parse;

                var x = d3.time.scale().range([0, width]),
                    x2 = d3.time.scale().range([0, width]),
                    y = d3.scale.linear().range([height, 0]),
                    y2 = d3.scale.linear().range([height2, 0]);

                var color = d3.scale.category10();

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom");

                var xAxis2 = d3.svg.axis()
                    .scale(x2)
                    .orient("bottom");

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left");

                var yAxis2 = d3.svg.axis()
                    .scale(y2)
                    .orient("left");

                var line = d3.svg.line()
                    .interpolate("linear")
                    .x(function(d) {
                      return x(d.year);
                    })
                    .y(function(d) {
                        return y(d.yield);
                    });

                var line2 = d3.svg.line()
                    .interpolate("basis")
                    .x(function(d) { return x2(d.year); })
                    .y(function(d) { return y2(d.yield); });

                // Omit the clipPath block?
                    svg.append("defs")
                       .append("clipPath")
                          .attr("id", "clip")
                        .append("rect")
                          .attr("width", width)
                          .attr("height", height);

                var focus = svg.append("g")
                    .attr("class", "focus")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                var context = svg.append("g")
                    .attr("class", "context")
                    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

                var bisectDate = d3.bisector(function(d) { return d; }).left

                // ********************************
                // Import the data & draw the chart
                function drawThis(data) {

                  // Extract all the individual states names into an Array for the colour domain
                  var uniqueNames = [];
                  for(var i = 0; i < data.length; i++){
                    if(uniqueNames.indexOf(data[i].state_name) === -1){
                        uniqueNames.push(data[i].state_name);
                    };
                  };

                  color.domain(uniqueNames);

                  // Turn all the integers representing years into JS Date objects
                  data.forEach(function(d) {
                    if(! d.year instanceof Date) {
                        d.year = parseDate(d.year.toString());
                    }
                  });

                  // Re-format the data so that each line has its own name & dataset
                  var states = color.domain().map(function(name) {
                    return {
                      name: name,
                      values: data.filter(function(i,n) {
                        return i.state_name === name
                      })
                                  .map(function(d) {
                        return { year: d.year, yield: +d.value };
                      })
                    };
                  });

                  // Set the initial data domains for the axes
                  x.domain(d3.extent(data, function(d) { return d.year; }));
                  x2.domain(d3.extent(data, function(d) { return d.year; }));
                  y.domain([
                    d3.min(states, function(s) { return d3.min(s.values, function(v) { return v.yield; }); }),
                    d3.max(states, function(s) { return d3.max(s.values, function(v) { return v.yield; }); })
                  ]);
                  y2.domain(y.domain());

                  var states2 = extractData(data);

                  // Append the axes to each of the charts
                  context.append("g")
                      .attr("class", "x axis")
                      .attr("transform", "translate(0," + height2 + ")")
                      .call(xAxis2);

                  context.append("g")
                      .attr("class", "y axis")
                      .call(yAxis2)
                    .append("text")
                      .attr("transform", "rotate(-90)")
                      .attr("y", 6)
                      .attr("dy", ".71em")
                      .style("text-anchor", "end")
                      .text("Yield (bu/acre)");

                  focus.append("g")
                      .attr("class", "x axis")
                      .attr("transform", "translate(0," + height + ")")
                      .call(xAxis);

                  focus.append("g")
                      .attr("class", "y axis")
                      .call(yAxis)
                    .append("text")
                      .attr("transform", "rotate(-90)")
                      .attr("y", 6)
                      .attr("dy", ".71em")
                      .style("text-anchor", "end")
                      .text("Yield (bu/acre)");

                    // Add the data to each of the charts
                var stateContext = context.selectAll(".stateContext")
                      .data(states)
                      .enter().append("g")
                      .attr("class", "stateContext");

                  stateContext.append("path")
                      .attr("class", "line")
                      .attr("d", function(d) { return line2(d.values); })
                      .style("stroke", function(d) { return color(d.name); });

                var brush = d3.svg.brush()
                    .x(x2)
                    .on("brush", brushed);

                  stateContext.append("g")
                    .attr("class", "x brush")
                    .call(brush)
                  .selectAll("rect")
                    .style({'fill': '#69f'})
                    .attr("y", 0)
                    .attr("height", height2);

                var stateFocus = focus.selectAll(".stateFocus")
                      .data(states2)
                      .enter().append("g")
                      .attr("class", "stateFocus");

                  stateFocus.append("path")
                      .attr("class", "line")
                      .attr("d", function(d) { return line(d.values); })
                      .style("stroke", function(d) { return color(d.name); });

                  var yields = states2.map(function(i) { return i.values[i.values.length - 1].yield});
                  stateFocus.append("text")
                      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
                      .attr("transform", function(d) { return "translate("
                             + x(x.domain()[1])
                             + ","
                             + (y.range()[0]
                               - (0.5*height/states2.length)
                               + (y.range()[1] - y.range()[0])/(states2.length)
                               * yields.indexOf(d.value.yield))
                             + ")"; })
                      .attr("class", "label-text")
                      .attr("x", 30)
                      .attr("dy", ".35em")
                      .text(function(d) { return d.name; })
                      .style("stroke", function(d) { return color(d.name); });

                  function brushed() {
                    states2 = extractData(data)
                    x.domain(brush.empty() ? x2.domain() : brush.extent());
                    y.domain([
                      d3.min(states2, function(s) { return d3.min(s.values, function(v) { return v.yield; }); }),
                      d3.max(states2, function(s) { return d3.max(s.values, function(v) { return v.yield; }); })
                    ]);
                    focus.select(".x.axis").call(xAxis);
                    focus.select(".y.axis").call(yAxis);
                    focus.selectAll(".line")
                         .data(states2)
                         .attr("d", function(d) { return line(d.values); });
                  };

                  stateFocus.append("rect")
                    .attr("class", "overlay")
                    .attr("width", width)
                    .attr("height", height)
                    .on("mouseover", function() { tracker.style("display", null); })
                    .on("mouseout", function() { tracker.style("display", "none"); })
                    .on("mousemove", mousemove);

                  var tracker = stateFocus.append("g")
                                .attr("class", "tracker")
                                .style("display", "none");

                  tracker.append("text")
                         .attr("class", "tracker-text")
                         .attr("x", 9)
                         .attr("dy", ".35em");

                  function mousemove() {
                    var dates = []
                    states2[0].values.forEach(function(d) {
                      dates.push(d.year)
                    });

                    var x0 = x.invert(d3.mouse(this)[0]),
                        i = bisectDate(dates, x0, 1),
                        d0 = states2[0].values[i - 1],
                        d1 = states2[0].values[i],
                        t = x0 - d0.year > d1.year - x0 ? d1 : d0,
                        j = states2[0].values.indexOf(t);
                    var displayArray = states2.map(function(d) { return {year: d.values[j].year, yield: d.values[j].yield}; })

                    tracker.selectAll("circle").remove()
                    tracker.append("circle")
                           .data(displayArray)
                           .attr("transform", function(d) { return "translate(" + x(d.year) + "," + y(d.yield) + ")"; })
                           .attr("class", "circle")
                           .attr("r", 4.5);

                    tracker.selectAll(".tracker-text").remove();
                    tracker.append("text")
                           .data(displayArray)
                           .attr("transform", function(d) { return "translate(" + x(d.year) + "," + y(d.yield) + ")"; })
                           .attr("class", "tracker-text")
                           .attr("x", 9)
                           .attr("dy", ".35em")
                           .text(function(d) {return d.yield;});
                  };

                  function extractData(data) {
                    var newData = color.domain().map(function(name) {
                      return {
                        name: name,
                        values: data.filter(function(i,n) {
                          return i.year >= x.domain()[0]-(1) && i.year <= x.domain()[1];
                        })
                                    .filter(function(i,n) {
                          return i.state_name === name;
                        })
                                    .map(function(d) {
                          return { year: d.year, yield: +d.value };
                        })
                      };
                    });
                    return newData;
                  };

                };

                drawThis(data);
                }
           }
       }])
}());
