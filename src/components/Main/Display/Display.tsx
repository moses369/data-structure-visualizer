import React from "react";

import { useAppSelector } from "../../../redux/hooks";
import LinkedListDisplay from "../../DataStructures/LinkedList/LinkedListDisplay";
import QueueDisplay from "../../DataStructures/Queue/Queue";

import "./Display.css";
const Display = () => {

  const activeDS = useAppSelector(state => state.app.activeDS)

  return (

    <div className="display_container">{
      activeDS === 'Linked List' ? <LinkedListDisplay/>: activeDS === 'Queue' ? <QueueDisplay/>:'HI'
    }</div>
  );
};

export default Display;
