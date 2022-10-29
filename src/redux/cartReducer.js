import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0
    },reducers:{
        addProduct : (state,action) => {
            state.quantity+=1;
            state.products.push(action.payload);
            state.total+=action.payload.price*action.payload.quantity;
        },
        increaseQuantity : (state,action) =>{
            console.log(state.products.findIndex(item=>item._id===action.payload));
            state.products[state.products.findIndex(item=>item._id===action.payload)].quantity +=1;
            state.total += state.products[state.products.findIndex(item=>item._id===action.payload)].price;
        },
        decreaseQuantity : (state,action) =>{
            if(state.products[state.products.findIndex(item=>item._id===action.payload)].quantity > 1){
                state.products[state.products.findIndex(item=>item._id===action.payload)].quantity -=1;
                state.total -= state.products[state.products.findIndex(item=>item._id===action.payload)].price;
            }
        },
        removeProduct : (state,action) => {
            if(state.quantity > 0){
                console.log(state.products)
                state.quantity-=1;
                state.products.splice(state.products.findIndex(item=>item._id===action.payload),1);
                state.total-=state.products[state.products.findIndex(item=>item.id===action.payload)]?.price;
            }else{
                state.products = [];
            }
            
        }
    }
}) 
export const {addProduct,increaseQuantity,decreaseQuantity,removeProduct} = cartSlice.actions;
export default cartSlice.reducer;