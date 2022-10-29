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
            state.error = null;
        },
        loginSuccess:(state,action)=>{
            state.isFetching=false;
            state.currentUser=action.payload;
            localStorage.setItem("user", JSON.stringify(state.currentUser.accessToken));   
            window.location.reload(false);
        },
        loginFail:(state,action)=>{
            state.isFetching=false;
            state.error = action.payload;
        },
        logout:(state)=>{
            state.currentUser=null;
            localStorage.removeItem("user")

        },
       
    }
})
export const {  loginStart , loginSuccess, loginFail,
                logout} = userSlice.actions;
export default userSlice.reducer;