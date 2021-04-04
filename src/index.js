import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import reportWebVitals from './reportWebVitals';
import { AlgorithmProvider } from "./contexts";
import PermanentDrawerLeft from "./App";
ReactDOM.render(
  <React.StrictMode>
    <AlgorithmProvider>
      <PermanentDrawerLeft></PermanentDrawerLeft>
    </AlgorithmProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
