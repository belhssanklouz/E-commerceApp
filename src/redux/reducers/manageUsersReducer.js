import { createSlice } from "@reduxjs/toolkit";

const manageUsersSlice = createSlice({
    name:'manageUsers',
    initialState:{
        isFetching:false,
        users:[],
        error:null,
        lastUsers:[]
    },
    reducers:{
        getAllUsers:(state)=>{
            state.isFetching=true
        },
        getAllUsersSucc:(state,action)=>{
            state.isFetching=false;
            state.users=action.payload;
        },
        getAllUsersFail:(state,action)=>{
            state.isFetching=false;
            state.error=action.payload;
        },
        getLastUsers:(state)=>{
            state.isFetching=true
        },
        getLastUsersSucc:(state,action)=>{
            state.isFetching=false;
            state.lastUsers=action.payload;
        },
        getLastUsersFail:(state,action)=>{
            state.isFetching=false;
            state.error=action.payload;
        },
        //adduser
        addUser:(state)=>{
            state.isFetching=true;
        },
        addUserSucc:(state,action)=>{
            state.isFetching=false;
            state.users.push(action.payload);
        },
        addUserFail:(state,action)=>{
            state.isFetching=false;
            state.error = action.payload
        },
        //updateUser
        updateUser:(state)=>{
            state.isFetching=true;
        },
        updateUserSucc:(state,action)=>{
            state.isFetching=false;
            const keys = Object.entries(action.payload.user);
            keys.map(([key,value])=>state.users[state.products.findIndex(item=>item._id===action.payload.id)][key] = value)
        },
        updateUserFail:(state,action)=>{
            state.isFetching=false;
            state.error = action.payload
        },
        //deleteuser
        deleteUser:(state)=>{
            state.isFetching=true;
        },
        deleteUserSucc:(state,action)=>{
            state.isFetching=false;
            state.users.splice(state.users.findIndex(item=>item._id===action.payload),1);
        },
        deleteUserFail:(state,action)=>{
            state.isFetching=false;
            state.error = action.payload
        }

    }
})
export const {  getAllUsers , getAllUsersSucc, getAllUsersFail,
                getLastUsers,getLastUsersSucc,getLastUsersFail,
                addUser,addUserSucc,addUserFail,
                updateUser,updateUserSucc,updateUserFail,
                deleteUser,deleteUserSucc,deleteUserFail} = manageUsersSlice.actions;
export default manageUsersSlice.reducer;