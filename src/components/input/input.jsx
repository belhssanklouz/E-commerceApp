import React from 'react'
import './input.css'

const Input = (props) => {
    const {label,type,onChange,value} = props;
    const num = Math.round((Math.random()*2)+10);
  return (
    <span className={`input input--minoru ${value && "input--filled"}`}>
        <input className="input__field input__field--yoko" type={type} onChange={onChange} id={`input-${num}`}/>
        <label className="input__label input__label--yoko" for={`input-${num}`}>
            <span class="input__label-content input__label-content--yoko">{label}</span>
        </label>
    </span>
  )
}

export default Input