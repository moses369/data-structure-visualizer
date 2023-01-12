import React from "react";
import {
  AppContext,
  AppContextTypes,
} from "../../../context/AppContextProvider";
import { LinkedListContext } from "../../../context/LinkedListContext";
import { LinkedListContextType } from "../../../types/LinkedListTypes";
import { BtnClickEvent } from "../../../types/util";

const LinkedListOptions = () => {
  const list = React.useContext(LinkedListContext) as LinkedListContextType;
  const append = () => list.append(2);
  const prepend = () => list.prepend(2);
  const removeFromHead = () => list.removeHead();
  const removeFromTail = () => list.removeTail();
  const clear = () => list.clear();
  return (
    <>
      <Button onClickFunc={append} text={"++"} />
      <Button onClickFunc={prepend} text={"+"} />
      <Button onClickFunc={removeFromHead} text={"-"} />
      <Button onClickFunc={removeFromTail} text={"--"} />
      <Button onClickFunc={clear} text={"X"} />
    </>
  );
};

interface ButtonProps {
  className?: string;
  onClickFunc: (event?: BtnClickEvent) => void;
  text: string;
}

const Button = ({ className, onClickFunc, text }: ButtonProps) => {
  const { animationInProgress } = React.useContext(
    AppContext
  ) as AppContextTypes;
  return (
    <button
      disabled={animationInProgress}
      onClick={onClickFunc}
      className={className}
    >
      {text}
    </button>
  );
};
export default LinkedListOptions;
