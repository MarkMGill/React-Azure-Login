import React from 'react'
import {Link} from 'react-router-dom'

const Unauthorized = () => {
  return (
    <div  className='App'>
      <h2>Sorry you do not access to this page</h2>
      <Link to="/">Go to Home</Link>
    </div>
  )
}

export default Unauthorized