const Bar = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        bottom: 0,
        margin: "2px 4px 2px 4px",
      }}
    >
      <div
        style={{ height: 20, width: props.width, backgroundColor: "white" }}
      ></div>
      <div
        style={{
          height: props.height,
          width: props.width,
          backgroundColor: props.color,
        }}
      ></div>
    </div>
  );
};

export default Bar;
