import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
    activeDS:string
}

const initialState: AppState = {
    activeDS:'Linked List'
}

export const appSlice = createSlice({
    name:'app',
    initialState,
    reducers:{
        selectDS(state, {payload}: PayloadAction<string>){
            state.activeDS = payload
        }
    }
})

export const {selectDS} = appSlice.actions

export default appSlice.reducer