import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderOne from '../layout/Header copy';
import chair from "../assets/bamboo_chair.jpg";
import table from "../assets/bamboo_table.jpg";
import thread from "../assets/bamboo_thead.jpg";
import spoon from "../assets/bamboo_spoon.jpeg";

const Cart = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Bamboo Lounge Chair',
            price: 299,
            image: chair,
            description: 'Elegant seating with natural curves',
            quantity: 1,
            category: 'chairs'
        },
        {
            id: 2,
            name: 'Bamboo Dining Table',
            price: 599,
            image: table,
            description: 'Modern table for family gatherings',
            quantity: 1,
            category: 'tables'
        },
        {
            id: 3,
            name: 'Bamboo Thread Set',
            price: 89,
            image: thread,
            description: 'Handcrafted decorative threads',
            quantity: 2,
            category: 'accessories'
        }
    ]);

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

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(cartItems.map(item => 
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const getSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getShipping = () => {
        return getSubtotal() > 500 ? 0 : 49;
    };

    const getTax = () => {
        return getSubtotal() * 0.08; // 8% tax
    };

    const getTotal = () => {
        return getSubtotal() + getShipping() + getTax();
    };

    const proceedToCheckout = () => {
        // Here you would typically integrate with a payment processor
       navigate("/checkout")
    };

    const continueShopping = () => {
        navigate('/products');
    };

    if (cartItems.length === 0) {
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
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: isMobile ? '80px 20px' : '100px 50px',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: isMobile ? '80px' : '120px',
                        color: '#F8F8F8',
                        marginBottom: isMobile ? '20px' : '30px'
                    }}>
                        🛒
                    </div>
                    
                    <h1 style={{
                        fontSize: isMobile ? '1.8rem' : '2.5rem',
                        fontWeight: '400',
                        color: '#434242',
                        marginBottom: isMobile ? '15px' : '20px',
                        lineHeight: '1.3'
                    }}>
                        Your Cart is Empty
                    </h1>
                    
                    <p style={{
                        fontSize: isMobile ? '16px' : '18px',
                        color: '#666',
                        lineHeight: '1.6',
                        marginBottom: isMobile ? '30px' : '40px',
                        maxWidth: '500px',
                        margin: '0 auto',
                        padding: isMobile ? '0 10px' : '0'
                    }}>
                        Discover our sustainable bamboo collection and find the perfect pieces for your home.
                    </p>
                    
                    <button
                        onClick={continueShopping}
                        style={{
                            padding: isMobile ? '14px 30px' : '16px 45px',
                            backgroundColor: '#7DBA00',
                            border: 'none',
                            color: '#FFFFFF',
                            fontSize: isMobile ? '15px' : '16px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            width: isMobile ? '100%' : 'auto',
                            maxWidth: isMobile ? '280px' : 'none'
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
                        onTouchStart={(e) => {
                            e.target.style.backgroundColor = '#6aa800';
                        }}
                        onTouchEnd={(e) => {
                            e.target.style.backgroundColor = '#7DBA00';
                        }}
                    >
                        Start Shopping
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
                    <span
                        style={{ cursor: 'pointer', color: '#57C7C2' }}
                        onClick={() => navigate('/products')}
                        onMouseEnter={(e) => {
                            e.target.style.color = '#7DBA00';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = '#57C7C2';
                        }}
                    >
                        Products
                    </span>
                    <span style={{ color: '#E37DCC' }}>›</span>
                    <span style={{
                        color: '#7DBA00',
                        fontSize: isMobile ? '12px' : '14px',
                        fontWeight: '500'
                    }}>
                        Shopping Cart
                    </span>
                </div>
            </div>

            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: isMobile ? '0 15px 40px' : '0 50px 80px',
            }}>
                <h1 style={{
                    fontSize: isMobile ? '1.8rem' : '2.5rem',
                    fontWeight: '400',
                    color: '#434242',
                    marginBottom: isMobile ? '25px' : '40px',
                    textAlign: isMobile ? 'center' : 'left',
                    padding: isMobile ? '0 10px' : '0'
                }}>
                    Shopping Cart
                </h1>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
                    gap: isMobile ? '25px' : '50px',
                    alignItems: 'start'
                }}>
                    {/* Cart Items */}
                    <div>
                        <div style={{
                            backgroundColor: '#F8F8F8',
                            borderRadius: isMobile ? '12px' : '15px',
                            padding: isMobile ? '20px 15px' : '30px',
                            border: '1px solid rgba(87, 199, 194, 0.1)'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: isMobile ? 'flex-start' : 'center',
                                marginBottom: '20px',
                                paddingBottom: '15px',
                                borderBottom: '1px solid rgba(125, 186, 0, 0.2)',
                                flexDirection: isMobile ? 'column' : 'row',
                                gap: isMobile ? '15px' : '0'
                            }}>
                                <h2 style={{
                                    fontSize: isMobile ? '1.3rem' : '1.5rem',
                                    fontWeight: '500',
                                    color: '#434242',
                                    margin: 0
                                }}>
                                    Cart Items ({cartItems.length})
                                </h2>
                                <button
                                    onClick={continueShopping}
                                    style={{
                                        padding: isMobile ? '10px 20px' : '8px 16px',
                                        backgroundColor: 'transparent',
                                        border: '1px solid #57C7C2',
                                        color: '#57C7C2',
                                        fontSize: isMobile ? '14px' : '13px',
                                        fontWeight: '400',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        borderRadius: '6px',
                                        width: isMobile ? '100%' : 'auto'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isMobile) {
                                            e.target.style.backgroundColor = '#57C7C2';
                                            e.target.style.color = '#FFFFFF';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isMobile) {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.color = '#57C7C2';
                                        }
                                    }}
                                    onTouchStart={(e) => {
                                        e.target.style.backgroundColor = '#57C7C2';
                                        e.target.style.color = '#FFFFFF';
                                    }}
                                    onTouchEnd={(e) => {
                                        e.target.style.backgroundColor = 'transparent';
                                        e.target.style.color = '#57C7C2';
                                    }}
                                >
                                    Continue Shopping
                                </button>
                            </div>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: isMobile ? '15px' : '20px'
                            }}>
                                {cartItems.map((item, index) => (
                                    <div key={item.id} style={{
                                        display: 'flex',
                                        gap: isMobile ? '15px' : '20px',
                                        padding: isMobile ? '15px' : '20px',
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: isMobile ? '10px' : '12px',
                                        border: '1px solid rgba(227, 125, 204, 0.1)',
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        flexDirection: isMobile ? 'column' : 'row'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isMobile) {
                                            e.currentTarget.style.boxShadow = '0 5px 20px rgba(227, 125, 204, 0.1)';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isMobile) {
                                            e.currentTarget.style.boxShadow = 'none';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }
                                    }}>
                                        {/* Product Image and Details Row */}
                                        <div style={{
                                            display: 'flex',
                                            gap: isMobile ? '15px' : '20px',
                                            width: '100%'
                                        }}>
                                            {/* Product Image */}
                                            <div style={{
                                                width: isMobile ? '80px' : '120px',
                                                height: isMobile ? '80px' : '120px',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                flexShrink: 0
                                            }}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            </div>

                                            {/* Product Details */}
                                            <div style={{
                                                flex: 1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: isMobile ? '6px' : '8px'
                                            }}>
                                                <h3 style={{
                                                    fontSize: isMobile ? '1rem' : '1.1rem',
                                                    fontWeight: '500',
                                                    color: '#434242',
                                                    margin: 0,
                                                    lineHeight: '1.3'
                                                }}>
                                                    {item.name}
                                                </h3>
                                                <p style={{
                                                    fontSize: isMobile ? '13px' : '14px',
                                                    color: '#666',
                                                    margin: 0,
                                                    lineHeight: '1.4'
                                                }}>
                                                    {item.description}
                                                </p>
                                                <div style={{
                                                    fontSize: isMobile ? '1.1rem' : '1.1rem',
                                                    fontWeight: '600',
                                                    color: index % 3 === 0 ? '#E37DCC' : index % 3 === 1 ? '#7DBA00' : '#57C7C2'
                                                }}>
                                                    ${item.price}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Quantity Controls and Actions */}
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            width: '100%',
                                            paddingTop: isMobile ? '15px' : '0',
                                            borderTop: isMobile ? '1px solid rgba(87, 199, 194, 0.1)' : 'none'
                                        }}>
                                            {/* Quantity Controls */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: isMobile ? '8px' : '12px'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: isMobile ? '8px' : '12px',
                                                    border: '1px solid rgba(87, 199, 194, 0.3)',
                                                    borderRadius: '8px',
                                                    padding: isMobile ? '4px' : '5px'
                                                }}>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        style={{
                                                            width: isMobile ? '28px' : '32px',
                                                            height: isMobile ? '28px' : '32px',
                                                            backgroundColor: '#F8F8F8',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            cursor: 'pointer',
                                                            fontSize: isMobile ? '14px' : '16px',
                                                            color: '#57C7C2',
                                                            transition: 'all 0.3s ease',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            if (!isMobile) {
                                                                e.target.style.backgroundColor = '#57C7C2';
                                                                e.target.style.color = '#FFFFFF';
                                                            }
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            if (!isMobile) {
                                                                e.target.style.backgroundColor = '#F8F8F8';
                                                                e.target.style.color = '#57C7C2';
                                                            }
                                                        }}
                                                        onTouchStart={(e) => {
                                                            e.target.style.backgroundColor = '#57C7C2';
                                                            e.target.style.color = '#FFFFFF';
                                                        }}
                                                        onTouchEnd={(e) => {
                                                            e.target.style.backgroundColor = '#F8F8F8';
                                                            e.target.style.color = '#57C7C2';
                                                        }}
                                                    >
                                                        -
                                                    </button>
                                                    <span style={{
                                                        fontSize: isMobile ? '15px' : '16px',
                                                        fontWeight: '500',
                                                        color: '#434242',
                                                        minWidth: isMobile ? '25px' : '30px',
                                                        textAlign: 'center'
                                                    }}>
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        style={{
                                                            width: isMobile ? '28px' : '32px',
                                                            height: isMobile ? '28px' : '32px',
                                                            backgroundColor: '#F8F8F8',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            cursor: 'pointer',
                                                            fontSize: isMobile ? '14px' : '16px',
                                                            color: '#57C7C2',
                                                            transition: 'all 0.3s ease',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            if (!isMobile) {
                                                                e.target.style.backgroundColor = '#57C7C2';
                                                                e.target.style.color = '#FFFFFF';
                                                            }
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            if (!isMobile) {
                                                                e.target.style.backgroundColor = '#F8F8F8';
                                                                e.target.style.color = '#57C7C2';
                                                            }
                                                        }}
                                                        onTouchStart={(e) => {
                                                            e.target.style.backgroundColor = '#57C7C2';
                                                            e.target.style.color = '#FFFFFF';
                                                        }}
                                                        onTouchEnd={(e) => {
                                                            e.target.style.backgroundColor = '#F8F8F8';
                                                            e.target.style.color = '#57C7C2';
                                                        }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                
                                                <div style={{
                                                    fontSize: isMobile ? '15px' : '15px',
                                                    fontWeight: '600',
                                                    color: '#434242'
                                                }}>
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </div>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                style={{
                                                    padding: isMobile ? '8px 12px' : '6px 12px',
                                                    backgroundColor: 'transparent',
                                                    border: '1px solid #E37DCC',
                                                    color: '#E37DCC',
                                                    fontSize: isMobile ? '13px' : '12px',
                                                    fontWeight: '400',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px',
                                                    borderRadius: '6px'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (!isMobile) {
                                                        e.target.style.backgroundColor = '#E37DCC';
                                                        e.target.style.color = '#FFFFFF';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (!isMobile) {
                                                        e.target.style.backgroundColor = 'transparent';
                                                        e.target.style.color = '#E37DCC';
                                                    }
                                                }}
                                                onTouchStart={(e) => {
                                                    e.target.style.backgroundColor = '#E37DCC';
                                                    e.target.style.color = '#FFFFFF';
                                                }}
                                                onTouchEnd={(e) => {
                                                    e.target.style.backgroundColor = 'transparent';
                                                    e.target.style.color = '#E37DCC';
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div style={{
                        backgroundColor: '#F8F8F8',
                        borderRadius: isMobile ? '12px' : '15px',
                        padding: isMobile ? '20px' : '30px',
                        border: '1px solid rgba(87, 199, 194, 0.1)',
                        position: isMobile ? 'static' : 'sticky',
                        top: '120px'
                    }}>
                        <h2 style={{
                            fontSize: isMobile ? '1.3rem' : '1.5rem',
                            fontWeight: '500',
                            color: '#434242',
                            marginBottom: isMobile ? '20px' : '25px',
                            paddingBottom: isMobile ? '12px' : '15px',
                            borderBottom: '1px solid rgba(125, 186, 0, 0.2)',
                            textAlign: isMobile ? 'center' : 'left'
                        }}>
                            Order Summary
                        </h2>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: isMobile ? '12px' : '15px',
                            marginBottom: isMobile ? '20px' : '25px'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{
                                    fontSize: isMobile ? '14px' : '15px',
                                    color: '#666'
                                }}>
                                    Subtotal
                                </span>
                                <span style={{
                                    fontSize: isMobile ? '14px' : '15px',
                                    fontWeight: '500',
                                    color: '#434242'
                                }}>
                                    ${getSubtotal().toFixed(2)}
                                </span>
                            </div>
                            
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{
                                    fontSize: isMobile ? '14px' : '15px',
                                    color: '#666'
                                }}>
                                    Shipping
                                </span>
                                <span style={{
                                    fontSize: isMobile ? '14px' : '15px',
                                    fontWeight: '500',
                                    color: getShipping() === 0 ? '#7DBA00' : '#434242'
                                }}>
                                    {getShipping() === 0 ? 'FREE' : `$${getShipping().toFixed(2)}`}
                                </span>
                            </div>
                            
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{
                                    fontSize: isMobile ? '14px' : '15px',
                                    color: '#666'
                                }}>
                                    Tax
                                </span>
                                <span style={{
                                    fontSize: isMobile ? '14px' : '15px',
                                    fontWeight: '500',
                                    color: '#434242'
                                }}>
                                    ${getTax().toFixed(2)}
                                </span>
                            </div>
                            
                            {getSubtotal() < 500 && (
                                <div style={{
                                    fontSize: isMobile ? '12px' : '13px',
                                    color: '#7DBA00',
                                    textAlign: 'center',
                                    padding: isMobile ? '6px' : '8px',
                                    backgroundColor: 'rgba(125, 186, 0, 0.1)',
                                    borderRadius: '6px',
                                    marginTop: '5px'
                                }}>
                                    Add ${(500 - getSubtotal()).toFixed(2)} more for free shipping!
                                </div>
                            )}
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingTop: isMobile ? '12px' : '15px',
                            borderTop: '2px solid rgba(227, 125, 204, 0.2)',
                            marginBottom: isMobile ? '20px' : '25px'
                        }}>
                            <span style={{
                                fontSize: isMobile ? '1.1rem' : '18px',
                                fontWeight: '600',
                                color: '#434242'
                            }}>
                                Total
                            </span>
                            <span style={{
                                fontSize: isMobile ? '1.1rem' : '18px',
                                fontWeight: '600',
                                color: '#7DBA00'
                            }}>
                                ${getTotal().toFixed(2)}
                            </span>
                        </div>

                        <button
                            onClick={proceedToCheckout}
                            style={{
                                width: '100%',
                                padding: isMobile ? '16px' : '16px',
                                backgroundColor: '#7DBA00',
                                border: 'none',
                                color: '#FFFFFF',
                                fontSize: isMobile ? '16px' : '16px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                borderRadius: '8px',
                                marginBottom: isMobile ? '12px' : '15px'
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
                            onTouchStart={(e) => {
                                e.target.style.backgroundColor = '#6aa800';
                                e.target.style.transform = 'translateY(-1px)';
                            }}
                            onTouchEnd={(e) => {
                                e.target.style.backgroundColor = '#7DBA00';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            Proceed to Checkout
                        </button>

                        <div style={{
                            fontSize: isMobile ? '11px' : '12px',
                            color: '#666',
                            textAlign: 'center',
                            lineHeight: '1.4',
                            marginBottom: isMobile ? '15px' : '0'
                        }}>
                            🔒 Secure checkout powered by Stripe
                        </div>

                        {/* Trust Badges */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: isMobile ? '8px' : '15px',
                            marginTop: isMobile ? '15px' : '20px',
                            paddingTop: isMobile ? '15px' : '20px',
                            borderTop: '1px solid rgba(87, 199, 194, 0.2)'
                        }}>
                            {['🌱 Sustainable', '🚚 Free Shipping', '✅ 5-Year Warranty'].map((badge, index) => (
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
            </div>
        </div>
    );
};

export default Cart;