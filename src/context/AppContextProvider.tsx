import React, { useState } from "react";
import { DSTypes, ReactChildren } from "../types/util";

interface AppContextState {
  activeDS: DSTypes;
  animationInProgress: boolean;
}
export interface AppContextTypes extends AppContextState {
  startAnimation: () => void;
  endAnimation: () => void;
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

  const startAnimation = () => {
    setState((old) => ({
      ...old,
      animationInProgress: true,
    }));
  };
  const endAnimation = () => {
    setState((old) => ({
      ...old,
      animationInProgress: false,
    }));
  };

  const value = {
    activeDS: state.activeDS,
    animationInProgress: state.animationInProgress,
    selectDS,
    startAnimation,
    endAnimation
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
