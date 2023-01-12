import React, { useState, useEffect } from "react";
import { ReactChildren } from "../types/util";
import {
  LinkedListContextType,
  LinkedListState,
  Node,
} from "../types/LinkedListTypes";
import { AppContext, AppContextTypes } from "./AppContextProvider";

export const LinkedListContext = React.createContext<
  LinkedListContextType | undefined
>(undefined);

/* Initialize the Context state */
const initNode = new Node();
const initialState: LinkedListState = {
  head: initNode,
  tail: initNode,
  size: 0,
};
const defaultState = () => {
  [3].forEach((num) => {
    if (initialState.head.data === null) {
      initialState.head.data = initialState.tail.data = num;
      initialState.head.isHead = initialState.head.isTail = true;
    } else {
      initialState.tail.isTail = false;
      initialState.head.isTail = false;

      const newNode = new Node(num);
      newNode.isTail = true;
      initialState.tail.next = newNode;
      initialState.tail = newNode;
    }
    initialState.size++;
  });
};
defaultState();
/* END Initialize the Context state */

const LinkedListContextProvider = ({ children }: ReactChildren) => {
  const [state, setState] = useState<LinkedListState>(initialState);
  const [displayList, setDisplay] = useState<Node[]>([]);

  const { toggleAnimation } = React.useContext(AppContext) as AppContextTypes;
  //Updates the displaed linked list
  useEffect(() => {
    const nodes = [];
    let currNode = state.head;
    nodes.push(currNode);
    while (currNode.next) {
      nodes.push(currNode.next);
      currNode = currNode.next;
    }
    setDisplay(nodes);
  }, [state]);

  /**
   * Time between animations
   */
  const stepTime = 1000;

  const append = (num: number) => {

    if (state.size === 7) return;
    toggleAnimation(); //says an animation is in progress

    let timeout = 0;
    //Get Tail
    setTimeout(() => {
      setDisplay((old) => {
        const newList = [...old];
        // reset new indicator on prepends
        if(newList[0])newList[0].new = false
        if (newList[newList.length - 1]) {
          newList[newList.length - 1].new = false;
          newList[newList.length - 1].selected = true;
        }
        return newList;
      });
    }, timeout);
    timeout += stepTime;
    //Add New Node
    setTimeout(() => {
      setDisplay((old) => {
        const newList = [...old];
        const newNode = new Node(num);

        newNode.new = true;
        newList.push(newNode);
        return newList;
      });
    }, timeout);
    timeout += stepTime;

    //Add Next Pointer to new Tail
    setTimeout(() => {
      console.log(timeout);
      setDisplay((old) => {
        const newList = [...old];
        newList[newList.length - 2].next = newList[newList.length - 1];
        return newList;
      });
    }, timeout);
    timeout += stepTime;

    //Change Tail Pointer
    setTimeout(() => {
      setDisplay((old) => {
        const newList = [...old];
        newList[newList.length - 2].isTail = false;
        return newList;
      });
    }, timeout);
    timeout += stepTime;

    // Transforms the actual head of the Linked list
    setTimeout(() => {
      setState((old) => {
        const newState = { ...old };
        if (newState.head.data === null) {
          newState.head.data = newState.tail.data = num;
          newState.head.isHead = newState.head.isTail = true;
        } else {
          //Reset head and old tail marker
          newState.tail.isTail =
            newState.tail.new =
            newState.tail.selected =
              false;
          //Addd new node
          const newNode = new Node(num);
          newNode.isTail = newNode.new = true;
          newState.tail.next = newNode;
          newState.tail = newNode;
        }
        newState.size++;
        toggleAnimation(); // ends an animation is in progress
        return newState;
      });
    }, timeout);
  };

  const prepend = (num: number) => {
    if (state.size === 7) return;
    toggleAnimation(); //says an animation is in progress
    let timeout = 0;
    //Get Head
    setTimeout(() => {
      setDisplay((old) => {
        const newList = [...old];
        // reset new indicator on appends
        if(newList[newList.length - 1])newList[newList.length - 1].new = false
        if (newList[0]) {
          newList[0].new = false;
          newList[0].selected = true;
        }
        return newList;
      });
    }, timeout);
    timeout += stepTime;

    //Add New Node
    setTimeout(() => {
      setDisplay((old) => {
        const newList = [...old];
        const newNode = new Node(num);

        newNode.new = true;
        newList.unshift(newNode);
        return newList;
      });
    }, timeout);
    timeout += stepTime;

    //Add Next Pointer to new Head
    setTimeout(() => {
      console.log(timeout);
      setDisplay((old) => {
        const newList = [...old];
        newList[0].next = newList[1];
        return newList;
      });
    }, timeout);
    timeout += stepTime;

    //Change Head Pointer
    setTimeout(() => {
      setDisplay((old) => {
        const newList = [...old];
        newList[1].isHead = false;
        return newList;
      });
    }, timeout);
    timeout += stepTime;

    // Transforms the actual head of the Linked list
    setTimeout(() => {
      setState((old) => {
        const newState = { ...old };
        if (newState.head.data === null) {
          newState.head.data = newState.tail.data = num;
          newState.head.isHead = newState.head.isTail = true;
        } else {
          //Reset head  marker
          newState.head.isHead =
            newState.head.new =
            newState.head.selected =
              false;
          //add new node
          const newNode = new Node(num, newState.head);
          newNode.isHead = newNode.new = true;
          newState.head = newNode;
        }
        newState.size++;
        toggleAnimation(); // ends an animation is in progress
        return newState;
      });
    }, timeout);
  };
  const value = {
    display: displayList,
    append,
    prepend,
  };
  return (
    <LinkedListContext.Provider value={value}>
      {children}
    </LinkedListContext.Provider>
  );
};
// export const useLinkedListContext = () => React.useContext(LinkedListContext);
export default LinkedListContextProvider;
