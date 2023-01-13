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
  const stepDelay = 250;
  const step = (stateChange: UpdateNodeDisplay, delay: number = stepDelay) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setDisplay(stateChange);
        resolve();
      }, delay);
    });
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
  const addNode = async (addToTail: boolean, num: number) => {
    if (displayList.length === 7) return;
    toggleAnimation(); //says an animation is in progress
    clearColorIndicators();

    //If there is no head/tail
    if (displayList.length === 0) {
      const newNode = node(num);
      newNode.isHead = newNode.isTail = newNode.new = true;
      setDisplay([newNode]);
      toggleAnimation();
      return;
    }

    //Get Tail/Head
    await step((old) => {
      const newList = [...old];

      const HorT = getHeadOrTail(addToTail, newList);
      // reset new/selector indicators on prepends
      if (newList[HorT]) newList[HorT].selected = true;
      return newList;
    }, 0);

    //Add New Node
    await step((old) => {
      const newList = [...old];
      const newNode = node(num);

      newNode.new = true;
      newList[addToTail ? "push" : "unshift"](newNode);
      return newList;
    });

    //Add Next Pointer to new Node
    await step((old) => {
      const newList = [...old];
      newList[addToTail ? newList.length - 2 : 0].next =
        newList[getHeadOrTail(addToTail, newList)];
      return newList;
    });

    //Removes  Tail Pointer
    await step((old) => {
      const newList = [...old];
      newList[getPreHeadOrTail(addToTail, newList)][
        addToTail ? "isTail" : "isHead"
      ] = false;
      return newList;
    });

    // Updates Tail Pointer and resets selected
    await step((old) => {
      const newList = [...old];
      newList[getPreHeadOrTail(addToTail, newList)].selected = false;
      newList[getHeadOrTail(addToTail, newList)][
        addToTail ? "isTail" : "isHead"
      ] = true;
      return newList;
    });

    toggleAnimation();
  };

  const append = (num: number) => {
    addNode(true, num);
  };

  const prepend = (num: number) => {
    addNode(false, num);
  };
  /************* End Adding Nodes **************/

  /************* Removing Nodes **************/
  const removeNode = async (removeFromTail: boolean) => {
    if (displayList.length === 0) return;
    toggleAnimation();
    clearColorIndicators();
    console.log("started");

    // Get an updated value on the lists length wont cause a re-render
    // because state was not changed
    let oneNodeLeft = false;
    setDisplay((old) => {
      oneNodeLeft = old.length === 1;
      return old;
    });

    // Get Head Or Tail
    await step((old) => {
      // oneNodeLeft = old.length === 1;
      const newList = [...old];
      const HorT = getHeadOrTail(removeFromTail, newList);
      // reset new/selector indicators on prepends
      if (newList[HorT]) newList[HorT].selected = true;
      return newList;
    }, 0);

    // if there is only one node left remove last node
    if (oneNodeLeft) {
      console.log("early end");
      await step([]);
      toggleAnimation();
      return;
    }

    // Get New Head/ Tail / Remov
    await step((old) => {
      const newList = [...old];
      const newHeadorTail = getPreHeadOrTail(removeFromTail, newList);
      newList[newHeadorTail].selected = true;
      return newList;
    });

    // Indicate Remove Old Head/Tail and switch pointer
    await step((old) => {
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
      return newList;
    });

    //Delete Node
    await step((old) => {
      const newList = [...old];
      newList[removeFromTail ? "pop" : "shift"]();
      return newList;
    });
    console.log("done");

    toggleAnimation();
  };

  const removeHead = () => {
    removeNode(false);
  };

  const removeTail = () => {
    removeNode(true);
  };

  const removeMidNode = async (num: number) => {
    toggleAnimation();
    clearColorIndicators();
    if (displayList.length === 0) return;
    // Remove node if it is the head or tail
    if (num === displayList[0].data) {
      removeHead();
      return;
    }
    if (num === displayList[displayList.length - 1].data) {
      removeTail();
      return;
    }

    // Show that we checked the tail first
    await step((old) => {
      const newList = [...old];
      newList[newList.length - 1].selected = true;
      return newList;
    }, 0);

    let foundNodeI: number | undefined;
    //Find the Node
    for (let i = 0; i < displayList.length; i++) {
      //Move through the linked list
      await step((old) => {
        const newList = [...old];

        newList[newList.length - 1].selected = false;
        newList[i].selected = true;

        const prev2 = i - 1;
        const next = i + 1;

        if (newList[prev2]) newList[prev2].selected = false;
        if (newList[next]) newList[next].selected = true;

        if (newList[i].data === num) console.log("find");
        return newList;
      });

      if (displayList[i + 1]?.data === num) {
        foundNodeI = i + 1;
        break;
      }
    }
    if (foundNodeI === undefined) {
      toggleAnimation();
      return;
    }
    const nodeI = foundNodeI as number;
    //Select the next node and show we will remove the found node
    await step((old) => {
      const newList = [...old];
      newList[nodeI + 1].selected = true;
      newList[nodeI].removed = true;
      return newList;
    });

    //Remove the node
    await step((old) => {
      return old.filter((node, i) => i !== nodeI);
    });

    toggleAnimation();
  };

  const clear = async (instant?: boolean) => {
    toggleAnimation();
    clearColorIndicators();
    if (instant) {
      setDisplay([]);
    } else {
      for (let i = 0; i < displayList.length; i++) {
        await removeNode(false);
      }
    }
    toggleAnimation();
  };
  /************* End Removing Nodes **************/

  const value = {
    display: displayList,
    append,
    prepend,
    removeHead,
    removeTail,
    clear,
    removeMidNode,
  };
  return (
    <LinkedListContext.Provider value={value}>
      {children}
    </LinkedListContext.Provider>
  );
};
// export const useLinkedListContext = () => React.useContext(LinkedListContext);
export default LinkedListContextProvider;
