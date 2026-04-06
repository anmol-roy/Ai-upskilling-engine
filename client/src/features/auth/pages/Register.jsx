import React from 'react'
import './auth.form.scss'
import {useNavigate} from "react-router-dom";
import { useAuth } from '../hooks/useauth';
const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { handleRegister, loading } = useAuth();




    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleRegister({ username, email, password });
        navigate('/login');
        // Handle login logic here
    }

    if (loading) {
        return <div>Loading...</div>;
    }
  return (
    <div>
      <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit} >
                <div className="input-group">


                <input
                  onChange={(e) => setUsername(e.target.value)}
                 type="text" placeholder='username' />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                 type="text" placeholder='email' />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                 type="password" placeholder='password' />
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
