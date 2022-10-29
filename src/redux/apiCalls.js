import { publicRequest,userRequest } from "../requestMethods";

import {loginFail, loginStart, loginSuccess} from "./reducers/userReducer"

import { getAllUsers , getAllUsersSucc, getAllUsersFail,
         getLastUsers,getLastUsersSucc,getLastUsersFail,
         addUser,addUserSucc,addUserFail,
         updateUser,updateUserSucc,updateUserFail,
         deleteUser,deleteUserSucc,deleteUserFail } from "./reducers/manageUsersReducer"

import {getAllOrders,getAllOrdersSucc,getAllOrdersFail,
        getAllIncoms,getAllIncomsSucc,getAllIncomsFail} from "./reducers/ordersReducer"

import {getAllStats,getAllStatsSucc,getAllStatsFail,
        getProdStats,getProdStatsSucc,getProdStatsFail} from "./reducers/statsReducer";

import {getAllProducts,getAllProductsSucc,getAllProductsFail,
        deleteProduct,deleteProductSucc,deleteProductFail,
        updateProduct,updateProductSucc,updateProductFail,
        addProducts,addProductsSucc,addProductsFail} from './reducers/productReducer';

// Login
export const login = (user) => async (dispatch) =>{
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('/auth/admin/login',user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        console.log(error)
        dispatch(loginFail(error.response.data));
    }
}

//getLastUsers
export const getLastestUsers = () => async (dispatch) =>{
    dispatch(getLastUsers());
    try {
        const res = await userRequest.get('/users/getallusers?new=true');
        dispatch(getLastUsersSucc(res.data));
    } catch (error) {
        console.log(error)
        dispatch(getLastUsersFail(error.response.data));
    }
}
//addUsers
export const addusers = (user) => async (dispatch) =>{
    dispatch(addUser());
    try {
        const res = await userRequest.post('/users/adduser',user);
        dispatch(addUserSucc(res.data));
    } catch (error) {
        dispatch(addUserFail(error));
    }
}
//updateUser
export const updateUsers = (user) => async (dispatch) =>{
    dispatch(updateUser());
    try {
        await userRequest.put(`/users/${user.id}`,user.input);
        dispatch(updateUserSucc(user));
    } catch (error) {
        console.log(user)
        dispatch(updateUserFail(error));
    }
}
//DeleteUsers
export const deleteUsers = (id) => async(dispatch) =>{
    dispatch(deleteUser());
    try {
        await userRequest.get("/users/getallusers");
        dispatch(deleteUserSucc(id));
    } catch (error) {
        dispatch(deleteUserFail(error.response.data))
    }
}
// getAllUsers
export const getUsers = () => async (dispatch) =>{
    dispatch(getAllUsers());
    try {
        const res = await userRequest.get('/users/getallusers');
        dispatch(getAllUsersSucc(res.data));
    } catch (error) {
        console.log(error)
        dispatch(getAllUsersFail(error.response?.data));
    }
}
//getAllOrders 
export const getOrders = () => async (dispatch) =>{
    dispatch(getAllOrders());
    try {
        const res = await userRequest.get('/orders/getallorders');
        dispatch(getAllOrdersSucc(res.data));
    } catch (error) {
        console.log(error)
        dispatch(getAllOrdersFail(error?.response?.data));
    }
}

//getStats
export const getStats = () => async(dispatch) =>{
    dispatch(getAllStats());
    try {
        const res = await userRequest.get("/users/stats");
        const data = res.data.sort((a,b)=>a._id-b._id)
        dispatch(getAllStatsSucc(data));
    } catch (error) {
        dispatch(getAllStatsFail(error?.response?.data))
    }
}

//getIncoms 
export const getIncoms = () => async(dispatch) =>{
    dispatch(getAllIncoms());
    try {
        const res = await userRequest.get("/orders/income");
        dispatch(getAllIncomsSucc(res.data));
    } catch (error) {
        dispatch(getAllIncomsFail(error?.response.data))
    }
}

//getAllProducts
export const getProducts = () => async(dispatch) =>{
    dispatch(getAllProducts());
    try {
        const res = await userRequest.get("/products/getallproducts");
        dispatch(getAllProductsSucc(res.data));
    } catch (error) {
        dispatch(getAllProductsFail(error.response.data))
    }
}
//GetSpecificProduct
export const getProduct = () => async(dispatch) =>{
    dispatch(getAllProducts());
    try {
        const res = await userRequest.get("/products/getallproducts");
        dispatch(getAllProductsSucc(res.data));
    } catch (error) {
        dispatch(getAllProductsFail(error.response.data))
    }
}
//Addproduct 
export const addProd = (prod) => async(dispatch) =>{
    dispatch(addProducts());
    try {
        const res = await userRequest.post("/products/addproduct",prod);
        dispatch(addProductsSucc(res.data));
    } catch (error) {
        dispatch(addProductsFail(error.response.data))
    }
}
//Update Product
export const updateProd = (prod,id) => async(dispatch) =>{
    
    dispatch(updateProduct());
    try {
        await userRequest.put(`/products/${id}`,prod);
        dispatch(updateProductSucc({prod,id}));
    } catch (error) {
        dispatch(updateProductFail(error))
    }
}
//DeleteProducts
export const deleteProd = (id) => async(dispatch) =>{
    dispatch(deleteProduct());
    try {
        await userRequest.get("/products/getallproducts");
        dispatch(deleteProductSucc(id));
    } catch (error) {
        dispatch(deleteProductFail(error.response.data))
    }
}
//get incomes per product stats
export const prodStatss = (id) => async(dispatch) =>{
    dispatch(getProdStats());
    const MONTHS = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        'May',
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]
      let result = [];
    try {
        const res = await userRequest.get(`/orders/income/?pid=${id}`);
        const list = res.data.sort((a,b)=>a._id - b._id)
        
        list.map(item=>{
           return result = [...result,{name:MONTHS[item._id-1], Sales:item.total}]
        })

        dispatch(getProdStatsSucc(result));
    } catch (error) {
        dispatch(getProdStatsFail(error.response?.data))
    }
}