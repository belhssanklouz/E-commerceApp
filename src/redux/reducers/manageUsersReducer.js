import { createSlice } from "@reduxjs/toolkit";

const manageUsersSlice = createSlice({
    name:'manageUsers',
    initialState:{
        isFetching:false,
        users:[],
        user:[],
        error:null,
        lastUsers:[],
        response:''
    },
    reducers:{
        getAllUsers:(state)=>{
            state.isFetching=true;
            state.error=null;
        },
        getAllUsersSucc:(state,action)=>{
            state.isFetching=false;
            state.users=action.payload;
        },
        getAllUsersFail:(state,action)=>{
            state.isFetching=false;
            state.error=action.payload;
        },
        getUserById:(state)=>{
            state.isFetching=true;
            state.error=null;
        },
        getUserByIdSucc:(state,action)=>{
            state.isFetching=false;
            state.user=action.payload;
        },
        getUserByIdFail:(state,action)=>{
            state.isFetching=false;
            state.error=action.payload;
        },
        getLastUsers:(state)=>{
            state.isFetching=true;
            state.error=null;
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
            state.error=null;
            state.response = ''
        },
        addUserSucc:(state,action)=>{
            state.isFetching=false;
            state.users.push(action.payload);
            state.response = 'success'
        },
        addUserFail:(state,action)=>{
            state.isFetching=false;
            state.error = action.payload
        },
        //updateUser
        updateUser:(state)=>{
            state.isFetching=true;
            state.error=null;
        },
        updateUserSucc:(state,action)=>{
            console.log(action.payload)
            state.isFetching=false;
            const keys = Object.entries(action.payload.input);
            console.log(keys)
            keys.map(([key,value])=>state.users[state.users.findIndex(item=>item._id===action.payload.id)][key] = value)
        },
        updateUserFail:(state,action)=>{
            state.isFetching=false;
            state.error = action;
        },
        //deleteuser
        deleteUser:(state)=>{
            state.isFetching=true;
            state.error=null;
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
                getUserById , getUserByIdSucc , getUserByIdFail,
                getLastUsers,getLastUsersSucc,getLastUsersFail,
                addUser,addUserSucc,addUserFail,
                updateUser,updateUserSucc,updateUserFail,
                deleteUser,deleteUserSucc,deleteUserFail} = manageUsersSlice.actions;
export default manageUsersSlice.reducer;