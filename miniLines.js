const drawMiniLines = () => {
  const data = [0, 10, 45, 21, 65];
  const data1 = [10, 45, 21, 65];
  const data2 = [14, 35, 60, 5];
  const line1 = d3
    .select("#line1")
    .append("svg")
    .attr("viewBox", "0 0 300 100")
    .attr("width", 100)
    .attr("height", 50);
  line1
    .selectAll(".line")
    .data(data1)
    .enter()
    .append("line")
    .attr("x1", (d, i) => (300 * i) / data.length)
    .attr("x2", (d, i) => (300 * (i + 1)) / data.length)
    .attr("y1", (d) => 50 - d)
    .attr("y2", (d, i) => 50 - data1[i + 1])
    .attr("stroke", "red")
    .attr("stroke-width", 2);
  const line2 = d3
    .select("#line2")
    .append("svg")
    .attr("viewBox", "0 0 300 100")
    .attr("width", 100)
    .attr("height", 50);
  line2
    .selectAll(".line")
    .data(data2)
    .enter()
    .append("line")
    .attr("x1", (d, i) => (300 * i) / data.length)
    .attr("x2", (d, i) => (300 * (i + 1)) / data.length)
    .attr("y1", (d) => 50 - d)
    .attr("y2", (d, i) => 50 - data2[i + 1])
    .attr("stroke", "blue")
    .attr("stroke-width", 2);
  const line3 = d3
    .select("#line3")
    .append("svg")
    .attr("viewBox", "0 0 300 100")
    .attr("width", 100)
    .attr("height", 50);
  line3
    .selectAll(".line")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", (d, i) => (300 * i) / data.length)
    .attr("x2", (d, i) => (300 * (i + 1)) / data.length)
    .attr("y1", (d) => 50 - d)
    .attr("y2", (d, i) => 50 - data[i + 1])
    .attr("stroke", "green")
    .attr("stroke-width", 2);
  const line4 = d3
    .select("#line4")
    .append("svg")
    .attr("viewBox", "0 0 300 100")
    .attr("width", 100)
    .attr("height", 50);
  line4
    .selectAll(".line")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", (d, i) => (300 * i) / data.length)
    .attr("x2", (d, i) => (300 * (i + 1)) / data.length)
    .attr("y1", (d) => 50 - d)
    .attr("y2", (d, i) => 50 - data[i + 1])
    .attr("stroke", "orange")
    .attr("stroke-width", 2);
  const line5 = d3
    .select("#line5")
    .append("svg")
    .attr("viewBox", "0 0 300 100")
    .attr("width", 100)
    .attr("height", 50);
  line5
    .selectAll(".line")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", (d, i) => (300 * i) / data.length)
    .attr("x2", (d, i) => (300 * (i + 1)) / data.length)
    .attr("y1", (d) => 50 - d)
    .attr("y2", (d, i) => 50 - data[i + 1])
    .attr("stroke", "maroon")
    .attr("stroke-width", 2);
  const line6 = d3
    .select("#line6")
    .append("svg")
    .attr("viewBox", "0 0 300 100")
    .attr("width", 100)
    .attr("height", 50);
  line6
    .selectAll(".line")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", (d, i) => (300 * i) / data.length)
    .attr("x2", (d, i) => (300 * (i + 1)) / data.length)
    .attr("y1", (d) => 50 - d)
    .attr("y2", (d, i) => 50 - data[i + 1])
    .attr("stroke", "yellow")
    .attr("stroke-width", 2);
};

drawMiniLines();
