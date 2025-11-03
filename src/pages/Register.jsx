import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderOne from '../layout/Header copy';

const Register = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: ''
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

        if (!formData.name.trim()) {
            newErrors.name = 'Full name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

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

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (formData.phone && !/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleDirectRegistration = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            console.log("🔄 Attempting direct registration for:", formData.email);

            const response = await axios.post('http://localhost:5055/api/customer/register-direct', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                address: formData.address
            });

            console.log("✅ Registration successful:", response.data);
            
            // Store the token and user data
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('user', JSON.stringify({
                    _id: response.data._id,
                    name: response.data.name,
                    email: response.data.email,
                    phone: response.data.phone,
                    address: response.data.address
                }));
            }

            alert('Registration successful! Welcome to our community!');
            navigate('/products');
            
        } catch (error) {
            console.error("❌ Registration error:", {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
            
            let errorMessage = 'Registration failed. Please try again.';
            
            if (error.response) {
                if (error.response.status === 400) {
                    errorMessage = error.response.data?.message || 'This email is already registered. Please use a different email.';
                } else if (error.response.data?.message) {
                    errorMessage = error.response.data.message;
                }
            } else if (error.request) {
                errorMessage = 'Network error. Please check your connection.';
            }

            setErrors({ submit: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
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
                    >
                        Home
                    </span>
                    <span style={{ color: '#E37DCC' }}>›</span>
                    <span style={{
                        color: '#7DBA00',
                        fontSize: isMobile ? '12px' : '14px',
                        fontWeight: '500'
                    }}>
                        Register
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
                    maxWidth: isMobile ? '100%' : '500px',
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
                        Create Account
                    </h1>

                    <p style={{
                        fontSize: isMobile ? '14px' : '16px',
                        color: '#666',
                        textAlign: 'center',
                        marginBottom: isMobile ? '25px' : '35px',
                        lineHeight: '1.5'
                    }}>
                        Join our eco-friendly community today
                    </p>

                    <form onSubmit={handleDirectRegistration}>
                        {/* Name Field */}
                        <div style={{ marginBottom: isMobile ? '20px' : '25px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: isMobile ? '14px' : '15px',
                                fontWeight: '500',
                                color: '#434242',
                                marginBottom: '8px'
                            }}>
                                Full Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                style={{
                                    width: '100%',
                                    padding: isMobile ? '14px 16px' : '16px 20px',
                                    border: `1px solid ${errors.name ? '#E37DCC' : 'rgba(87, 199, 194, 0.3)'}`,
                                    borderRadius: '8px',
                                    fontSize: isMobile ? '15px' : '16px',
                                    backgroundColor: '#FFFFFF',
                                    transition: 'all 0.3s ease',
                                    outline: 'none',
                                    boxSizing: 'border-box'
                                }}
                            />
                            {errors.name && (
                                <div style={{
                                    color: '#E37DCC',
                                    fontSize: '13px',
                                    marginTop: '6px'
                                }}>
                                    ⚠️ {errors.name}
                                </div>
                            )}
                        </div>

                        {/* Email Field */}
                        <div style={{ marginBottom: isMobile ? '20px' : '25px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: isMobile ? '14px' : '15px',
                                fontWeight: '500',
                                color: '#434242',
                                marginBottom: '8px'
                            }}>
                                Email Address *
                            </label>
                            <input
                                type="email"
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
                            />
                            {errors.email && (
                                <div style={{
                                    color: '#E37DCC',
                                    fontSize: '13px',
                                    marginTop: '6px'
                                }}>
                                    ⚠️ {errors.email}
                                </div>
                            )}
                        </div>

                        {/* Phone Field (Optional) */}
                        <div style={{ marginBottom: isMobile ? '20px' : '25px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: isMobile ? '14px' : '15px',
                                fontWeight: '500',
                                color: '#434242',
                                marginBottom: '8px'
                            }}>
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Enter your phone number (optional)"
                                style={{
                                    width: '100%',
                                    padding: isMobile ? '14px 16px' : '16px 20px',
                                    border: `1px solid ${errors.phone ? '#E37DCC' : 'rgba(87, 199, 194, 0.3)'}`,
                                    borderRadius: '8px',
                                    fontSize: isMobile ? '15px' : '16px',
                                    backgroundColor: '#FFFFFF',
                                    transition: 'all 0.3s ease',
                                    outline: 'none',
                                    boxSizing: 'border-box'
                                }}
                            />
                            {errors.phone && (
                                <div style={{
                                    color: '#E37DCC',
                                    fontSize: '13px',
                                    marginTop: '6px'
                                }}>
                                    ⚠️ {errors.phone}
                                </div>
                            )}
                        </div>

                        {/* Address Field (Optional) */}
                        <div style={{ marginBottom: isMobile ? '20px' : '25px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: isMobile ? '14px' : '15px',
                                fontWeight: '500',
                                color: '#434242',
                                marginBottom: '8px'
                            }}>
                                Address
                            </label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Enter your address (optional)"
                                rows="3"
                                style={{
                                    width: '100%',
                                    padding: isMobile ? '14px 16px' : '16px 20px',
                                    border: `1px solid ${errors.address ? '#E37DCC' : 'rgba(87, 199, 194, 0.3)'}`,
                                    borderRadius: '8px',
                                    fontSize: isMobile ? '15px' : '16px',
                                    backgroundColor: '#FFFFFF',
                                    transition: 'all 0.3s ease',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    resize: 'vertical',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                        {/* Password Field */}
                        <div style={{ marginBottom: isMobile ? '20px' : '25px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: isMobile ? '14px' : '15px',
                                fontWeight: '500',
                                color: '#434242',
                                marginBottom: '8px'
                            }}>
                                Password *
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Create a password"
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
                            />
                            {errors.password && (
                                <div style={{
                                    color: '#E37DCC',
                                    fontSize: '13px',
                                    marginTop: '6px'
                                }}>
                                    ⚠️ {errors.password}
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div style={{ marginBottom: isMobile ? '20px' : '25px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: isMobile ? '14px' : '15px',
                                fontWeight: '500',
                                color: '#434242',
                                marginBottom: '8px'
                            }}>
                                Confirm Password *
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Confirm your password"
                                style={{
                                    width: '100%',
                                    padding: isMobile ? '14px 16px' : '16px 20px',
                                    border: `1px solid ${errors.confirmPassword ? '#E37DCC' : 'rgba(87, 199, 194, 0.3)'}`,
                                    borderRadius: '8px',
                                    fontSize: isMobile ? '15px' : '16px',
                                    backgroundColor: '#FFFFFF',
                                    transition: 'all 0.3s ease',
                                    outline: 'none',
                                    boxSizing: 'border-box'
                                }}
                            />
                            {errors.confirmPassword && (
                                <div style={{
                                    color: '#E37DCC',
                                    fontSize: '13px',
                                    marginTop: '6px'
                                }}>
                                    ⚠️ {errors.confirmPassword}
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
                                    fontSize: '14px'
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
                                    Creating Account...
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div style={{
                        textAlign: 'center',
                        fontSize: isMobile ? '14px' : '15px',
                        color: '#666'
                    }}>
                        Already have an account?{' '}
                        <button
                            type="button"
                            onClick={handleLoginRedirect}
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: '#57C7C2',
                                fontSize: 'inherit',
                                cursor: 'pointer',
                                fontWeight: '500',
                                textDecoration: 'underline'
                            }}
                        >
                            Login here
                        </button>
                    </div>
                </div>
            </div>

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

export default Register;