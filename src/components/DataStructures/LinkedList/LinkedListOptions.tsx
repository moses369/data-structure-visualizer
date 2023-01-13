import React, { useState } from "react";

import { LinkedListContext } from "../../../context/LinkedListContext";
import { LinkedListContextType } from "../../../types/LinkedListTypes";
import OptionButton from "../../OptionButton";
import OptionForm from "../../OptionForm";
import OptionInput from "../../OptionInput";

type StateKeys = "nodeToRemove" | "append" | "prepend";

const LinkedListOptions = () => {
  const list = React.useContext(LinkedListContext) as LinkedListContextType;
  const { display, maxLength } = React.useContext(
    LinkedListContext
  ) as LinkedListContextType;
  const [state, setState] = useState<{ [param: string]: "" | number }>({
    nodeToRemove: "",
    append: "",
    prepend: "",
  });

  const maxNodesReached = display.length === maxLength;
  const noNodesLeft = display.length === 0;

  const resetInput = (input: StateKeys) => {
    setState((old) => ({ ...old, [input]: "" }));
  };
  const checkIfEmpty = (input: StateKeys) => state[input] === "";

  const addNode = (appendNode: boolean) =>
    list[appendNode ? "append" : "prepend"](
      state[appendNode ? "append" : "prepend"] as number
    );
  const removeHead = () => list.removeHead();
  const removeTail = () => list.removeTail();

  const removeMiddle = () => list.removeMidNode(state.nodeToRemove as number);
  const clear = () => list.clear();

  const onChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((old) => ({ ...old, [e.target.name]: parseInt(e.target.value) }));
  };

  return (
    <>
      <OptionForm
        onSubmit={() => {
          if (checkIfEmpty("append")) return;
          addNode(true);
          resetInput("append");
        }}
        Button={<OptionButton text={"Append"} disabled={maxNodesReached} />}
        Input={
          <OptionInput
            labelText=""
            name="append"
            type={"number"}
            value={state.append}
            onChange={onChangehandler}
            disabled={maxNodesReached}
          />
        }
        disabled={maxNodesReached}
      />
      <OptionButton
        onClick={removeTail}
        text={"Remove Tail"}
        disabled={noNodesLeft}
      />
      <OptionForm
        onSubmit={() => {
          if (checkIfEmpty("prepend")) return;
          addNode(false);
          resetInput("prepend");
        }}
        Button={<OptionButton text={"Prepend"} disabled={maxNodesReached} />}
        Input={
          <OptionInput
            labelText=""
            name="prepend"
            type={"number"}
            value={state.prepend}
            onChange={onChangehandler}
            disabled={maxNodesReached}
          />
        }
        disabled={maxNodesReached}
      />

      <OptionButton
        onClick={removeHead}
        text={"Remove Head"}
        disabled={noNodesLeft}
      />

      <OptionForm
        onSubmit={(e) => {
          if (checkIfEmpty("nodeToRemove")) return;
          removeMiddle();
          resetInput("nodeToRemove");
        }}
        Button={<OptionButton text={"Remove Node"} disabled={noNodesLeft} />}
        Input={
          <OptionInput
            labelText=""
            name="nodeToRemove"
            type="number"
            value={state.nodeToRemove}
            onChange={onChangehandler}
            disabled={noNodesLeft}
          />
        }
        disabled={noNodesLeft}
      />
      <OptionButton onClick={clear} text={"Clear"} disabled={noNodesLeft} />
    </>
  );
};

export default LinkedListOptions;
