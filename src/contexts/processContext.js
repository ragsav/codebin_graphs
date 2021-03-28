import React, { useState, useEffect } from "react";

import { useInterval } from "../hooks";
import {
  useAdjListState,
  useAlgorithmState,
  useStatusState,
  useStatusActions,
} from "./index";

const ProcessStateContext = React.createContext(undefined);
const ProcessActionsContext = React.createContext(undefined);

const INITIAL_FREQUENCY = 3;

const ProcessProvider = ({ children }) => {
  const { adjList } = useAdjListState();
  const { algorithm } = useAlgorithmState();

  const [processSteps, setProcessSteps] = useState();
  const [graphState, setGraphState] = useState({});

  useEffect(() => {
    setProcessSteps(algorithm ? algorithm(adjList) : undefined);
    setGraphState({});
  }, [adjList, algorithm]);

  const [frequency, setFrequency] = useState(INITIAL_FREQUENCY);
  const changeFrequency = (frequency) => setFrequency(frequency);

  const { isPlaying } = useStatusState();
  const { finish } = useStatusActions();

  let interval = 2000 / frequency;
  if (!isPlaying) interval = null;

  useInterval(() => {
    if (!processSteps) return;

    const next = processSteps.next();
    if (next.done) return finish();
    const state = next.value;

    setGraphState(state);
  }, interval);

  return (
    <ProcessStateContext.Provider value={{ adjList, graphState, frequency }}>
      <ProcessActionsContext.Provider value={{ changeFrequency }}>
        {children}
      </ProcessActionsContext.Provider>
    </ProcessStateContext.Provider>
  );
};

const useProcessState = () => {
  const context = React.useContext(ProcessStateContext);
  if (context === undefined) {
    throw new Error("useProcessState must be used within a ProcessProvider");
  }

  return context;
};

const useProcessActions = () => {
  const context = React.useContext(ProcessActionsContext);
  if (context === undefined) {
    throw new Error("useProcessActions must be used within a ProcessProvider");
  }

  return context;
};

export { useProcessState, useProcessActions, ProcessProvider };
