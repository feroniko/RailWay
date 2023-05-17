import React from 'react'
import './Button.css'
function Button({name, links}) {
  return (
    <button id='login' type='submit' >
        <a className='buttona' >
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		{name}
	</a>
    </button>
  )
}

export default Button