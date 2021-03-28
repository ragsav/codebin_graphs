import React from "react";

import * as providers from "./contexts";

const ContextProvider = ({ children }) => {
  return (
    <providers.AdjListProvider>
      <providers.AlgorithmProvider>
        <providers.StatusProvider>
          <providers.ProcessProvider>{children}</providers.ProcessProvider>
        </providers.StatusProvider>
      </providers.AlgorithmProvider>
    </providers.AdjListProvider>
  );
};

export default ContextProvider;
