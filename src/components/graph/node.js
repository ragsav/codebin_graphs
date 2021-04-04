import { forwardRef, useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";

const Node = (props, ref) => {
  const [size, setSize] = useState(20);

  const containerRef = props.container?.current;

  const nodeRef = useRef(null);

  const [position, setPosition] = useState({
    x: Math.floor(Math.random() * (props.x - 40) + props.left + 20 - size / 2),
    y: Math.floor(Math.random() * (props.y - 40) + props.top + 20 - size / 2),
  });

  useEffect(() => {
    if (props.edgeRef?.current && nodeRef.current) {
      const edgePosition = {
        x: position.x + size / 2,
        y: position.y + size / 2,
      };
      const event = new CustomEvent("position", {
        detail: edgePosition,
      });

      props.edgeRef.current.dispatchEvent(event);
    }
  });

  useEffect(() => {
    if (props.edgeRef && props.edgeRef.current) {
      const edgePosition = {
        x: position.x + size / 2,
        y: position.y + size / 2,
      };
      const event = new CustomEvent("position", {
        detail: edgePosition,
      });

      props.edgeRef.current.dispatchEvent(event);
    }
  }, [props]);

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
      x_new = Math.floor(pointerX - size / 2);
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
        padding: 0,
        margin: 0,
        backgroundColor: props.bgColor,
        position: "absolute",
        border: "2px solid white",
        borderRadius: size / 2,
        height: size,
        width: size,
        top: position.y,
        left: position.x,
        zIndex: 1,
        transition: "backgroundColor 0.5s linear",
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
