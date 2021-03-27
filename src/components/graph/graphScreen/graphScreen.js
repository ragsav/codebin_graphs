import { createRef, useEffect, useRef, useState } from "react";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import Edge from "../edge/edge";
import Node from "../node/node";
import { generateRandomGraph } from "../helpers/helper";

const GraphController = (props) => {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <div
        style={{ height: "50%", width: "100%", backgroundColor: "red" }}
      ></div>
      <div
        style={{
          height: "50%",
          width: "100%",
          backgroundColor: "#444444",
          display: "flex",
          flexDirection: "row",
          padding: "4px 16px 4px 16px",
          justifyContent: "space-between",
        }}
      >
        <div>
          <ButtonGroup>
            <Button
              variant="light"
              style={{
                marginRight: 2,
                padding: "2px 8px 2px 8px",
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              Generate random graph
            </Button>
            <Button
              variant="light"
              style={{
                marginRight: 2,
                padding: "2px 8px 2px 8px",
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              Manual input
            </Button>
          </ButtonGroup>
        </div>

        <div>
          <ButtonGroup>
            <Button
              variant="light"
              style={{
                marginRight: 2,
                padding: "2px 8px 2px 8px",
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              Start
            </Button>
            <Button
              variant="light"
              style={{
                marginRight: 2,
                padding: "2px 8px 2px 8px",
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              Stop
            </Button>
            <Button
              variant="light"
              style={{
                marginRight: 2,
                padding: "2px 8px 2px 8px",
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              Pause
            </Button>
            <Button
              variant="light"
              style={{
                marginRight: 2,
                padding: "2px 8px 2px 8px",
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              Resume
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};
const GraphScreen = (props) => {
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
        }}
      >
        <GraphController></GraphController>
      </div>
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

export default GraphScreen;
