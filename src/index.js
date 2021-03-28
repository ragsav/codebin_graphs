import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AlgorithmProvider } from "./contexts";
ReactDOM.render(
  <React.StrictMode>
    <AlgorithmProvider>
      <App />
    </AlgorithmProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
