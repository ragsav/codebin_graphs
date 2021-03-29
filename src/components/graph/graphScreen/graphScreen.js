import { createRef, useEffect, useRef, useState } from "react";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import Edge from "../edge/edge";
import Node from "../node/node";

import RangeSlider from "react-bootstrap-range-slider";

import {
  useGraphStatusState,
  useGraphStatusActions,
  useAdjListActions,
  useGraphProcessActions,
  useGraphProcessState,
  useAdjListState,
} from "../../../contexts";
import useElementResize from "../../../hooks/useElementResize";

const GraphController = (props) => {
  const { isPlaying } = useGraphStatusState();
  const { play, pause } = useGraphStatusActions();
  const { refreshAdjList } = useAdjListActions();
  const { frequency } = useGraphProcessState();
  const { changeFrequency } = useGraphProcessActions();
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        padding: "2px 0px 2px 0px",
        backgroundImage: "linear-gradient(to bottom,#FFFFFF,#FFFFFF)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#444444",
          display: "flex",
          flexDirection: "row",
          padding: "4px 16px 6px 16px",
          justifyContent: "flex-start",
          alignItems: "center",
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
              onClick={refreshAdjList}
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

        <div
          style={{
            marginLeft: 20,
            marginRight: 20,
            display: "flex",
            flexDirection: "row",
            padding: 0,
            justifyContent: "center",
          }}
        >
          <span
            style={{
              marginRight: 8,
              color: "white",
              padding: "auto",
              fontSize: 12,
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
            }}
          >
            Speed
          </span>
          <RangeSlider
            tooltip={false}
            variant="light"
            size="sm"
            min={1}
            value={frequency}
            onChange={(changeEvent) =>
              changeFrequency(changeEvent.target.value)
            }
          />
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
              onClick={() => {
                isPlaying ? pause() : play();
              }}
            >
              {isPlaying ? "Pause" : "Play"}
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};
const GraphScreen = (props) => {
  
  const screenRef = useRef(null);
  const [dimensions, setDimensions] = useState(null);
  const [nodePositions, setNodePositions] = useState(null);
  const nodeRef1 = useRef(null);
  const nodeRef2 = useRef(null);

  const { adjList } = useAdjListState();

  // const resizeObserver = new ResizeObserver((entries) => {
  //   // console.log(entries);
  //   if(dimensions){
  //     const dim = {
  //       top: dimensions.top,
  //       left: dimensions.left,
  //       x: Math.floor(entries[0].contentRect.width),
  //       y: Math.floor(entries[0].contentRect.height),
  //     };
  //     setDimensions(dim);
  //   }
    
  // });

  // useEffect(()=>{
  //   console.log(dimensions)
  // },[dimensions])
  
  const { graphState } = useGraphProcessState();
  
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
      // resizeObserver.observe(screenRef.current);
      
      const dim = {
        top: Math.floor(screenRef.current.offsetTop),
        left: Math.floor(screenRef.current.offsetLeft),
        x: Math.floor(screenRef.current.offsetWidth),
        y: Math.floor(screenRef.current.offsetHeight),
      };
      setDimensions({ ...dim });
    }
    return () => {
      // resizeObserver.unobserve(screenRef.current);
    };
  }, [screenRef]);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "5%",
        }}
      >
        <GraphController
          
        ></GraphController>
      </div>
      <div
        ref={screenRef}
        style={{ width: "100%", height: "95%", backgroundColor: "#1E1E1E" }}
      >
        {dimensions ? (
          <div>
            {adjList.map((val, index) => {
              var color = "white";
              if (
                graphState &&
                graphState.vis &&
                graphState.vis[index] === true
              ) {
                color = "green";
              }
              if (graphState?.currentNode === index) {
                color = "yellow";
              }
              return (
                <Node
                  key={index}
                  edgeRef={noderef[index]}
                  container={screenRef}
                  top={dimensions.top}
                  left={dimensions.left}
                  x={dimensions.x}
                  y={dimensions.y}
                  bgColor={color}
                >
                  <Card
                    key={`${index}1`}
                    aria-disabled
                    ref={noderef[index]}
                    style={{
                      margin: "auto",
                      padding: "auto",
                      color: "black",
                      border: "none",
                      backgroundColor: color,
                      userSelect: "none",
                    }}
                  >
                    {index}
                  </Card>
                </Node>
              );
            })}
            {connectedNodePairs.map(([n1, n2], index) => {
              // console.log({n1,n2})
              var color = "white";

              if (
                graphState &&
                graphState.path &&
                graphState.path.indexOf(n1) != -1
              ) {
                if (graphState.path[graphState.path.indexOf(n1) + 1] === n2) {
                  color = "red";
                }
              }
              return (
                <Edge
                  key={`${n2}<-${n1}`}
                  n1={noderef[n1]}
                  n2={noderef[n2]}
                  label={`${n2}<-${n1}`}
                  container={screenRef}
                  bgColor={color}
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
