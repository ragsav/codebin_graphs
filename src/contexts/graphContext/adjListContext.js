import React, { useEffect, useState } from "react";

import { generateRandomGraph } from "../../utils";

// type State = {
//   adjList: number[];
//   adjListLength: number;
//   customAdjListString: string;
//   validCustomAdjListString: boolean;
// };

// type Actions = {
//   refreshAdjList: () => void;
//   setAdjListLength: (arg0: number) => void;
//   replaceAdjList: () => void;
//   setCustomAdjListString: (args0: string) => void;
// };

const AdjListStateContext = React.createContext(undefined);
const AdjListActionsContext = React.createContext(undefined);

const INITIAL_LENGTH = 10;
const INITIAL_ADJLIST = generateRandomGraph(INITIAL_LENGTH);

const AdjListProvider = ({ children }) => {
  // The length is used for generating new adjLists
  const [adjListLength, setAdjListLength] = useState(INITIAL_LENGTH);
  const [adjList, setAdjList] = useState(INITIAL_ADJLIST);

  // const [customAdjListString, setCustomAdjListString] = useState('');
  // const validCustomAdjListString = !!customAdjListString.match(
  //   /^(\d+\s*,\s*)+\d+\s*$/
  // );

  const generateAdjList = (n) => setAdjList(generateRandomGraph(n));

  useEffect(() => {
    generateAdjList(adjListLength);
    console.log(adjList);
  }, [adjListLength]);

  const refreshAdjList = () => generateAdjList(adjListLength);

  // const replaceAdjList = () => {
  //   // Replaces the adjList with a custom one
  //   const arr = customAdjListString.split(',').map((el) => parseInt(el));
  //   setAdjList(arr);
  //   setAdjListLength(arr.length);
  // };

  return (
    <AdjListStateContext.Provider
      // value={{ adjList, adjListLength, customAdjListString, validCustomAdjListString }}
      value={{
        adjList,
        adjListLength,
      }}
    >
      <AdjListActionsContext.Provider
        // value={{
        //   setAdjListLength,
        //   refreshAdjList,
        //   replaceAdjList,
        //   setCustomAdjListString,
        // }}
        value={{
          setAdjListLength,
          refreshAdjList,
        }}
      >
        {children}
      </AdjListActionsContext.Provider>
    </AdjListStateContext.Provider>
  );
};

const useAdjListState = () => {
  const context = React.useContext(AdjListStateContext);
  if (context === undefined) {
    throw new Error("useAdjListState must be used within a AdjListProvider");
  }

  return context;
};

const useAdjListActions = () => {
  const context = React.useContext(AdjListActionsContext);
  if (context === undefined) {
    throw new Error("useAdjListActions must be used within a AdjListProvider");
  }

  return context;
};

export { useAdjListState, useAdjListActions, AdjListProvider };
