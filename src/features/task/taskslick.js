import { createSlice } from "@reduxjs/toolkit";

let initialState={
    "tasks":[]
}

export const taskSlice=createSlice({
    "name":"tasks",
    initialState,
    reducers:{
        addtask:(state,action)=>{
            console.log("here is  state in add task:",state)
            console.log("here is action in add task:",action)
            state.tasks.push(action.payload)
        },
        removealltask:(state)=>{
            state.tasks=[]
        }
    }
})
export const {addtask,removealltask}=taskSlice.actions
export default taskSlice.reducer