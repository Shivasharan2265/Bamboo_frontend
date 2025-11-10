import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderOne from '../layout/Header copy';
import chair from "../assets/bamboo_chair.jpg";

const Cart = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Load cart items from localStorage
        loadCartFromLocalStorage();

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Load cart items from localStorage
    const loadCartFromLocalStorage = () => {
        try {
            const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
            console.log("📥 Loaded from localStorage:", savedCart);
            setCartItems(savedCart);
        } catch (error) {
            console.error("❌ Error loading cart from localStorage:", error);
            setCartItems([]);
        }
    };

    // Save cart items to localStorage whenever cartItems changes
    useEffect(() => {
        if (cartItems.length > 0) {
            try {
                localStorage.setItem('cart', JSON.stringify(cartItems));
                console.log("💾 Cart saved to localStorage:", cartItems);
            } catch (error) {
                console.error("❌ Error saving cart to localStorage:", error);
            }
        }
    }, [cartItems]);

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeItem(productId);
            return;
        }
        
        setCartItems(cartItems.map(item => 
            item.productId === productId ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeItem = (productId) => {
        const updatedCart = cartItems.filter(item => item.productId !== productId);
        setCartItems(updatedCart);
        
        // Update localStorage after removal
        if (updatedCart.length === 0) {
            localStorage.removeItem('cart');
        } else {
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
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
        navigate("/checkout");
    };

    const continueShopping = () => {
        navigate('/products');
    };

    // Helper function to get image source
    const getImageSrc = (item) => {
        if (item.image && item.image !== chair) {
            return item.image;
        }
        return chair; // fallback image
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
                             marginTop: '20px',
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
                    >
                        Home
                    </span>
                    <span style={{ color: '#E37DCC' }}>›</span>
                    <span
                        style={{ cursor: 'pointer', color: '#57C7C2' }}
                        onClick={() => navigate('/products')}
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
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: isMobile ? '25px' : '40px',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '15px' : '0'
                }}>
                    <h1 style={{
                        fontSize: isMobile ? '1.8rem' : '2.5rem',
                        fontWeight: '400',
                        color: '#434242',
                        margin: 0,
                        textAlign: isMobile ? 'center' : 'left'
                    }}>
                        Shopping Cart ({cartItems.length} items)
                    </h1>
                    
                    {cartItems.length > 0 && (
                        <button
                            onClick={clearCart}
                            style={{
                                padding: isMobile ? '10px 20px' : '8px 16px',
                                backgroundColor: 'transparent',
                                border: '1px solid #E37DCC',
                                color: '#E37DCC',
                                fontSize: isMobile ? '14px' : '13px',
                                fontWeight: '400',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                borderRadius: '6px'
                            }}
                        >
                            Clear Cart
                        </button>
                    )}
                </div>

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
                                    <div key={item.productId} style={{
                                        display: 'flex',
                                        gap: isMobile ? '15px' : '20px',
                                        padding: isMobile ? '15px' : '20px',
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: isMobile ? '10px' : '12px',
                                        border: '1px solid rgba(227, 125, 204, 0.1)',
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        flexDirection: isMobile ? 'column' : 'row'
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
                                                    src={getImageSrc(item)}
                                                    alt={item.name || item.title}
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
                                                    {item.name || item.title}
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
                                                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
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
                                                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
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
                                                onClick={() => removeItem(item.productId)}
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
                        >
                            Proceed to Checkout
                        </button>

                        <div style={{
                            fontSize: isMobile ? '11px' : '12px',
                            color: '#666',
                            textAlign: 'center',
                            lineHeight: '1.4'
                        }}>
                            🔒 Secure checkout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;