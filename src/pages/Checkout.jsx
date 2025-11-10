import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderOne from '../layout/Header copy';
import chair from "../assets/bamboo_chair.jpg";
import axios from 'axios';
import API from '../api';

const Checkout = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [orderResponse, setOrderResponse] = useState(null); // NEW: Store the API response

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

        // Load cart items from localStorage
        loadCartFromLocalStorage();

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Load cart items from localStorage
    const loadCartFromLocalStorage = () => {
        try {
            const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
            console.log("📥 Checkout - Loaded from localStorage:", savedCart);
            setCartItems(savedCart);
        } catch (error) {
            console.error("❌ Checkout - Error loading cart from localStorage:", error);
            setCartItems([]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Helper function to get image source
    const getImageSrc = (item) => {
        if (item.image && item.image !== chair) {
            return item.image;
        }
        return chair; // fallback image
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

    const generateOrderNumber = () => 'BMB' + Date.now().toString().slice(-8);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if cart is empty
        if (cartItems.length === 0) {
            alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
            navigate('/products');
            return;
        }

        try {
            setIsProcessing(true);

            // Prepare order data - match the exact field names from your backend model
            const orderData = {
                cart: cartItems.map(item => ({
                    productId: item.productId,
                    name: item.name || item.title,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                })),
                shippingAddress: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    email: formData.email,
                },
                paymentMethod: 'card',
                paymentStatus: 'pending',
                subTotal: getSubtotal(), // Changed from 'subtotal' to 'subTotal'
                shippingCost: getShipping(), // Changed from 'shipping' to 'shippingCost'
                tax: getTax(),
                total: getTotal(),
                status: 'Pending',
            };

            // Get auth token
            const token = localStorage.getItem('authToken');

            console.log("📤 Sending Order Data:", orderData);

            const response = await API.post('/order/add', orderData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log("✅ Order API Response:", response.data);

            // NEW: Save the complete API response
            setOrderResponse(response.data);

            // Success
            const newOrderNumber = response.data._id || generateOrderNumber();
            setOrderNumber(newOrderNumber);
            setOrderComplete(true);

            // Clear cart after successful order
            localStorage.removeItem('cart');
            setCartItems([]);

            window.scrollTo(0, 0);

        } catch (error) {
            console.error("❌ Order API Error:", error);
            console.log("🚫 Error details:", error.response?.data || error.message);
            alert('There was an error processing your order. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const continueShopping = () => navigate('/products');

    // If cart is empty and not in order complete state, redirect to products
    if (cartItems.length === 0 && !orderComplete) {
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
                        Add some products to your cart before proceeding to checkout.
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
                    >
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }
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
                    maxWidth: '800px',
                    margin: '0 auto',
                    padding: isMobile ? '20px 15px' : '40px 20px',
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
                        marginBottom: isMobile ? '20px' : '30px',
                        padding: '0 15px'
                    }}>
                        Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                    </p>

                    {/* Order Details Card */}
                    <div style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '12px',
                        padding: isMobile ? '20px' : '30px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(87, 199, 194, 0.2)',
                        marginBottom: '30px',
                        textAlign: 'left'
                    }}>
                        <h2 style={{
                            fontSize: isMobile ? '1.1rem' : '1.4rem',
                            fontWeight: '600',
                            color: '#434242',
                            marginBottom: '20px',
                            textAlign: 'center',
                            borderBottom: '2px solid #57C7C2',
                            paddingBottom: '10px'
                        }}>
                            Order Details
                        </h2>

                        {/* Order Number & Date */}
                        <div style={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            justifyContent: 'space-between',
                            gap: '15px',
                            marginBottom: '20px'
                        }}>
                            <div>
                                <strong style={{ color: '#57C7C2' }}>Order Number:</strong>
                                <div style={{ color: '#434242', fontWeight: '500' }}>
                                    #{orderResponse?.invoice || orderNumber}
                                </div>
                            </div>
                            <div>
                                <strong style={{ color: '#57C7C2' }}>Order Date:</strong>
                                <div style={{ color: '#434242', fontWeight: '500' }}>
                                    {orderResponse?.createdAt ?
                                        new Date(orderResponse.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        }) :
                                        new Date().toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })
                                    }
                                </div>
                            </div>
                            <div>
                                <strong style={{ color: '#57C7C2' }}>Status:</strong>
                                <div style={{
                                    color: orderResponse?.status === 'Pending' ? '#E37DCC' : '#7DBA00',
                                    fontWeight: '600',
                                    backgroundColor: orderResponse?.status === 'Pending' ? 'rgba(227, 125, 204, 0.1)' : 'rgba(125, 186, 0, 0.1)',
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    display: 'inline-block'
                                }}>
                                    {orderResponse?.status || 'Confirmed'}
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div style={{ marginBottom: '25px' }}>
                            <h3 style={{
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                color: '#434242',
                                marginBottom: '15px',
                                borderBottom: '1px solid #eee',
                                paddingBottom: '8px'
                            }}>
                                Items Ordered ({orderResponse?.cart?.length || cartItems.length})
                            </h3>
                            {(orderResponse?.cart || cartItems).map((item, index) => (
                                <div key={item.productId || index} style={{
                                    display: 'flex',
                                    gap: '15px',
                                    padding: '12px 0',
                                    borderBottom: '1px solid rgba(87, 199, 194, 0.1)',
                                    alignItems: 'center'
                                }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '6px',
                                        overflow: 'hidden',
                                        flexShrink: 0,
                                        border: '2px solid rgba(125, 186, 0, 0.2)'
                                    }}>
                                        <img
                                            src={item.image || getImageSrc(item)}
                                            alt={item.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            color: '#434242',
                                            margin: '0 0 4px 0'
                                        }}>
                                            {item.name}
                                        </h4>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <span style={{
                                                fontSize: '13px',
                                                color: '#E39963',
                                                fontWeight: '500'
                                            }}>
                                                Qty: {item.quantity}
                                            </span>
                                            <span style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                color: '#7DBA00'
                                            }}>
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary - Using API Data */}
                        <div style={{
                            backgroundColor: 'rgba(87, 199, 194, 0.05)',
                            borderRadius: '8px',
                            padding: '20px',
                            border: '1px solid rgba(87, 199, 194, 0.2)'
                        }}>
                            <h3 style={{
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                color: '#434242',
                                marginBottom: '15px'
                            }}>
                                Order Summary
                            </h3>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#666' }}>Subtotal</span>
                                    <span style={{ fontWeight: '500' }}>
                                        ${orderResponse?.subTotal?.toFixed(2) || getSubtotal().toFixed(2)}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#666' }}>Shipping</span>
                                    <span style={{
                                        fontWeight: '500',
                                        color: (orderResponse?.shippingCost === 0 || getShipping() === 0) ? '#7DBA00' : '#E37DCC'
                                    }}>
                                        {orderResponse?.shippingCost === 0 || getShipping() === 0 ?
                                            'FREE' :
                                            `$${(orderResponse?.shippingCost || getShipping()).toFixed(2)}`
                                        }
                                    </span>
                                </div>
                                {orderResponse?.discount > 0 && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#666' }}>Discount</span>
                                        <span style={{ fontWeight: '500', color: '#E37DCC' }}>
                                            -${orderResponse.discount.toFixed(2)}
                                        </span>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#666' }}>Tax</span>
                                    <span style={{ fontWeight: '500' }}>
                                        ${orderResponse?.tax?.toFixed(2) || getTax().toFixed(2)}
                                    </span>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingTop: '10px',
                                    borderTop: '2px solid #57C7C2',
                                    marginTop: '5px'
                                }}>
                                    <span style={{
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        color: '#434242'
                                    }}>
                                        Total
                                    </span>
                                    <span style={{
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        color: '#7DBA00'
                                    }}>
                                        ${orderResponse?.total?.toFixed(2) || getTotal().toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div style={{ marginTop: '25px' }}>
                            <h3 style={{
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                color: '#434242',
                                marginBottom: '15px',
                                borderBottom: '1px solid #eee',
                                paddingBottom: '8px'
                            }}>
                                Payment Information
                            </h3>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                                gap: '15px'
                            }}>
                                <div>
                                    <strong style={{ color: '#57C7C2' }}>Payment Method:</strong>
                                    <div style={{ color: '#434242' }}>
                                        {orderResponse?.paymentMethod === 'card' ? 'Credit/Debit Card' : orderResponse?.paymentMethod}
                                    </div>
                                </div>
                                <div>
                                    <strong style={{ color: '#57C7C2' }}>Payment Status:</strong>
                                    <div style={{
                                        color: orderResponse?.paymentStatus === 'pending' ? '#E37DCC' : '#7DBA00',
                                        fontWeight: '500'
                                    }}>
                                        {orderResponse?.paymentStatus === 'pending' ? 'Pending' : 'Completed'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Information */}
                        <div style={{ marginTop: '25px' }}>
                            <h3 style={{
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                color: '#434242',
                                marginBottom: '15px',
                                borderBottom: '1px solid #eee',
                                paddingBottom: '8px'
                            }}>
                                Shipping Information
                            </h3>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                                gap: '15px'
                            }}>
                                <div>
                                    <strong style={{ color: '#57C7C2' }}>Name:</strong>
                                    <div style={{ color: '#434242' }}>
                                        {formData.firstName} {formData.lastName}
                                    </div>
                                </div>
                                <div>
                                    <strong style={{ color: '#57C7C2' }}>Email:</strong>
                                    <div style={{ color: '#434242' }}>{formData.email}</div>
                                </div>
                                <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
                                    <strong style={{ color: '#57C7C2' }}>Address:</strong>
                                    <div style={{ color: '#434242' }}>
                                        {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: '15px',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
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
                                width: isMobile ? '100%' : 'auto',
                                minWidth: '200px',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Continue Shopping
                        </button>
                        <button
                            onClick={() => navigate('/my-orders')}
                            style={{
                                padding: isMobile ? '12px 20px' : '14px 30px',
                                backgroundColor: 'transparent',
                                border: '2px solid #57C7C2',
                                color: '#57C7C2',
                                fontSize: isMobile ? '14px' : '16px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                borderRadius: '8px',
                                width: isMobile ? '100%' : 'auto',
                                minWidth: '200px',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            View All Orders
                        </button>
                    </div>

                    {/* Additional Info */}
                    <div style={{
                        marginTop: '30px',
                        padding: '15px',
                        backgroundColor: 'rgba(125, 186, 0, 0.05)',
                        borderRadius: '8px',
                        border: '1px solid rgba(125, 186, 0, 0.2)'
                    }}>
                        <p style={{
                            fontSize: '14px',
                            color: '#666',
                            margin: '0',
                            textAlign: 'center'
                        }}>
                            📧 A confirmation email has been sent to <strong>{formData.email}</strong>
                        </p>
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
                        Checkout ({cartItems.length} items)
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
                                    <div key={item.productId} style={{
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
                                                src={getImageSrc(item)}
                                                alt={item.name || item.title}
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
                                                {item.name || item.title}
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