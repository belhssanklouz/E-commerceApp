import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        currentUser:null,
        isFetching:false,
        error:null
    },reducers:{
        loginStart:(state)=>{
            state.isFetching=true;
        },
        loginSuccess:(state,action)=>{
            state.isFetching=false;
            state.currentUser=action.payload;
        },
        loginFail:(state,action)=>{
            state.isFetching=false;
            state.error = action.payload;
        },
    }
})
export const {loginStart , loginSuccess, loginFail} = userSlice.actions;
export default userSlice.reducer;