import React from "react";

import { useAppSelector } from "../../../redux/hooks";
import LinkedListOptions from "../../DataStructures/LinkedList/LinkedListOptions";
import QueueOptions from "../../DataStructures/Queue/QueueOptions";
import "./Options.css";

const Options = () => {
const activeDS = useAppSelector(state => state.app.activeDS)
  return (
    <div className="options_container">
        { activeDS === 'Linked List' ? <LinkedListOptions/>: activeDS === 'Queue' ? <QueueOptions/>:'HI'}

    </div>
  );
};

export default Options;
