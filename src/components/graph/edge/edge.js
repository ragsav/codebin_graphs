import { forwardRef, useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";

function getEdge(x1, y1, x2, y2) {
  var length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  var cx = (x1 + x2) / 2 - length / 2;
  var cy = (y1 + y2) / 2 - 1;
  var angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);
  return { length, cx, cy, angle };
}

const Edge = (props) => {
  const [c1, setC1] = useState({
    x: Math.floor(props.x / 2 + props.left),
    y: Math.floor(props.y / 2 + props.top),
  });
  const [c2, setC2] = useState({
    x: Math.floor(props.x / 2 + props.left),
    y: Math.floor(props.y / 2 + props.top),
  });
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);
  const [length, setlength] = useState(0);
  const [currentN1, setCurrentN1] = useState(props.n1?.current);
  const [currentN2, setCurrentN2] = useState(props.n2?.current);

  useEffect(() => {
    if (currentN1 === null) setCurrentN1(props.n1.current);
    if (currentN2 === null) setCurrentN2(props.n2.current);
  }, [props.n1, currentN1, setCurrentN1, props.n2, currentN2]);

  useEffect(() => {
    if (currentN1) {
      const handler = (e) => {
        if (e?.detail) {
          const newC1 = e.detail;
          setC1(newC1);
        }
      };
      currentN1.addEventListener("position", handler);
      return () => currentN1?.removeEventListener("position", handler);
    }
  }, [currentN1]);
  useEffect(() => {
    if (currentN2) {
      const handler = (e) => {
        if (e?.detail) {
          const newC2 = e.detail;
          setC2(newC2);
        }
      };
      currentN2.addEventListener("position", handler);
      return () => currentN2?.removeEventListener("position", handler);
    }
  }, [currentN2]);

  useEffect(() => {
    const params = getEdge(c1.x, c1.y, c2.x, c2.y);
    setAngle(params.angle);
    setCenter({ x: params.cx, y: params.cy });
    setlength(params.length);
  }, [c1, c2]);
  return (
    <Card
      //   ref={ref}
      style={{
        position: "absolute",
        height: 2,
        width: length,
        top: center.y,
        left: center.x,
        zIndex: 0,

        // backgroundImage:
        //   "linear-gradient(to right, rgb(0, 255, 187),rgb(115, 0, 255))",
        transform: `rotate(${angle}deg)`,
      }}
    ></Card>
  );
};

export default Edge;
