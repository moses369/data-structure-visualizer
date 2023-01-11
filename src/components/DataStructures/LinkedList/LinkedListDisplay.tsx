import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { BsArrowRight } from "react-icons/bs";
import { Node } from "./LinkedList";
import "./LinkedList.css";
const LinkedListDisplay = () => {
  const list = useAppSelector((state) => state.linkedList);

  const displayList = [];
  // Render the Linked List
  let currNode = list.head;
  while (currNode.next) {
    displayList.push(currNode);
    currNode = currNode.next;
  }
  displayList.push(list.tail);

  return (
    <div className="flex_row ll_display">
      {displayList.map((node, i) => {
        console.log(node.isHead);
        console.log(node.isTail);

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
  return (
    <>
      <div className="ll_node lg_font center_text">
        {node.data}
        {!node.isTail && <BsArrowRight className="ll_pointer" />}
        
      </div>
    </>
  );
};
