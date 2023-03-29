import styled from "styled-components";

const InputContainer = styled.div`
margin:20px 10px 0px 0px;
min-width:40%;
flex:1;
display:flex;
flex-direction:column;
`
const Input = styled.input`
padding:10px;
    ${props=>props.exists && 
    `border:2px solid red`}`
const Error = styled.div`
opacity:${props=>props.display ? `1` : `0`};
color:red;
padding-left:10px;
transition:0.5s ease-in-out;`

function Inputs({name,placeholder,onChange,type,existError,error,required}){
    return (
        <InputContainer>
            <Input name={name} placeholder={placeholder} onChange={onChange} type={type} exists={existError} required={required} />
            <Error display={existError}>{error}</Error>
        </InputContainer>
    )
}
export default Inputs