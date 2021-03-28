import React, { useState, useEffect } from "react";

import { useInterval } from "../../hooks";
import {
  useArrayState,
  useAlgorithmState,
  useArrayStatusState,
  useArrayStatusActions,
} from "../index";

const ArrayProcessStateContext = React.createContext(undefined);
const ArrayProcessActionsContext = React.createContext(undefined);

const INITIAL_FREQUENCY = 3;

const ArrayProcessProvider = ({ children }) => {
  const { array } = useArrayState();
  const { algorithm } = useAlgorithmState();

  const [arrayProcessSteps, setArrayProcessSteps] = useState();
  const [arrayState, setArrayState] = useState({});

  useEffect(() => {
    setArrayProcessSteps(algorithm ? algorithm([...array]) : undefined);
    setArrayState({});
  }, [array, algorithm]);

  const [frequency, setFrequency] = useState(INITIAL_FREQUENCY);
  const changeFrequency = (frequency) => setFrequency(frequency);

  const { isPlaying } = useArrayStatusState();
  const { finish } = useArrayStatusActions();

  let interval = 2000 / frequency;
  if (!isPlaying) interval = null;

  useInterval(() => {
    if (!arrayProcessSteps) return;

    const next = arrayProcessSteps.next();
    if (next.done) return finish();
    const state = next.value;

    setArrayState(state);
  }, interval);

  return (
    <ArrayProcessStateContext.Provider value={{ array, arrayState, frequency }}>
      <ArrayProcessActionsContext.Provider value={{ changeFrequency }}>
        {children}
      </ArrayProcessActionsContext.Provider>
    </ArrayProcessStateContext.Provider>
  );
};

const useArrayProcessState = () => {
  const context = React.useContext(ArrayProcessStateContext);
  if (context === undefined) {
    throw new Error("useProcessState must be used within a ProcessProvider");
  }

  return context;
};

const useArrayProcessActions = () => {
  const context = React.useContext(ArrayProcessActionsContext);
  if (context === undefined) {
    throw new Error("useProcessActions must be used within a ProcessProvider");
  }

  return context;
};

export { useArrayProcessState, useArrayProcessActions, ArrayProcessProvider };
