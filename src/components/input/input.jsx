import React,{useReducer , useEffect} from 'react'
import './input.css'
import { validate } from '../../validators';

const reducer =(state,action) =>{
  switch(action.type){
      case 'CHANGE':
          return {
              ...state,
              value:(action.value),
              isValid:validate(action.value,action.validators)
          };
          case 'TOUCH':
              return{
                  ...state,
                  isTouched:true
              };
          default : 
          return state;
  }
}

const Input = (props) => {
  
  //inputs Validator
  const [inputState,dispatch]= useReducer(reducer,{
    value:props.value || '',
    isTouched:false,
    isValid:props.valid || false});

   const inputHandler = (e) =>{
    dispatch({type:'CHANGE',
    value:e.target.value,
    validators: props.validators
    });
}

const touchHandler = () =>{
    dispatch({
        type:'TOUCH',

    })
}

const {id,onInput} = props;
const {value, isValid,isTouched}=inputState;

useEffect(()=>{
    onInput(id, value, isValid)
},[id,value,isValid,onInput]);


    const {label,type,errormsg} = props;
    const num = Math.round((Math.random()*2)+10);
  return (
    <span className={`input input--minoru ${value && "input--filled"}`}>
        <input id={`input-${num}`} className="input__field input__field--yoko" type={type} onChange={inputHandler} onBlur={touchHandler} />
        <label className="input__label input__label--yoko" for={`input-${num}`}>
            <span class="input__label-content input__label-content--yoko">{label}</span>
        </label>
        {!isValid && isTouched && <p>{errormsg}</p>}
    </span>
  )
}

export default Input