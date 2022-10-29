import { publicRequest } from "../requestMethods";
import { loginFail, loginStart, loginSuccess } from "./userReducer"

// Login
export const login = (user) => async (dispatch) =>{
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('/auth/login',user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        console.log(error)
        dispatch(loginFail(error.response.data));
    }
}