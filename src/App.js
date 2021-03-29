import './App.css';
import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import GraphScreen from "./components/graph/graphScreen/graphScreen";
import { Col, Row ,Card} from 'react-bootstrap';
import * as providers from "./contexts";
import { useAlgorithmState } from "./contexts";
import * as algorithms from "./algorithms";
import ArrayScreen from "./components/array/arrayScreen/arrayScreen";
import SideBar from "./components/sideBar/sideBar";
function App() {
  const { algorithmType } = useAlgorithmState();
  return (
    <div className="App">
      <Row
        style={{
          padding: 0,
          margin: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Col
          className="d-none d-sm-block"
          sm={{ span: 3 }}
          md={{ span: 3 }}
          lg={{ span: 3 }}
          xl={{ span: 2 }}
          style={{
            padding: 0,
            margin: 0,
            height: "100%",
          }}
        >
          <SideBar></SideBar>
        </Col>
        {/* <SideBar></SideBar> */}
        <Col
          zs={{ span: 12 }}
          sm={{ span: 9 }}
          md={{ span: 9 }}
          lg={{ span: 9 }}
          xl={{ span: 10 }}
          style={{
            padding: 0,
            margin: 0,
            height: "100%",
          }}
        >
          {algorithmType === "graph" ? (
            <providers.AdjListProvider>
              <providers.GraphStatusProvider>
                <providers.GraphProcessProvider>
                  <GraphScreen></GraphScreen>
                </providers.GraphProcessProvider>
              </providers.GraphStatusProvider>
            </providers.AdjListProvider>
          ) : (
            <providers.ArrayProvider>
              <providers.ArrayStatusProvider>
                <providers.ArrayProcessProvider>
                  <ArrayScreen></ArrayScreen>
                </providers.ArrayProcessProvider>
              </providers.ArrayStatusProvider>
            </providers.ArrayProvider>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default App;
