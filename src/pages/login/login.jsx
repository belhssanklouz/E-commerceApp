import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../components/input/input';
import { login } from '../../redux/apiCalls';
import './login.css'

const Login = () => {
    const error = useSelector(state=>state.user.error)
    console.log(error)
    const dispatch = useDispatch();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const handleLogin = (e) =>{
        e.preventDefault();
        dispatch(login({username,password}))
    }
    console.log(false && true)
  return (
    <div className='container__login'>
      <div className="row__login">
        <div className="row__leftlogin">
          <h2 className='form__header'>Login to you dashboard</h2>
          <form onSubmit={handleLogin}>
          <Input type='text' onChange={(e)=>setUsername(e.target.value)} label='Username' value={username}/>
          <Input type='password' onChange={(e)=>setPassword(e.target.value)} label="Password" value={password} />
          <button type='submit' className='button button--wayra button--border-medium button--text-upper button--size-s button--text-thick'>Login</button>
          </form>
          <p>{error}</p>
        </div>
        <div className="row__right">
          <h1>SHOP Dashboard.</h1>
        </div>
      </div>
    </div>
  )
}

export default Login