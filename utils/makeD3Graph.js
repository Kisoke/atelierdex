import * as d3 from 'd3'

export default (elementId, nodes, links) => {
  var margin = {top: 100, right: 150, bottom: 100, left: 150}

  var outerWidth  = 1600,
    outerHeight = 900

  var width  = outerWidth - margin.right - margin.left,
    height = outerHeight - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3.select(`#${elementId}`)
    .append("svg")
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr("width", "100%")
    .attr("viewBox", "0 0 " + outerWidth + " " + outerHeight)
    .classed('plot-svg', true)

  const plotSpace = svg.append("g")
    .classed('plot-space', true)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  // Initialize the links
  const link = plotSpace
    .selectAll("line")
    .data(links)
    .join("line")
    .style("stroke", "#aaa")

  // Initialize the nodes
  const node = plotSpace
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 20)
    .style("fill", "#69b3a2")

  // Let's list the force we wanna apply on the network
  const simulation = d3.forceSimulation(nodes)                 // Force algorithm is applied to data.nodes
    .force("link", d3.forceLink()                               // This force provides links between nodes
      .id(function (d) { return d.id; })                     // This provide  the id of a node
      .links(links)                                    // and this the list of links
    )
    .force("charge", d3.forceManyBody().strength(-400))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
    .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
    .on("end", ticked)

  // This function is run at each iteration of the force algorithm, updating the nodes position.
  function ticked() {
    link
      .attr("x1", function (d) { return d.source.x; })
      .attr("y1", function (d) { return d.source.y; })
      .attr("x2", function (d) { return d.target.x; })
      .attr("y2", function (d) { return d.target.y; })

    node
      .attr("cx", function (d) { return d.x + 6; })
      .attr("cy", function (d) { return d.y - 6; })
  }
}