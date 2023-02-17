import React from 'react'
import { useState } from 'react'


import './SignInForm.css'

import Button from './Button'

const getLinkStyle = ({isActive}) => (isActive ? 'navSelected' : null);
const SignInForm = ({ onAdd}) => {

    const [text, setText] = useState('')
    const [password, setPassword] = useState('')
    
  
    const onSubmit = (e) => {
      e.preventDefault()
  
      if (!text) {
        alert('Please enter Email')
        return
      }
      
      if (!password) {
        alert('Please enter Password')
        return
      }

      onSubmit({ text, password })
  
      setText('')
      setPassword('')
    }

  return (
    <form className='signin-form' onSubmit={onSubmit}>
    <div className='signin-control'>
    <label>Email</label>
      <input
        type='text'
        placeholder='Enter Email'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>

    <div className='signin-control'>
      <label>Password</label>
      <input
        type='password'
        placeholder='Enter Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <Button onClick="" color='green' text='Sign In' className='btn-size'/> 

  </form>
  )
}

export default SignInForm