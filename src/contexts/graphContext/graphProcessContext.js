import React, { useState, useEffect } from "react";

import { useInterval } from "../../hooks";
import {
  useAdjListState,
  useAlgorithmState,
  useGraphStatusState,
  useGraphStatusActions,
} from "../index";

const GraphProcessStateContext = React.createContext(undefined);
const GraphProcessActionsContext = React.createContext(undefined);

const INITIAL_FREQUENCY = 3;

const GraphProcessProvider = ({ children }) => {
  const { adjList } = useAdjListState();
  const { algorithm } = useAlgorithmState();

  const [graphProcessSteps, setGraphProcessSteps] = useState();
  const [graphState, setGraphState] = useState({});

  useEffect(() => {
    setGraphProcessSteps(algorithm ? algorithm(adjList) : undefined);
    setGraphState({});
  }, [adjList, algorithm]);

  const [frequency, setFrequency] = useState(INITIAL_FREQUENCY);
  const changeFrequency = (frequency) => setFrequency(frequency);

  const { isPlaying } = useGraphStatusState();
  const { finish } = useGraphStatusActions();

  let interval = 2000 / frequency;
  if (!isPlaying) interval = null;

  useInterval(() => {
    if (!graphProcessSteps) return;

    const next = graphProcessSteps.next();
    if (next.done) return finish();
    const state = next.value;

    setGraphState(state);
  }, interval);

  return (
    <GraphProcessStateContext.Provider
      value={{ adjList, graphState, frequency }}
    >
      <GraphProcessActionsContext.Provider value={{ changeFrequency }}>
        {children}
      </GraphProcessActionsContext.Provider>
    </GraphProcessStateContext.Provider>
  );
};

const useGraphProcessState = () => {
  const context = React.useContext(GraphProcessStateContext);
  if (context === undefined) {
    throw new Error("useProcessState must be used within a ProcessProvider");
  }

  return context;
};

const useGraphProcessActions = () => {
  const context = React.useContext(GraphProcessActionsContext);
  if (context === undefined) {
    throw new Error("useProcessActions must be used within a ProcessProvider");
  }

  return context;
};

export { useGraphProcessState, useGraphProcessActions, GraphProcessProvider };
