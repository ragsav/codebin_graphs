import { Divider } from "@material-ui/core";
import { useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";

function getRandomArray() {
  return Array(20)
    .fill()
    .map(() => Math.round(Math.random() * 20));
}

const StackQueueDisplay = (props) => {
  const [data, setData] = useState(getRandomArray());
  const [red, setRed] = useState(4);
  const [green, setGreen] = useState(14);
  const [blue, setBlue] = useState(14);
  const [orange, setOrange] = useState(9);
  const [poppedElement, setPoppedElement] = useState(23);
  const [pushedElement, setPushedElement] = useState(56);

  return (
    <Card
      style={{
        padding: 0,
        margin: 0,
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

      <Row style={{ padding: 4, margin: 0 }}>
        <Col style={{ padding: 4, margin: 0 }}>
          {data.map((el, index) => {
            var bColor = "#C1C1C1";
            var bgColor = "#404040";
            var textColor = "#FFFFFF";
            var bWidth = "1px";
            if (red === index) {
              bColor = "#FF5E5E";
              bgColor = "#FF5E5E";
              bWidth = "2px";
            }
            if (blue === index) {
              bColor = "#4765FF";
              bgColor = "#4765FF";
              bWidth = "2px";
            }
            if (orange === index) {
              bColor = "#FFBC41";
              bgColor = "#FFBC41";
              bWidth = "2px";
            }
            return (
              <Row
                style={{
                  padding: "4px 2px 4px 2px",
                  fontSize: 12,
                  textAlign: "right",

                  fontWeight: "500",
                  margin: 2,
                  color: textColor,
                  width: 100,
                  backgroundColor: bgColor,
                  border: `${bWidth} solid ${bColor}`,
                }}
              >
                {el}
              </Row>
            );
          })}
        </Col>
        <Col style={{ padding: 4, margin: 0, color: "#FFFFFF" }}>
          <Row
            style={{ padding: 4, margin: 0 }}
          >{`Popped element = ${poppedElement}`}</Row>
          <Row
            style={{ padding: 4, margin: 0 }}
          >{`Pushed element = ${pushedElement}`}</Row>
        </Col>
      </Row>
    </Card>
  );
};

export default StackQueueDisplay;
