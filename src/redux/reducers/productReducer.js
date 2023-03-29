import { createSlice } from "@reduxjs/toolkit";

const productReducer = createSlice({
    name:"product",
    initialState:{
        isFetching:false,
        products:[],
        error:null,
    },
    reducers:{
        //getallprods
        getAllProducts:(state)=>{
            state.isFetching=true;
        },
        getAllProductsSucc:(state,action)=>{
            state.isFetching=false;
            state.products=action.payload;
        },
        getAllProductsFail:(state,action)=>{
            state.isFetching=false;
            state.error=action.payload;
        },
        //Add Product
        addProducts:(state)=>{
            state.isFetching=true;
        },
        addProductsSucc:(state,action)=>{
            state.isFetching=false;
            state.products.push(action.payload);
        },
        addProductsFail:(state,action)=>{
            state.isFetching=false;
            state.error=action.payload;
        },
        //GetSpecificProduct
        getProduct:(state)=>{
            state.isFetching=true;
        },
        getProductSucc:(state,action)=>{
            state.isFetching=false;
            state.products.splice(state.products.findIndex(item=>item._id===action.payload),1);
        },
        getProductFail:(state,action)=>{
            state.isFetching=false;
            state.error=action.payload;
        },
        //Update Product
        updateProduct:(state)=>{
            state.isFetching=true;
        },
        updateProductSucc:(state,action)=>{
            state.isFetching=false;
            const data = Object.entries(action.payload.prod);
            data.map(([key,value])=>state.products[state.products.findIndex(item=>item._id===action.payload.id)][key] = value)
        },
        updateProductFail:(state,action)=>{
            state.isFetching=false;
            state.error=action.payload;
        },
        //DeleteProd
        deleteProduct:(state)=>{
            state.isFetching=true;
        },
        deleteProductSucc:(state,action)=>{
            state.isFetching=false;
            state.products.splice(state.products.findIndex(item=>item._id===action.payload),1);
        },
        deleteProductFail:(state,action)=>{
            state.isFetching=false;
            state.error=action.payload;
        },

    }
})
export const {  getAllProducts,getAllProductsSucc,getAllProductsFail,
                deleteProduct,deleteProductSucc,deleteProductFail,
                updateProduct,updateProductSucc,updateProductFail,
                addProducts,addProductsSucc,addProductsFail,   } = productReducer.actions;
export default productReducer.reducer;