import React, { useState, useEffect } from "react";
import { ReactChildren } from "../types/util";
import {
  LinkedListContextType,
  Node,
  GetHeadOrTailType,
  UpdateNodeDisplay,
} from "../types/LinkedListTypes";
import { AppContext, AppContextTypes } from "./AppContextProvider";

export const LinkedListContext = React.createContext<
  LinkedListContextType | undefined
>(undefined);

const getHeadOrTail: GetHeadOrTailType = (updatingTail, arr, updateOpposite) =>
  updateOpposite
    ? updatingTail
      ? 0
      : arr.length - 1
    : updatingTail
    ? arr.length - 1
    : 0;
const getPreHeadOrTail: GetHeadOrTailType = (
  updatingTail,
  arr,
  updateOpposite
) =>
  updateOpposite
    ? updatingTail
      ? 1
      : arr.length - 2
    : updatingTail
    ? arr.length - 2
    : 1;

const node = (num: number) => new Node(num);

const LinkedListContextProvider = ({ children }: ReactChildren) => {
  const [displayList, setDisplay] = useState<Node[]>(
    [node(3), node(4), node(5)].map((node, i, arr) => {
      if (i === 0) node.isHead = true;
      if (arr[i + 1]) node.next = arr[i + 1];
      if (i === arr.length - 1) node.isTail = true;
      return node;
    })
  );
  const { toggleAnimation } = React.useContext(AppContext) as AppContextTypes;

  /************* Utility Functions **************/
  const stepDelay = 500;
  const step = (stateChange: UpdateNodeDisplay, delay: number) => {
    setTimeout(() => {
      setDisplay(stateChange);
    }, delay);
    return (delay += stepDelay);
  };
  const clearColorIndicators = () => {
    setDisplay((old) =>
      old.map((node) => {
        node.new = node.selected = node.removed = false;
        return node;
      })
    );
  };
  /************* End Utility Functions **************/

  /************* Adding Nodes **************/
  const addNode = (addToTail: boolean, num: number) => {
    if (displayList.length === 7) return;
    toggleAnimation(); //says an animation is in progress
    clearColorIndicators();
    let timeout = 0;
    //If there is no head/tail
    if (displayList.length === 0) {
      const newNode = node(num);
      newNode.isHead = newNode.isTail = newNode.new = true;
      setDisplay([newNode]);
      toggleAnimation();
      return;
    }

    //Get Tail/Head
    timeout = step((old) => {
      const newList = [...old];

      const HorT = getHeadOrTail(addToTail, newList);
      // reset new/selector indicators on prepends
      if (newList[HorT]) newList[HorT].selected = true;
      return newList;
    }, timeout);

    //Add New Node
    timeout = step((old) => {
      const newList = [...old];
      const newNode = node(num);

      newNode.new = true;
      newList[addToTail ? "push" : "unshift"](newNode);
      return newList;
    }, timeout);

    //Add Next Pointer to new Node
    timeout = step((old) => {
      const newList = [...old];
      newList[addToTail ? newList.length - 2 : 0].next =
        newList[getHeadOrTail(addToTail, newList)];
      return newList;
    }, timeout);

    //Removes  Tail Pointer
    timeout = step((old) => {
      const newList = [...old];
      newList[getPreHeadOrTail(addToTail, newList)][
        addToTail ? "isTail" : "isHead"
      ] = false;
      return newList;
    }, timeout);

    // Updates Tail Pointer and resets selected
    timeout = step((old) => {
      const newList = [...old];
      newList[getPreHeadOrTail(addToTail, newList)].selected = false;
      newList[getHeadOrTail(addToTail, newList)][
        addToTail ? "isTail" : "isHead"
      ] = true;
      toggleAnimation();
      return newList;
    }, timeout);
  };

  const append = (num: number) => {
    addNode(true, num);
  };

  const prepend = (num: number) => {
    addNode(false, num);
  };
  /************* End Adding Nodes **************/

  /************* Removing Nodes **************/
  const removeNode = (removeFromTail: boolean) => {
    if (displayList.length === 0) return;
    toggleAnimation();
    clearColorIndicators();
    let timeout = 0;

    // Get Head Or Tail
    timeout = step((old) => {
      const newList = [...old];
      const HorT = getHeadOrTail(removeFromTail, newList);
      // reset new/selector indicators on prepends
      if (newList[HorT]) newList[HorT].selected = true;
      return newList;
    }, timeout);

    // if there is only one node left remove last node
    if (displayList.length === 1) {
      console.log("one left");

      step(() => {
        toggleAnimation();
        return [];
      }, timeout);
      return;
    }

    // Get New Head/ Tail / Remov
    timeout = step((old) => {
      const newList = [...old];
      const newHeadorTail = getPreHeadOrTail(removeFromTail, newList);
      newList[newHeadorTail].selected = true;
      return newList;
    }, timeout);

    // Indicate Remove Old Head/Tail and switch pointer
    timeout = step((old) => {
      const newList = [...old];
      const newHeadorTail = getPreHeadOrTail(removeFromTail, newList);
      const headOrTail = getHeadOrTail(removeFromTail, newList);

      // Set selected indicators to false and remove tail/head
      // pointer from removed node
      newList[newHeadorTail].selected =
        newList[headOrTail].selected =
        newList[headOrTail][removeFromTail ? "isTail" : "isHead"] =
          false;

      // Indicate the previous head will be removed and indicate
      // the new head or tail
      newList[headOrTail].removed =
        newList[newHeadorTail][removeFromTail ? "isTail" : "isHead"] =
        newList[newHeadorTail].new =
          true;

      // Remove appropriate next pointers
      newList[removeFromTail ? newList.length - 2 : 0].next = null;

      toggleAnimation();
      return newList;
    }, timeout);

    //Delete Node
    timeout = step((old) => {
      const newList = [...old];
      newList[removeFromTail ? "pop" : "shift"]();
      return newList;
    }, timeout);

    // To chain remove Node functions
    return;
  };

  const removeHead = () => {
    removeNode(false);
  };

  const removeTail = () => {
    removeNode(true);
  };

  const clear = (instant?: boolean) => {
    if (instant) {
      setDisplay([]);
    } else {
      let timeout = 0;
      for (let i = 0; i < displayList.length; ) {
        console.log(timeout, "befoer");

        setTimeout(() => {
          removeNode(false);
          i++
          timeout += stepDelay;
        }, timeout);
        console.log(timeout, "after update");
      }
    }
  };
  /************* End Removing Nodes **************/

  const value = {
    display: displayList,
    append,
    prepend,
    removeHead,
    removeTail,
    clear,
  };
  return (
    <LinkedListContext.Provider value={value}>
      {children}
    </LinkedListContext.Provider>
  );
};
// export const useLinkedListContext = () => React.useContext(LinkedListContext);
export default LinkedListContextProvider;
