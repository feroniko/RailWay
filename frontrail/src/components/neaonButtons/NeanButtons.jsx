import React from 'react'
import './NeonButtom.css'

function NeanButtons({name_className, togle,button_name}) {
  return (
    <button className='body_neonButton' type='button' onClick={togle} >
        <div className="content"> 
            <div className={name_className} >
                <button> {button_name} </button>
            </div>
        </div>
    </button>
  )
}

export default NeanButtons