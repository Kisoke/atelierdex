import * as d3 from 'd3'

export default (elementId, nodes, links, nodeSize= { w: 50, h: 50 }, nodeRepulsion= 400) => {
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

  const defs = svg.append('svg:defs')

  defs.append('svg:clipPath')
    .attr('id', `#${elementId}-circleClipPath`)
    .append('circle')
    .attr('cx', nodeSize.w / 2)
    .attr('cy', nodeSize.h / 2)
    .attr('r', nodeSize.w)
    .attr('fill', '#FFF')

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
    .selectAll("image")
    .data(nodes)
    .join("image")
    .attr("width", nodeSize.w)
    .attr("height", nodeSize.h)
    .attr("xlink:href", (item) => item.image)

  // Let's list the force we wanna apply on the network
  const simulation = d3.forceSimulation(nodes)                 // Force algorithm is applied to data.nodes
    .force("link", d3.forceLink()                               // This force provides links between nodes
      .distance(nodeSize.w * 1.5)
      .id(function (d) { return d.id })                     // This provide  the id of a node
      .links(links)                                    // and this the list of links
    )
    .force("charge", d3.forceManyBody().strength(-nodeRepulsion))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
    .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
    .on("end", ticked)

  // This function is run at each iteration of the force algorithm, updating the nodes position.
  function ticked() {
    link
      .attr("x1", function (d) { return d.source.x })
      .attr("y1", function (d) { return d.source.y })
      .attr("x2", function (d) { return d.target.x })
      .attr("y2", function (d) { return d.target.y })

    node
      .attr("x", function (d) { return d.x - nodeSize.w / 2 })
      .attr("y", function (d) { return d.y - nodeSize.h / 2 })
  }
}