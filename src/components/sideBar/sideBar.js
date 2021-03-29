import { Card, Button, ButtonGroup } from "react-bootstrap";
import * as algorithms from "../../algorithms";
import { useAlgorithmActions } from "../../contexts";
import algorithmNameToHeading from "../../utils/algorithmNameToHeading";

const SideBar = (props) => {
  const algorithmNames = Object.keys(algorithms);
  const { selectAlgorithm } = useAlgorithmActions();
  return (
    <div
      style={{
        margin: 0,
        height: "100%",
        width: "100%",
        border: "none",
        borderRadius: 0,
        display: "flex",
        flexDirection: "column",
        padding: "2px 2px 2px 2px",
        backgroundImage: "linear-gradient(to bottom,#FFFFFF,#B443F1)",
        // backgroundColor: "white",
      }}
    >
      <div
        style={{
          //   borderRadius: 4,
          marginBottom: 2,
          backgroundColor: "#444444",
          textAlign: "left",

          fontSize: 12,
          color: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            borderRadius: "4px 4px 0px 0px",
            marginBottom: 2,
            backgroundColor: "#444444",
            textAlign: "left",

            fontSize: 16,
            color: "white",
            fontWeight: "700",
            padding: "4px 4px 4px 12px",
            borderBottom: "2px solid white",
          }}
        >
          Algorithms
        </div>
        {algorithmNames.map((name) => {
          return (
            <div
              style={{
                // marginLeft: 10,
                padding: "2px 2px 2px 12px",
                borderBottom: "1px solid white",
                // overflowY: "scroll",
              }}
              onClick={() => {
                selectAlgorithm(name);
              }}
            >
              {algorithmNameToHeading(name)}
            </div>
          );
        })}
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
              props.setIsCodeVisible(!props.isCodeVisible);
            }}
          >
            {props.isCodeVisible ? "Hide code" : "Show code"}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default SideBar;
