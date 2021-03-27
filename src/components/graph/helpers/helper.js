import * as d3 from "d3";

export function generateRandomGraph(n) {
  var adjList = [n];
  var nodes = [];
  var links = [];
  for (var i = 0; i < n; i++) {
    nodes.push({ id: i });
    var array = Array.from(Array(n).keys());
    const shuffled = array.sort(() => 0.5 - Math.random());
    var neighbours = Math.floor((Math.random() * n) / 2);
    adjList[i] = shuffled.slice(0, neighbours);
    adjList[i].forEach((val, index) => {
      links.push({ source: i, target: val });
    });
  }

  return { adjList, nodes, links };
}

export function getNodeLocations(nodes, links, container) {
  const containerRect = container.current;
  console.log(container);
  const height = containerRect.clientHeight;
  const width = containerRect.clientWidth;
  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3.forceLink(links).id((d) => d.id)
    )
    .force("charge", d3.forceManyBody().strength(-3000))
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  var array = Array(nodes.length);
  var minX = 0,
    minY = 0,
    maxX = 0,
    maxY = 0;

  links.forEach(({ source, target }, index) => {
    // console.log({ x: source.x, y: source.y });
    minX = Math.min(Math.round(source.x), Math.round(target.x), minX);
    minY = Math.min(Math.round(source.y), Math.round(target.y), minY);
    maxX = Math.max(Math.round(source.x), Math.round(target.x), maxX);
    maxX = Math.max(Math.round(source.y), Math.round(target.y), maxY);

    array[source.id] = { x: source.x, y: source.y };
    array[target.id] = { x: target.x, y: target.y };
  });
  //   console.log({ minX, minY, maxX, maxY });

  for (var i = 0; i < array.length; i++) {
    const t = array[i];

    var x = Math.round((((t.x - minX) / (maxX - minX)) * width) / 2);
    var y = Math.round((((t.y - minY) / (maxY - minY)) * height) / 2);
    array[i] = { x, y };
  }
  return array;
}
