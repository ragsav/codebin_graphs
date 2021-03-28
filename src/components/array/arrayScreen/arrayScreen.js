import { createRef, useEffect, useRef, useState } from "react";
import { Card, Button, ButtonGroup } from "react-bootstrap";

// import { generateRandomArray } from "../helpers/helper";
import RangeSlider from "react-bootstrap-range-slider";

import {
  useArrayState,
  useArrayActions,
  useArrayStatusState,
  useArrayStatusActions,
  useArrayProcessActions,
  useArrayProcessState,
} from "../../../contexts";
import Bar from "../bar/bar";

const ArrayController = (props) => {
  const { isPlaying } = useArrayStatusState();
  const { play, pause } = useArrayStatusActions();
  const { refreshAdjList } = useArrayActions();
  const { frequency } = useArrayProcessState();
  const { changeFrequency } = useArrayProcessActions();
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
          justifyContent: "flex-start",
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
              Generate random array
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
            tooltip="off"
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
const ArrayScreen = (props) => {
  const optionBarHeight = "10%";
  const screenRef = useRef(null);
  const [dimensions, setDimensions] = useState(null);

  const { array } = useArrayState();

  const { arrayState } = useArrayProcessState();

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
        <ArrayController></ArrayController>
      </div>
      <div
        ref={screenRef}
        style={{
          width: "100%",
          height: "90%",
          backgroundColor: "#1E1E1E",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-evenly",
        }}
      >
        {dimensions
          ? arrayState?.array?.map((h, index) => {
              var color = "green";
              if (arrayState.red.indexOf(index) !== -1) {
                color = "red";
              } else if (arrayState.yellow.indexOf(index) !== -1) {
                color = "yellow";
              } else if (arrayState.blue.indexOf(index) !== -1) {
                color = "blue";
              }
              return <Bar key={index} height={h} width={4} color={color}></Bar>;
            })
          : null}
      </div>
    </div>
  );
};

export default ArrayScreen;
