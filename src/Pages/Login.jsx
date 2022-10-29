import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { login } from '../redux/apiCalls'
import {useDispatch, useSelector} from 'react-redux';

const Container = styled.div`
width:100vw;
height:100vh;
background: linear-gradient(
    rgba(255,255,255,0.5),
    rgba(255,255,255,0.5)),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
    background-size:cover;
    display:flex;
    align-items:center;
    justify-content:center;`

const Wrapper = styled.div`
    padding:20px;
    width:25%;
    background-color:white;
    ${mobile({width:'75%'})}
`

const Title = styled.h1`
    font-size:25px;
    font-weight:300;
`

const Form = styled.form`
    display:flex;
    flex-direction:column;

`

const Input = styled.input`
flex:1;
min-width:40%;
margin:10px 0px;
padding:10px;
`

const Button = styled.button`
border:none;
padding: 15px 20px;
width:40%;
background-color:teal;
color:white;
cursor:pointer;
margin-bottom:5px;
&:disabled{
    cursor:not-allowed;
 }`

const Link = styled.a`
margin:5px 0px;
font-size:12px;
text-decoration:underline;
cursor:pointer;`

const Logo = styled.h1`
font-size:50px;
text-align:center;
margin:15px 0px;`

const Error = styled.p`
color:red;`
const Login = () => {

    const dispatch = useDispatch();
    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);
    const {isFetching,error} = useSelector(state=>state.user)

    const loginHandler = (e) =>{
        e.preventDefault();
        dispatch(login({username,password}));
    }
  return (
    <Container>
        <Wrapper>
        <Logo>Clothes Shop.</Logo>

            <Title>Sign in</Title>
            <Form onSubmit={loginHandler}>
                <Input placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
                <Input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
            
                <Button type='submit' disabled={isFetching}>Login</Button>
                {error && <Error>{error}</Error>}
                <Link>Do not you remember the password</Link>
                <Link>Create new Account</Link>

            </Form>        
        </Wrapper>
    </Container>
  )
}

export default Login