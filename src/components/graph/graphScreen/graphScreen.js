import { createRef, useEffect, useRef, useState } from "react";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import Edge from "../edge/edge";
import Node from "../node/node";
import { generateRandomGraph } from "../helpers/helper";
import RangeSlider from "react-bootstrap-range-slider";

import {
  useStatusState,
  useStatusActions,
  useAdjListActions,
  useProcessActions,
  useProcessState,
  useAdjListState
} from "../../../contexts";


function dfs_rec(adjList, v, vis) {
  vis[v] = true;

  console.log( { currentNode: v, vis: [...vis] });

  for (var i = 0; i < adjList[v].length; i++) {
    if (!vis[adjList[v][i]]) {
      dfs_rec(adjList, adjList[v][i], vis);
    }
  }
}
function sortingAlgorithm(adjList) {
  console.log(adjList);
  var vis = Array(adjList.length).fill(false);
  for (var i = 0; i < adjList.length; i++) {
    dfs_rec(adjList, i, vis);
  }
};

const GraphController = (props) => {
  const { isPlaying } = useStatusState();
  const { play, pause } = useStatusActions();
  const { refreshAdjList } = useAdjListActions();
  const { frequency } = useProcessState();
  const { changeFrequency } = useProcessActions();
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        backgroundColor: "#444444",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: "50%",
          width: "100%",

          paddingBottom: 3,
          backgroundImage: "linear-gradient(to right,#B7FFEC,#D971FF)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",

            backgroundColor: "#444444",
          }}
        ></div>
      </div>
      <div
        style={{
          height: "50%",
          width: "100%",
          backgroundColor: "#444444",
          display: "flex",
          flexDirection: "row",
          padding: "4px 16px 4px 16px",
          justifyContent: "flex-end",
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
            onChange={
              (changeEvent) => changeFrequency(changeEvent.target.value)
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
  const optionBarHeight = "10%";
  const screenRef = useRef(null);
  const [dimensions, setDimensions] = useState(null);
  const [nodePositions, setNodePositions] = useState(null);
  const nodeRef1 = useRef(null);
  const nodeRef2 = useRef(null);

  const { adjList } = useAdjListState();

  // sortingAlgorithm(adjList)
  const {graphState} = useProcessState();
  useEffect(()=>{console.log(graphState)},[graphState])
  // console.log(adjList)
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
      const dim = {
        top: Math.floor(screenRef.current.offsetTop),
        left: Math.floor(screenRef.current.offsetLeft),
        x: Math.floor(screenRef.current.offsetWidth),
        y: Math.floor(screenRef.current.offsetHeight),
      };
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
              var color = "white";
              if(graphState&&graphState.vis&&graphState.vis[index]===true){
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
                graphState.path&&graphState.path.indexOf(n1) != -1
              ) {
                if (graphState.path[graphState.path.indexOf(n1) + 1] === n2) {
                  color = "red";
                }
              }
              return (
                <Edge
                  key={`${n1}->${n2}>`}
                  n1={noderef[n1]}
                  n2={noderef[n2]}
                  label={`${n1}->${n2}`}
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
