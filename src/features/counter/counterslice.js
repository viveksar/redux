import { createSlice } from "@reduxjs/toolkit";
// import Rootstate

const initialState={
    value:0
}

export const counterSlice=createSlice({
    name:"counter",
    initialState:initialState,
    reducers:{
        increment:(state)=>{
            console.log("here is the increment state")
            state.value+=1
        },
        decrement:(state)=>{
            console.log("here is the decrement state")
            if (state.value>0){
                state.value-=1
            }
        },
        increaseByAmount:(state,action)=>{
            console.log("here is the state and action",state,action)
            state.value+=  Number(action.payload)
        },
        reset:(state)=>{
            state.value=0
        }
    }
})

export const {increment,decrement,increaseByAmount,reset}=counterSlice.actions

export default counterSlice.reducer