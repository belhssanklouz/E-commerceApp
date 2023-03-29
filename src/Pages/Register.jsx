import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Inputs from '../Components/Input'
import { signUp } from '../redux/apiCalls'
import { inputChange } from '../redux/reducers/registerReducer'
import { mobile } from '../responsive'
import './register.css'

const Container = styled.div`
width:100vw;
height:100vh;
background: linear-gradient(
    rgba(255,255,255,0.5),
    rgba(255,255,255,0.5)),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
    display:flex;
    align-items:center;
    justify-content:center;`

const Wrapper = styled.div`
    padding:20px;
    width:40%;
    background-color:white;
    ${mobile({width:'75%'})}
`

const Title = styled.h1`
    font-size:25px;
    font-weight:300;
`

const Form = styled.form`
    display:flex;
    flex-wrap:wrap;
`

// const Input = styled.input`
// flex:1;
// min-width:40%;
// margin:20px 10px 0px 0px;
// padding:10px;
// ${props=>props.exists && 
//     `border:2px solid red`}
// `

const Aggrement = styled.span`
font-size:12px;
margin : 20px 0px;`

const Button = styled.button`
border:none;
padding: 15px 20px;
width:40%;
background-color:teal;
color:white;
cursor:pointer;
    ${props=>props.disabled && `
        cursor:not-allowed;
        background-color:gray;
    `}
    ${props=>props.btnLoading ? `
    animation-duration: 2s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: animationloading;
    animation-timing-function: linear;
    background-color: #f6f7f8;
    background: linear-gradient(to right, #eeeeee 8%, #bbbbbb 18%, #eeeeee 33%);
    background-size: 800px 104px;
    position: relative;
    cursor:not-allowed;
    `:""}
    `


const Register = () => {
    const dispatch = useDispatch()
    const [input,setInput] = useState({});
    const response = useSelector(state=>state.register.registerResponse);
    const loading = useSelector(state=>state.register.isFetching);

    const handleInput = (e) =>{
        const {name,value} = e.target;
        setInput({...input,[name]:value})
        if(name==="email" || name==="username"){
            dispatch(inputChange())
        }
    }
    const handleCreateUser = (e) =>{
        e.preventDefault();
        const {retypepassword,firstname,lastname,...allValues} = input;
        dispatch(signUp({...allValues,fullname:firstname+" "+lastname}));
    }

  return (
    <Container>
        <Wrapper>  
            <Title>Create an account</Title>
            <Form onSubmit={handleCreateUser}>
                <Inputs onChange={handleInput} name="firstname" placeholder="first name" />
                <Inputs onChange={handleInput} name="lastname" placeholder="last name" />
                <Inputs onChange={handleInput} name="username" placeholder="username" existError={response==="username already exist"} error={response} required />
                <Inputs onChange={handleInput} name="email" placeholder="email" type="email" existError={response==="email already exist"} error={response} required />
                <Inputs onChange={handleInput} name="password" placeholder="password" type="password" required />
                <Inputs onChange={handleInput} name="retypepassword" placeholder="confirm password" type='password' required/>
                <Aggrement>By creating an account, I consent to the processing of my personal
                    data in accordance with the <b>PRIVACY POLICY</b>
                </Aggrement>
                <Button btnLoading={loading} disabled={input?.password !== input?.retypepassword }>Create</Button>
            </Form>        
        </Wrapper>
    </Container>
  )
}

export default Register