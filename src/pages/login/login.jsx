import React, { useState } from 'react'
import {useDispatch} from 'react-redux';
import { login } from '../../redux/apiCalls';

const Login = () => {
    const dispatch = useDispatch();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const handleLogin = (e) =>{
        e.preventDefault();
        dispatch(login({username,password}))
    }
    
  return (
    <div style={{display:'flex',
                alignItems:"center",
                justifyContent:'center',
                height:"100vh",
                flexDirection:"column"}}>
        <input style={{padding:"10px",marginBottom:"20px"}} type='text' onChange={(e)=>setUsername(e.target.value)}/>
        <input style={{padding:"10px",marginBottom:"20px"}} type='password' onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login