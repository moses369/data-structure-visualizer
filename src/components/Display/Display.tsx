import React from "react";
import { AppContext, AppContextTypes } from "../../context/AppContextProvider";

import LinkedListDisplay from "../DataStructures/LinkedList/LinkedListDisplay";
import QueueDisplay from "../DataStructures/Queue/Queue";

import s from "./Display.module.scss";
const Display = () => {

  const {activeDS} = React.useContext(AppContext) as AppContextTypes

  return (

    <div className={`${s.container}`}>{
      activeDS === 'Linked List' ? <LinkedListDisplay/>: activeDS === 'Queue' ? <QueueDisplay/>:'HI'
    }</div>
  );
};

export default Display;
