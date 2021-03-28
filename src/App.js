import './App.css';
import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import GraphScreen from "./components/graph/graphScreen/graphScreen";
import { Col, Row ,Card} from 'react-bootstrap';
import * as providers from "./contexts";
import { useAlgorithmState } from "./contexts";
import ArrayScreen from "./components/array/arrayScreen/arrayScreen";
function App() {
                 // const screenRef = useRef(null)
                 const { algorithmType } = useAlgorithmState();
                 // useEffect(()=>{
                 //   console.log(screenRef)
                 // },[screenRef])
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
                       <Card
                         style={{
                           padding: 0,
                           margin: 0,
                           height: "100%",
                           width: "20%",
                           border: "none",
                           borderRadius: 0,
                           backgroundImage:
                             "linear-gradient(to bottom,#B7FFEC,#D971FF)",
                         }}
                       ></Card>
                       <Col
                         style={{
                           padding: 0,
                           margin: 0,
                           height: "100%",
                         }}
                         // ref={screenRef}
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
