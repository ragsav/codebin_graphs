import './App.css';
import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import GraphScreen from "./components/graph/graphScreen/graphScreen";
import { Col, Row ,Card} from 'react-bootstrap';
import ContextProvider from "./ContextProvider";
function App() {
  const screenRef = useRef(null)
  useEffect(()=>{
    console.log(screenRef)
  },[screenRef])
  return (
    <ContextProvider>
      <div className="App">
        <Row style={{ padding: 0, margin: 0, width: "100%", height: "100%" }}>
          <Card
            style={{
              padding: 0,
              margin: 0,
              height: "100%",
              width: "20%",
              border: "none",
              borderRadius: 0,
              backgroundImage: "linear-gradient(to bottom,#B7FFEC,#D971FF)",
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
    </ContextProvider>
  );
}

export default App;
