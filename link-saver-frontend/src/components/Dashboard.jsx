import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiTrash2, FiExternalLink } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { LINK_API_END_POINT } from '../../utils/constant';

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState('');

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const { data } = await axios.get(`${LINK_API_END_POINT}/getLinks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      setLinks(data);
    } catch (err) {
      toast.error('Failed to fetch links');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      toast.warning("Please enter a URL");
    return;
    }

    try {
      const { data } = await axios.post(`${LINK_API_END_POINT}/links`, { url }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      try {
        const favicon = `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}`;
        const updatedLink = await axios.patch(`${LINK_API_END_POINT}/updateLinks/${data._id}`, {
          title: data.url,
          favicon
        },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        setLinks([updatedLink.data, ...links]);
      } catch {
        setLinks([data, ...links]);
      }
      
      setUrl('');
      toast.success('Link saved successfully');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save link');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${LINK_API_END_POINT}/deleteLinks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setLinks(prevLinks => prevLinks.filter(link => link._id !== id));
      toast.success('Link deleted successfully');
      
    } catch (err) {
      toast.error('Failed to delete link');

      fetchLinks();
    }
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          color: '#111827'
        }}>My Links</h1>
        
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex' }}>
            <input
              type="url"
              placeholder="Paste a URL to save"
              style={{
                flexGrow: 1,
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRight: 'none',
                borderRadius: '0.375rem 0 0 0.375rem',
                outline: 'none',
                ':focus': {
                  borderColor: '#4f46e5',
                  boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.2)'
                }
              }}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#4f46e5',
                color: 'white',
                padding: '0 1rem',
                border: 'none',
                borderRadius: '0 0.375rem 0.375rem 0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s',
                ':hover': {
                  backgroundColor: '#4338ca'
                },
                ':focus': {
                  outline: 'none',
                  boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.2)'
                }
              }}
            >
              <FiPlus style={{ marginRight: '0.25rem' }} /> Save
            </button>
          </div>
        </form>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {links.length === 0 ? (
            <p style={{ color: '#6b7280', textAlign: 'center' }}>
              No links saved yet. Add your first link above.
            </p>
          ) : (
            links.map(link => (
              <div key={link._id} style={{
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'box-shadow 0.2s',
                ':hover': {
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    {link.favicon && (
                      <img 
                        src={link.favicon} 
                        alt="favicon" 
                        style={{
                          width: '20px',
                          height: '20px',
                          marginTop: '0.25rem',
                          marginRight: '0.75rem'
                        }} 
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    )}
                    <div>
                      <h3 style={{ fontWeight: '500', margin: 0 }}>
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            color: '#111827',
                            textDecoration: 'none',
                            transition: 'color 0.2s',
                            ':hover': {
                              color: '#4f46e5'
                            }
                          }}
                        >
                          {link.title || link.url} <FiExternalLink style={{
                            display: 'inline',
                            marginLeft: '0.25rem',
                            fontSize: '0.875rem'
                          }} />
                        </a>
                      </h3>
                      <p style={{
                        color: '#6b7280',
                        fontSize: '0.875rem',
                        marginTop: '0.25rem'
                      }}>
                        {new URL(link.url).hostname}
                      </p>
                      {link.summary && (
                        <div style={{
                          marginTop: '0.5rem',
                          color: '#374151',
                          backgroundColor: '#f9fafb',
                          padding: '0.5rem',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem'
                        }}>
                          {link.summary.length > 200 ? `${link.summary.substring(0, 200)}...` : link.summary}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(link._id)}
                    style={{
                      color: '#ef4444',
                      padding: '0.25rem',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                      ':hover': {
                        color: '#dc2626'
                      }
                    }}
                    title="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;