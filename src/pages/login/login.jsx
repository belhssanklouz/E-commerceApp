import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../components/input/input';
import { login } from '../../redux/apiCalls';
import { useForm } from '../../useForm';
import { VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH } from '../../validators';
import './login.css'


const Login = () => {

  const [formState , inputHandler] = useForm({
    username:{
        value :'',
        isValid: false
    },
    password:{
        value :'',
        isValid: false
    }
},false);

    const error = useSelector(state=>state.user.error)
    const dispatch = useDispatch();
    // const [username,setUsername] = useState("");
    // const [password,setPassword] = useState("");

    const handleLogin = (e) =>{
      const username = formState.inputs.username.value;
      const password = formState.inputs.password.value;
        e.preventDefault();
        dispatch(login({username,password}))
    }
  return (
    <div className='container__login'>
      <div className="row__login">
        <div className="row__leftlogin">
          <h2 className='form__header'>Login to you dashboard</h2>
          <form onSubmit={handleLogin}>
          <Input id="username" type='text' onInput={inputHandler} label='Username' errormsg="This field is required" validators={[VALIDATOR_REQUIRE()]}/>
          <Input id="password" type='password' onInput={inputHandler} label="Password" errormsg='Enter at least 3 characters' validators={[VALIDATOR_MINLENGTH(3)]}/>
          <button disabled={!formState.isValid} type='submit' className='button button--wayra button--border-medium button--text-upper button--size-s button--text-thick'>Login</button>
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