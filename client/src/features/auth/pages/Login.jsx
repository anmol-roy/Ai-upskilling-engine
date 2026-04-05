import React, { useState } from 'react';
import './auth.form.scss';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/useauth';

const Login = () => {
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate(); // ✅ moved to top

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const success = await handleLogin({ email, password });

    // ✅ navigate after login (if success)
    if (success) {
      navigate('/'); // change route if needed
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <main>
        <div className="form-container">
          <h1>Login</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-group">

              <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit">Login</button>
            </div>
          </form>

          <p>
            Don't have an account?{" "}
            <span onClick={() => navigate('/register')}>
              Register
            </span>
          </p>

        </div>
      </main>
    </div>
  );
};

export default Login;