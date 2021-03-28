import React from "react";

import * as providers from "./contexts";

const ContextProvider = ({ children }) => {
  return (
    <providers.AlgorithmProvider>
      <providers.AdjListProvider>
        <providers.StatusProvider>
          <providers.GraphProcessProvider>
            
            
            
            
            {children}
          
          
          
          
          </providers.GraphProcessProvider>
        </providers.StatusProvider>
      </providers.AdjListProvider>
    </providers.AlgorithmProvider>
  );
};

export default ContextProvider;
