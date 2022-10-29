import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
    name:'orders',
    initialState:{
        isFetching:false,
        orders:[],
        incoms:[],
        error:null,
    },
    reducers:{
        getAllOrders:(state)=>{
            state.isFetching=true
        },
        getAllOrdersSucc:(state,action)=>{
            state.isFetching=false;
            state.orders=action.payload;
        },
        getAllOrdersFail:(state,action)=>{
            state.isFetching=false;
            state.error=action.payload;
        },
        getAllIncoms:(state)=>{
            state.isFetching=true
        },getAllIncomsSucc:(state,action)=>{
            state.isFetching=false;
            state.incoms=action.payload;

        },getAllIncomsFail:(state,action)=>{
            state.isFetching=false;
            state.error=action.payload
        },
        
    }
})
export const {getAllOrders,getAllOrdersSucc,getAllOrdersFail,getAllIncoms,getAllIncomsSucc,getAllIncomsFail} = ordersSlice.actions;
export default ordersSlice.reducer;