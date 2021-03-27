import './App.css';
import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Screen from './components/screen';
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
            border:"1px solid black",
            borderRadius:0,
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
          <Screen></Screen>
        </Col>
      </Row>
    </div>
  );
}

export default App;
