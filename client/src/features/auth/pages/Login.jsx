import React from 'react'
import './auth.form.scss'
import {Link, Links, useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
    }
  return (
    <div>
      <main>
        <div className="form-container">
            <h1>login</h1>
            <form onSubmit={handleSubmit} >
                <div className="input-group">

                <input type="text" placeholder='email' />
                <input type="password" placeholder='password' />
                <button type='submit'>Login</button>
                </div>
            </form>
            <p>Don't have an account? <span onClick={() => navigate('/register')}>Register</span></p>
            {/* <p><Links to={"./register"} >Register</Links></p> */}
        </div>
      </main>
    </div>
  )
}

export default Login
