import React from "react";
import { selectDS } from "../../AppSlice";
import { AppContext, AppContextTypes } from "../../context/AppContextProvider";
import { DSTypes } from "../../types/util";

import s from "./Nav.module.scss";
const Nav = () => {
  return (
    <nav>
      <DSLink text="Linked List" />
      <DSLink text="Queue" />
    </nav>
  );
};

// Component for each DS link
interface DSLinkProps {
  text: DSTypes;
}
const DSLink = ({ text }: DSLinkProps) => {
  const { activeDS, selectDS, animationInProgress } = React.useContext(
    AppContext
  ) as AppContextTypes;
  return (
    <button
      disabled={animationInProgress}
      className={`${s.link}`}
      onClick={() => {
        activeDS !== text && selectDS(text);
      }}
    >
      {text}
    </button>
  );
};
export default Nav;
