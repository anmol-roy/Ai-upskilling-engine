import React from 'react'
import './auth.form.scss'
import {useNavigate} from "react-router-dom";
const Register = () => {
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
    }
  return (
    <div>
      <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit} >
                <div className="input-group">


                <input type="text" placeholder='username' />
                <input type="text" placeholder='email' />
                <input type="password" placeholder='password' />
                <button type='submit'>Register</button>
                </div>
            </form>
            <p>Already have an account? <span onClick={() => navigate('/login')}>Login</span></p>
        </div>
      </main>
    </div>
  )
}

export default Register
