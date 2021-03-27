import { forwardRef, useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";

const Node = (props, ref) => {
  const [size, setSize] = useState(40);

  const containerRef = props.container?.current;

  const nodeRef = useRef(null);

  const [position, setPosition] = useState({
    x: Math.floor(props.x / 2 + props.left - size / 2),
    y: Math.floor(props.y / 2 + props.top - size / 2),
  });

  useEffect(() => {
    // console.log(props);
    if (props.edgeRef?.current && nodeRef.current) {
      const edgePosition = {
        x: position.x + size / 2,
        y: position.y + size / 2,
      };
      const event = new CustomEvent("position", {
        detail: edgePosition,
      });
      //   console.log("dispatching event");
      props.edgeRef.current.dispatchEvent(event);
    }
  }, [position]);

  function handleMouseMove(e) {
    if (containerRef) {
      const parentParentLeft =
        containerRef.parentElement.parentElement.offsetLeft;
      const parentParentTop =
        containerRef.parentElement.parentElement.offsetTop;

      const parentLeft = containerRef.parentElement.offsetLeft;
      const parentTop = containerRef.parentElement.offsetTop;
      const pointerX = e.pageX;
      const pointerY = e.pageY;
      const containerTop = containerRef.offsetTop;
      const containerLeft = containerRef.offsetLeft;
      const containerWidth = containerRef.offsetWidth;
      const containerHeight = containerRef.offsetHeight;

      var x_new, y_new;
      x_new = Math.floor(pointerX - parentParentLeft - size / 2);
      y_new = Math.floor(pointerY - parentParentTop - size / 2);

      if (x_new < parentLeft) {
        x_new = parentLeft;
      }
      if (y_new < containerTop) {
        y_new = containerTop;
      }
      if (y_new > containerHeight + containerTop - size) {
        y_new = containerHeight + containerTop - size;
      }
      if (x_new > containerWidth + containerLeft - size) {
        x_new = containerWidth + containerLeft - size;
      }
      setPosition({
        x: x_new,
        y: y_new,
      });
    }
  }
  function handleMouseUp(e) {
    document.onmousemove = null;
  }
  function handleMouseDown(e) {
    if (e.button === 0) {
      document.onmousemove = handleMouseMove;
      document.onmouseup = handleMouseUp;
    }
  }
  return (
    <Card
      ref={nodeRef}
      style={{
        padding: 5,
        margin: 0,
        backgroundColor: "#2BAE00",
        position: "absolute",
        border: "2px solid white",
        borderRadius: size / 2,
        height: size,
        width: size,
        top: position.y,
        left: position.x,
        zIndex: 1,
        // transitionDuration: "0.5s linear",
        display: "flex",
      }}
      onMouseDown={(e) => {
        handleMouseDown(e);
      }}
      onMouseUp={(e) => {
        handleMouseUp(e);
      }}
    >
      {props.children}
    </Card>
  );
};

export default Node;
