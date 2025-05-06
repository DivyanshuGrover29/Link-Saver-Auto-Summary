import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaLock } from 'react-icons/fa';
import { USER_API_END_POINT } from '../../utils/constant';

const AuthPage = ({ setIsAuthenticated, isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? `${USER_API_END_POINT}/login` : `${USER_API_END_POINT}/register`;
      const { data } = await axios.post(endpoint, { email, password });
      console.log("API RESPONSE", data);
      localStorage.setItem('token', data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setIsAuthenticated(true);

      if(isLogin) {
      navigate('/dashboard');
      } else{
        navigate('/login');
        alert("Account created successfully. Please login to continue.");
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f3f4f6'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '28rem',
        padding: '2rem',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Email
            </label>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              padding: '0 0.75rem',
              backgroundColor: 'white'
            }}>
              <FaUser style={{ 
                color: '#9ca3af',
                marginRight: '0.5rem',
                flexShrink: 0
              }} />
              <input
                id="email"
                name="email"
                type="email"
                required
                style={{
                  flex: 1,
                  padding: '0.5rem 0',
                  border: 'none',
                  outline: 'none',
                  background: 'transparent'
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password" style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Password
            </label>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              padding: '0 0.75rem',
              backgroundColor: 'white'
            }}>
              <FaLock style={{ 
                color: '#9ca3af',
                marginRight: '0.5rem',
                flexShrink: 0
              }} />
              <input
                id="password"
                name="password"
                type="password"
                required
                style={{
                  flex: 1,
                  padding: '0.5rem 0',
                  border: 'none',
                  outline: 'none',
                  background: 'transparent'
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                padding: '0.5rem 1rem',
                border: '1px solid transparent',
                borderRadius: '0.375rem',
                backgroundColor: '#4f46e5',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: '500',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                cursor: 'pointer'
              }}
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={() => navigate(isLogin ? '/signup' : '/login')}
            style={{
              color: '#4f46e5',
              fontSize: '0.875rem',
              textDecoration: 'none',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;