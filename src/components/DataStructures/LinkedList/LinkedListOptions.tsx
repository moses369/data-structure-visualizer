import React from "react";
import { AppContext, AppContextTypes } from "../../../context/AppContextProvider";
import { LinkedListContext } from "../../../context/LinkedListContext";
import { LinkedListContextType } from "../../../types/LinkedListTypes";
const LinkedListOptions = () => {
  const list = React.useContext(LinkedListContext) as LinkedListContextType;
const {animationInProgress} = React.useContext(AppContext) as AppContextTypes
  return (
    <>
    <button
    disabled={animationInProgress}
      onClick={() => {
        list.append(2);
      }}
    >
      +
    </button>
    <button
    disabled={animationInProgress}
      onClick={() => {
        list.prepend(3);
      }}
    >
      +++
    </button>
    </>
  );
};

export default LinkedListOptions;
