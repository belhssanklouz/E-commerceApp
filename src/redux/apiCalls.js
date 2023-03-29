import { publicRequest } from "../requestMethods";
import { loginFail, loginStart, loginSuccess } from "./reducers/userReducer";
import { registerStart, registerSuccess, registerFail } from "./reducers/registerReducer";

// Login
export const login = (user) => async (dispatch) =>{
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('/auth/login',user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFail(error.response.data));
    }
}
export const signUp = (user) => async (dispatch) =>{
    dispatch(registerStart())
    try {
        const res = await publicRequest.post('/auth/register',user);
        dispatch(registerSuccess())
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(registerFail(error.response.data));
        console.clear();
    }
}