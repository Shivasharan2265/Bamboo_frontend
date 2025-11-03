import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import HeaderOne from '../layout/Header copy';

const VerifyEmail = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [isMobile, setIsMobile] = useState(false);
    const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
    const [message, setMessage] = useState('');

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Verify the email token
        if (token) {
            verifyEmailToken();
        }

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, [token]);

    const verifyEmailToken = async () => {
        try {
            const response = await axios.post(`http://localhost:5055/api/customer/register/${token}`);
            
            console.log("✅ Email verification successful:", response.data);
            
            // Store the token and user data
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('user', JSON.stringify({
                    _id: response.data._id,
                    name: response.data.name,
                    email: response.data.email
                }));
            }
            
            setStatus('success');
            setMessage(response.data.message || 'Email verified successfully! You can now login.');
            
        } catch (error) {
            console.error("❌ Email verification error:", error);
            setStatus('error');
            setMessage(error.response?.data?.message || 'Email verification failed. The link may have expired.');
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    const handleHomeRedirect = () => {
        navigate('/');
    };

    return (
        <div style={{
            width: '100%',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
            marginTop: isMobile ? '70px' : '100px',
            overflowX: 'hidden',
            backgroundColor: '#FFFFFF',
            minHeight: '100vh',
            position: 'relative'
        }}>
            <HeaderOne />
            
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: isMobile ? '40px 15px' : '80px 50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: isMobile ? '60vh' : '70vh'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: isMobile ? '100%' : '500px',
                    backgroundColor: '#F8F8F8',
                    borderRadius: isMobile ? '12px' : '15px',
                    padding: isMobile ? '30px 20px' : '50px',
                    border: '1px solid rgba(87, 199, 194, 0.1)',
                    boxShadow: '0 5px 25px rgba(0, 0, 0, 0.05)',
                    textAlign: 'center'
                }}>
                    {status === 'verifying' && (
                        <>
                            <div style={{
                                fontSize: '48px',
                                marginBottom: '20px',
                                color: '#57C7C2'
                            }}>
                                ⏳
                            </div>
                            <h2 style={{
                                fontSize: isMobile ? '1.5rem' : '1.8rem',
                                fontWeight: '400',
                                color: '#434242',
                                marginBottom: '15px'
                            }}>
                                Verifying Your Email
                            </h2>
                            <p style={{
                                color: '#666',
                                fontSize: isMobile ? '14px' : '16px',
                                lineHeight: '1.5'
                            }}>
                                Please wait while we verify your email address...
                            </p>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <div style={{
                                fontSize: '48px',
                                marginBottom: '20px',
                                color: '#7DBA00'
                            }}>
                                ✅
                            </div>
                            <h2 style={{
                                fontSize: isMobile ? '1.5rem' : '1.8rem',
                                fontWeight: '400',
                                color: '#434242',
                                marginBottom: '15px'
                            }}>
                                Email Verified!
                            </h2>
                            <p style={{
                                color: '#666',
                                fontSize: isMobile ? '14px' : '16px',
                                lineHeight: '1.5',
                                marginBottom: '30px'
                            }}>
                                {message}
                            </p>
                            <button
                                onClick={handleLoginRedirect}
                                style={{
                                    padding: isMobile ? '14px 25px' : '16px 30px',
                                    backgroundColor: '#7DBA00',
                                    border: 'none',
                                    color: '#FFFFFF',
                                    fontSize: isMobile ? '15px' : '16px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    borderRadius: '8px',
                                    marginRight: '10px'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#6aa800';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = '#7DBA00';
                                }}
                            >
                                Go to Login
                            </button>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <div style={{
                                fontSize: '48px',
                                marginBottom: '20px',
                                color: '#E37DCC'
                            }}>
                                ❌
                            </div>
                            <h2 style={{
                                fontSize: isMobile ? '1.5rem' : '1.8rem',
                                fontWeight: '400',
                                color: '#434242',
                                marginBottom: '15px'
                            }}>
                                Verification Failed
                            </h2>
                            <p style={{
                                color: '#666',
                                fontSize: isMobile ? '14px' : '16px',
                                lineHeight: '1.5',
                                marginBottom: '30px'
                            }}>
                                {message}
                            </p>
                            <button
                                onClick={handleHomeRedirect}
                                style={{
                                    padding: isMobile ? '14px 25px' : '16px 30px',
                                    backgroundColor: '#57C7C2',
                                    border: 'none',
                                    color: '#FFFFFF',
                                    fontSize: isMobile ? '15px' : '16px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    borderRadius: '8px'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#4bb3ae';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = '#57C7C2';
                                }}
                            >
                                Go to Home
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;