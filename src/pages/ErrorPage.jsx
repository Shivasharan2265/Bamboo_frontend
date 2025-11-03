import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HeaderOne from '../layout/Header copy';

const ErrorPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div style={{
            width: '100%',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
            margin: 0,
            overflowX: 'hidden',
            backgroundColor: '#FFFFFF',
            minHeight: '100vh'
        }}>
            <HeaderOne />

            {/* Main Content */}
            <div style={{
                padding: isMobile ? '60px 20px' : '120px 50px',
                minHeight: 'calc(100vh - 100px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FAF9F7'
            }}>
                <div style={{
                    maxWidth: '500px',
                    textAlign: 'center',
                    margin: '0 auto'
                }}>
                    {/* Bamboo Icon */}
                    
                    {/* Error Number */}
                    <div style={{
                        fontSize: isMobile ? '4rem' : '6rem',
                        fontWeight: '300',
                        color: '#E37DCC',
                        marginBottom: '20px',
                        lineHeight: 1
                    }}>
                        404
                    </div>

                    {/* Title */}
                    <h1 style={{
                        fontSize: isMobile ? '1.5rem' : '2rem',
                        fontWeight: '400',
                        color: '#434242',
                        marginBottom: '15px',
                        lineHeight: 1.3
                    }}>
                        Page Not Found
                    </h1>

                    {/* Description */}
                    <p style={{
                        fontSize: isMobile ? '1rem' : '1.1rem',
                        color: '#666',
                        lineHeight: 1.6,
                        marginBottom: '40px'
                    }}>
                        The page you're looking for doesn't exist or has been moved.
                    </p>

                 
                    {/* Action Buttons */}
                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <button
                            onClick={handleGoHome}
                            style={{
                                padding: isMobile ? '12px 30px' : '14px 35px',
                                backgroundColor: '#7DBA00',
                                border: 'none',
                                color: '#FFFFFF',
                                fontSize: isMobile ? '14px' : '15px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                borderRadius: '6px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#6aa300';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#7DBA00';
                            }}
                        >
                            Go Home
                        </button>

                        <button
                            onClick={handleGoBack}
                            style={{
                                padding: isMobile ? '12px 30px' : '14px 35px',
                                backgroundColor: 'transparent',
                                border: '2px solid #57C7C2',
                                color: '#57C7C2',
                                fontSize: isMobile ? '14px' : '15px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                borderRadius: '6px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#57C7C2';
                                e.target.style.color = '#FFFFFF';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#57C7C2';
                            }}
                        >
                            Go Back
                        </button>
                    </div>

                    {/* Quick Links */}
                    <div style={{
                        marginTop: '50px',
                        paddingTop: '30px',
                        borderTop: '1px solid #F0F0F0'
                    }}>
                        <p style={{
                            fontSize: '0.9rem',
                            color: '#999',
                            marginBottom: '15px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Quick Links
                        </p>
                        <div style={{
                            display: 'flex',
                            gap: '15px',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            {[
                                { label: 'Products', path: '/products' },
                                { label: 'Categories', path: '/categories' },
                                { label: 'About', path: '/about' }
                            ].map((link) => (
                                <button
                                    key={link.path}
                                    onClick={() => navigate(link.path)}
                                    style={{
                                        padding: '8px 16px',
                                        backgroundColor: 'transparent',
                                        border: '1px solid #E37DCC',
                                        color: '#E37DCC',
                                        fontSize: '12px',
                                        fontWeight: '400',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        borderRadius: '4px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = '#E37DCC';
                                        e.target.style.color = '#FFFFFF';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = 'transparent';
                                        e.target.style.color = '#E37DCC';
                                    }}
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Simple Footer */}
            <div style={{
                backgroundColor: '#434242',
                color: '#FFFFFF',
                padding: '20px',
                textAlign: 'center'
            }}>
                <p style={{
                    fontSize: '0.9rem',
                    margin: 0,
                    opacity: 0.8
                }}>
                    DooBamboo &copy; {new Date().getFullYear()} - Sustainable Bamboo Products
                </p>
            </div>
        </div>
    );
};

export default ErrorPage;