import React, { useEffect, useState } from "react";

import { useAlgorithmActions, useAdjListActions } from "./index";

// type Status = 'paused' | 'playing' | 'finished';

// type State = {
//   status: Status;
//   isPlaying: boolean;
//   isFinished: boolean;
// };

// type Actions = {
//   play: () => void;
//   pause: () => void;
//   finish: () => void;
// };

const StatusStateContext = React.createContext(undefined);
const StatusActionsContext = React.createContext(undefined);

const StatusProvider = ({ children }) => {
  const { refreshAdjList } = useAdjListActions();
  const { compileAlgorithm } = useAlgorithmActions();

  const [status, setStatus] = useState("finished");
  const isPlaying = status === "playing";
  const isFinished = status === "finished";

  const resumePlaying = () => setStatus("playing");
  const newInstance = () => {
    // refreshAdjList();
    compileAlgorithm();
  };

  const play = () => {
    if (isFinished) newInstance();
    resumePlaying();
  };
  const pause = () => setStatus("paused");
  const finish = () => setStatus("finished");

  return (
    <StatusStateContext.Provider value={{ status, isPlaying, isFinished }}>
      <StatusActionsContext.Provider value={{ play, pause, finish }}>
        {children}
      </StatusActionsContext.Provider>
    </StatusStateContext.Provider>
  );
};

const useStatusState = () => {
  const context = React.useContext(StatusStateContext);
  if (context === undefined) {
    throw new Error("useStatusState must be used within a StatusProvider");
  }

  return context;
};

const useStatusActions = () => {
  const context = React.useContext(StatusActionsContext);
  if (context === undefined) {
    throw new Error("useStatusActions must be used within a StatusProvider");
  }

  return context;
};

export { useStatusState, useStatusActions, StatusProvider };
