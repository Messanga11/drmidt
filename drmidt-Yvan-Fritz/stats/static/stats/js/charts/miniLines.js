// const drawMiniLines = () => {
//   const data = [0, 10, 45, 21, 65];
//   const data1 = [10, 45, 21, 65];
//   const data2 = [14, 35, 60, 5];
//   const line1 = d3
//     .select("#line1")
//     .append("svg")
//     .attr("viewBox", "0 0 300 100")
//     .attr("width", 100)
//     .attr("height", 50);
//   line1
//     .selectAll(".line")
//     .data(data1)
//     .enter()
//     .append("line")
//     .attr("x1", (d, i) => (300 * i) / data.length)
//     .attr("x2", (d, i) => (300 * (i + 1)) / data.length)
//     .attr("y1", (d) => 50 - d)
//     .attr("y2", (d, i) => 50 - data1[i + 1])
//     .attr("stroke", "red")
//     .attr("stroke-width", 2);
// };

// drawMiniLines();
