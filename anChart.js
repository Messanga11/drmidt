var data = [{
    name: "Hemant",
    age: 20
  }, {
    name: "Vinay",
    age: 55
  }, {
    name: "Vikas",
    age: 56
  }, {
    name: "Arun",
    age: 88
  }, {
    name: "Varun",
    age: 34
  }, {
    name: "Ajay",
    age: 77
  }],
    w = 600,
    h = 300,
    margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    },
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom;

  var mySvg = d3.select("body").append("svg").attr({
    width: w,
    height: h
  }).append("g")
    .attr("transform", 'translate(' + margin.left + ',' + margin.top + ')');


    
  var xScale = d3.scale.ordinal()
    .domain(data.map(function(d) {
      return d.name;
    }))
    .rangeBands([0, width]);
    
  var yScale = d3.scale.linear()
    .domain([0, d3.max(data, function(d) {
      return d.age;
    })])
    .range([height, 0]);

  var linearColorScale = d3.scale.linear()
    .domain([0, data.length])
    .range(["#e74c3c", "#8e44ad"]);

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");
    
  var yGridLine = d3.svg.axis()
    .scale(yScale)
    .tickSize(-width, 0 ,0)
    .tickFormat("")
    .orient("left");

  var ordinalColorScale = d3.scale.category20();

  mySvg.append("g")
    .classed("gridLine", true)
    .attr("transform", "translate(0,0)")
    .call(yGridLine);
    
  mySvg.selectAll("rect").data(data).enter()
    .append("rect")
    .attr("x", function(d){
      return xScale(d.name);
    })
    .attr("y", function(d, i) {
      return yScale(d.age);
    })
    .attr("width", function(d) {
      return xScale.rangeBand();
    })
    .attr("height", function(d) {
      return height - yScale(d.age)
    })
    .style("fill", function(d, i) {
      return ordinalColorScale(i);
    })

   mySvg.selectAll("text").data(data)
    .enter()
    .append("text")
    .classed("bar", true)
    .attr("x", function(d) {
      return xScale(d.name) + xScale.rangeBand() / 2;
    })
    .attr("dx", 0)
    .attr("y", function(d, i) {
      return yScale(d.age);
    })
    .attr("dy", -6)
    .text(function(d, i) {
      return d.age;
    });


  mySvg.append("g")
    .classed("axis", true)
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
  
    
  mySvg.append("g")
    .classed("axis", true)
    .attr("transform", "translate(0,0)")
    .call(yAxis);