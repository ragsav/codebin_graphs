import React, { useEffect, useState } from "react";

import { generateRandomArray } from "../../utils";

const ArrayStateContext = React.createContext(undefined);
const ArrayActionsContext = React.createContext(undefined);

const INITIAL_LENGTH = 50;
const INITIAL_ARRAY = generateRandomArray(INITIAL_LENGTH);

const ArrayProvider = ({ children }) => {
  // The length is used for generating new arrays
  const [arrayLength, setArrayLength] = useState(INITIAL_LENGTH);
  const [array, setArray] = useState(INITIAL_ARRAY);

  const generateArray = (n) => {
    setArray(generateRandomArray(n));
  };

  useEffect(() => {
    generateArray(arrayLength);
  }, [arrayLength]);

  const refreshArray = () => generateArray(arrayLength);

  return (
    <ArrayStateContext.Provider
      // value={{ array, arrayLength, customArrayString, validCustomArrayString }}
      value={{
        array,
        arrayLength,
      }}
    >
      <ArrayActionsContext.Provider
        // value={{
        //   setArrayLength,
        //   refreshArray,
        //   replaceArray,
        //   setCustomArrayString,
        // }}
        value={{
          setArrayLength,
          refreshArray,
        }}
      >
        {children}
      </ArrayActionsContext.Provider>
    </ArrayStateContext.Provider>
  );
};

const useArrayState = () => {
  const context = React.useContext(ArrayStateContext);
  if (context === undefined) {
    throw new Error("useArrayState must be used within a ArrayProvider");
  }

  return context;
};

const useArrayActions = () => {
  const context = React.useContext(ArrayActionsContext);
  if (context === undefined) {
    throw new Error("useArrayActions must be used within a ArrayProvider");
  }

  return context;
};

export { useArrayState, useArrayActions, ArrayProvider };
