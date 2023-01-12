import React, { useState } from "react";
import { DSTypes, ReactChildren } from "../types/util";

interface AppContextState {
  activeDS: DSTypes;
  animationInProgress: boolean;
}
export interface AppContextTypes extends AppContextState {
  toggleAnimation: () => void;
  selectDS: (ds: DSTypes) => void;
}

export const AppContext = React.createContext<AppContextTypes | null>(null);

const initialState: AppContextState = {
  activeDS: "Linked List",
  animationInProgress: false,
};
const AppContextProvider = ({ children }: ReactChildren) => {
  const [state, setState] = useState<AppContextState>(initialState);
  
  const selectDS = (ds: DSTypes) => {
    setState((old) => {
      return { ...old, activeDS: ds };
    });
  };

  const toggleAnimation = () => {
    setState((old) => ({
      ...old,
      animationInProgress: !old.animationInProgress,
    }));
  };

  const value = {
    activeDS: state.activeDS,
    animationInProgress: state.animationInProgress,
    selectDS,
    toggleAnimation,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
