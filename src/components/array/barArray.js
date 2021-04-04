import { Divider } from "@material-ui/core";
import { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";

function getRandomArray() {
  return Array(20)
    .fill()
    .map(() => Math.round(Math.random() * 20));
}

function normalizeArray(array, r) {
  var max = Math.max(...array);
  var arr = [];
  array.forEach((i) => {
    arr.push((i * r) / max);
  });

  return arr;
}
const BarArrayDisplay = (props) => {
  const [data, setData] = useState(
    normalizeArray(getRandomArray(), parseInt(props.height) - 20)
  );
  const [red, setRed] = useState(4);
  const [green, setGreen] = useState(14);
  const [blue, setBlue] = useState(14);
  const [orange, setOrange] = useState(9);

  return (
    <Card
      style={{
        padding: 0,
        margin: "2px 0px 2px 0px",
        borderRadius: 2,
        backgroundColor: "#404040",
      }}
    >
      {props.titleVisible === true ? (
        <Row style={{ padding: 4, margin: 0 }}>
          <Col style={{ padding: 2, margin: 0, color: "white" }}>
            {props.title}
          </Col>
        </Row>
      ) : null}
      {props.titleVisible === true ? (
        <Row
          style={{
            margin: 4,
            padding: 0,
            height: 1,
            backgroundColor: "#C1C1C1",
          }}
        ></Row>
      ) : null}

      <Row
        style={{
          padding: 4,
          margin: 0,
          alignItems: "flex-end",
          height: `${props.height}px`,
        }}
      >
        {data.map((el, index) => {
          var bColor = "#C1C1C1";
          var bgColor = "#C1C1C1";
          var textColor = "#FFFFFF";
          var bWidth = "1px";
          if (red === index) {
            bColor = "#DF0000";
            bgColor = "#FF5E5E";
          }
          if (blue === index) {
            bColor = "#002AFF";
            bgColor = "#4765FF";
          }
          if (orange === index) {
            bColor = "#FAA200";
            bgColor = "#FFBC41";
          }
          return (
            <Col
              style={{
                padding: "4px 2px 4px 2px",
                fontSize: 12,
                height: el,
                textAlign: "center",
                alignItems: "center",
                fontWeight: "500",
                margin: "0px 2px 0px 2px",
                color: textColor,
                backgroundColor: bgColor,
                border: `${bWidth} solid ${bgColor}`,
              }}
            ></Col>
          );
        })}
      </Row>
    </Card>
  );
};

export default BarArrayDisplay;
