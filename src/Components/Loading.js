import React from 'react'
import Spinner from './Spinner.gif'
const Loading =()=>{

    return (
      <div>
    <div  className="text-center">
        <img src={Spinner} alt="Spinner" />
        </div>
      </div>
    )
  
}

export default Loading
