import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DSTypes } from "./types/util";

export interface AppState {
    activeDS:DSTypes
    animationInProgress:boolean
}

const initialState: AppState = {
    activeDS:'Linked List',
    animationInProgress: false
}

export const appSlice = createSlice({
    name:'app',
    initialState,
    reducers:{
        selectDS(state, {payload}: PayloadAction<DSTypes>){
            state.activeDS = payload
        },
        toggleAnimation(state){
            state.animationInProgress = !state.animationInProgress
        }
    }
})

export const {selectDS} = appSlice.actions

export default appSlice.reducer