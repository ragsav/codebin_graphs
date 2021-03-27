import { createRef, useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import Edge from "./edge";
import Node from "./node";
import * as d3 from "d3";

function getNodeLocations(nodes, links, container) {
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
function generateRandomGraph(n) {
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
const Screen = (props) => {
  const optionBarHeight = "10%";
  const screenRef = useRef(null);
  const [dimensions, setDimensions] = useState(null);
  const [nodePositions, setNodePositions] = useState(null);
  const nodeRef1 = useRef(null);
  const nodeRef2 = useRef(null);

  const { adjList, nodes, links } = generateRandomGraph(10);

  const noderef = adjList.map(() => createRef());
  const reducedEdges = new Map();
  const connectedNodePairs = [];
  adjList.forEach((adjacentNodes, currentNode) => {
    const currentNodeEdges = [];
    adjacentNodes.forEach((adjacentNode) => {
      if (!reducedEdges.get(adjacentNode)?.includes(currentNode)) {
        currentNodeEdges.push(adjacentNode);
        connectedNodePairs.push([currentNode, adjacentNode]);
      }
    });
    if (currentNodeEdges.length !== 0) {
      reducedEdges.set(currentNode, currentNodeEdges);
    }
  });
  //   const [screen]

  useEffect(() => {
    if (screenRef?.current) {
      console.log(screenRef);
      //   setNodePositions(getNodeLocations(nodes, links, screenRef));
      const dim = {
        top: Math.floor(screenRef.current.offsetTop),
        left: Math.floor(screenRef.current.offsetLeft),
        x: Math.floor(screenRef.current.offsetWidth),
        y: Math.floor(screenRef.current.offsetHeight),
      };
      console.log(dim);
      setDimensions({ ...dim });
    }
  }, [screenRef]);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",

        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "10%",
          border: "1px solid black",
          backgroundColor: "white",
        }}
      ></div>
      <div
        ref={screenRef}
        style={{ width: "100%", height: "90%", backgroundColor: "#1E1E1E" }}
      >
        {dimensions ? (
          <div>
            {adjList.map((val, index) => {
              return (
                <Node
                  edgeRef={noderef[index]}
                  container={screenRef}
                  top={dimensions.top}
                  left={dimensions.left}
                  x={dimensions.x}
                  y={dimensions.y}
                >
                  <Card
                    aria-disabled
                    ref={noderef[index]}
                    style={{
                      margin: "auto",
                      padding: "auto",
                      color: "white",
                      border: "none",
                      backgroundColor: "#2BAE00",
                      userSelect: "none",
                    }}
                  >
                    {index}
                  </Card>
                </Node>
              );
            })}
            {connectedNodePairs.map(([n1, n2], index) => {
              return (
                <Edge
                  n1={noderef[n1]}
                  n2={noderef[n2]}
                  container={screenRef}
                  top={dimensions.top}
                  left={dimensions.left}
                  x={dimensions.x}
                  y={dimensions.y}
                ></Edge>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Screen;
