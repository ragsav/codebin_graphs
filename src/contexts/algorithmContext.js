import React, { useEffect, useState } from "react";

import * as algorithms from "../algorithms";
// import { SortingFunction } from "types";

// type AlgorithmName = keyof typeof algorithms;

// type State = {
//   algorithmString: string;
//   algorithm?: SortingFunction;
//   algorithmNames: AlgorithmName[];
//   selectedAlgorithm?: AlgorithmName;
// };

// type Actions = {
//   setAlgorithmString: (arg0: string) => void;
//   compileAlgorithm: () => void;
//   selectAlgorithm: (arg0: AlgorithmName) => void;
// };

const AlgorithmStateContext = React.createContext(undefined);
const AlgorithmActionsContext = React.createContext(undefined);

const algorithmNames = Object.keys(algorithms);

const AlgorithmProvider = ({ children }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("dfs");
  const [algorithmString, setAlgorithmString] = useState(algorithms.dfs);
  const [algorithm, setAlgorithm] = useState();

  const selectAlgorithm = (name) => {
    setSelectedAlgorithm(name);
    setAlgorithmString(algorithms[name]);
  };

  const compileAlgorithm = () => {
    let sortingAlgorithm;
    const e = eval(algorithmString);
    setAlgorithm(() => {
      return sortingAlgorithm;
    });
  };

  useEffect(() => {
    compileAlgorithm();
  }, [selectedAlgorithm]);

  return (
    <AlgorithmStateContext.Provider
      value={{ algorithm, algorithmString, algorithmNames, selectedAlgorithm }}
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
