import { createSlice } from "@reduxjs/toolkit";

const statsSlice = createSlice({
    name:'stats',
    initialState:{
        isFetching:false,
        userStats:[],
        prodStats:[],
        error:null,
    },
    reducers:{
        //stats for users per month
        getAllStats:(state)=>{
            state.isFetching=true;
            state.error=null;
        },
        getAllStatsSucc:(state,action)=>{
            state.isFetching=false;
            state.userStats=action.payload;
        },
        getAllStatsFail:(state,action)=>{
            state.isFetching=false;
            state.error=action.payload;
        },
        getProdStats:(state)=>{
            state.isFetching=true
        },
        getProdStatsSucc:(state,action)=>{
            state.isFetching=false;
            state.prodStats=action.payload;
        },
        getProdStatsFail:(state,action)=>{
            state.isFetching=false;
            state.error=action.payload;
        }
        
    }
})
export const {  getAllStats,getAllStatsSucc,getAllStatsFail,
                getProdStats,getProdStatsSucc,getProdStatsFail} = statsSlice.actions;
export default statsSlice.reducer;