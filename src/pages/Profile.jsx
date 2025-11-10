import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderOne from '../layout/Header copy';
import API from '../api';

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        fetchUserProfile();
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem("user"));
            const id = user?._id;

            if (!id) {
                setError("User not found. Please login again.");
                setLoading(false);
                return;
            }

            console.log("🔄 Fetching user profile for:", id);

            const response = await API.get(`/customer/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log("✅ Profile API Response:", response);
            setUserData(response.data);
            setEditData(response.data);

        } catch (error) {
            console.error("❌ Profile API Error:", error);
            setError(error.response?.data?.message || "Failed to fetch profile");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        navigate('/login');
    };

    const handleEditToggle = () => {
        if (isEditing) {
            // Cancel editing - reset form data
            setEditData(userData);
            setUpdateSuccess(false);
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (field, value) => {
        setEditData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleUpdateProfile = async () => {
        try {
            setUpdateLoading(true);
            setError(null);

            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem("user"));
            const id = user?._id;

            if (!id) {
                setError("User not found. Please login again.");
                return;
            }

            console.log("🔄 Updating profile for:", id);
            console.log("📝 Update data:", editData);

            const response = await API.put(
                `/customer/${id}`,
                {
                    name: editData.name,
                    email: editData.email,
                    phone: editData.phone,
                    address: editData.address
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log("✅ Profile update response:", response);

            // Update local storage with new user data
            const updatedUser = {
                ...user,
                name: editData.name,
                email: editData.email
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            setUserData(response.data);
            setIsEditing(false);
            setUpdateSuccess(true);
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                setUpdateSuccess(false);
            }, 3000);

        } catch (error) {
            console.error("❌ Profile update error:", error);
            setError(error.response?.data?.message || "Failed to update profile");
        } finally {
            setUpdateLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div style={{
                width: '100%',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
                marginTop: isMobile ? '70px' : '100px',
                padding: '50px 20px',
                textAlign: 'center',
                backgroundColor: '#FFFFFF',
                minHeight: '100vh'
            }}>
                <HeaderOne />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '50vh'
                }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '3px solid #F2EDE8',
                        borderTop: '3px solid #E39963',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        marginBottom: '20px'
                    }}></div>
                    <h3 style={{
                        fontSize: isMobile ? '1.2rem' : '1.5rem',
                        fontWeight: '300',
                        color: '#434242',
                        margin: 0
                    }}>
                        Loading your profile...
                    </h3>
                </div>
            </div>
        );
    }

    if (error && !userData) {
        return (
            <div style={{
                width: '100%',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
                marginTop: isMobile ? '70px' : '100px',
                padding: '50px 20px',
                textAlign: 'center',
                backgroundColor: '#FFFFFF',
                minHeight: '100vh'
            }}>
                <HeaderOne />
                <div style={{
                    maxWidth: '500px',
                    margin: '0 auto',
                    padding: '40px 20px'
                }}>
                    <div style={{
                        fontSize: '4rem',
                        color: '#E39963',
                        marginBottom: '20px'
                    }}>
                        ⚠️
                    </div>
                    <h3 style={{
                        fontSize: isMobile ? '1.3rem' : '1.5rem',
                        fontWeight: '400',
                        color: '#434242',
                        marginBottom: '15px'
                    }}>
                        Oops! Something went wrong
                    </h3>
                    <p style={{
                        color: '#434242',
                        opacity: 0.7,
                        marginBottom: '30px',
                        lineHeight: '1.6'
                    }}>
                        {error}
                    </p>
                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <button 
                            onClick={fetchUserProfile}
                            style={{
                                padding: '12px 30px',
                                backgroundColor: '#E39963',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.3s ease',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}
                        >
                            Try Again
                        </button>
                        <button 
                            onClick={() => navigate('/')}
                            style={{
                                padding: '12px 30px',
                                backgroundColor: 'transparent',
                                color: '#434242',
                                border: '1px solid #434242',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.3s ease',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            width: '100%',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
            marginTop: isMobile ? '70px' : '100px',
            backgroundColor: '#FFFFFF',
            minHeight: '100vh',
            overflowX: 'hidden'
        }}>
            <HeaderOne />
            
            {/* Success Message */}
            {updateSuccess && (
                <div style={{
                    position: 'fixed',
                    top: isMobile ? '80px' : '110px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#4CAF50',
                    color: '#FFFFFF',
                    padding: '15px 25px',
                    borderRadius: '8px',
                    zIndex: 1000,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    animation: 'slideDown 0.3s ease'
                }}>
                    ✅ Profile updated successfully!
                </div>
            )}

            {/* Main Content */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: isMobile ? '20px 15px' : '60px 40px'
            }}>
                {/* Header Section */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'stretch' : 'flex-start',
                    marginBottom: isMobile ? '30px' : '50px',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '20px' : '0'
                }}>
                    <div style={{
                        textAlign: isMobile ? 'center' : 'left'
                    }}>
                        <h1 style={{
                            fontSize: isMobile ? '1.8rem' : '2.5rem',
                            fontWeight: '300',
                            color: '#434242',
                            margin: '0 0 8px 0',
                            letterSpacing: '-0.5px',
                            lineHeight: '1.2'
                        }}>
                            My Profile
                        </h1>
                        <p style={{
                            color: '#434242',
                            opacity: 0.7,
                            margin: 0,
                            fontSize: isMobile ? '0.9rem' : '1.1rem',
                            lineHeight: '1.4'
                        }}>
                            {isEditing ? 'Edit your profile information' : 'Manage your account information and preferences'}
                        </p>
                    </div>
                    
                    {!isMobile && (
                        <button
                            onClick={handleLogout}
                            style={{
                                padding: '12px 30px',
                                backgroundColor: 'transparent',
                                border: '1px solid #E39963',
                                color: '#E39963',
                                cursor: 'pointer',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.3s ease',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}
                        >
                            Sign Out
                        </button>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        backgroundColor: '#FFEBEE',
                        border: '1px solid #FFCDD2',
                        color: '#C62828',
                        padding: '15px 20px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        ⚠️ {error}
                        <button 
                            onClick={() => setError(null)}
                            style={{
                                marginLeft: 'auto',
                                background: 'none',
                                border: 'none',
                                color: '#C62828',
                                cursor: 'pointer',
                                fontSize: '18px'
                            }}
                        >
                            ×
                        </button>
                    </div>
                )}

                {/* Profile Cards Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
                    gap: isMobile ? '25px' : '40px',
                    alignItems: 'flex-start'
                }}>
                    {/* Main Profile Information */}
                    <div style={{
                        backgroundColor: '#F8F8F8',
                        padding: isMobile ? '25px 20px' : '40px',
                        borderRadius: '15px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: isMobile ? '30px' : '40px',
                            flexDirection: isMobile ? 'column' : 'row',
                            gap: isMobile ? '20px' : '40px',
                            textAlign: isMobile ? 'center' : 'left'
                        }}>
                            {/* Profile Avatar */}
                            <div style={{
                                width: isMobile ? '100px' : '120px',
                                height: isMobile ? '100px' : '120px',
                                borderRadius: '50%',
                                backgroundColor: '#E39963',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#FFFFFF',
                                fontSize: isMobile ? '2rem' : '2.5rem',
                                fontWeight: '300',
                                flexShrink: 0
                            }}>
                                {userData?.name?.charAt(0) || 'U'}
                            </div>
                            
                            <div style={{
                                width: isMobile ? '100%' : 'auto'
                            }}>
                                <h2 style={{
                                    fontSize: isMobile ? '1.5rem' : '2.2rem',
                                    fontWeight: '300',
                                    color: '#434242',
                                    margin: '0 0 6px 0',
                                    letterSpacing: '-0.5px',
                                    lineHeight: '1.2'
                                }}>
                                    {userData?.name || 'No Name'}
                                </h2>
                                <p style={{
                                    color: '#434242',
                                    opacity: 0.7,
                                    margin: '0 0 4px 0',
                                    fontSize: isMobile ? '1rem' : '1.1rem',
                                    lineHeight: '1.3'
                                }}>
                                    {userData?.email || 'No Email'}
                                </p>
                                <p style={{
                                    color: '#E39963',
                                    margin: 0,
                                    fontSize: isMobile ? '0.8rem' : '0.9rem',
                                    fontWeight: '500',
                                    lineHeight: '1.3'
                                }}>
                                    Member since {formatDate(userData?.createdAt)}
                                </p>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div style={{ marginBottom: isMobile ? '30px' : '40px' }}>
                            <h3 style={{
                                fontSize: isMobile ? '1.1rem' : '1.3rem',
                                fontWeight: '400',
                                color: '#434242',
                                margin: '0 0 20px 0',
                                paddingBottom: '12px',
                                borderBottom: '2px solid #E39963'
                            }}>
                                Personal Information
                            </h3>
                            
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                                gap: isMobile ? '20px' : '25px'
                            }}>
                                {/* Full Name */}
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: isMobile ? '0.8rem' : '0.9rem',
                                        color: '#434242',
                                        opacity: 0.7,
                                        marginBottom: '6px',
                                        fontWeight: '500',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Full Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editData.name || ''}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            style={{
                                                padding: isMobile ? '12px' : '15px',
                                                backgroundColor: '#FFFFFF',
                                                borderRadius: '8px',
                                                border: '1px solid #E39963',
                                                color: '#434242',
                                                fontSize: isMobile ? '0.9rem' : '1rem',
                                                width: '90%',
                                                outline: 'none'
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            padding: isMobile ? '12px' : '15px',
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: '8px',
                                            border: '1px solid #F2EDE8',
                                            color: '#434242',
                                            fontSize: isMobile ? '0.9rem' : '1rem',
                                            minHeight: isMobile ? '44px' : 'auto',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            {userData?.name || 'Not provided'}
                                        </div>
                                    )}
                                </div>
                                
                                {/* Phone Number */}
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: isMobile ? '0.8rem' : '0.9rem',
                                        color: '#434242',
                                        opacity: 0.7,
                                        marginBottom: '6px',
                                        fontWeight: '500',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Phone Number
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={editData.phone || ''}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            style={{
                                                padding: isMobile ? '12px' : '15px',
                                                backgroundColor: '#FFFFFF',
                                                borderRadius: '8px',
                                                border: '1px solid #E39963',
                                                color: '#434242',
                                                fontSize: isMobile ? '0.9rem' : '1rem',
                                                width: '90%',
                                                outline: 'none'
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            padding: isMobile ? '12px' : '15px',
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: '8px',
                                            border: '1px solid #F2EDE8',
                                            color: '#434242',
                                            fontSize: isMobile ? '0.9rem' : '1rem',
                                            minHeight: isMobile ? '44px' : 'auto',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            {userData?.phone || 'Not provided'}
                                        </div>
                                    )}
                                </div>
                                
                                {/* Email Address */}
                                <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
                                    <label style={{
                                        display: 'block',
                                        fontSize: isMobile ? '0.8rem' : '0.9rem',
                                        color: '#434242',
                                        opacity: 0.7,
                                        marginBottom: '6px',
                                        fontWeight: '500',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Email Address
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={editData.email || ''}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            style={{
                                                padding: isMobile ? '12px' : '15px',
                                                backgroundColor: '#FFFFFF',
                                                borderRadius: '8px',
                                                border: '1px solid #E39963',
                                                color: '#434242',
                                                fontSize: isMobile ? '0.9rem' : '1rem',
                                                width: '95%',
                                                outline: 'none'
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            padding: isMobile ? '12px' : '15px',
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: '8px',
                                            border: '1px solid #F2EDE8',
                                            color: '#434242',
                                            fontSize: isMobile ? '0.9rem' : '1rem',
                                            minHeight: isMobile ? '44px' : 'auto',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            {userData?.email || 'Not provided'}
                                        </div>
                                    )}
                                </div>
                                
                                {/* Address */}
                                <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
                                    <label style={{
                                        display: 'block',
                                        fontSize: isMobile ? '0.8rem' : '0.9rem',
                                        color: '#434242',
                                        opacity: 0.7,
                                        marginBottom: '6px',
                                        fontWeight: '500',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Address
                                    </label>
                                    {isEditing ? (
                                        <textarea
                                            value={editData.address || ''}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            rows={3}
                                            style={{
                                                padding: isMobile ? '12px' : '15px',
                                                backgroundColor: '#FFFFFF',
                                                borderRadius: '8px',
                                                border: '1px solid #E39963',
                                                color: '#434242',
                                                fontSize: isMobile ? '0.9rem' : '1rem',
                                                width: '95%',
                                                outline: 'none',
                                                resize: 'vertical',
                                                fontFamily: 'inherit'
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            padding: isMobile ? '12px' : '15px',
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: '8px',
                                            border: '1px solid #F2EDE8',
                                            color: '#434242',
                                            fontSize: isMobile ? '0.9rem' : '1rem',
                                            lineHeight: '1.5',
                                            minHeight: isMobile ? '60px' : 'auto'
                                        }}>
                                            {userData?.address || 'No address provided'}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{
                            display: 'flex',
                            gap: isMobile ? '12px' : '15px',
                            flexWrap: 'wrap',
                            flexDirection: isMobile ? 'column' : 'row'
                        }}>
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleUpdateProfile}
                                        disabled={updateLoading}
                                        style={{
                                            padding: isMobile ? '14px 20px' : '15px 30px',
                                            backgroundColor: updateLoading ? '#cccccc' : '#E39963',
                                            color: '#FFFFFF',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: updateLoading ? 'not-allowed' : 'pointer',
                                            fontSize: isMobile ? '13px' : '14px',
                                            fontWeight: '500',
                                            transition: 'all 0.3s ease',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            flex: isMobile ? '1' : 'none',
                                            minHeight: isMobile ? '44px' : 'auto',
                                            width: isMobile ? '100%' : 'auto'
                                        }}
                                    >
                                        {updateLoading ? (
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                                <div style={{
                                                    width: '14px',
                                                    height: '14px',
                                                    border: '2px solid transparent',
                                                    borderTop: '2px solid currentColor',
                                                    borderRadius: '50%',
                                                    animation: 'spin 1s linear infinite'
                                                }}></div>
                                                Saving...
                                            </div>
                                        ) : (
                                            'Save Changes'
                                        )}
                                    </button>
                                    <button
                                        onClick={handleEditToggle}
                                        disabled={updateLoading}
                                        style={{
                                            padding: isMobile ? '14px 20px' : '15px 30px',
                                            backgroundColor: 'transparent',
                                            color: '#434242',
                                            border: '1px solid #434242',
                                            borderRadius: '8px',
                                            cursor: updateLoading ? 'not-allowed' : 'pointer',
                                            fontSize: isMobile ? '13px' : '14px',
                                            fontWeight: '500',
                                            transition: 'all 0.3s ease',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            flex: isMobile ? '1' : 'none',
                                            minHeight: isMobile ? '44px' : 'auto',
                                            width: isMobile ? '100%' : 'auto'
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleEditToggle}
                                    style={{
                                        padding: isMobile ? '14px 20px' : '15px 30px',
                                        backgroundColor: '#E39963',
                                        color: '#FFFFFF',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: isMobile ? '13px' : '14px',
                                        fontWeight: '500',
                                        transition: 'all 0.3s ease',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        flex: isMobile ? '1' : 'none',
                                        minHeight: isMobile ? '44px' : 'auto',
                                        width: isMobile ? '100%' : 'auto'
                                    }}
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Account Details */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: isMobile ? '20px' : '30px'
                    }}>
                        {/* Account Status Card */}
                        <div style={{
                            backgroundColor: '#F8F8F8',
                            padding: isMobile ? '20px' : '30px',
                            borderRadius: '15px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                width: isMobile ? '50px' : '60px',
                                height: isMobile ? '50px' : '60px',
                                backgroundColor: '#E39963',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 15px',
                                color: '#FFFFFF',
                                fontSize: isMobile ? '1.2rem' : '1.5rem'
                            }}>
                                ✓
                            </div>
                            <h3 style={{
                                fontSize: isMobile ? '1.1rem' : '1.2rem',
                                fontWeight: '500',
                                color: '#434242',
                                margin: '0 0 8px 0',
                                lineHeight: '1.2'
                            }}>
                                Account Verified
                            </h3>
                            <p style={{
                                color: '#434242',
                                opacity: 0.7,
                                margin: 0,
                                fontSize: isMobile ? '0.8rem' : '0.9rem',
                                lineHeight: '1.4'
                            }}>
                                Your account is active and verified
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div style={{
                            backgroundColor: '#F8F8F8',
                            padding: isMobile ? '20px' : '30px',
                            borderRadius: '15px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                        }}>
                            <h3 style={{
                                fontSize: isMobile ? '1.1rem' : '1.2rem',
                                fontWeight: '500',
                                color: '#434242',
                                margin: '0 0 20px 0',
                                paddingBottom: '12px',
                                borderBottom: '1px solid #E0E0E0'
                            }}>
                                Account Details
                            </h3>
                            
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: isMobile ? '15px' : '20px'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingBottom: '12px',
                                    borderBottom: '1px solid #F2EDE8'
                                }}>
                                    <span style={{
                                        color: '#434242',
                                        opacity: 0.7,
                                        fontSize: isMobile ? '0.8rem' : '0.9rem'
                                    }}>
                                        Member Since
                                    </span>
                                    <span style={{
                                        color: '#434242',
                                        fontWeight: '500',
                                        fontSize: isMobile ? '0.8rem' : '0.9rem',
                                        textAlign: 'right'
                                    }}>
                                        {formatDate(userData?.createdAt)}
                                    </span>
                                </div>
                                
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingBottom: '12px',
                                    borderBottom: '1px solid #F2EDE8'
                                }}>
                                    <span style={{
                                        color: '#434242',
                                        opacity: 0.7,
                                        fontSize: isMobile ? '0.8rem' : '0.9rem'
                                    }}>
                                        Last Updated
                                    </span>
                                    <span style={{
                                        color: '#434242',
                                        fontWeight: '500',
                                        fontSize: isMobile ? '0.8rem' : '0.9rem',
                                        textAlign: 'right'
                                    }}>
                                        {formatDate(userData?.updatedAt)}
                                    </span>
                                </div>
                                
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span style={{
                                        color: '#434242',
                                        opacity: 0.7,
                                        fontSize: isMobile ? '0.8rem' : '0.9rem'
                                    }}>
                                        User ID
                                    </span>
                                    <span style={{
                                        color: '#434242',
                                        fontWeight: '500',
                                        fontSize: isMobile ? '0.7rem' : '0.8rem',
                                        fontFamily: 'monospace',
                                        textAlign: 'right'
                                    }}>
                                        {userData?._id?.substring(0, 8)}...
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Sign Out Button */}
                        {isMobile && (
                            <button
                                onClick={handleLogout}
                                style={{
                                    padding: '16px 20px',
                                    backgroundColor: 'transparent',
                                    border: '1px solid #E39963',
                                    color: '#E39963',
                                    cursor: 'pointer',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    transition: 'all 0.3s ease',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    width: '100%',
                                    minHeight: '50px'
                                }}
                            >
                                Sign Out
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Add CSS for animations */}
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @keyframes slideDown {
                        0% { transform: translateX(-50%) translateY(-20px); opacity: 0; }
                        100% { transform: translateX(-50%) translateY(0); opacity: 1; }
                    }
                `}
            </style>
        </div>
    );
};

export default Profile;