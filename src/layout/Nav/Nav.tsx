import React from "react";
import { selectDS } from "../../AppSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import "./Nav.css";
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
  text: string;
}
const DSLink = ({ text }: DSLinkProps) => {
  const dispatch = useAppDispatch();
  const activeDS = useAppSelector((state) => state.app.activeDS);
  return (
    <button
      className="ds_link sm_font"
      onClick={() => {
        activeDS !== text && dispatch(selectDS(text));
      }}
    >
      {text}
    </button>
  );
};
export default Nav;
