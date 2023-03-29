import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
    name:"register",
    initialState:{
        isFetching:false,
        registerResponse:null,
    },
    reducers:{
        registerStart:(state)=>{
            state.isFetching=true;
            state.registerResponse=null;
        },
        registerSuccess:(state)=>{
            state.isFetching=false;
            state.registerResponse="Success";

        },
        registerFail:(state,action)=>{
            state.isFetching=false;
            state.registerResponse=action.payload;
        },
        inputChange:(state)=>{
            state.registerResponse=null;
        }
    }
}) 
export const {registerStart, registerSuccess, registerFail, inputChange}=registerSlice.actions;
export default registerSlice.reducer;