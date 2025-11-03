import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderOne from '../layout/Header copy';
import chair from "../assets/bamboo_chair.jpg";
import table from "../assets/bamboo_table.jpg";
import thread from "../assets/bamboo_thead.jpg";
import axios from 'axios';

const Checkout = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');

    const [cartItems] = useState([
        {
            id: 1,
            name: 'Bamboo Lounge Chair',
            price: 299,
            image: chair,
            quantity: 1,
        },
        {
            id: 2,
            name: 'Bamboo Dining Table',
            price: 599,
            image: table,
            quantity: 1,
        },
        {
            id: 3,
            name: 'Bamboo Thread Set',
            price: 89,
            image: thread,
            quantity: 2,
        }
    ]);

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: '',
    });


  
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const getSubtotal = () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const getShipping = () => getSubtotal() > 500 ? 0 : 49;
    const getTax = () => getSubtotal() * 0.08;
    const getTotal = () => getSubtotal() + getShipping() + getTax();

    const generateOrderNumber = () => 'BMB' + Date.now().toString().slice(-8);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        setTimeout(() => {
            setOrderNumber(generateOrderNumber());
            setIsProcessing(false);
            setOrderComplete(true);
            window.scrollTo(0, 0);
        }, 2000);
    };

    const continueShopping = () => navigate('/products');

    if (orderComplete) {
        return (
            <div style={{
                width: '100%',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
                marginTop: isMobile ? '70px' : '100px',
                minHeight: '100vh',
                overflowX: 'hidden'
            }}>
                <HeaderOne />

                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    padding: isMobile ? '40px 15px' : '100px 20px',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: isMobile ? '50px' : '80px',
                        color: '#7DBA00',
                        marginBottom: isMobile ? '15px' : '20px'
                    }}>
                        ✅
                    </div>

                    <h1 style={{
                        fontSize: isMobile ? '1.3rem' : '2rem',
                        fontWeight: '600',
                        color: '#434242',
                        marginBottom: isMobile ? '10px' : '15px',
                        padding: '0 10px'
                    }}>
                        Order Confirmed!
                    </h1>

                    <p style={{
                        fontSize: isMobile ? '13px' : '16px',
                        color: '#666',
                        lineHeight: '1.5',
                        marginBottom: isMobile ? '8px' : '10px',
                        padding: '0 15px'
                    }}>
                        Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                    </p>

                    <p style={{
                        fontSize: isMobile ? '12px' : '14px',
                        color: '#57C7C2',
                        fontWeight: '600',
                        marginBottom: isMobile ? '20px' : '30px',
                        padding: '8px 12px',
                        backgroundColor: 'rgba(87, 199, 194, 0.1)',
                        borderRadius: '6px',
                        display: 'inline-block',
                        wordBreak: 'break-all'
                    }}>
                        Order #: {orderNumber}
                    </p>

                    <button
                        onClick={continueShopping}
                        style={{
                            padding: isMobile ? '12px 20px' : '14px 30px',
                            backgroundColor: '#7DBA00',
                            border: 'none',
                            color: '#FFFFFF',
                            fontSize: isMobile ? '14px' : '16px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            width: isMobile ? '90%' : 'auto',
                            maxWidth: isMobile ? '280px' : '280px',
                            transition: 'all 0.3s ease',
                            margin: '0 auto',
                            display: 'block'
                        }}
                        onMouseEnter={(e) => {
                            if (!isMobile) {
                                e.target.style.backgroundColor = '#6aa800';
                                e.target.style.transform = 'translateY(-2px)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isMobile) {
                                e.target.style.backgroundColor = '#7DBA00';
                                e.target.style.transform = 'translateY(0)';
                            }
                        }}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            width: '100%',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
            marginTop: isMobile ? '70px' : '100px',
            minHeight: '100vh',
            overflowX: 'hidden'
        }}>
            <HeaderOne />

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: isMobile ? '10px 8px' : '40px 20px',
                boxSizing: 'border-box'
            }}>
                {/* Header with Progress Steps */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: isMobile ? '20px' : '40px',
                    padding: isMobile ? '0 5px' : '0'
                }}>
                    <h1 style={{
                        fontSize: isMobile ? '1.3rem' : '2.5rem',
                        fontWeight: '600',
                        color: '#434242',
                        marginBottom: isMobile ? '12px' : '20px',
                        padding: isMobile ? '0 5px' : '0',
                        wordWrap: 'break-word'
                    }}>
                        Checkout
                    </h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr',
                        gap: isMobile ? '20px' : '40px',
                        alignItems: 'start'
                    }}>
                        {/* Checkout Form */}
                        <div style={{
                            width: '100%',
                            overflow: 'hidden'
                        }}>
                            {/* Contact Information */}
                            <div style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: isMobile ? '8px' : '12px',
                                padding: isMobile ? '15px' : '30px',
                                marginBottom: isMobile ? '15px' : '30px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                border: '1px solid rgba(227, 153, 99, 0.1)',
                                width: '100%',
                                boxSizing: 'border-box'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: isMobile ? '15px' : '25px'
                                }}>
                                    <div style={{
                                        width: isMobile ? '18px' : '24px',
                                        height: isMobile ? '18px' : '24px',
                                        backgroundColor: '#57C7C2',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: isMobile ? '9px' : '12px',
                                        flexShrink: 0
                                    }}>
                                        1
                                    </div>
                                    <h2 style={{
                                        fontSize: isMobile ? '1rem' : '1.3rem',
                                        fontWeight: '600',
                                        color: '#434242',
                                        margin: 0,
                                        wordWrap: 'break-word'
                                    }}>
                                        Contact Information
                                    </h2>
                                </div>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email Address *"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: isMobile ? '10px' : '14px',
                                        border: '2px solid rgba(87, 199, 194, 0.2)',
                                        borderRadius: '6px',
                                        fontSize: isMobile ? '13px' : '15px',
                                        transition: 'all 0.3s ease',
                                        backgroundColor: '#F8F8F8',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#57C7C2';
                                        e.target.style.backgroundColor = '#FFFFFF';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(87, 199, 194, 0.2)';
                                        e.target.style.backgroundColor = '#F8F8F8';
                                    }}
                                />
                            </div>

                            {/* Shipping Address */}
                            <div style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: isMobile ? '8px' : '12px',
                                padding: isMobile ? '15px' : '30px',
                                marginBottom: isMobile ? '15px' : '30px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                border: '1px solid rgba(227, 153, 99, 0.1)',
                                width: '100%',
                                boxSizing: 'border-box'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: isMobile ? '15px' : '25px'
                                }}>
                                    <div style={{
                                        width: isMobile ? '18px' : '24px',
                                        height: isMobile ? '18px' : '24px',
                                        backgroundColor: '#57C7C2',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: isMobile ? '9px' : '12px',
                                        flexShrink: 0
                                    }}>
                                        2
                                    </div>
                                    <h2 style={{
                                        fontSize: isMobile ? '1rem' : '1.3rem',
                                        fontWeight: '600',
                                        color: '#434242',
                                        margin: 0,
                                        wordWrap: 'break-word'
                                    }}>
                                        Shipping Address
                                    </h2>
                                </div>

                                <div style={{
                                    display: 'grid',
                                    gap: isMobile ? '12px' : '20px',
                                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                                    width: '100%'
                                }}>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="First Name *"
                                        required
                                        style={{
                                            padding: isMobile ? '10px' : '14px',
                                            border: '2px solid rgba(87, 199, 194, 0.2)',
                                            borderRadius: '6px',
                                            fontSize: isMobile ? '13px' : '15px',
                                            transition: 'all 0.3s ease',
                                            backgroundColor: '#F8F8F8',
                                            width: '100%',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#57C7C2';
                                            e.target.style.backgroundColor = '#FFFFFF';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'rgba(87, 199, 194, 0.2)';
                                            e.target.style.backgroundColor = '#F8F8F8';
                                        }}
                                    />

                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Last Name *"
                                        required
                                        style={{
                                            padding: isMobile ? '10px' : '14px',
                                            border: '2px solid rgba(87, 199, 194, 0.2)',
                                            borderRadius: '6px',
                                            fontSize: isMobile ? '13px' : '15px',
                                            transition: 'all 0.3s ease',
                                            backgroundColor: '#F8F8F8',
                                            width: '100%',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#57C7C2';
                                            e.target.style.backgroundColor = '#FFFFFF';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'rgba(87, 199, 194, 0.2)';
                                            e.target.style.backgroundColor = '#F8F8F8';
                                        }}
                                    />

                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Address *"
                                        required
                                        style={{
                                            gridColumn: isMobile ? '1' : '1 / -1',
                                            padding: isMobile ? '10px' : '14px',
                                            border: '2px solid rgba(87, 199, 194, 0.2)',
                                            borderRadius: '6px',
                                            fontSize: isMobile ? '13px' : '15px',
                                            transition: 'all 0.3s ease',
                                            backgroundColor: '#F8F8F8',
                                            width: '100%',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#57C7C2';
                                            e.target.style.backgroundColor = '#FFFFFF';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'rgba(87, 199, 194, 0.2)';
                                            e.target.style.backgroundColor = '#F8F8F8';
                                        }}
                                    />

                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="City *"
                                        required
                                        style={{
                                            padding: isMobile ? '10px' : '14px',
                                            border: '2px solid rgba(87, 199, 194, 0.2)',
                                            borderRadius: '6px',
                                            fontSize: isMobile ? '13px' : '15px',
                                            transition: 'all 0.3s ease',
                                            backgroundColor: '#F8F8F8',
                                            width: '100%',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#57C7C2';
                                            e.target.style.backgroundColor = '#FFFFFF';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'rgba(87, 199, 194, 0.2)';
                                            e.target.style.backgroundColor = '#F8F8F8';
                                        }}
                                    />

                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        placeholder="State *"
                                        required
                                        style={{
                                            padding: isMobile ? '10px' : '14px',
                                            border: '2px solid rgba(87, 199, 194, 0.2)',
                                            borderRadius: '6px',
                                            fontSize: isMobile ? '13px' : '15px',
                                            transition: 'all 0.3s ease',
                                            backgroundColor: '#F8F8F8',
                                            width: '100%',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#57C7C2';
                                            e.target.style.backgroundColor = '#FFFFFF';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'rgba(87, 199, 194, 0.2)';
                                            e.target.style.backgroundColor = '#F8F8F8';
                                        }}
                                    />

                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        placeholder="ZIP Code *"
                                        required
                                        style={{
                                            padding: isMobile ? '10px' : '14px',
                                            border: '2px solid rgba(87, 199, 194, 0.2)',
                                            borderRadius: '6px',
                                            fontSize: isMobile ? '13px' : '15px',
                                            transition: 'all 0.3s ease',
                                            backgroundColor: '#F8F8F8',
                                            width: '100%',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#57C7C2';
                                            e.target.style.backgroundColor = '#FFFFFF';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'rgba(87, 199, 194, 0.2)';
                                            e.target.style.backgroundColor = '#F8F8F8';
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Payment Information */}
                            <div style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: isMobile ? '8px' : '12px',
                                padding: isMobile ? '15px' : '30px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                border: '1px solid rgba(227, 153, 99, 0.1)',
                                width: '100%',
                                boxSizing: 'border-box'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: isMobile ? '15px' : '25px'
                                }}>
                                    <div style={{
                                        width: isMobile ? '18px' : '24px',
                                        height: isMobile ? '18px' : '24px',
                                        backgroundColor: '#57C7C2',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: isMobile ? '9px' : '12px',
                                        flexShrink: 0
                                    }}>
                                        3
                                    </div>
                                    <h2 style={{
                                        fontSize: isMobile ? '1rem' : '1.3rem',
                                        fontWeight: '600',
                                        color: '#434242',
                                        margin: 0,
                                        wordWrap: 'break-word'
                                    }}>
                                        Payment Information
                                    </h2>
                                </div>

                                <div style={{ display: 'grid', gap: isMobile ? '12px' : '20px', width: '100%' }}>
                                    <input
                                        type="text"
                                        name="nameOnCard"
                                        value={formData.nameOnCard}
                                        onChange={handleInputChange}
                                        placeholder="Name on Card *"
                                        required
                                        style={{
                                            padding: isMobile ? '10px' : '14px',
                                            border: '2px solid rgba(87, 199, 194, 0.2)',
                                            borderRadius: '6px',
                                            fontSize: isMobile ? '13px' : '15px',
                                            transition: 'all 0.3s ease',
                                            backgroundColor: '#F8F8F8',
                                            width: '100%',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#57C7C2';
                                            e.target.style.backgroundColor = '#FFFFFF';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'rgba(87, 199, 194, 0.2)';
                                            e.target.style.backgroundColor = '#F8F8F8';
                                        }}
                                    />

                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                        placeholder="Card Number *"
                                        required
                                        style={{
                                            padding: isMobile ? '10px' : '14px',
                                            border: '2px solid rgba(87, 199, 194, 0.2)',
                                            borderRadius: '6px',
                                            fontSize: isMobile ? '13px' : '15px',
                                            transition: 'all 0.3s ease',
                                            backgroundColor: '#F8F8F8',
                                            width: '100%',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#57C7C2';
                                            e.target.style.backgroundColor = '#FFFFFF';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'rgba(87, 199, 194, 0.2)';
                                            e.target.style.backgroundColor = '#F8F8F8';
                                        }}
                                    />

                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: isMobile ? '12px' : '20px',
                                        width: '100%'
                                    }}>
                                        <input
                                            type="text"
                                            name="expiryDate"
                                            value={formData.expiryDate}
                                            onChange={handleInputChange}
                                            placeholder="MM/YY *"
                                            required
                                            style={{
                                                padding: isMobile ? '10px' : '14px',
                                                border: '2px solid rgba(87, 199, 194, 0.2)',
                                                borderRadius: '6px',
                                                fontSize: isMobile ? '13px' : '15px',
                                                transition: 'all 0.3s ease',
                                                backgroundColor: '#F8F8F8',
                                                width: '100%',
                                                boxSizing: 'border-box'
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = '#57C7C2';
                                                e.target.style.backgroundColor = '#FFFFFF';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = 'rgba(87, 199, 194, 0.2)';
                                                e.target.style.backgroundColor = '#F8F8F8';
                                            }}
                                        />

                                        <input
                                            type="text"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            placeholder="CVV *"
                                            required
                                            style={{
                                                padding: isMobile ? '10px' : '14px',
                                                border: '2px solid rgba(87, 199, 194, 0.2)',
                                                borderRadius: '6px',
                                                fontSize: isMobile ? '13px' : '15px',
                                                transition: 'all 0.3s ease',
                                                backgroundColor: '#F8F8F8',
                                                width: '100%',
                                                boxSizing: 'border-box'
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = '#57C7C2';
                                                e.target.style.backgroundColor = '#FFFFFF';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = 'rgba(87, 199, 194, 0.2)';
                                                e.target.style.backgroundColor = '#F8F8F8';
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: isMobile ? '8px' : '12px',
                            padding: isMobile ? '15px' : '30px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            border: '1px solid rgba(227, 153, 99, 0.1)',
                            position: isMobile ? 'static' : 'sticky',
                            top: isMobile ? '0' : '120px',
                            width: '100%',
                            boxSizing: 'border-box'
                        }}>
                            <h2 style={{
                                fontSize: isMobile ? '1rem' : '1.3rem',
                                fontWeight: '600',
                                color: '#434242',
                                marginBottom: isMobile ? '15px' : '25px',
                                paddingBottom: isMobile ? '10px' : '15px',
                                borderBottom: '2px solid #E37DCC',
                                wordWrap: 'break-word'
                            }}>
                                Order Summary
                            </h2>

                            <div style={{ marginBottom: isMobile ? '15px' : '25px' }}>
                                {cartItems.map((item, index) => (
                                    <div key={item.id} style={{
                                        display: 'flex',
                                        gap: isMobile ? '10px' : '15px',
                                        padding: isMobile ? '10px 0' : '15px 0',
                                        borderBottom: '1px solid rgba(87, 199, 194, 0.2)',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{
                                            width: isMobile ? '45px' : '60px',
                                            height: isMobile ? '45px' : '60px',
                                            borderRadius: '6px',
                                            overflow: 'hidden',
                                            flexShrink: 0,
                                            border: '2px solid rgba(125, 186, 0, 0.2)'
                                        }}>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <h4 style={{
                                                fontSize: isMobile ? '12px' : '14px',
                                                fontWeight: '600',
                                                color: '#434242',
                                                margin: '0 0 4px 0',
                                                wordWrap: 'break-word'
                                            }}>
                                                {item.name}
                                            </h4>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}>
                                                <span style={{
                                                    fontSize: isMobile ? '11px' : '13px',
                                                    color: '#E39963',
                                                    fontWeight: '500',
                                                    flexShrink: 0
                                                }}>
                                                    Qty: {item.quantity}
                                                </span>
                                                <span style={{
                                                    fontSize: isMobile ? '12px' : '15px',
                                                    fontWeight: '600',
                                                    color: index % 3 === 0 ? '#E37DCC' : index % 3 === 1 ? '#7DBA00' : '#57C7C2',
                                                    flexShrink: 0
                                                }}>
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: isMobile ? '8px' : '12px',
                                marginBottom: isMobile ? '15px' : '25px'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: isMobile ? '13px' : '15px', color: '#666' }}>Subtotal</span>
                                    <span style={{ fontSize: isMobile ? '13px' : '15px', fontWeight: '500' }}>${getSubtotal().toFixed(2)}</span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: isMobile ? '13px' : '15px', color: '#666' }}>Shipping</span>
                                    <span style={{
                                        fontSize: isMobile ? '13px' : '15px',
                                        fontWeight: '500',
                                        color: getShipping() === 0 ? '#7DBA00' : '#E37DCC'
                                    }}>
                                        {getShipping() === 0 ? 'FREE' : `$${getShipping().toFixed(2)}`}
                                    </span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: isMobile ? '13px' : '15px', color: '#666' }}>Tax</span>
                                    <span style={{ fontSize: isMobile ? '13px' : '15px', fontWeight: '500' }}>${getTax().toFixed(2)}</span>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingTop: isMobile ? '12px' : '20px',
                                borderTop: '2px solid #57C7C2',
                                marginBottom: isMobile ? '15px' : '25px'
                            }}>
                                <span style={{
                                    fontSize: isMobile ? '14px' : '18px',
                                    fontWeight: '600',
                                    color: '#434242'
                                }}>
                                    Total
                                </span>
                                <span style={{
                                    fontSize: isMobile ? '14px' : '18px',
                                    fontWeight: '600',
                                    color: '#7DBA00'
                                }}>
                                    ${getTotal().toFixed(2)}
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                style={{
                                    width: '100%',
                                    padding: isMobile ? '12px' : '16px',
                                    backgroundColor: isProcessing ? '#ccc' : '#7DBA00',
                                    border: 'none',
                                    color: '#fff',
                                    fontSize: isMobile ? '14px' : '16px',
                                    fontWeight: '600',
                                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                                    borderRadius: '6px',
                                    marginBottom: isMobile ? '10px' : '15px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isMobile && !isProcessing) {
                                        e.target.style.backgroundColor = '#6aa800';
                                        e.target.style.transform = 'translateY(-2px)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isMobile && !isProcessing) {
                                        e.target.style.backgroundColor = '#7DBA00';
                                        e.target.style.transform = 'translateY(0)';
                                    }
                                }}
                            >
                                {isProcessing ? 'Processing...' : `Pay $${getTotal().toFixed(2)}`}
                            </button>

                            <div style={{
                                fontSize: isMobile ? '10px' : '12px',
                                color: '#57C7C2',
                                textAlign: 'center',
                                fontWeight: '500'
                            }}>
                                🔒 Secure checkout powered by Stripe
                            </div>

                            {/* Trust Badges */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: isMobile ? '5px' : '10px',
                                marginTop: isMobile ? '12px' : '20px',
                                paddingTop: isMobile ? '12px' : '20px',
                                borderTop: '1px solid rgba(227, 153, 99, 0.2)'
                            }}>
                                {[
                                    { text: '🌱 Sustainable', color: '#7DBA00' },
                                    { text: '🚚 Free Shipping', color: '#57C7C2' },
                                    { text: '✅ 5-Year Warranty', color: '#E37DCC' }
                                ].map((badge, index) => (
                                    <div key={index} style={{
                                        fontSize: isMobile ? '9px' : '11px',
                                        color: badge.color,
                                        fontWeight: '600',
                                        textAlign: 'center',
                                        lineHeight: '1.2'
                                    }}>
                                        {badge.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;