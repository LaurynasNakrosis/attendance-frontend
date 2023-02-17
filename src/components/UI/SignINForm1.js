import React from 'react'
import { useState } from 'react'


import './SignInForm.css'
import Button from './Button'
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }


const getLinkStyle = ({isActive}) => (isActive ? 'navSelected' : null);
const SignINForm1 = ({ onAdd, setToken}) => {
   
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();


    
  
    

  return (
    
    <form className='signin-form' >
    <div className='signin-control'>
    <label>Email</label>
      <input
        type='username'
        placeholder='Enter Email'
        value={username}
        onChange={e => setUserName(e.target.value)}/>
    </div>

    <div className='signin-control'>
      <label>Password</label>
      <input
        type='password'
        placeholder='Enter Password'
        value={password}
        onChange={e => setPassword(e.target.value)}/>
    </div>
    
    <Button onClick="" color='green' text='Sign In' className='btn-size'/> 

  </form>
  )

};
SignINForm1.propTypes = {
    setToken: PropTypes.func.isRequired
  };
export default SignINForm1
