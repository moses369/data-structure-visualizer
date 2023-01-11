import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LinkedList, Node } from "./LinkedList";
import { stat } from "fs";

interface LinkedListState {
  head: Node;
  tail: Node;
  size: number;
}
const initNode = new Node();

const initialState: LinkedListState = {
  head: initNode,
  tail: initNode,
  size: 0,
};

// Initialize Linked List with 4 nodes
[3, 2, 6, 9, 10 ,11 ,12].forEach((num) => {
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

export const linkedListSlice = createSlice({
  name: "LinkedList",
  initialState,
  reducers: {
    appendLL(state, { payload }: PayloadAction<number>) {
      if (state.head.data === null) {
        state.head.data = state.tail.data = payload;
        state.head.isHead = state.head.isTail = true;
      } else {
        //Reset head and old tail marker
        state.tail.isTail = false;
        state.head.isTail = false;

        const newNode = new Node(payload);
        newNode.isTail = true;
        state.tail.next = newNode;
        state.tail = newNode;
      }
      state.size++;
    },
  },
});
export const { appendLL } = linkedListSlice.actions;
export default linkedListSlice.reducer;
