import React, { RefObject, useEffect, useState } from "react";
import { BsArrowRight, BsArrowUp } from "react-icons/bs";
import { LinkedListContextType, Node } from "../../../types/LinkedListTypes";
import s from "./LinkedList.module.scss";
import { LinkedListContext } from "../../../context/LinkedListContext";
import { log } from "console";

const LinkedListDisplay = () => {
  const list = React.useContext(LinkedListContext) as LinkedListContextType;


  return (
    <div className={`${s.ll_container}`}>
      {list.display.map((node, i) => {
        return <DisplayNode key={i} node={node} />;
      })}
    </div>
  );
};

export default LinkedListDisplay;

interface NodeProps {
  node: Node;
}
const DisplayNode = ({ node }: NodeProps) => {
  const overlap = node.isHead && node.isTail;

  return (
    <>
      <div className={`${s.node} ${overlap && s.overlap} ${node.new && `new_el`} ${node.selected && 'selected_el'}`}>
        <span>{node.data}</span>
        {node.next && <BsArrowRight className={`${s.next_pointer} ${node.next.new && 'new_el'}`} />}
        {node.isHead && <Identifier pointer="head" />}
        {node.isTail && <Identifier pointer="tail" />}
      </div>
    </>
  );
};

interface IdentifierProps {
  pointer: "head" | "tail";
}
const Identifier = ({ pointer }: IdentifierProps) => {
  return (
    <div className={`${s.identifier} ${s[pointer]}`}>
      <BsArrowUp className={`${s.up_pointer}`} />
      <span>{pointer}</span>
    </div>
  );
};
