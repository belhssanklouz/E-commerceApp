import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
    name:'orders',
    initialState:{
        isFetching:false,
        orders:[],
        incoms:[],
        lastOrders:[],
        error:null,
    },
    reducers:{
        getAllOrders:(state)=>{
            state.isFetching=true
        },
        getAllOrdersSucc:(state,action)=>{
            state.isFetching=false;
            state.orders=action.payload
        },
        getAllOrdersFail:(state,action)=>{
            state.isFetching=false;
            state.error=action.payload;
        },
        getLastOrders:(state)=>{
            state.isFetching = true;
            state.error = null; 
        },
        getLastOrdersSucc:(state,action)=>{
            state.isFetching = false;
            state.lastOrders = action.payload;
        },
        getLastOrdersFail:(state,action)=>{
            state.isFetching = false;
            state.error = action.payload;
        },
        deleteOrder:(state)=>{
            state.isFetching = true;
            state.error = null;
        },
        deleteOrderSucc:(state,action)=>{
            state.isFetching = false;
            state.orders = [...state.orders.slice(0,state.orders.findIndex(order=>order._id === action.payload)),...state.orders.slice(state.orders.findIndex(order=>order._id === action.payload)+1)]
        },
        deleteOrderFail:(state,action)=>{
            state.isFetching = false;
            state.error = action.payload;
        },
        updateOrder:(state)=>{
            state.isFetching = true;
            state.error = null;
        },
        updateOrderSucc:(state,action)=>{
            state.isFetching = false;
            const data = Object.entries(action.payload.orderData);
            data.map(([key,value])=>state.orders[state.orders.findIndex(order=>order._id === action.payload.id)][key]=value);
        },
        updateOrderFail:(state,action)=>{
            state.isFetching = false;
            state.error = action.payload;
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
export const {
    getAllOrders,getAllOrdersSucc,getAllOrdersFail,
    getLastOrders,getLastOrdersSucc,getLastOrdersFail,
    updateOrder, updateOrderSucc, updateOrderFail,
    deleteOrder,deleteOrderSucc,deleteOrderFail,
    getAllIncoms,getAllIncomsSucc,getAllIncomsFail} = ordersSlice.actions;
export default ordersSlice.reducer;