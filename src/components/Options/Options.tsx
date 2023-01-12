import React from "react";

import { AppContext, AppContextTypes } from "../../context/AppContextProvider";

import LinkedListOptions from "../DataStructures/LinkedList/LinkedListOptions";
import QueueOptions from "../DataStructures/Queue/QueueOptions";
import s from "./Options.module.scss";

const Options = () => {
  const {activeDS} = React.useContext(AppContext) as AppContextTypes

  return (
    <div className={`${s.container}`}>
        { activeDS === 'Linked List' ? <LinkedListOptions/>: activeDS === 'Queue' ? <QueueOptions/>:'HI'}

    </div>
  );
};

export default Options;
