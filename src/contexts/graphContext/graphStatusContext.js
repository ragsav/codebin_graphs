import React, { useEffect, useState } from "react";

import { useAlgorithmActions, useAdjListActions } from "../index";

// type GraphStatus = 'paused' | 'playing' | 'finished';

// type State = {
//   graphStatus: GraphStatus;
//   isPlaying: boolean;
//   isFinished: boolean;
// };

// type Actions = {
//   play: () => void;
//   pause: () => void;
//   finish: () => void;
// };

const GraphStatusStateContext = React.createContext(undefined);
const GraphStatusActionsContext = React.createContext(undefined);

const GraphStatusProvider = ({ children }) => {
  const { refreshAdjList } = useAdjListActions();
  const { compileAlgorithm } = useAlgorithmActions();

  const [graphStatus, setGraphStatus] = useState("finished");
  const isPlaying = graphStatus === "playing";
  const isFinished = graphStatus === "finished";

  const resumePlaying = () => setGraphStatus("playing");
  const newInstance = () => {
    // refreshAdjList();
    compileAlgorithm();
  };

  const play = () => {
    if (isFinished) newInstance();
    resumePlaying();
  };
  const pause = () => setGraphStatus("paused");
  const finish = () => setGraphStatus("finished");

  return (
    <GraphStatusStateContext.Provider
      value={{ graphStatus, isPlaying, isFinished }}
    >
      <GraphStatusActionsContext.Provider value={{ play, pause, finish }}>
        {children}
      </GraphStatusActionsContext.Provider>
    </GraphStatusStateContext.Provider>
  );
};

const useGraphStatusState = () => {
  const context = React.useContext(GraphStatusStateContext);
  if (context === undefined) {
    throw new Error(
      "useGraphStatusState must be used within a GraphStatusProvider"
    );
  }

  return context;
};

const useGraphStatusActions = () => {
  const context = React.useContext(GraphStatusActionsContext);
  if (context === undefined) {
    throw new Error(
      "useGraphStatusActions must be used within a GraphStatusProvider"
    );
  }

  return context;
};

export { useGraphStatusState, useGraphStatusActions, GraphStatusProvider };
