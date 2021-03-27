import './App.css';
import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GraphScreen from "./components/graph/graphScreen/graphScreen";
import { Col, Row ,Card} from 'react-bootstrap';
function App() {
  const screenRef = useRef(null)
  useEffect(()=>{
    console.log(screenRef)
  },[screenRef])
  return (
    <div className="App">
      <Row style={{ padding: 0, margin: 0, width: "100%", height: "100%" }}>
        <Card
          style={{
            padding: 0,
            margin: 0,
            height: "100%",
            width: "20%",
            border: "none",
            borderRadius:   0,
          }}
        ></Card>
        <Col
          style={{
            padding: 0,
            margin: 0,
            height: "100%",
          }}
          ref={screenRef}
        >
          <GraphScreen></GraphScreen>
        </Col>
      </Row>
    </div>
  );
}

export default App;
