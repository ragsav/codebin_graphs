import React, { useEffect, useState } from "react";

import { useAlgorithmActions, useArrayActions } from "../index";

const ArrayStatusStateContext = React.createContext(undefined);
const ArrayStatusActionsContext = React.createContext(undefined);

const ArrayStatusProvider = ({ children }) => {
  const { refreshArray } = useArrayActions();
  const { compileAlgorithm } = useAlgorithmActions();

  const [arrayStatus, setArrayStatus] = useState("finished");
  const isPlaying = arrayStatus === "playing";
  const isFinished = arrayStatus === "finished";

  const resumePlaying = () => setArrayStatus("playing");
  const newInstance = () => {
    // refreshArray();
    compileAlgorithm();
  };

  const play = () => {
    if (isFinished) newInstance();
    resumePlaying();
  };
  const pause = () => setArrayStatus("paused");
  const finish = () => setArrayStatus("finished");

  return (
    <ArrayStatusStateContext.Provider
      value={{ arrayStatus, isPlaying, isFinished }}
    >
      <ArrayStatusActionsContext.Provider value={{ play, pause, finish }}>
        {children}
      </ArrayStatusActionsContext.Provider>
    </ArrayStatusStateContext.Provider>
  );
};

const useArrayStatusState = () => {
  const context = React.useContext(ArrayStatusStateContext);
  if (context === undefined) {
    throw new Error(
      "useArrayStatusState must be used within a ArrayStatusProvider"
    );
  }

  return context;
};

const useArrayStatusActions = () => {
  const context = React.useContext(ArrayStatusActionsContext);
  if (context === undefined) {
    throw new Error(
      "useArrayStatusActions must be used within a ArrayStatusProvider"
    );
  }

  return context;
};

export { useArrayStatusState, useArrayStatusActions, ArrayStatusProvider };
