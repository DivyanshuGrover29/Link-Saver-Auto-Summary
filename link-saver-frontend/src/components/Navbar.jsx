import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '64px'
        }}>
          <div style={{ display: 'flex' }}>
            <Link to="/" style={{
              display: 'flex',
              alignItems: 'center',
              color: '#4f46e5',
              fontWeight: 'bold',
              textDecoration: 'none',
              fontSize: '1.25rem'
            }}>
              Link Saver
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                style={{
                  color: '#4b5563',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  border: 'none',
                  background: 'transparent',
                  transition: 'color 0.2s',
                  ':hover': {
                    color: '#4f46e5'
                  }
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    color: '#4b5563',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    marginRight: '0.5rem',
                    transition: 'color 0.2s',
                    ':hover': {
                      color: '#4f46e5'
                    }
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  style={{
                    color: '#4b5563',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    ':hover': {
                      color: '#4f46e5'
                    }
                  }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;