import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderOne from '../layout/Header copy';

const Login = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [formData, setFormData] = useState({
        email: '', // Changed from username to email to match your backend
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // Make API call to your backend login endpoint
            const response = await axios.post('http://localhost:5055/api/customer/login', {
                email: formData.email,
                password: formData.password
            });

            console.log("✅ Login successful:", response.data);

            // Store the token in localStorage
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('user', JSON.stringify({
                    _id: response.data._id,
                    name: response.data.name,
                    email: response.data.email,
                    address: response.data.address,
                    phone: response.data.phone,
                    image: response.data.image
                }));
            }

            // Show success message
            alert('Login successful!');

            // Redirect to products page or previous page
            navigate('/products');
            
        } catch (error) {
            console.error("❌ Login error:", error);
            
            let errorMessage = 'Login failed. Please try again.';
            
            if (error.response) {
                // Server responded with error status
                if (error.response.status === 401) {
                    errorMessage = 'Invalid email or password!';
                } else if (error.response.status === 500) {
                    errorMessage = 'Server error. Please try again later.';
                } else if (error.response.data?.message) {
                    errorMessage = error.response.data.message;
                }
            } else if (error.request) {
                // Request was made but no response received
                errorMessage = 'Network error. Please check your connection.';
            }

            setErrors({ submit: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            // Optional: Verify token is still valid
            navigate('/products');
        }
    }, [navigate]);

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
            
            {/* Breadcrumb */}
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: isMobile ? '15px 15px 10px' : '30px 50px 20px',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isMobile ? '6px' : '10px',
                    fontSize: isMobile ? '12px' : '14px',
                    color: '#666',
                    marginBottom: isMobile ? '15px' : '20px',
                    flexWrap: 'wrap',
                    justifyContent: isMobile ? 'center' : 'flex-start'
                }}>
                    <span
                        style={{ cursor: 'pointer', color: '#57C7C2' }}
                        onClick={() => navigate('/')}
                        onMouseEnter={(e) => {
                            e.target.style.color = '#7DBA00';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = '#57C7C2';
                        }}
                    >
                        Home
                    </span>
                    <span style={{ color: '#E37DCC' }}>›</span>
                    <span style={{
                        color: '#7DBA00',
                        fontSize: isMobile ? '12px' : '14px',
                        fontWeight: '500'
                    }}>
                        Login
                    </span>
                </div>
            </div>

            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: isMobile ? '0 15px 40px' : '0 50px 80px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: isMobile ? '60vh' : '70vh'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: isMobile ? '100%' : '450px',
                    backgroundColor: '#F8F8F8',
                    borderRadius: isMobile ? '12px' : '15px',
                    padding: isMobile ? '25px 20px' : '40px',
                    border: '1px solid rgba(87, 199, 194, 0.1)',
                    boxShadow: '0 5px 25px rgba(0, 0, 0, 0.05)'
                }}>
                    <h1 style={{
                        fontSize: isMobile ? '1.8rem' : '2.2rem',
                        fontWeight: '400',
                        color: '#434242',
                        marginBottom: isMobile ? '10px' : '15px',
                        textAlign: 'center'
                    }}>
                        Welcome Back
                    </h1>

                    <p style={{
                        fontSize: isMobile ? '14px' : '16px',
                        color: '#666',
                        textAlign: 'center',
                        marginBottom: isMobile ? '25px' : '35px',
                        lineHeight: '1.5'
                    }}>
                        Sign in to your account to continue
                    </p>

                    <form onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div style={{ marginBottom: isMobile ? '20px' : '25px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: isMobile ? '14px' : '15px',
                                fontWeight: '500',
                                color: '#434242',
                                marginBottom: '8px'
                            }}>
                                Email Address
                            </label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email address"
                                style={{
                                    width: '100%',
                                    padding: isMobile ? '14px 16px' : '16px 20px',
                                    border: `1px solid ${errors.email ? '#E37DCC' : 'rgba(87, 199, 194, 0.3)'}`,
                                    borderRadius: '8px',
                                    fontSize: isMobile ? '15px' : '16px',
                                    backgroundColor: '#FFFFFF',
                                    transition: 'all 0.3s ease',
                                    outline: 'none',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#57C7C2';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(87, 199, 194, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = errors.email ? '#E37DCC' : 'rgba(87, 199, 194, 0.3)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                            {errors.email && (
                                <div style={{
                                    color: '#E37DCC',
                                    fontSize: '13px',
                                    marginTop: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}>
                                    ⚠️ {errors.email}
                                </div>
                            )}
                        </div>

                        {/* Password Field */}
                        <div style={{ marginBottom: isMobile ? '20px' : '25px' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '8px'
                            }}>
                                <label style={{
                                    fontSize: isMobile ? '14px' : '15px',
                                    fontWeight: '500',
                                    color: '#434242'
                                }}>
                                    Password
                                </label>
                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: '#57C7C2',
                                        fontSize: isMobile ? '13px' : '14px',
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                        transition: 'color 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.color = '#7DBA00';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = '#57C7C2';
                                    }}
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                style={{
                                    width: '100%',
                                    padding: isMobile ? '14px 16px' : '16px 20px',
                                    border: `1px solid ${errors.password ? '#E37DCC' : 'rgba(87, 199, 194, 0.3)'}`,
                                    borderRadius: '8px',
                                    fontSize: isMobile ? '15px' : '16px',
                                    backgroundColor: '#FFFFFF',
                                    transition: 'all 0.3s ease',
                                    outline: 'none',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#57C7C2';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(87, 199, 194, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = errors.password ? '#E37DCC' : 'rgba(87, 199, 194, 0.3)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                            {errors.password && (
                                <div style={{
                                    color: '#E37DCC',
                                    fontSize: '13px',
                                    marginTop: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}>
                                    ⚠️ {errors.password}
                                </div>
                            )}
                        </div>

                        {/* Submit Error */}
                        {errors.submit && (
                            <div style={{
                                backgroundColor: 'rgba(227, 125, 204, 0.1)',
                                border: '1px solid rgba(227, 125, 204, 0.3)',
                                borderRadius: '8px',
                                padding: isMobile ? '12px' : '15px',
                                marginBottom: '20px',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    color: '#E37DCC',
                                    fontSize: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px'
                                }}>
                                    ⚠️ {errors.submit}
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: isMobile ? '16px' : '18px',
                                backgroundColor: isLoading ? '#cccccc' : '#7DBA00',
                                border: 'none',
                                color: '#FFFFFF',
                                fontSize: isMobile ? '16px' : '17px',
                                fontWeight: '500',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                borderRadius: '8px',
                                marginBottom: isMobile ? '20px' : '25px',
                                opacity: isLoading ? 0.7 : 1
                            }}
                            onMouseEnter={(e) => {
                                if (!isLoading && !isMobile) {
                                    e.target.style.backgroundColor = '#6aa800';
                                    e.target.style.transform = 'translateY(-2px)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isLoading && !isMobile) {
                                    e.target.style.backgroundColor = '#7DBA00';
                                    e.target.style.transform = 'translateY(0)';
                                }
                            }}
                        >
                            {isLoading ? (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <div style={{
                                        width: '16px',
                                        height: '16px',
                                        border: '2px solid transparent',
                                        borderTop: '2px solid #FFFFFF',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }}></div>
                                    Signing In...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div style={{
                        textAlign: 'center',
                        fontSize: isMobile ? '14px' : '15px',
                        color: '#666'
                    }}>
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={handleSignUp}
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: '#57C7C2',
                                fontSize: 'inherit',
                                cursor: 'pointer',
                                fontWeight: '500',
                                textDecoration: 'underline',
                                transition: 'color 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.color = '#7DBA00';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#57C7C2';
                            }}
                        >
                            Sign up here
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: isMobile ? '8px' : '15px',
                        marginTop: isMobile ? '25px' : '35px',
                        paddingTop: isMobile ? '20px' : '25px',
                        borderTop: '1px solid rgba(87, 199, 194, 0.2)'
                    }}>
                        {['🔒 Secure Login', '🌱 Eco-Friendly', '✅ Verified'].map((badge, index) => (
                            <div key={index} style={{
                                fontSize: isMobile ? '10px' : '11px',
                                color: index === 0 ? '#7DBA00' : index === 1 ? '#57C7C2' : '#E37DCC',
                                fontWeight: '500',
                                textAlign: 'center',
                                lineHeight: '1.3'
                            }}>
                                {badge}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add CSS for spinner animation */}
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};

export default Login;