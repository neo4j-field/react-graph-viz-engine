
import React from 'react'

const Button = ({label = 'Hello world', disabled=false}) => {
   return   <button disabled={disabled}>{label}</button>
}
 
export default Button;