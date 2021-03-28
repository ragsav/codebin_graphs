import React, { useEffect, useState } from "react";

import * as algorithms from "../algorithms";

const algorithmTypeMap = { dfs: "graph", bubble_sort: "array" };

const AlgorithmStateContext = React.createContext(undefined);
const AlgorithmActionsContext = React.createContext(undefined);
const algorithmNames = Object.keys(algorithms);

const AlgorithmProvider = ({ children }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble_sort");
  const [algorithmString, setAlgorithmString] = useState(
    algorithms.bubble_sort
  );
  const [algorithm, setAlgorithm] = useState();
  const [algorithmType, setAlgorithmType] = useState("array");

  const selectAlgorithm = (name) => {
    setSelectedAlgorithm(name);
    setAlgorithmString(algorithms[name]);
    setAlgorithmType(algorithmTypeMap[name]);
  };

  const compileAlgorithm = () => {
    let algorithm;
    console.log(algorithmString);
    const e = eval(algorithmString);
    setAlgorithm(() => {
      return algorithm;
    });
  };

  useEffect(() => {
    compileAlgorithm();
  }, [selectedAlgorithm]);

  return (
    <AlgorithmStateContext.Provider
      value={{
        algorithm,
        algorithmString,
        algorithmNames,
        selectedAlgorithm,
        algorithmType,
      }}
    >
      <AlgorithmActionsContext.Provider
        value={{ setAlgorithmString, compileAlgorithm, selectAlgorithm }}
      >
        {children}
      </AlgorithmActionsContext.Provider>
    </AlgorithmStateContext.Provider>
  );
};

const useAlgorithmState = () => {
  const context = React.useContext(AlgorithmStateContext);
  if (context === undefined) {
    throw new Error(
      "useAlgorithmState must be used within a AlgorithmProvider"
    );
  }

  return context;
};

const useAlgorithmActions = () => {
  const context = React.useContext(AlgorithmActionsContext);
  if (context === undefined) {
    throw new Error(
      "useAlgorithmActions must be used within a AlgorithmProvider"
    );
  }

  return context;
};

export { useAlgorithmState, useAlgorithmActions, AlgorithmProvider };
