import React, { useState } from "react";
import {
  AppContext,
  AppContextTypes,
} from "../../../context/AppContextProvider";
import { LinkedListContext } from "../../../context/LinkedListContext";
import { LinkedListContextType } from "../../../types/LinkedListTypes";
import OptionButton from "../../OptionButton";
import OptionForm from "../../OptionForm";
import OptionInput from "../../OptionInput";

const LinkedListOptions = () => {
  const list = React.useContext(LinkedListContext) as LinkedListContextType;
  const { animationInProgress } = React.useContext(
    AppContext
  ) as AppContextTypes;
  const [findNode, setFindNode] = useState<number | "">("");
  const append = () => list.append(2);
  const prepend = () => list.prepend(2);
  const removeFromHead = () => list.removeHead();
  const removeFromTail = () => list.removeTail();
  const clear = () => list.clear();
  const removeMiddle = () => list.removeMidNode(findNode as number);
  const setNodeToFind = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFindNode(parseInt(e.target.value));
  };
  return (
    <>
      <OptionButton onClick={append} text={"++"} />
      <OptionButton onClick={prepend} text={"+"} />
      <OptionButton onClick={removeFromHead} text={"-"} />
      <OptionButton onClick={removeFromTail} text={"--"} />
      <OptionButton onClick={clear} text={"X"} />
      <OptionForm
        onSubmit={(e) => {
          removeMiddle();
          setFindNode("");
        }}
        Button={<OptionButton text={"num"} />}
        Input={
          <OptionInput
            name="remove_node"
            type="number"
            value={findNode}
            onChange={setNodeToFind}
          />
        }
      />
    </>
  );
};

export default LinkedListOptions;
